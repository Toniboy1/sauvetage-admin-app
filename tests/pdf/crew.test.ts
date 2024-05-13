import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import Crew from "../../renderer/components/generation/pdf/crew";
import { IInterventionFormData } from "../../renderer/components/reports/intervention/types";
import { INTERLINE_COMPONENT_LOOP, PADDING_BOTTOM, TITLE_SPACING } from "../../renderer/components/generation/pdf/constants";
jest.mock("jspdf", () => ({
  jsPDF: jest.fn().mockImplementation(() => ({
    text: jest.fn(),
    setFont: jest.fn(),
    setFontSize: jest.fn(),
    setTextColor: jest.fn(),
    getFont: jest.fn(() => ({ fontName: "", fontStyle: "" })),
  })),
}));

describe("Crew Functionality", () => {
  let doc;
  const form: IInterventionFormData = {
    pilote: [{ id: 1, name: "John Doe" }],
    crew: [
      { id: 2, name: "Jane Doe" },
      { id: 3, name: "Jim Doe" },
    ],
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
    boatRegistration: "",
  };
  let startingY = 10;

  beforeEach(() => {
    doc = new jsPDF();
  });

  it("should add pilot and crew information to the document", () => {
    const newY = Crew(doc, form, startingY);

    expect(doc.text).toHaveBeenCalledTimes(3);
    expect(doc.text).toHaveBeenCalledWith("Équipage:", 20, startingY + TITLE_SPACING -5);
    expect(doc.text).toHaveBeenCalledWith(
      "Pilote: John Doe",
      20,
      startingY + TITLE_SPACING,
    );
    expect(doc.text).toHaveBeenCalledWith(
      "Equipiers: Jane Doe, Jim Doe",
      20,
      startingY + TITLE_SPACING + INTERLINE_COMPONENT_LOOP,
    );
    expect(newY).toBe(startingY + TITLE_SPACING + INTERLINE_COMPONENT_LOOP + PADDING_BOTTOM); // Ensure newY is calculated as expected
  });
});
