import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import interventionType from "../../renderer/components/generation/pdf/interventionType";
import { IInterventionFormData } from "../../renderer/components/reports/intervention/types";
import { TITLE_SPACING } from "../../renderer/components/generation/pdf/constants";
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

describe("InterventionType Functionality", () => {
  let doc;
  const form: IInterventionFormData = {
    inteverntionType: [
      { id: 1, name: "Type 1" },
      { id: 2, name: "Type 2" }, // Assuming these are in the form data
    ],
    startedAt: dayjs(),
    endedAt: dayjs(),
    date: dayjs(),
    pilote: [],
    crew: [],
    alarmedBy: [],
    severity: [],
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
    { id: 1, name: "Type 1" },
    { id: 2, name: "Type 2" },
    { id: 3, name: "Type 3" },
    { id: 4, name: "Type 4" },
  ];
  let startingY = 10;

  beforeEach(() => {
    doc = new jsPDF();
  });

  it("should add elements to the document based on intervention type options", () => {
    const newY = interventionType(doc, form, options, startingY);

    expect(doc.addField).toHaveBeenCalledTimes(4);
    expect(doc.text).toHaveBeenCalledTimes(7);
    expect(doc.rect).toHaveBeenCalledTimes(4);
    expect(newY).toBeGreaterThan(startingY);

    expect(doc.text).toHaveBeenCalledWith(
      "Type d'intervention:",
      20,
      startingY + TITLE_SPACING,
    );
  });
});
