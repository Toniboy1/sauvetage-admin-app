import jsPDF from "jspdf";
import { IInterventionFormData } from "../../reports/intervention/types";
import { PADDING_BOTTOM, TEXT_FONT, TITLE_SPACING } from "./constants";

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
  doc.text(`Heure de fin: ${form.endedAt.format("HH:mm")}`, 90, startingY + 15);
  return startingY + 15 + PADDING_BOTTOM;
};

export default time;
