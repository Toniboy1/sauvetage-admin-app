import { jsPDF } from "jspdf";
import { describe, expect, it, beforeEach, jest } from "@jest/globals";
import Crew from "../../renderer/components/generation/pdf/crew";
import dayjs from "dayjs";
import { IInterventionFormData } from "../../renderer/components/reports/intervention/types";
jest.mock("jspdf", () => ({
  jsPDF: jest.fn().mockImplementation(() => ({
    text: jest.fn(),
    setFont: jest.fn(),
    setFontSize: jest.fn(),
    setTextColor: jest.fn(),
    getFont: jest.fn(() => ({ fontName: '', fontStyle: '' })),
  })),
}));

describe("Crew Functionality", () => {
  let doc;
  const form:IInterventionFormData = {
      pilote: [{ id: 1, name: "John Doe" }],
      crew: [{ id: 2, name: "Jane Doe" }, { id: 3, name: "Jim Doe" }],
      startedAt: dayjs(),
      endedAt: dayjs(),
      date: dayjs(),
      alarmedBy: [],
      severity: [],
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
      boatRegistration: ""
  };
  let startingY = 10;

  beforeEach(() => {
    doc = new jsPDF();
  });

  it("should add pilot and crew information to the document", () => {
    const newY = Crew(doc, form, startingY);

    expect(doc.text).toHaveBeenCalledTimes(3);
    expect(doc.text).toHaveBeenCalledWith("Équipage:", 20, 10 + startingY);
    expect(doc.text).toHaveBeenCalledWith("Pilote: John Doe", 20, 20 + startingY);
    expect(doc.text).toHaveBeenCalledWith("Equipiers: Jane Doe, Jim Doe", 20, 30 + startingY);
    expect(newY).toBe(startingY + 30); // Ensure newY is calculated as expected
  });
});
