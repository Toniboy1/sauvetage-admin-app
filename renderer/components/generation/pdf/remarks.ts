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
  doc.text(form.remark, 20, startingY + 20);
  return startingY + 20;
};

export default Remarks;
