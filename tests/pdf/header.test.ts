import { jsPDF } from "jspdf";
import { describe, expect, it, beforeEach, jest } from "@jest/globals";
import header from "../../renderer/components/generation/pdf/header";
jest.mock("jspdf", () => ({
  jsPDF: jest.fn().mockImplementation(() => ({
    addImage: jest.fn(),
    text: jest.fn(),
    setFont: jest.fn(),
    setFontSize: jest.fn(),
    setTextColor: jest.fn(),
    getFont: jest.fn(() => ({ fontName: '', fontStyle: '' })),
  })),
}));

jest.mock("../../../public/images/logo", () => "mockedLogoPath", { virtual: true });

describe("Header Functionality", () => {
  let doc;
  let startingY = 10;

  beforeEach(() => {
    doc = new jsPDF();
  });

  it("should add a header with a logo and titles to the document", () => {
    const newY = header(doc, startingY);

    expect(doc.addImage).toHaveBeenCalledWith(expect.any(String), "PNG", 20, 10, 20, 20);
    expect(doc.text).toHaveBeenCalledWith("SISL-SECTION VILLENEUVE", 105, startingY + 20, { align: "center" });
    expect(doc.text).toHaveBeenCalledWith("Rapport d'intervention", 105, startingY + 30, { align: "center" });
    expect(newY).toBe(startingY + 30);

    expect(doc.setFont).toHaveBeenCalledTimes(3); 
    expect(doc.setFontSize).toHaveBeenCalledTimes(3); 
    expect(doc.setTextColor).toHaveBeenCalledTimes(3);
  });
});
