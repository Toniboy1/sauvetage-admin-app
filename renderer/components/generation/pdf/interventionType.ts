import jsPDF, { AcroFormCheckBox } from "jspdf";
import { IInterventionType } from "../../interventions/types";
import { IInterventionFormData } from "../../reports/intervention/types";
import { TEXT_FONT, TITLE } from "./constants";

/**
 * Setup the fonts for the PDFs.
 * @param doc - The jsPDF document
 * @param form - The form data
 * @param options - The intervention types options
 * @param startingY - The starting Y position
 * @returns The new Y position
 */
const interventionType = (
  doc: jsPDF,
  form: IInterventionFormData,
  options: IInterventionType[],
  startingY: number,
): number => {
  const rows = Math.ceil(options.length / 4);
  TITLE(doc);
  doc.text("Type d'intervention:", 20, startingY + 10);
  TEXT_FONT(doc);
  let count = 0;
  let x = 0;
  options.forEach((p, index) => {
    count++;
    let box = new AcroFormCheckBox();
    box.fieldName = `Check${index}`;
    box.value = "Yes";
    doc.addField(box);
    doc.rect(20 + x, startingY + 15 + (count % rows) * 10, 5, 5);
    if (form.inteverntionType.find((a) => a.id === p.id)) {
      doc.text("X", 21 + x, startingY + 19 + (count % rows) * 10);
    }
    doc.text(` ${p.name}`, 25 + x, startingY + 19 + (count % rows) * 10);
    if (count % rows === 0) {
      x += 40;
    }
  });
  return startingY + 20 + (count % rows) * 10;
};

export default interventionType;
