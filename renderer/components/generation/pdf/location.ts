import jsPDF, { AcroFormCheckBox } from "jspdf";
import { ICommonLocation } from "../../location/types";
import { IInterventionFormData } from "../../reports/intervention/types";
import { TEXT_FONT, TITLE } from "./constants";

/**
 * Setup the fonts for the PDFs.
 * @param doc - The jsPDF document
 * @param form - The form data
 * @param options - The location options
 * @param startingY - The starting Y position
 * @returns The new Y position
 */
const Location = (
  doc: jsPDF,
  form: IInterventionFormData,
  options: ICommonLocation[],
  startingY: number,
): number => {
  const rows = Math.ceil(options.length / 3);
  TITLE(doc);
  doc.text("Localisation:", 20, startingY + 10);
  TEXT_FONT(doc);
  doc.text(`Coordonnées: ${form.nCoordinate}`, 20, startingY + 20);
  doc.text(`${form.eCoordinate}`, 90, startingY + 20);
  let count = 0;
  let x = 0;
  options.forEach((p, index) => {
    count++;
    let box = new AcroFormCheckBox();
    box.fieldName = `Check${index}`;
    box.value = "Yes";
    doc.addField(box);
    doc.rect(20 + x, startingY + 25 + (count % rows) * 10, 5, 5);
    if (form.interventionLocation.find((a) => a.id === p.id)) {
      doc.text("X", 21 + x, startingY + 29 + (count % rows) * 10);
    }
    doc.text(` ${p.name}`, 25 + x, startingY + 29 + (count % rows) * 10);
    if (count % rows === 0) {
      x += 80;
    }
  });
  return startingY + 29 + (count % rows) * 10;
};

export default Location;
