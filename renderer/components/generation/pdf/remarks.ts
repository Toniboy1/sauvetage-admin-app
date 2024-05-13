import jsPDF from "jspdf";
import { IInterventionFormData } from "../../reports/intervention/types";
import { TEXT_FONT, TITLE } from "./constants";

const Remarks = (
  doc: jsPDF,
  form: IInterventionFormData,
  startingY: number,
): number => {
  TITLE(doc);
  doc.text("Remarques:", 20, 10 + startingY);
  TEXT_FONT(doc);
  let text = form.remark;
  let textLength = text.length;
  let textWidth = doc.getStringUnitWidth(text) * 12;
  let textWidthMax = 580;
  let textLines = Math.ceil(textWidth / textWidthMax);
  let textPerLine = Math.ceil(textLength / textLines);
  let textArray = [];
  for (let i = 0; i < textLength; i += textPerLine) {
    textArray.push(text.substring(i, i + textPerLine));
  }
  let y = 20;
  textArray.forEach((line) => {
    doc.text(line, 20, y + startingY);
    y += 10;
  });
  return startingY + 20;
};

export default Remarks;
