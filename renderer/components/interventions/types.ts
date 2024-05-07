import { AutocompleteGetTagProps } from "@mui/material";

/**
 * Represents a person's data.
 */
export interface IInterventionTypeData {
  name: string;
}

/**
 * Represents a person.
 */
export interface IInterventionType extends IInterventionTypeData {
  id?: number;
}
/**
 * Represents an extended version of the IInterventionType interface.
 */
export interface IInterventionTypeExtended extends IInterventionType {
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
