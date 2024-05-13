import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import { TITLE_SPACING } from "../../renderer/components/generation/pdf/constants";
import Severity from "../../renderer/components/generation/pdf/severity";
import { IInterventionFormData } from "../../renderer/components/reports/intervention/types";

jest.mock("jspdf", () => ({
  jsPDF: jest.fn().mockImplementation(() => ({
    addField: jest.fn(),
    text: jest.fn(),
    rect: jest.fn(),
    setFont: jest.fn(),
    setFontSize: jest.fn(),
    setTextColor: jest.fn(),
    getFont: jest.fn(() => ({ fontName: "", fontStyle: "" })),
  })),
  AcroFormCheckBox: jest.fn().mockImplementation(() => ({
    fieldName: "",
    value: "",
  })),
}));

describe("Severity Functionality", () => {
  let doc;
  const form: IInterventionFormData = {
    severity: [{ id: 1, name: "High" }],
    startedAt: dayjs(),
    endedAt: dayjs(),
    date: dayjs(),
    pilote: [],
    crew: [],
    alarmedBy: [],
    inteverntionType: [],
    otherMeans: [],
    causes: [],
    actionsTaken: [],
    interventionLocation: [],
    interventionDestination: [],
    remark: "",
    rescued: 0,
    medicalized: 0,
    deceased: 0,
    eCoordinate: "",
    nCoordinate: "",
    boatRegistration: "",
  };
  const options = [
    { id: 1, name: "High" },
    { id: 2, name: "Medium" },
    { id: 3, name: "Low" },
  ];
  let startingY = 10;

  beforeEach(() => {
    doc = new jsPDF();
  });

  it("should add severity level checkboxes to the document", () => {
    const newY = Severity(doc, form, options, startingY);

    expect(doc.addField).toHaveBeenCalledTimes(options.length);
    expect(doc.text).toHaveBeenCalledTimes(options.length * 2 - 1);
    expect(doc.rect).toHaveBeenCalledTimes(options.length);
    expect(newY).toBeGreaterThan(startingY);

    expect(doc.text).toHaveBeenCalledWith(
      "Gravité de l'intervention:",
      20,
      startingY + TITLE_SPACING,
    );
  });
});
