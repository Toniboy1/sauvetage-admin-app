import { AutocompleteGetTagProps } from "@mui/material";


/**
 * Represents a person's data.
 */
export interface ICommonLocationData {
    name: string;
}

/**
 * Represents a person.
 */
export interface ICommonLocation extends ICommonLocationData {
    id?: number;
}
/**
 * Represents an extended version of the ICommonLocation interface.
 */
export interface ICommonLocationExtended extends ICommonLocation {
    firstLetter: string;
}

/**
 * Represents the properties of a tag in an autocomplete component.
 */
export interface TagProps extends ReturnType<AutocompleteGetTagProps> {
    label: string;
}
/**
 * Represents the props for the CommonLocation component.
 */
export interface IPropsCommonLocation {
    labelText: string;
    allowCreate?: boolean;
}
