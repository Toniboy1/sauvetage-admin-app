import { useAutocomplete } from "@mui/base/useAutocomplete";
import { StyledTag } from "./Tag";
import { ICausesExtended, IPropsCauses } from "./types";
import Label from "./Label";
import InputWrapper from "./InputWrapper";
import Listbox from "./Listbox";
import CheckIcon from "@mui/icons-material/Check";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useRef, useState } from "react";
import db from "../../model/db";
import { Button } from "@mui/material";
/**
 * Renders a component for managing causes.
 * @param props - The component props.
 * @param props.labelText - The label text for the component.
 * @returns The rendered component.
 */
const causes = ({ labelText }: IPropsCauses) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly ICausesExtended[]>([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const loading = open && options.length === 0;
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    defaultValue: [],
    multiple: true,
    options: options,
    getOptionLabel: (option) => option.name,
    onInputChange: (event, newInputValue) => {
      setInputValue(newInputValue);
    },
    open,
    onClose: () => {
      setOpen(false);
    },
    onOpen: () => {
      setOpen(true);
    },
  });
  useEffect(() => {
    if (!open) {
      return;
    }
    const fetchCauses = async () => {
      const allCauses = await db.getAllCauses();
      const extendedOptions: ICausesExtended[] = allCauses.map((cause) => ({
        id: cause.id,
        name: cause.name,
        firstLetter: cause.name.charAt(0),
      }));
      setOptions(extendedOptions);
    };

    fetchCauses();

    return () => {
      setOptions([]);
    };
  }, [open]);

  /**
   * Handles the creation of a new cause.
   * @returns A promise that resolves when the new cause is created.
   */
  const handleCreateNew = async (): Promise<void> => {
    const newName = inputValue.trim();
    if (!newName) return;
    if (
      options.find(
        (option) => option.name.toLowerCase() === newName.toLowerCase(),
      )
    )
      return;
    const idNewCause = await db.addCause(newName);
    const newCause = {
      id: idNewCause,
      name: newName,
      firstLetter: newName.charAt(0),
    };
    value.push(newCause);
    setOptions((prevOptions) => [
      ...prevOptions,
      {
        id: newCause.id,
        name: newCause.name,
        firstLetter: newName.charAt(0),
      },
    ]);
    setInputValue("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>{labelText}</Label>
        <InputWrapper ref={setAnchorEl} className={focused ? "focused" : ""}>
          {value.map((option: ICausesExtended, index: number) => (
            <StyledTag label={option.name} {...getTagProps({ index })} />
          ))}
          <input {...getInputProps()} />
        </InputWrapper>
      </div>
      {loading ? <CircularProgress /> : null}

      <Listbox {...getListboxProps()}>
        {groupedOptions.map((option, index) => (
          <li {...getOptionProps({ option, index })}>
            <span>{option.name}</span>
            <CheckIcon fontSize="small" />
          </li>
        ))}
        {inputValue && (
          <li>
            <Button onClick={handleCreateNew}>Create "{inputValue}"</Button>
          </li>
        )}
      </Listbox>
    </div>
  );
};
export default causes;
