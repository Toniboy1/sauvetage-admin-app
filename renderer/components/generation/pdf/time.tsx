import jsPDF from "jspdf";
import { TEXT_FONT } from "./constants";
import { IInterventionFormData } from "../../reports/intervention/types";

const time = (doc: jsPDF, form: IInterventionFormData) => {
    TEXT_FONT(doc);
    doc.setFontSize(12);
    doc.text(`Date: ${form.date.format("DD-MM-YYYY")}`, 20, 50);
    doc.text(`Heure alarme: ${form.startedAt.format("HH:mm")}`, 90, 50);
    doc.text(`Heure de fin: ${form.endedAt.format("HH:mm")}`, 90, 60);
  };

export default time;