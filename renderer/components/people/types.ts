import { AutocompleteGetTagProps } from "@mui/material";


/**
 * Represents a person's data.
 */
export interface IPeopleData {
    name: string;
}

/**
 * Represents a person.
 */
export interface IPeople extends IPeopleData {
    id?: number;
}
/**
 * Represents an extended version of the IPeople interface.
 */
export interface IPeopleExtended extends IPeople {
    firstLetter: string;
}

/**
 * Represents the properties of a tag in an autocomplete component.
 */
export interface TagProps extends ReturnType<AutocompleteGetTagProps> {
    label: string;
}
/**
 * Represents the props for the People component.
 */
export interface IPropsPeople {
    labelText: string;
}
