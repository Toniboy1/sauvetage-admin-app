import jsPDF from "jspdf";

const TEXT_FONT = (doc: jsPDF) => {
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.setFont("calibri", "normal");
};

const TEXT_FONT_REDUCED = (doc: jsPDF) => {
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont("calibri", "normal");
};
const SUBTITLE_FONT = (doc: jsPDF) => {
  doc.setFontSize(25);
  doc.setTextColor(255, 0, 0);
  doc.setFont("calibri", "light");
};
const TITLE = (doc: jsPDF) => {
  doc.setFontSize(15);
  doc.setFont("calibri", "bold");
  doc.setTextColor(68, 114, 196);
};
const HEADER_TITLE = (doc: jsPDF) => {
  doc.setFontSize(28);
  doc.setFont("calibri", "light");
  doc.setTextColor(0, 0, 0);
};

const PADDING_BOTTOM = 5;
const INTERLINE_COMPONENT_LOOP = 10;
const TITLE_SPACING = 5;
const CHECKBOX_SPACING = 8;
const TEXT_SPACING = 12;

export {
  CHECKBOX_SPACING,
  HEADER_TITLE,
  INTERLINE_COMPONENT_LOOP,
  PADDING_BOTTOM,
  SUBTITLE_FONT,
  TEXT_FONT,
  TEXT_FONT_REDUCED,
  TEXT_SPACING,
  TITLE,
  TITLE_SPACING,
};
