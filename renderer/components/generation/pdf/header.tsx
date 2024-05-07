import jsPDF from "jspdf";
import { HEADER_TITLE, SUBTITLE_FONT, TEXT_FONT } from "./constants";

/**
 *  Setup the fonts for the pdfs
 * @param doc  - The jsPDF document
 */
const header = (doc: jsPDF) => {
    HEADER_TITLE(doc);
    doc.text("SISL-SECTION VILLENEUVE", 105, 20, { align: "center" });
    SUBTITLE_FONT(doc);
    doc.text("Rapport d'intervention", 105, 30, { align: "center" });
    TEXT_FONT(doc);
  };

export default header;