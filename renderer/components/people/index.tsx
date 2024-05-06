import React, { useCallback, useEffect, useState } from "react";
import db from "../../model/db";
import { Autocomplete, TextField, Button } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import { debounce } from "lodash";
import { IPeopleExtended, IPropsPeople } from "./types";

const People = ({ peopleType }: IPropsPeople) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: peopleType,
    keyName: "_id",
    rules: {required: "Ce champ est requis", minLength: {value: 1, message: "Veuillez sélectionner au moins une personne"}},
  });
  const [options, setOptions] = useState<IPeopleExtended[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      const people = await db.getAllPeople();
      setOptions(people.map(person => ({
        id: person.id,
        name: person.name,
        firstLetter: person.name.charAt(0)
      })));
    };
    fetchPeople();
  }, []);

  const debounceSearch = useCallback(debounce(async (input) => {
    setLoading(true);
    try {
      const searchResults = await db.searchPeople(input);
      setOptions(searchResults.map(person => ({
        id: person.id,
        name: person.name,
        firstLetter: person.name.charAt(0)
      })));
    } finally {
      setLoading(false);
    }
  }, 500), []);

  const handleInputChange = useCallback((event, newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue) {
      debounceSearch(newInputValue);
    }
  }, [debounceSearch]);

  const handleAddPerson = useCallback(async () => {
    if (inputValue) {
      const newId = await db.addPerson(inputValue);
      const newPerson = { id: newId, name: inputValue, firstLetter: inputValue.charAt(0) };
      append(newPerson);
      setInputValue("");
      setOptions(prev => [...prev, newPerson]);
    }
  }, [append, inputValue]);

  return (
    <Autocomplete
      multiple
      id={`${peopleType}-autocomplete`}
      options={options}
      getOptionLabel={(option) => option ? option.name : ''}
      loading={loading}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      value={fields.map(field => options.find(option => option.id === parseInt(field.id))).filter(option => option !== undefined)}
      onChange={(event, newValue) => {
        const newValueSet = new Set(newValue.map(item => item.id));
        fields.forEach((field, index) => {
          if (!newValueSet.has(parseInt(field.id))) {
            remove(index);
          }
        });
        newValue.forEach(item => {
          if (!fields.some(field => parseInt(field.id) === item.id)) {
            append(item);
          }
        });
      }}
      filterOptions={(options, params) => {
        const filtered = options.filter(option => option.name.toLowerCase().includes(params.inputValue.toLowerCase()));
        if (params.inputValue !== '' && !filtered.some(option => option.name === params.inputValue)) {
          filtered.push({ id: 0, name: params.inputValue, firstLetter: params.inputValue.charAt(0) });
        }
        return filtered;
      }}
      renderOption={(props, option) => (
        option.id === 0
          ? <li {...props}><Button fullWidth onClick={handleAddPerson}>Ajouter "{option.name}"</Button></li>
          : <li {...props}>{option.name}</li>
      )}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label={peopleType} placeholder="Select or add people" variant="outlined" />
      )}
    />
  );
};

export default People;
