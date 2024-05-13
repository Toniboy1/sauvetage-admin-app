import jsPDF from "jspdf";
import { IInterventionFormData } from "../../reports/intervention/types";
import {
  INTERLINE_COMPONENT_LOOP,
  PADDING_BOTTOM,
  TEXT_FONT,
  TITLE,
  TITLE_SPACING,
} from "./constants";

/**
 *  Setup the fonts for the pdfs
 * @param doc  - The jsPDF document
 * @param form - The form data
 * @param startingY - The starting Y position
 * @returns The new Y position
 */
const crewComponent = (
  doc: jsPDF,
  form: IInterventionFormData,
  startingY: number,
): number => {
  TITLE(doc);
  doc.text("Équipage:", 20, startingY);
  TEXT_FONT(doc);
  doc.text(
    `Pilote: ${form.pilote.map((p) => p.name).join(", ")}`,
    20,
    startingY + TITLE_SPACING,
  );
  doc.text(
    `Equipiers: ${form.crew.map((p) => p.name).join(", ")}`,
    20,
    startingY + TITLE_SPACING + INTERLINE_COMPONENT_LOOP,
  );
  return startingY + TITLE_SPACING + INTERLINE_COMPONENT_LOOP + PADDING_BOTTOM;
};

export default crewComponent;
