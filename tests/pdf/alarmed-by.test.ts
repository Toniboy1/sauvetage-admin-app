import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import AlarmedBy from "../../renderer/components/generation/pdf/alarmed";
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

describe("AlarmedBy Functionality", () => {
  let doc;
  const form: IInterventionFormData = {
    alarmedBy: [{ id: 1, name: "Alarm 1" }],
    startedAt: dayjs(),
    endedAt: dayjs(),
    date: dayjs(),
    pilote: [],
    crew: [],
    severity: [],
    inteverntionType: [],
    otherMeans: [],
    causes: [],
    actionsTaken: [],
    interventionLocation: [],
    interventionDestination: [],
    weathers: [],
    winds: [],
    lakeStates: [],
    remark: "",
    rescued: 0,
    medicalized: 0,
    deceased: 0,
    eCoordinate: "",
    nCoordinate: "",
    boatRegistration: "",
  };
  const options = [
    { id: 1, name: "Alarm 1" },
    { id: 2, name: "Alarm 2" },
    { id: 3, name: "Alarm 3" },
  ];
  let startingY = 10;

  beforeEach(() => {
    doc = new jsPDF();
  });

  it("should add elements to the document based on the alarm options", () => {
    const newY = AlarmedBy(doc, form, options, startingY);

    expect(doc.text).toHaveBeenCalledTimes(5);
    expect(doc.addField).toHaveBeenCalledTimes(options.length);
    expect(doc.rect).toHaveBeenCalledTimes(options.length);
    expect(newY).toBeGreaterThan(startingY);

    expect(doc.text).toHaveBeenCalledWith(
      "Alarmé par:",
      20,
      startingY + TITLE_SPACING,
    );
  });
});
