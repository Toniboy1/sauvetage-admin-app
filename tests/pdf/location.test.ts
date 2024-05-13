import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import Location from "../../renderer/components/generation/pdf/location";
import { IInterventionFormData } from "../../renderer/components/reports/intervention/types";
import { INTERLINE_COMPONENT_LOOP, PADDING_BOTTOM, TITLE_SPACING } from "../../renderer/components/generation/pdf/constants";

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

describe("Location Functionality", () => {
  let doc;
  const form: IInterventionFormData = {
    nCoordinate: "N 123.45",
    eCoordinate: "E 67.89",
    interventionLocation: [
      { id: 1, name: "Location 1" },
      { id: 2, name: "Location 2" },
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
    boatRegistration: "",
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
    expect(doc.text).toHaveBeenCalledTimes(options.length * 2 + 1);
    expect(doc.rect).toHaveBeenCalledTimes(options.length);
    expect(newY).toBeGreaterThan(startingY + PADDING_BOTTOM + 0 * INTERLINE_COMPONENT_LOOP);

    expect(doc.text).toHaveBeenCalledWith("Localisation:", 20, startingY + TITLE_SPACING);
    expect(doc.text).toHaveBeenCalledWith(
      `Coordonnées: ${form.nCoordinate}°N ${form.eCoordinate}°E`, 55, startingY + TITLE_SPACING
    );
  });
});
