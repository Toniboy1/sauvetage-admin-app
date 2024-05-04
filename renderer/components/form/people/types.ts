import { AutocompleteGetTagProps } from "@mui/material";

export interface IPeople {
    name: string;
}

export interface IPeopleExtended extends IPeople {
    firstletter: string;
}

export interface TagProps extends ReturnType<AutocompleteGetTagProps> {
    label: string;
}
export interface IPropsPeople {
    labelText: string;
}