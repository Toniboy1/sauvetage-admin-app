import dayjs from "dayjs";
import { IAction } from "../../actions/types";
import { IAlarm } from "../../alarm/types";
import { ICause } from "../../causes/types";
import { IInterventionType } from "../../interventions/types";
import { ICommonLocation } from "../../location/types";
import { IOtherMean } from "../../otherMeans/types";
import { IPeople } from "../../people/types";
import { ISeverity } from "../../severities/types";
import { IWeather } from "../../weathers/types";

export interface IInterventionFormData {
  id?: number;
  startedAt: dayjs.Dayjs;
  endedAt: dayjs.Dayjs;
  date: dayjs.Dayjs;
  pilote: Array<IPeople>;
  crew: Array<IPeople>;
  alarmedBy: Array<IAlarm>;
  severity: Array<ISeverity>;
  inteverntionType: Array<IInterventionType>;
  otherMeans: Array<IOtherMean>;
  causes: Array<ICause>;
  actionsTaken: Array<IAction>;
  interventionLocation: Array<ICommonLocation>;
  interventionDestination: Array<ICommonLocation>;
  weathers: Array<IWeather>
  remark: string;
  rescued: number;
  medicalized: number;
  deceased: number;
  eCoordinate: string;
  nCoordinate: string;
  boatRegistration: string;
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
  inteverntionType: Array<IInterventionType>;
  otherMeans: Array<IOtherMean>;
  causes: Array<ICause>;
  actionsTaken: Array<IAction>;
  interventionLocation: Array<ICommonLocation>;
  interventionDestination: Array<ICommonLocation>;
  weathers: Array<IWeather>
  remark: string;
  rescued: number;
  medicalized: number;
  deceased: number;
  eCoordinate: string;
  nCoordinate: string;
  boatRegistration: string;
}

export type ArrayPropertyNames<T> = {
  [K in keyof T]: T[K] extends Array<any> ? K : never;
}[keyof T];

export type ArrayProperties<T> = Pick<T, ArrayPropertyNames<T>>;
