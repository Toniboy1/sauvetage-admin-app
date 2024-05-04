import { Autocomplete, FormControl, InputLabel, Select, TextField } from "@mui/material"
import { useAutocomplete } from '@mui/base/useAutocomplete';
import Tag, { StyledTag } from './Tag';
import { IPeople, IPeopleExtended, IPropsPeople } from "./types";
import Label from "./Label";
import InputWrapper from "./InputWrapper";
import Listbox from "./Listbox";
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
function sleep(duration: number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}
const people = ({labelText}:IPropsPeople) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<readonly IPeopleExtended[]>([]);
    const loading = open && options.length === 0;
    const _options: IPeople[] = [
        { name: "Anthony Fasano" },
        { name: "Benoit Lemaire" },
        { name: "Cyril Poulain" },
    ]
    const mappedOptions: IPeopleExtended[] = _options.map((option) => {
        return {
            name: option.name,
            firstletter: option.name.charAt(0)
        }
    })
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
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                setOptions([...mappedOptions]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
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
                    {(groupedOptions as typeof mappedOptions).map((option, index) => (
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