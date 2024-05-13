import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import time from "../../renderer/components/generation/pdf/time";
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

describe("Time Functionality", () => {
  let doc;
  const form: IInterventionFormData = {
    date: dayjs("2023-05-12"),
    startedAt: dayjs("2023-05-12T08:00"),
    endedAt: dayjs("2023-05-12T10:00"),
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

  it("should add date and time details to the document", () => {
    const newY = time(doc, form, startingY);

    expect(doc.text).toHaveBeenCalledTimes(3);
    expect(doc.text).toHaveBeenCalledWith(
      `Date: ${form.date.format("DD-MM-YYYY")}`,
      20,
      startingY + 10,
    );
    expect(doc.text).toHaveBeenCalledWith(
      `Heure alarme: ${form.startedAt.format("HH:mm")}`,
      90,
      startingY + 10,
    );
    expect(doc.text).toHaveBeenCalledWith(
      `Heure de fin: ${form.endedAt.format("HH:mm")}`,
      90,
      startingY + 20,
    );
    expect(newY).toBe(startingY + 20);
  });
});
