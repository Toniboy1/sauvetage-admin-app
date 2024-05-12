import jsPDF from "jspdf";
import header from "./header";
import time from "./time";
import crew from "./crew";
import { IInterventionFormData } from "../../reports/intervention/types";
import setupFonts from "./fonts";
import AlarmedBy from "./alarmed";
import { IAlarm } from "../../alarm/types";
import Severity from "./severity";
import { ISeverity } from "../../severities/types";
import { IInterventionType } from "../../interventions/types";
import interventionType from "./interventionType";
import rescued from "./rescued";
import { ICause } from "../../causes/types";
import Cause from "./cause";
import { IOtherMean } from "../../otherMeans/types";
import OtherMeans from "./otherMeans";
import { IAction } from "../../actions/types";
import ActionTaken from "./actionsTaken";
import Location from "./location";
import { ICommonLocation } from "../../location/types";
import Remarks from "./remarks";
import Destination from "./destination";
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
