import { AutocompleteGetTagProps } from "@mui/material";


/**
 * Represents a person's data.
 */
export interface IInterventionData {
    name: string;
}

/**
 * Represents a person.
 */
export interface IIntervention extends IInterventionData {
    id?: number;
}
/**
 * Represents an extended version of the IIntervention interface.
 */
export interface IInterventionExtended extends IIntervention {
    firstLetter: string;
}

/**
 * Represents the properties of a tag in an autocomplete component.
 */
export interface TagProps extends ReturnType<AutocompleteGetTagProps> {
    label: string;
}
/**
 * Represents the props for the Intervention component.
 */
export interface IPropsIntervention {
    labelText: string;
    allowCreate?: boolean;
}
