import { useAutocomplete } from '@mui/base/useAutocomplete';
import  { StyledTag } from './Tag';
import {  IPeopleExtended, IPropsPeople } from "./types";
import Label from "./Label";
import InputWrapper from "./InputWrapper";
import Listbox from "./Listbox";
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import db from "../../model/db";
const people = ({labelText}:IPropsPeople) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<readonly IPeopleExtended[]>([]);
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
            const allPeople = await db.getAllPeople(); // Fetch all people from the database
            const extendedOptions: IPeopleExtended[] = allPeople.map(person => ({
                id: person.id,
                name: person.name,
                firstLetter: person.name.charAt(0) // Assuming you have names
            }));
            setOptions(extendedOptions);
        };

        fetchPeople();

        return () => {
            setOptions([]); // Optionally clear options when not open
        };
    }, [open]);

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
            {groupedOptions.length > 0 ? (
                <Listbox {...getListboxProps()}>
                    {(groupedOptions as typeof options).map((option, index) => (
                        <li {...getOptionProps({ option, index })}>
                            <span>{option.name}</span>
                            <CheckIcon fontSize="small" />
                        </li>
                    ))}
                </Listbox>
            ) : null}
        </div>
    )
}
export default people