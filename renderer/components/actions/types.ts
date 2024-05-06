import { AutocompleteGetTagProps } from "@mui/material";


/**
 * Represents a action's data.
 */
export interface IActionsData {
    name: string;
}

/**
 * Represents a action.
 */
export interface IAction extends IActionsData {
    id?: number;
}
/**
 * Represents an extended version of the IActions interface.
 */
export interface IActionsExtended extends IAction {
    firstLetter: string;
}

/**
 * Represents the properties of a tag in an autocomplete component.
 */
export interface TagProps extends ReturnType<AutocompleteGetTagProps> {
    label: string;
}
/**
 * Represents the props for the Actions component.
 */
export interface IPropsActions {
    labelText: string;
}
