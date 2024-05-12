import { jsPDF } from "jspdf";
import { describe, expect, it, beforeEach, jest } from "@jest/globals";
import Destination from "../../renderer/components/generation/pdf/destination";
import { IInterventionFormData } from "../../renderer/components/reports/intervention/types";
import dayjs from "dayjs";

jest.mock("jspdf", () => ({
  jsPDF: jest.fn().mockImplementation(() => ({
    text: jest.fn(),
    addField: jest.fn(),
    rect: jest.fn(),
    setFont: jest.fn(),
    setFontSize: jest.fn(),
    setTextColor: jest.fn(),
    getFont: jest.fn(() => ({ fontName: '', fontStyle: '' })),
  })),
  AcroFormCheckBox: jest.fn().mockImplementation(() => ({
    fieldName: '',
    value: '',
  })),
}));

describe("Destination Functionality", () => {
  let doc;
  const form:IInterventionFormData = {
      interventionDestination: [
          { id: 1, name: "Location 1" },
          { id: 2, name: "Location 2" } // Assuming interventionDestination is correctly structured
      ],
      startedAt: dayjs(),
      endedAt:  dayjs(),
      date:  dayjs(),
      pilote: [],
      crew: [],
      alarmedBy: [],
      severity: [],
      inteverntionType: [],
      otherMeans: [],
      causes: [],
      actionsTaken: [],
      interventionLocation: [],
      remark: "",
      rescued: 0,
      medicalized: 0,
      deceased: 0,
      eCoordinate: "",
      nCoordinate: "",
      boatRegistration: ""
  };
  const options = [
    { id: 1, name: "Location 1" },
    { id: 2, name: "Location 2" },
    { id: 3, name: "Location 3" },
  ];
  let startingY = 10;

  beforeEach(() => {
    doc = new jsPDF();
  });

  it("should add elements to the document based on the destination options", () => {
    const newY = Destination(doc, form, options, startingY);

    expect(doc.text).toHaveBeenCalledTimes(6);
    expect(doc.addField).toHaveBeenCalledTimes(3);
    expect(doc.rect).toHaveBeenCalledTimes(3);
    expect(newY).toBeGreaterThan(startingY);

    expect(doc.text).toHaveBeenCalledWith("Ramené à/au:", 20, startingY + 10);
  });
});
