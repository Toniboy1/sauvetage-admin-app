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
    required: boolean
}

export interface IPropsSelectGereric {
    allowCreate:boolean, 
    required:boolean
    multiple?:boolean
}

export type GenericProperties = {
    id?: number;
    name: string;
}

export type GenericPropertiesExtended = GenericProperties & {
    firstLetter: string;
}