import jsPDF, { AcroFormCheckBox } from "jspdf";
import { IAlarm } from "../../alarm/types";
import { IInterventionFormData } from "../../reports/intervention/types";
import {
  CHECKBOX_SPACING,
  INTERLINE_COMPONENT_LOOP,
  PADDING_BOTTOM,
  TEXT_FONT,
  TEXT_SPACING,
  TITLE,
  TITLE_SPACING,
} from "./constants";

/**
 * Setup the fonts for the PDFs.
 * @param doc - The jsPDF document
 * @param form - The form data
 * @param options - The alarm options
 * @param startingY - The starting Y position
 * @returns The new Y position
 */
const AlarmedBy = (
  doc: jsPDF,
  form: IInterventionFormData,
  options: IAlarm[],
  startingY: number,
): number => {
  const rows = Math.ceil(options.length / 3);
  TITLE(doc);
  doc.text("Alarmé par:", 20, startingY + TITLE_SPACING);
  TEXT_FONT(doc);
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
    if (form.alarmedBy.find((a) => a.id === p.id)) {
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
      x += 60;
    }
  });
  return startingY + PADDING_BOTTOM + rows * INTERLINE_COMPONENT_LOOP;
};

export default AlarmedBy;
