import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import Remarks from "../../renderer/components/generation/pdf/remarks";
import { IInterventionFormData } from "../../renderer/components/reports/intervention/types";

jest.mock("jspdf", () => ({
  jsPDF: jest.fn().mockImplementation(() => ({
    text: jest.fn(),
    setFont: jest.fn(),
    setFontSize: jest.fn(),
    setTextColor: jest.fn(),
    getFont: jest.fn(() => ({ fontName: "", fontStyle: "" })),
  })),
}));

describe("Remarks Functionality", () => {
  let doc;
  const form: IInterventionFormData = {
    remark: "This is a test remark for the intervention.",
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
    interventionLocation: [],
    interventionDestination: [],
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

  it("should add a remarks section to the document", () => {
    const newY = Remarks(doc, form, startingY);

    expect(doc.text).toHaveBeenCalledTimes(2);
    expect(doc.text).toHaveBeenCalledWith("Remarques:", 20, 10 + startingY);
    expect(doc.text).toHaveBeenCalledWith(form.remark, 20, startingY + 20);
    expect(newY).toBe(startingY + 20); // Ensure newY is calculated as expected
  });
});
