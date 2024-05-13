import jsPDF, { AcroFormCheckBox } from "jspdf";
import { ICommonLocation } from "../../location/types";
import { IInterventionFormData } from "../../reports/intervention/types";
import {
  CHECKBOX_SPACING,
  INTERLINE_COMPONENT_LOOP,
  PADDING_BOTTOM,
  TEXT_FONT_REDUCED,
  TEXT_SPACING,
  TITLE,
  TITLE_SPACING,
} from "./constants";

/**
 * Setup the fonts for the PDFs.
 * @param doc - The jsPDF document
 * @param form - The form data
 * @param options - The commonlocations options
 * @param startingY - The starting Y position
 * @returns The new Y position
 */
const Destination = (
  doc: jsPDF,
  form: IInterventionFormData,
  options: ICommonLocation[],
  startingY: number,
): number => {
  const rows = Math.ceil(options.length / 3);
  TITLE(doc);
  doc.text("Ramené à/au:", 20, startingY + TITLE_SPACING);
  TEXT_FONT_REDUCED(doc);
  let count = 0;
  let x = 0;
  options.forEach((p, index) => {
    count++;
    let box = new AcroFormCheckBox();
    box.fieldName = `Check${index}`;
    box.value = "Yes";
    doc.addField(box);
    doc.rect(
      20 + x,
      startingY + CHECKBOX_SPACING + (count % rows) * INTERLINE_COMPONENT_LOOP,
      5,
      5,
    );
    if (form.interventionDestination.find((a) => a.id === p.id)) {
      doc.text(
        "X",
        21 + x,
        startingY + TEXT_SPACING + (count % rows) * INTERLINE_COMPONENT_LOOP,
      );
    }
    doc.text(
      ` ${p.name}`,
      25 + x,
      startingY + TEXT_SPACING + (count % rows) * INTERLINE_COMPONENT_LOOP,
    );
    if (count % rows === 0) {
      x += 75;
    }
  });
  return startingY + PADDING_BOTTOM + rows * INTERLINE_COMPONENT_LOOP;
};

export default Destination;
