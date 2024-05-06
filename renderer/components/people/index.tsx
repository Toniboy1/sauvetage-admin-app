import { IPeopleExtended, IPropsPeople } from "./types";
import React, { useCallback, useEffect, useState } from "react";
import db from "../../model/db";
import { Autocomplete, TextField, Button } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import { createFilterOptions } from "@mui/material/Autocomplete";
import {debounce } from "lodash";

const filter = createFilterOptions<IPeopleExtended>();

const People = ({ peopleType }: IPropsPeople) => {
  const { control } = useFormContext();
  const { fields, append ,remove} = useFieldArray({
    control,
    name: peopleType
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
  },[]);
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
  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue) {
      debounceSearch(newInputValue);
    }
  };

  const handleAddPerson = async () => {
    if (inputValue) {
      const newId = await db.addPerson(inputValue);
      append({ id: newId, name: inputValue, firstLetter: inputValue.charAt(0) });
      setInputValue("");  // Clear input after addition
      setOptions(prev => [...prev, { id: newId, name: inputValue, firstLetter: inputValue.charAt(0) }]);
    }
  };

  return (
    <Autocomplete
      multiple
      id={`${peopleType}-autocomplete`}
      options={options}
      getOptionLabel={(option) => option.name}
      loading={loading}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={(event, newValue) => {
        append(newValue[newValue.length - 1]);
      }}
      filterOptions={(options, params) => {
        const filtered = options.filter(option => option.name.toLowerCase().includes(params.inputValue.toLowerCase()));
        if (params.inputValue !== '' && !filtered.some(option => option.name === params.inputValue)) {
          filtered.push({
            id: 0,
            name: params.inputValue,
            firstLetter: params.inputValue.charAt(0)
          });
        }
        return filtered;
      }}
      renderOption={(props, option) => (
        option.id === 0
          ? (
            <li {...props}>
              <Button fullWidth onClick={handleAddPerson}>
                Ajouter "{option.name}"
              </Button>
            </li>
          )
          : <li {...props}>{option.name}</li>
      )}
      renderInput={(params) => (
        <TextField {...params} label={peopleType} placeholder="Select or add people" variant="outlined" />
      )}
    />
  );
};

export default People;
