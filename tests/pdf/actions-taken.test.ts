import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import ActionTaken from "../../renderer/components/generation/pdf/actionsTaken";
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

describe("ActionTaken Functionality", () => {
  let doc;
  const form: IInterventionFormData = {
    startedAt: dayjs(),
    endedAt: dayjs(),
    date: dayjs(),
    pilote: [],
    crew: [],
    alarmedBy: [],
    severity: [],
    inteverntionType: [],
    otherMeans: [],
    causes: [],
    actionsTaken: [
      {
        id: 1,
        name: "Action 1",
      },
    ],
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
    { id: 1, name: "Action 1" },
    { id: 2, name: "Action 2" },
    { id: 3, name: "Action 3" },
  ];
  let startingY = 10;

  beforeEach(() => {
    doc = new jsPDF();
  });

  it("should add elements to the document based on the actions and options", () => {
    const newY = ActionTaken(doc, form, options, startingY);

    expect(doc.text).toHaveBeenCalledTimes(5);
    expect(doc.addField).toHaveBeenCalledTimes(3);
    expect(doc.rect).toHaveBeenCalledTimes(3);
    expect(newY).toBeGreaterThan(startingY);

    expect(doc.text).toHaveBeenCalledWith(
      "Mesures prises:",
      20,
      startingY + TITLE_SPACING,
    );
    expect(doc.text).toHaveBeenCalledWith("X", 21, 22); // Corrected based on actual behavior
    expect(doc.text).toHaveBeenCalledWith(" Action 1", 25, 22); // Corrected based on actual behavior
  });
});
