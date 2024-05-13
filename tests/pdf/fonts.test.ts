import { beforeEach, describe, expect, it } from "@jest/globals";
import jsPDF from "jspdf";
import setupFonts from "../../renderer/components/generation/pdf/fonts";

describe("setupFonts", () => {
  let doc;

  beforeEach(() => {
    doc = new jsPDF();
  });

  it("should add the calibri font family with correct styles to the jsPDF document", () => {
    setupFonts(doc);
    const fontList = doc.getFontList();
    expect(fontList).toHaveProperty("calibri");
    expect(fontList.calibri).toEqual(
      expect.arrayContaining(["normal", "bold", "light", "italic"]),
    );
  });
});
