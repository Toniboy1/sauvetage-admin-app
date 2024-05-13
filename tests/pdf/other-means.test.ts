import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import { TITLE_SPACING } from "../../renderer/components/generation/pdf/constants";
import OtherMeans from "../../renderer/components/generation/pdf/otherMeans";
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

describe("OtherMeans Functionality", () => {
  let doc;
  const form: IInterventionFormData = {
    otherMeans: [
      { id: 1, name: "Mean 1" },
      { id: 2, name: "Mean 2" },
    ],
    startedAt: dayjs(),
    endedAt: dayjs(),
    date: dayjs(),
    pilote: [],
    crew: [],
    alarmedBy: [],
    severity: [],
    inteverntionType: [],
    causes: [],
    actionsTaken: [],
    interventionLocation: [],
    interventionDestination: [],
    weathers: [],
    remark: "",
    rescued: 0,
    medicalized: 0,
    deceased: 0,
    eCoordinate: "",
    nCoordinate: "",
    boatRegistration: "",
  };
  const options = [
    { id: 1, name: "Mean 1" },
    { id: 2, name: "Mean 2" },
    { id: 3, name: "Mean 3" },
  ];
  let startingY = 10;

  beforeEach(() => {
    doc = new jsPDF();
  });

  it("should add elements to the document based on other means options", () => {
    const newY = OtherMeans(doc, form, options, startingY);

    expect(doc.addField).toHaveBeenCalledTimes(options.length);
    expect(doc.text).toHaveBeenCalledTimes(options.length * 2);
    expect(doc.rect).toHaveBeenCalledTimes(options.length);
    expect(newY).toBeGreaterThan(startingY);

    expect(doc.text).toHaveBeenCalledWith(
      "Autres moyens engagés:",
      20,
      startingY + TITLE_SPACING,
    );
  });
});
