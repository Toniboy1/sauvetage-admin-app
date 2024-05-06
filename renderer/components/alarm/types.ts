import { AutocompleteGetTagProps } from "@mui/material";


/**
 * Represents a person's data.
 */
export interface IAlarmData {
    name: string;
}

/**
 * Represents a person.
 */
export interface IAlarm extends IAlarmData {
    id?: number;
}
/**
 * Represents an extended version of the IAlarm interface.
 */
export interface IAlarmExtended extends IAlarm {
    firstLetter: string;
}

/**
 * Represents the properties of a tag in an autocomplete component.
 */
export interface TagProps extends ReturnType<AutocompleteGetTagProps> {
    label: string;
}
/**
 * Represents the props for the Alarm component.
 */
export interface IPropsAlarm {
    labelText: string;
    allowCreate?: boolean;
}
