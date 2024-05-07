import jsPDF from "jspdf";
import { TEXT_FONT, TITLE } from "./constants";
import { IInterventionFormData } from "../../reports/intervention/types";

/**
 *  Setup the fonts for the pdfs
 * @param doc  - The jsPDF document
 * @param form - The form data
 * @param startingY - The starting Y position
 * @returns The new Y position
 */
const crewComponent = (doc: jsPDF, form: IInterventionFormData, startingY:number): number => {
    TITLE(doc);
    doc.text("Équipage:", 20,  10 + startingY);
    TEXT_FONT(doc);
    doc.text(`Pilote: ${form.pilote.map((p) => p.name).join(", ")}`, 20, 20 + startingY);
    doc.text(`Equipiers: ${form.crew.map((p) => p.name).join(", ")}`, 20, 30 + startingY);
    return startingY + 30;
  };

export default crewComponent;