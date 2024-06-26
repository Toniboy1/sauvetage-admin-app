import jsPDF from "jspdf";
import CalibriBold from "../../../public/fonts/calibri-bold";
import CalibriItalic from "../../../public/fonts/calibri-italic";
import CalibriLight from "../../../public/fonts/calibri-light";
import CalibriRegular from "../../../public/fonts/calibri-regular";
/**
 * Setup the fonts for the pdfs
 * @param doc  - The jsPDF document
 */
const setupFonts = (doc: jsPDF) => {
  doc.addFileToVFS("calibri.ttf", CalibriRegular);
  doc.addFont("calibri.ttf", "calibri", "normal");
  doc.addFileToVFS("calibri-bold.ttf", CalibriBold);
  doc.addFont("calibri-bold.ttf", "calibri", "bold");
  doc.addFileToVFS("calibri-light.ttf", CalibriLight);
  doc.addFont("calibri-light.ttf", "calibri", "light");
  doc.addFileToVFS("calibri-italic.ttf", CalibriItalic);
  doc.addFont("calibri-italic.ttf", "calibri", "italic");
};

export default setupFonts;
