import { AutocompleteGetTagProps } from "@mui/material";

/**
 * Represents a cause's data.
 */
export interface ICausesData {
  name: string;
}

/**
 * Represents a cause.
 */
export interface ICause extends ICausesData {
  id?: number;
}
/**
 * Represents an extended version of the ICauses interface.
 */
export interface ICausesExtended extends ICause {
  firstLetter: string;
}

/**
 * Represents the properties of a tag in an autocomplete component.
 */
export interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  label: string;
}
/**
 * Represents the props for the Causes component.
 */
export interface IPropsCauses {
  labelText: string;
}
