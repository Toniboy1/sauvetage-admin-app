import jsPDF from "jspdf";
import { IAction } from "../../actions/types";
import { IAlarm } from "../../alarm/types";
import { ICause } from "../../causes/types";
import { IInterventionType } from "../../interventions/types";
import { ICommonLocation } from "../../location/types";
import { IOtherMean } from "../../otherMeans/types";
import { IInterventionFormData } from "../../reports/intervention/types";
import { ISeverity } from "../../severities/types";
import ActionTaken from "./actionsTaken";
import AlarmedBy from "./alarmed";
import Cause from "./cause";
import crew from "./crew";
import Destination from "./destination";
import setupFonts from "./fonts";
import header from "./header";
import interventionType from "./interventionType";
import Location from "./location";
import OtherMeans from "./otherMeans";
import Remarks from "./remarks";
import rescued from "./rescued";
import Severity from "./severity";
import time from "./time";
export const addPage = (doc: jsPDF, y: number) => {
  if (y > 250) {
    doc.addPage();
    y = 10;
  }
  return y;
};

const Intervention = (
  doc: jsPDF,
  form: IInterventionFormData,
  alarms: IAlarm[],
  severities: ISeverity[],
  interventionTypes: IInterventionType[],
  causes: ICause[],
  otherMeans: IOtherMean[],
  actionsTaken: IAction[],
  commonLocations: ICommonLocation[],
) => {
  let y = 0;
  setupFonts(doc);
  y = header(doc, y);
  y = time(doc, form, y);
  y = crew(doc, form, y);
  y = AlarmedBy(doc, form, alarms, y);
  y = Severity(doc, form, severities, y);
  y = interventionType(doc, form, interventionTypes, y);
  y = rescued(doc, form, y);
  y = OtherMeans(doc, form, otherMeans, y);
  y = addPage(doc, y);
  y = Cause(doc, form, causes, y);
  y = addPage(doc, y);
  y = ActionTaken(doc, form, actionsTaken, y);
  y = addPage(doc, y);
  y = Location(doc, form, commonLocations, y);
  y = Destination(doc, form, commonLocations, y);
  y = Remarks(doc, form, y);
};
export default Intervention;
