import { Path } from "react-hook-form";
import { ArrayPropertyNames, IInterventionFormData } from "../reports/intervention/types";

export interface IPropsSelect<T extends GenericProperties,TExt extends GenericPropertiesExtended>{
    allowCreate?: boolean;
    formField : ArrayPropertyNames<IInterventionFormData>;
    getAllOptions: () => Promise<T[]>;
    searchOptions: (input: string) => Promise<T[]>;
    addOption: (name:string) => Promise<number>;
    placeholder: string;
    multiple: boolean;
    label: string;
}

export type GenericProperties = {
    id?: number;
    name: string;
}

export type GenericPropertiesExtended = GenericProperties & {
    firstLetter: string;
}