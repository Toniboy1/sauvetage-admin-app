import {
  Autocomplete,
  Button,
  Chip,
  TextField,
  Typography,
} from "@mui/material";
import { debounce } from "lodash";
import {
  KeyboardEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { IInterventionFormData } from "../reports/intervention/types";
import {
  GenericProperties,
  GenericPropertiesExtended,
  IPropsSelect,
  LiProps,
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
        setOptions((prevOptions) => {
          const newOptions = searchResults.map(
            (option) =>
              ({
                id: option.id,
                name: option.name,
                firstLetter: option.name.charAt(0),
              }) as TExt,
          );

          // Create a set of new option IDs for quick lookup
          const newOptionIds = new Set(newOptions.map((option) => option.id));

          // Filter to keep only those that are not in the new results but are currently selected
          const retainedOptions = prevOptions.filter(
            (option) =>
              fields.some((field) => field.id === option.id) &&
              !newOptionIds.has(option.id),
          );

          return [...retainedOptions, ...newOptions];
        });
      } finally {
        setLoading(false);
      }
    }, 500),
    [fields, searchOptions],
  );

  /**
   * Handles the input change event.
   * @param event The input change event.
   * @param newInputValue The new input value.
   */
  const handleInputChange = useCallback(
    (event: SyntheticEvent<Element, Event>, newInputValue: string) => {
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
    if (
      inputValue &&
      !options.some(
        (option) => option.name.toLowerCase() === inputValue.toLowerCase(),
      )
    ) {
      const newId = await addOption(inputValue);
      const newOption = {
        id: newId,
        name: inputValue,
        firstLetter: inputValue.charAt(0),
      };
      append(newOption);
      setInputValue("");
      setOptions((prevOptions) => {
        const newOptions = [newOption] as TExt[];

        // Create a set of new option IDs for quick lookup
        const newOptionIds = new Set(newOptions.map((option) => option.id));

        // Filter to keep only those that are not in the new results but are currently selected
        const retainedOptions = prevOptions.filter(
          (option) =>
            fields.some((field) => field.id === option.id) &&
            !newOptionIds.has(option.id),
        );

        return [...retainedOptions, ...newOptions];
      });
      setOptions((prev) => [...prev, newOption] as TExt[]); // Update the type of setOptions
    }
  }, [append, inputValue, options, addOption]);

  /**
   * Handles the key press event.
   * @param event The key press event.
   */
  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (
      event.key === "Enter" &&
      inputValue &&
      !options.some((option) => option.name === inputValue)
    ) {
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
        getOptionLabel={(option) => option.name}
        getOptionKey={(option) => option.id}
        loading={loading}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        value={fields
          .map((field) => options.find((option) => option.id === field.id))
          .filter(Boolean)}
        onChange={(event, newValue) => {
          // Map of new values by ID for quick access
          const newValueMap = new Map(newValue.map((item) => [item.id, item]));

          // Filter out any fields not present in the new set of values
          fields.forEach((field, index) => {
            if (!newValueMap.has(field.id)) {
              remove(index);
            }
          });

          // Append new items that are not already in the fields
          newValue.forEach((item) => {
            if (!fields.some((field) => field.id === item.id)) {
              append(item);
            }
          });
        }}
        filterOptions={(options, params) => {
          // Convert currently selected field ids into a Set for quick lookup
          const selectedIds = new Set(fields.map((field) => field.id));

          // Filter out options that are already selected
          const filtered = options.filter(
            (option) =>
              !selectedIds.has(option.id) &&
              option.name
                .toLowerCase()
                .includes(params.inputValue.toLowerCase()),
          );

          // Optionally add a temporary option for creating new entries if not found
          if (
            params.inputValue !== "" &&
            !filtered.some((option) => option.name === params.inputValue) &&
            allowCreate
          ) {
            filtered.push({
              id: 0, // Use a unique temporary id
              name: params.inputValue,
              firstLetter: params.inputValue.charAt(0),
            } as TExt);
          }
          return filtered;
        }}
        renderOption={(props: LiProps, option) => {
          return option.id === 0 ? (
            <li {...props} key={option.id}>
              {allowCreate &&
                !options.find((opt) => opt.name === inputValue) && (
                  <Button fullWidth onClick={handleAddOption}>
                    Ajouter "{option.name}"
                  </Button>
                )}
            </li>
          ) : (
            <li {...props} key={option.id}>
              {option.name}
            </li>
          );
        }}
        renderTags={(tagValue, getTagProps) => {
          return tagValue.map((option, index) => {
            const chip = (
              <Chip
                {...getTagProps({ index })}
                key={option.id}
                label={option.name}
              />
            );
            return chip;
          });
        }}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            variant="outlined"
            error={Boolean(getFieldState(formField)?.invalid)}
            helperText={
              getFieldState(formField)?.invalid
                ? getFieldState(formField)?.error?.message
                : ""
            }
            onKeyDown={handleKeyPress}
          />
        )}
      />
    </div>
  );
};

export default Select;
