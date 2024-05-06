import { useAutocomplete } from "@mui/base/useAutocomplete";
import { StyledTag } from "./Tag";
import { IActionsExtended, IPropsActions } from "./types";
import Label from "./Label";
import InputWrapper from "./InputWrapper";
import Listbox from "./Listbox";
import CheckIcon from "@mui/icons-material/Check";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useRef, useState } from "react";
import db from "../../model/db";
import { Button } from "@mui/material";
/**
 * Renders a component for managing actions.
 * @param props - The component props.
 * @param props.labelText - The label text for the component.
 * @returns The rendered component.
 */
const actions = ({ labelText }: IPropsActions) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly IActionsExtended[]>([]);
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
    const fetchActions = async () => {
      const allActions = await db.getAllActions();
      const extendedOptions: IActionsExtended[] = allActions.map((action) => ({
        id: action.id,
        name: action.name,
        firstLetter: action.name.charAt(0),
      }));
      setOptions(extendedOptions);
    };

    fetchActions();

    return () => {
      setOptions([]);
    };
  }, [open]);

  /**
   * Handles the creation of a new action.
   * @returns A promise that resolves when the new action is created.
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
    const idNewAction = await db.addAction(newName);
    const newAction = {
      id: idNewAction,
      name: newName,
      firstLetter: newName.charAt(0),
    };
    value.push(newAction);
    setOptions((prevOptions) => [
      ...prevOptions,
      {
        id: newAction.id,
        name: newAction.name,
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
          {value.map((option: IActionsExtended, index: number) => (
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
export default actions;
