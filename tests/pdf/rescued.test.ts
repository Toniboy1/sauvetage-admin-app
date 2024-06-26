import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import {
  INTERLINE_COMPONENT_LOOP,
  PADDING_BOTTOM,
  TITLE_SPACING,
} from "../../renderer/components/generation/pdf/constants";
import rescued from "../../renderer/components/generation/pdf/rescued";
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

describe("Rescued Functionality", () => {
  let doc;
  const form: IInterventionFormData = {
    rescued: 15,
    medicalized: 5,
    deceased: 1,
    boatRegistration: "AB1234C",
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
    weathers: [],
    winds: [],
    lakeStates: [],
    remark: "",
    eCoordinate: "",
    nCoordinate: "",
  };
  let startingY = 10;

  beforeEach(() => {
    doc = new jsPDF();
  });

  it("should add rescue statistics to the document", () => {
    const newY = rescued(doc, form, startingY);

    expect(doc.text).toHaveBeenCalledTimes(4);
    expect(doc.text).toHaveBeenCalledWith(
      `Nombre de personne assistées: ${form.rescued}`,
      20,
      startingY + TITLE_SPACING,
    );
    expect(doc.text).toHaveBeenCalledWith(
      `Nombre de personnes médicalisées: ${form.medicalized}`,
      20,
      startingY + TITLE_SPACING + INTERLINE_COMPONENT_LOOP,
    );
    expect(doc.text).toHaveBeenCalledWith(
      `Nombre de oersonne décédées: ${form.deceased}`,
      100,
      startingY + TITLE_SPACING,
    );
    expect(doc.text).toHaveBeenCalledWith(
      `Immatriculation du bateau: ${form.boatRegistration}`,
      100,
      startingY + TITLE_SPACING + INTERLINE_COMPONENT_LOOP,
    );
    expect(newY).toBe(
      startingY + TITLE_SPACING + INTERLINE_COMPONENT_LOOP + PADDING_BOTTOM,
    );
  });
});
