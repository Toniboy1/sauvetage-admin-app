import jsPDF from "jspdf";
import { TEXT_FONT, TITLE } from "./constants";
import { IInterventionFormData } from "../../reports/intervention/types";

/**
 *  Setup the fonts for the pdfs
 * @param doc  - The jsPDF document
 * @param form - The form data
 */
const crewComponent = (doc: jsPDF, form: IInterventionFormData) => {
    TITLE(doc);
    doc.text("Équipage:", 20, 90);
    TEXT_FONT(doc);
    doc.text(`Pilote: ${form.pilote.map((p) => p.name).join(", ")}`, 20, 100);
    form.crew.forEach((p, index) => {
      doc.text(`Equipier ${index + 1}: ${p.name}`, 20, 110 + index * 10);
    });
  };

export default crewComponent;