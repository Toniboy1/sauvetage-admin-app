import { useAutocomplete } from '@mui/base/useAutocomplete';
import { StyledTag } from './Tag';
import { IPeopleExtended, IPropsPeople } from "./types";
import Label from "./Label";
import InputWrapper from "./InputWrapper";
import Listbox from "./Listbox";
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useRef, useState } from "react";
import db from "../../model/db";
import { Button } from '@mui/material';
/**
 * Renders a component for managing people.
 * 
 * @param {IPropsPeople} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
const people = ({ labelText }: IPropsPeople) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<readonly IPeopleExtended[]>([]);
    const [inputValue, setInputValue] = useState('');
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
        id: 'customized-hook-demo',
        defaultValue: [],
        multiple: true,
        options: options,
        getOptionLabel: (option) => option.name,
        onInputChange: (event, newInputValue) => {
            setInputValue(newInputValue);
        },
        open,
        onClose: () => { setOpen(false) },
        onOpen: () => { setOpen(true); },

    }

    );
    useEffect(() => {
        if (!open) {
            return;
        }
        const fetchPeople = async () => {
            const allPeople = await db.getAllPeople();
            const extendedOptions: IPeopleExtended[] = allPeople.map(person => ({
                id: person.id,
                name: person.name,
                firstLetter: person.name.charAt(0) 
            }));
            setOptions(extendedOptions);
        };

        fetchPeople();

        return () => {
            setOptions([]);
        };
    }, [open]);

    /**
     * Handles the creation of a new person.
     * 
     * @returns {Promise<void>} A promise that resolves when the new person is created.
     */
    const handleCreateNew = async (): Promise<void> => {
        const newName = inputValue.trim();
        if (!newName) return;  
        if (options.find(option => option.name.toLowerCase() === newName.toLowerCase())) return;
        const idNewPerson = await db.addPerson(newName);
        const newPerson = { id: idNewPerson, name: newName, firstLetter: newName.charAt(0) };
        value.push(newPerson);
        setOptions(prevOptions => [...prevOptions, { id: newPerson.id, name: newPerson.name, firstLetter: newName.charAt(0) }]);
        setInputValue('');
        if (inputRef.current) inputRef.current.value = '';
    };

    return (
        <div>
            <div {...getRootProps()}>
                <Label {...getInputLabelProps()}>{labelText}</Label>
                <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
                    {value.map((option: IPeopleExtended, index: number) => (
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
                        <Button onClick={handleCreateNew} >Create "{inputValue}"</Button>
                    </li>
                )}
            </Listbox>
        </div>
    )
}
export default people