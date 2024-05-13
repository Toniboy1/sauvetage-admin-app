import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { jsPDF } from "jspdf";
import { addPage } from "../../renderer/components/generation/pdf/intervention";
describe("addPage Functionality", () => {
  let doc;

  beforeEach(() => {
    // Mock the addPage method of jsPDF
    doc = new jsPDF();
    doc.addPage = jest.fn();
  });

  it("should add a new page and reset y if y > 250", () => {
    let y = 251;
    y = addPage(doc, y);

    expect(doc.addPage).toHaveBeenCalledTimes(1);
    expect(y).toBe(10);
  });

  it("should not add a new page or change y if y <= 250", () => {
    let y = 250;
    y = addPage(doc, y);

    expect(doc.addPage).not.toHaveBeenCalled();
    expect(y).toBe(250);
  });
});
