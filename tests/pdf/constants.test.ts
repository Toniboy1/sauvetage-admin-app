import jsPDF from "jspdf";
import { describe, expect, it, beforeEach } from "@jest/globals";
import {
  TEXT_FONT,
  SUBTITLE_FONT,
  TITLE,
  HEADER_TITLE,
} from "../../renderer/components/generation/pdf/constants";
import setupFonts from "../../renderer/components/generation/pdf/fonts";

describe("constants pdf", () => {
  let doc;

  beforeEach(() => {
    doc = new jsPDF();
    setupFonts(doc);
  });

  it("TEXT_FONT should set the correct font settings for text", () => {
    TEXT_FONT(doc);
    const { fontName, fontStyle } = doc.getFont();
    expect({ fontName, fontStyle }).toEqual({
      fontName: "calibri",
      fontStyle: "normal",
    });
    expect(doc.getFontSize()).toBe(12);
    expect(doc.getTextColor()).toEqual("#000000");
  });

  it("SUBTITLE_FONT should set the correct font settings for subtitles", () => {
    SUBTITLE_FONT(doc);
    const { fontName, fontStyle } = doc.getFont();
    expect({ fontName, fontStyle }).toEqual({
      fontName: "calibri",
      fontStyle: "light",
    });
    expect(doc.getFontSize()).toBe(25);
    expect(doc.getTextColor()).toEqual("#ff0000");
  });

  it("TITLE should set the correct font settings for titles", () => {
    TITLE(doc);
    const { fontName, fontStyle } = doc.getFont();
    expect({ fontName, fontStyle }).toEqual({
      fontName: "calibri",
      fontStyle: "bold",
    });
    expect(doc.getFontSize()).toBe(15);
    expect(doc.getTextColor()).toEqual("#4471c4");
  });

  it("HEADER_TITLE should set the correct font settings for header titles", () => {
    HEADER_TITLE(doc);
    const { fontName, fontStyle } = doc.getFont();
    expect({ fontName, fontStyle }).toEqual({
      fontName: "calibri",
      fontStyle: "light",
    });
    expect(doc.getFontSize()).toBe(28);
    expect(doc.getTextColor()).toEqual("#000000");
  });
});
