import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import Cause from "../../renderer/components/generation/pdf/cause";
import { TITLE_SPACING } from "../../renderer/components/generation/pdf/constants";
import { IInterventionFormData } from "../../renderer/components/reports/intervention/types";

jest.mock("jspdf", () => ({
  jsPDF: jest.fn().mockImplementation(() => ({
    text: jest.fn(),
    addField: jest.fn(),
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

describe("Cause Functionality", () => {
  let doc;
  const form: IInterventionFormData = {
    causes: [{ id: 1, name: "Cause 1" }],
    startedAt: dayjs(),
    endedAt: dayjs(),
    date: dayjs(),
    pilote: [],
    crew: [],
    alarmedBy: [],
    severity: [],
    inteverntionType: [],
    otherMeans: [],
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
    { id: 1, name: "Cause 1" },
    { id: 2, name: "Cause 2" },
    { id: 3, name: "Cause 3" },
  ];
  let startingY = 10;

  beforeEach(() => {
    doc = new jsPDF();
  });

  it("should add elements to the document based on the causes", () => {
    const newY = Cause(doc, form, options, startingY);
    expect(doc.text).toHaveBeenCalledTimes(5);
    expect(doc.addField).toHaveBeenCalledTimes(3);
    expect(doc.rect).toHaveBeenCalledTimes(3);
    expect(newY).toBeGreaterThan(startingY);
    expect(doc.text).toHaveBeenCalledWith(
      "Cause:",
      20,
      startingY + TITLE_SPACING,
    );
  });
});
