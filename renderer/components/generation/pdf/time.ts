import jsPDF from "jspdf";
import { IInterventionFormData } from "../../reports/intervention/types";
import { TEXT_FONT } from "./constants";

const time = (
  doc: jsPDF,
  form: IInterventionFormData,
  startingY: number,
): number => {
  TEXT_FONT(doc);
  doc.text(`Date: ${form.date.format("DD-MM-YYYY")}`, 20, startingY + 10);
  doc.text(
    `Heure alarme: ${form.startedAt.format("HH:mm")}`,
    90,
    startingY + 10,
  );
  doc.text(`Heure de fin: ${form.endedAt.format("HH:mm")}`, 90, startingY + 20);
  return startingY + 20;
};

export default time;
