import { jsPDF } from "jspdf";
import { describe, expect, it, beforeEach, jest } from "@jest/globals";
import time from "../../renderer/components/generation/pdf/time";
import { IInterventionFormData } from "../../renderer/components/reports/intervention/types";
import dayjs from "dayjs";
import { IAlarm } from "../../renderer/components/alarm/types";
import { ISeverity } from "../../renderer/components/severities/types";
import { IInterventionType } from "../../renderer/components/interventions/types";
import { ICause } from "../../renderer/components/causes/types";
import { IOtherMean } from "../../renderer/components/otherMeans/types";
import { IAction } from "../../renderer/components/actions/types";
import { ICommonLocation } from "../../renderer/components/location/types";
import Intervention from "../../renderer/components/generation/pdf/intervention";
import header from "../../renderer/components/generation/pdf/header";
import crew from "../../renderer/components/generation/pdf/crew";
import AlarmedBy from "../../renderer/components/generation/pdf/alarmed";
import ActionTaken from "../../renderer/components/generation/pdf/actionsTaken";
import Cause from "../../renderer/components/generation/pdf/cause";
import Destination from "../../renderer/components/generation/pdf/destination";
import InterventionType from "../../renderer/components/generation/pdf/interventionType";
import Location from "../../renderer/components/generation/pdf/location";
import OtherMeans from "../../renderer/components/generation/pdf/otherMeans";
import Remarks from "../../renderer/components/generation/pdf/remarks";
import Rescued from "../../renderer/components/generation/pdf/rescued";
import Severity from "../../renderer/components/generation/pdf/severity";
import Fonts from "../../renderer/components/generation/pdf/fonts";
jest.mock("jspdf", () => ({
  jsPDF: jest.fn().mockImplementation(() => ({
    addPage: jest.fn(),
  })),
}));

jest.mock("../../renderer/components/generation/pdf/header", () => ({
  __esModule: true, // This property makes it work with named exports
  default: jest.fn(), // Ensure to mock the default export
}));

jest.mock("../../renderer/components/generation/pdf/time", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("../../renderer/components/generation/pdf/crew", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("../../renderer/components/generation/pdf/alarmed", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("../../renderer/components/generation/pdf/severity", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("../../renderer/components/generation/pdf/interventionType", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("../../renderer/components/generation/pdf/rescued", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("../../renderer/components/generation/pdf/cause", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("../../renderer/components/generation/pdf/otherMeans", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("../../renderer/components/generation/pdf/actionsTaken", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("../../renderer/components/generation/pdf/location", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("../../renderer/components/generation/pdf/remarks", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("../../renderer/components/generation/pdf/destination", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("../../renderer/components/generation/pdf/fonts", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("../../renderer/components/generation/pdf/rescued", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Intervention Report Generation", () => {
  let doc;
  const form: IInterventionFormData = {
    startedAt: dayjs(),
    endedAt: dayjs(),
    date: dayjs(),
    pilote: [{ id: 1, name: "Pilote 1" }],
    crew: [
      {
        id: 2,
        name: "Crew 1",
      },
      { id: 3, name: "Crew 2" },
      { id: 4, name: "Crew 3" },
    ],
    alarmedBy: [
      {
        id: 1,
        name: "Alarm 1",
      },
    ],
    severity: [
      {
        id: 1,
        name: "Severity 1",
      },
    ],
    inteverntionType: [
      {
        id: 1,
        name: "Type 1",
      },
    ],
    otherMeans: [
      {
        id: 1,
        name: "Other Mean 1",
      },
    ],
    causes: [
      {
        id: 1,
        name: "Cause 1",
      },
    ],
    actionsTaken: [
      {
        id: 1,
        name: "Action 1",
      },
    ],
    interventionLocation: [
      {
        id: 1,
        name: "Location 1",
      },
    ],
    interventionDestination: [
      {
        id: 2,
        name: "Location 2",
      },
    ],
    remark: "Remark",
    rescued: 1,
    medicalized: 2,
    deceased: 3,
    eCoordinate: "xxxxxx",
    nCoordinate: "yyyyyy",
    boatRegistration: "VD41235",
  };
  const alarms: IAlarm[] = [
    { id: 1, name: "Alarm 1" },
    { id: 2, name: "Alarm 2" },
  ];
  const severities: ISeverity[] = [
    { id: 1, name: "Severity 1" },
    { id: 2, name: "Severity 2" },
  ];
  const interventionTypes: IInterventionType[] = [
    { id: 1, name: "Type 1" },
    { id: 2, name: "Type 2" },
  ];
  const causes: ICause[] = [
    { id: 1, name: "Cause 1" },
    { id: 2, name: "Cause 2" },
  ];
  const otherMeans: IOtherMean[] = [
    { id: 1, name: "Other Mean 1" },
    { id: 2, name: "Other Mean 2" },
  ];
  const actionsTaken: IAction[] = [
    { id: 1, name: "Action 1" },
    { id: 2, name: "Action 2" },
  ];
  const commonLocations: ICommonLocation[] = [
    { id: 1, name: "Location 1" },
    { id: 2, name: "Location 2" },
  ];

  beforeEach(() => {
    doc = new jsPDF();
    (header as jest.Mock).mockClear();
    (time as jest.Mock).mockClear();
    (crew as jest.Mock).mockClear();
    (AlarmedBy as jest.Mock).mockClear();
    (Cause as jest.Mock).mockClear();
    (OtherMeans as jest.Mock).mockClear();
    (ActionTaken as jest.Mock).mockClear();
    (Location as jest.Mock).mockClear();
    (Destination as jest.Mock).mockClear();
    (Remarks as jest.Mock).mockClear();
    (Fonts as jest.Mock).mockClear();
    (Rescued as jest.Mock).mockClear();
    (Severity as jest.Mock).mockClear();
    (InterventionType as jest.Mock).mockClear();
  });

  it("should orchestrate the intervention report creation correctly", () => {
    Intervention(
      doc,
      form,
      alarms,
      severities,
      interventionTypes,
      causes,
      otherMeans,
      actionsTaken,
      commonLocations,
    );

    expect(header).toHaveBeenCalled();
    expect(time).toHaveBeenCalled();
    expect(crew).toHaveBeenCalled();
    expect(AlarmedBy).toHaveBeenCalled();
    expect(Cause).toHaveBeenCalled();
    expect(OtherMeans).toHaveBeenCalled();
    expect(ActionTaken).toHaveBeenCalled();
    expect(Location).toHaveBeenCalled();
    expect(Destination).toHaveBeenCalled();
    expect(Remarks).toHaveBeenCalled();
    expect(Fonts).toHaveBeenCalled();
    expect(Rescued).toHaveBeenCalled();
    expect(Severity).toHaveBeenCalled();
    expect(InterventionType).toHaveBeenCalled();
    expect(doc.addPage).toHaveBeenCalledTimes(0);
  });
});
