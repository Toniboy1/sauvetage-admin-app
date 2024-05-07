import jsPDF from "jspdf";

const TEXT_FONT = (doc: jsPDF) => {
    doc.setTextColor(0, 0, 0);
    doc.setFont("calibri", "normal");
  };
  const SUBTITLE_FONT = (doc: jsPDF) => {
    doc.setFontSize(25);
    //red
    doc.setTextColor(255, 0, 0);
    doc.setFont("calibri", "light");
  };
  const TITLE = (doc: jsPDF) => {
    doc.setFontSize(15);
    doc.setFont("calibri", "bold");
    doc.setTextColor(0, 0, 255);
  };
  const HEADER_TITLE = (doc: jsPDF) => {
    doc.setFontSize(28);
    doc.setFont("calibri", "light");
    doc.setTextColor(0, 0, 0);
  };

export { TEXT_FONT, SUBTITLE_FONT, TITLE, HEADER_TITLE };