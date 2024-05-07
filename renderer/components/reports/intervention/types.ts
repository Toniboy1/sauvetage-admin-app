import dayjs from "dayjs";
import { IPeople } from "../../people/types";
import { IAlarm } from "../../alarm/types";
import { ISeverity } from "../../severities/types";
import { IInterventionType } from "../../interventions/types";
import { IOtherMean } from "../../otherMeans/types";
import {ICause} from "../../causes/types";
import { IAction } from "../../actions/types";
import { ICommonLocation } from "../../location/types";

export interface IInterventionFormData {
  id?: number;
  startedAt: dayjs.Dayjs;
  endedAt: dayjs.Dayjs;
  date: dayjs.Dayjs;
  pilote: Array<IPeople>;
  crew: Array<IPeople>;
  alarmedBy: Array<IAlarm>;
  severity: Array<ISeverity>;
  inteverntionType: Array<IInterventionType>
  otherMeans: Array<IOtherMean>;
  causes: Array<ICause>;
  actionsTaken: Array<IAction>;
  interventionLocation: Array<ICommonLocation>;
  interventionDestination: Array<ICommonLocation>;
  remark: string;
}
export interface IInterventionData {
  id?: number;
  startedAt: string;
  endedAt: string;
  date: string;
  pilote: Array<IPeople>;
  crew: Array<IPeople>;
  alarmedBy: Array<IAlarm>;
  severity: Array<ISeverity>;
  inteverntionType: Array<IInterventionType>
  otherMeans: Array<IOtherMean>;
  causes: Array<ICause>;
  actionsTaken: Array<IAction>;
  interventionLocation: Array<ICommonLocation>;
  interventionDestination: Array<ICommonLocation>;
  remark: string;
}

export type ArrayPropertyNames<T> = {
  [K in keyof T]: K extends 'remark' ? never : T[K] extends Array<any> ? K : never
}[keyof T];


export type ArrayProperties<T> = Pick<T, ArrayPropertyNames<T>>;
