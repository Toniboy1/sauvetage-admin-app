import jsPDF from "jspdf";
import logo from "../../../public/images/logo";
import { HEADER_TITLE, SUBTITLE_FONT, TEXT_FONT } from "./constants";
/**
 *  Setup the fonts for the pdfs
 * @param doc  - The jsPDF document
 * @param startingY - The starting Y position
 * @returns The new Y position
 */
const header = (doc: jsPDF, startingY: number): number => {
  doc.addImage(logo, "PNG", 20, 10, 20, 20);
  HEADER_TITLE(doc);
  doc.text("SISL-SECTION VILLENEUVE", 105, startingY + 20, { align: "center" });
  SUBTITLE_FONT(doc);
  doc.text("Rapport d'intervention", 105, startingY + 30, { align: "center" });
  TEXT_FONT(doc);
  return startingY + 30;
};

export default header;
