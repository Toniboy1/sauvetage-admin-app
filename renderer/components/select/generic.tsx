import React, { useCallback, useEffect, useState } from "react";
import { Autocomplete, TextField, Button, Typography } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import { debounce } from "lodash";
import { IInterventionFormData } from "../reports/intervention/types";
import {KeyboardEvent} from "react";
import {
  GenericProperties,
  IPropsSelect,
  GenericPropertiesExtended,
} from "./types";

const Select = <
  T extends GenericProperties,
  TExt extends GenericPropertiesExtended,
>({
  multiple = true,
  allowCreate = true,
  formField,
  getAllOptions,
  searchOptions,
  addOption,
  placeholder,
  required = false,
  label,
}: IPropsSelect<T, TExt>) => {
  const { control, getFieldState } = useFormContext<IInterventionFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: formField,
    keyName: "_id",
    rules: {
      ...(required ? { required: `Le champ est obligatoire` } : undefined),
      minLength: {
        value: 1,
        message: "Veuillez sélectionner au moins une alarmne",
      },
      ...(multiple
        ? {
          maxLength: {
            value: 1,
            message: "Maximum 1",
          },
        }
        : undefined),
    },
  });
  const [options, setOptions] = useState<TExt[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    /**
     * Fetches all options and sets the state.
     */
    const fetchOptions = async () => {
      const options = await getAllOptions();
      setOptions(
        options.map((option) => ({
          id: option.id,
          name: option.name,
          firstLetter: option.name.charAt(0),
        })) as TExt[],
      );
    };
    fetchOptions();
  }, []);

  /**
   * Debounces the search function to avoid making too many requests.
   */
  const debounceSearch = useCallback(
    debounce(async (input) => {
      setLoading(true);
      try {
        const searchResults = await searchOptions(input);
        setOptions(
          searchResults.map((option) => ({
            id: option.id,
            name: option.name,
            firstLetter: option.name.charAt(0),
          })) as TExt[],
        );
      } finally {
        setLoading(false);
      }
    }, 500),
    [],
  );

  /**
   * Handles the input change event.
   */
  const handleInputChange = useCallback(
    (event, newInputValue) => {
      console.log("event", event);
      console.log("newInputValue", newInputValue);
      if (event?.type === "change") {
        setInputValue(newInputValue);
        debounceSearch(newInputValue);
      }

    },
    [debounceSearch, setInputValue],
  );

  /**
   * Handles the add option event.
   */
  const handleAddOption = useCallback(async () => {
    if (inputValue) {
      const newId = await addOption(inputValue);
      const newOption = {
        id: newId,
        name: inputValue,
        firstLetter: inputValue.charAt(0),
      };
      append(newOption);
      setInputValue("");
      setOptions((prev: TExt[]) => [...prev, newOption] as TExt[]);
    }
  }, [append, inputValue]);

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && inputValue && !options.some(option => option.name === inputValue)) {
      handleAddOption();
      event.preventDefault(); // Prevent form submission or other default behavior
    }
  };

  return (
    <div>
      {Boolean(getFieldState(formField)?.invalid) && (
        <Typography color="error">
          {getFieldState(formField)?.error?.root?.message}
        </Typography>
      )}
      <Autocomplete
        size="medium"
        fullWidth={true}
        multiple
        id={`${formField}-autocomplete`}
        options={options}
        getOptionLabel={(option) => (option ? option.name : "")}
        loading={loading}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        value={fields
          .map((field) => options.find((option) => option.id === field.id))
          .filter((option) => option !== undefined)}
        onChange={(event, newValue) => {
          const newValueSet = new Set(newValue.map((item) => item.id));
          fields.forEach((field, index) => {
            if (!newValueSet.has(field.id)) {
              remove(index);
            }
          });
          newValue.forEach((item) => {
            if (!fields.some((field) => field.id === item.id)) {
              append(item);
            }
          });
        }}
        filterOptions={(options, params) => {
          const filtered = options.filter((option) =>
            option.name.toLowerCase().includes(params.inputValue.toLowerCase()),
          );
          if (
            params.inputValue !== "" &&
            !filtered.some((option) => option.name === params.inputValue)
          ) {
            filtered.push({
              id: 0,
              name: params.inputValue,
              firstLetter: params.inputValue.charAt(0),
            } as TExt); // Cast the object to type T
          }
          return filtered;
        }}
        renderOption={(props, option) =>
          option.id === 0 ? (
            <li {...props}>
              {allowCreate && !options.find((opt) => opt.name === inputValue) && (
                <Button fullWidth onClick={handleAddOption}>
                  Ajouter "{option.name}"
                </Button>
              )}
            </li>
          ) : (
            <li {...props}>{option.name}</li>
          )
        }
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            variant="outlined"
            error={Boolean(getFieldState(formField)?.invalid)}
            helperText={getFieldState(formField)?.invalid ? getFieldState(formField)?.error?.message : ""}
            onKeyPress={handleKeyPress}
          />
        )}
      />
    </div>
  );
};

export default Select;
