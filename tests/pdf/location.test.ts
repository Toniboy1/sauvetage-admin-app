import { jsPDF } from "jspdf";
import { describe, expect, it, beforeEach, jest } from "@jest/globals";
import Location from "../../renderer/components/generation/pdf/location";
import { IInterventionFormData } from "../../renderer/components/reports/intervention/types";
import dayjs from "dayjs";

jest.mock("jspdf", () => ({
  jsPDF: jest.fn().mockImplementation(() => ({
    addField: jest.fn(),
    text: jest.fn(),
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

describe("Location Functionality", () => {
  let doc;
  const form:IInterventionFormData = {
      nCoordinate: "N 123.45",
      eCoordinate: "E 67.89",
      interventionLocation: [
          { id: 1, name: "Location 1" },
          { id: 2, name: "Location 2" }
      ],
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
      actionsTaken: [],
      interventionDestination: [],
      remark: "",
      rescued: 0,
      medicalized: 0,
      deceased: 0,
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

  it("should add location details and checkboxes to the document", () => {
    const newY = Location(doc, form, options, startingY);

    expect(doc.addField).toHaveBeenCalledTimes(options.length);
    expect(doc.text).toHaveBeenCalledTimes(8); 
    expect(doc.rect).toHaveBeenCalledTimes(options.length);
    expect(newY).toBeGreaterThan(startingY + 25 + (options.length % 3) * 10);

    expect(doc.text).toHaveBeenCalledWith("Localisation:", 20, startingY + 10);
    expect(doc.text).toHaveBeenCalledWith(`Coordonnées: ${form.nCoordinate}`, 20, startingY + 20);
    expect(doc.text).toHaveBeenCalledWith(form.eCoordinate, 90, startingY + 20);
  });
});
