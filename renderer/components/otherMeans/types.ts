import { AutocompleteGetTagProps } from "@mui/material";


/**
 * Represents a person's data.
 */
export interface IOtherMeanData {
    name: string;
}

/**
 * Represents a person.
 */
export interface IOtherMean extends IOtherMeanData {
    id?: number;
}
/**
 * Represents an extended version of the IOtherMean interface.
 */
export interface IOtherMeanExtended extends IOtherMean {
    firstLetter: string;
}

/**
 * Represents the properties of a tag in an autocomplete component.
 */
export interface TagProps extends ReturnType<AutocompleteGetTagProps> {
    label: string;
}
/**
 * Represents the props for the OtherMean component.
 */
export interface IPropsOtherMean {
    labelText: string;
    allowCreate?: boolean;
}
