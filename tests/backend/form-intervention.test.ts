import { beforeEach, describe, expect, test } from "@jest/globals";
import dayjs from "dayjs";
import { IInterventionFormData } from "../../renderer/components/reports/intervention/types";
import { Database } from "../../renderer/model/db/index";
/**
 * Test suite for the Database module.
 */
describe("Database", () => {
  let db: Database;
  /**
   * Clear the database before each test.
   */
  beforeEach(async () => {
    db = Database.getInstance(true);
    await Database.getInstance().clearFormInterventions();
  });

  /**
   * Test case for adding a new formintervention to the database.
   */
  test("addFormIntervention should add a new formintervention to the database", async () => {
    const input = {
      startedAt: dayjs(),
      endedAt: dayjs(),
      date: dayjs(),
      pilote: [{ id: 1, name: "John Doe" }],
      crew: [
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Bob Johnson" },
      ],
      alarmedBy: [{ id: 1, name: "John Doe" }],
      severity: [{ id: 1, name: "Big" }],
      inteverntionType: [{ id: 1, name: "Type" }],
      otherMeans: [{ id: 1, name: "Other" }],
      causes: [{ id: 1, name: "Cause" }],
      actionsTaken: [{ id: 1, name: "Action" }],
      interventionLocation: [{ id: 1, name: "Location" }],
      interventionDestination: [{ id: 1, name: "Destination" }],
      weathers: [{ id: 1, name: "Weather" }],
      winds: [{ id: 1, name: "Wind" }],
      lakeStates: [{ id: 1, name: "Lake" }],
      remark: "remark",
      rescued: 0,
      medicalized: 0,
      deceased: 0,
      boatRegistration: "",
      nCoordinate: "1'138'470°E",
      eCoordinate: "2'560'250°N",
    };
    const id = await Database.getInstance().addFormIntervention(input);
    const formintervention =
      await Database.getInstance().getFormIntervention(id);
    expect(formintervention).toEqual({ id, ...input });
  });

  /**
   * Test case for updating a formintervention's name in the database.
   */
  test("updateFormIntervention should update a formintervention's name in the database", async () => {
    const input = {
      startedAt: dayjs(),
      endedAt: dayjs(),
      date: dayjs(),
      pilote: [{ id: 1, name: "John Doe" }],
      crew: [
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Bob Johnson" },
      ],
      alarmedBy: [{ id: 1, name: "John Doe" }],
      severity: [{ id: 1, name: "Big" }],
      inteverntionType: [{ id: 1, name: "Type" }],
      otherMeans: [{ id: 1, name: "Other" }],
      causes: [{ id: 1, name: "Cause" }],
      actionsTaken: [{ id: 1, name: "Action" }],
      interventionLocation: [{ id: 1, name: "Location" }],
      interventionDestination: [{ id: 1, name: "Destination" }],
      weathers: [{ id: 1, name: "Weather" }],
      winds: [{ id: 1, name: "Wind" }],
      lakeStates: [{ id: 1, name: "Lake" }],
      remark: "remark",
      rescued: 0,
      medicalized: 0,
      deceased: 0,
      boatRegistration: "",
      nCoordinate: "1'138'470°E",
      eCoordinate: "2'560'250°N",
    };
    const id = await Database.getInstance().addFormIntervention(input);
    const update = {
      startedAt: input.startedAt,
      endedAt: input.endedAt,
      date: input.date,
      pilote: [{ id: 6, name: "John Doe6" }],
      crew: [
        { id: 4, name: "Jane Smith4" },
        { id: 5, name: "Bob Johnson5" },
      ],
      alarmedBy: [{ id: 1, name: "John Doe" }],
      severity: [{ id: 1, name: "Big" }],
      inteverntionType: [{ id: 1, name: "Type" }],
      otherMeans: [{ id: 1, name: "Other" }],
      causes: [{ id: 1, name: "Cause" }],
      actionsTaken: [{ id: 1, name: "Action" }],
      interventionLocation: [{ id: 1, name: "Location" }],
      interventionDestination: [{ id: 1, name: "Destination" }],
      weathers: [{ id: 1, name: "Weather" }],
      winds: [{ id: 1, name: "Wind" }],
      lakeStates: [{ id: 1, name: "Lake" }],
      remark: "remark",
      rescued: 0,
      medicalized: 0,
      deceased: 0,
      boatRegistration: "",
      nCoordinate: "1'138'470°E",
      eCoordinate: "2'560'250°N",
    };
    await Database.getInstance().updateFormIntervention(id, update);
    const updatedFormIntervention =
      await Database.getInstance().getFormIntervention(id);
    expect(updatedFormIntervention).toEqual({ id: id, ...update });
  });

  /**
   * Test case for deleting a formintervention from the database.
   */
  test("deleteFormIntervention should delete a formintervention from the database", async () => {
    const input = {
      startedAt: dayjs(),
      endedAt: dayjs(),
      date: dayjs(),
      pilote: [{ id: 1, name: "John Doe" }],
      crew: [
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Bob Johnson" },
      ],
      alarmedBy: [{ id: 1, name: "John Doe" }],
      severity: [{ id: 1, name: "Big" }],
      inteverntionType: [{ id: 1, name: "Type" }],
      otherMeans: [{ id: 1, name: "Other" }],
      causes: [{ id: 1, name: "Cause" }],
      actionsTaken: [{ id: 1, name: "Action" }],
      interventionLocation: [{ id: 1, name: "Location" }],
      interventionDestination: [{ id: 1, name: "Destination" }],
      weathers: [{ id: 1, name: "Weather" }],
      winds: [{ id: 1, name: "Wind" }],
      lakeStates: [{ id: 1, name: "Lake" }],
      remark: "remark",
      rescued: 0,
      medicalized: 0,
      deceased: 0,
      boatRegistration: "",
      nCoordinate: "1'138'470°E",
      eCoordinate: "2'560'250°N",
    };
    const id = await Database.getInstance().addFormIntervention(input);
    await Database.getInstance().deleteFormIntervention(id);
    const deletedFormIntervention =
      await Database.getInstance().getFormIntervention(id);
    expect(deletedFormIntervention).toBeUndefined();
  });

  /**
   * Test case for retrieving all forminterventions from the database.
   */
  test("getAllFormInterventions should return all forminterventions from the database", async () => {
    const forminterventions = [
      {
        startedAt: dayjs(),
        endedAt: dayjs(),
        date: dayjs(),
        pilote: [{ id: 1, name: "John Doe" }],
        crew: [
          { id: 2, name: "Jane Smith" },
          { id: 3, name: "Bob Johnson" },
        ],
        alarmedBy: [{ id: 1, name: "John Doe" }],
        severity: [{ id: 1, name: "Big" }],
        inteverntionType: [{ id: 1, name: "Type" }],
        otherMeans: [{ id: 1, name: "Other" }],
        causes: [{ id: 1, name: "Cause" }],
        actionsTaken: [{ id: 1, name: "Action" }],
        interventionLocation: [{ id: 1, name: "Location" }],
        interventionDestination: [{ id: 1, name: "Destination" }],
        weathers: [{ id: 1, name: "Weather" }],
        winds: [{ id: 1, name: "Wind" }],
        lakeStates: [{ id: 1, name: "Lake" }],
        remark: "remark",
        rescued: 0,
        medicalized: 0,
        deceased: 0,
        boatRegistration: "",
        nCoordinate: "1'138'470°E",
        eCoordinate: "2'560'250°N",
      },
      {
        startedAt: dayjs(),
        endedAt: dayjs(),
        date: dayjs(),
        pilote: [{ id: 4, name: "John Doe4" }],
        crew: [
          { id: 5, name: "Jane Smith5" },
          { id: 6, name: "Bob Johnson6" },
        ],
        alarmedBy: [{ id: 1, name: "John Doe" }],
        severity: [{ id: 1, name: "Big" }],
        inteverntionType: [{ id: 1, name: "Type" }],
        otherMeans: [{ id: 1, name: "Other" }],
        causes: [{ id: 1, name: "Cause" }],
        actionsTaken: [{ id: 1, name: "Action" }],
        interventionLocation: [{ id: 1, name: "Location" }],
        interventionDestination: [{ id: 1, name: "Destination" }],
        weathers: [{ id: 1, name: "Weather" }],
        winds: [{ id: 1, name: "Wind" }],
        lakeStates: [{ id: 1, name: "Lake" }],
        remark: "remark",
        rescued: 0,
        medicalized: 0,
        deceased: 0,
        boatRegistration: "",
        nCoordinate: "1'138'470°E",
        eCoordinate: "2'560'250°N",
      },
      {
        startedAt: dayjs(),
        endedAt: dayjs(),
        date: dayjs(),
        pilote: [{ id: 7, name: "John Doe7" }],
        crew: [
          { id: 8, name: "Jane Smith8" },
          { id: 9, name: "Bob Johnson9" },
        ],
        alarmedBy: [{ id: 1, name: "John Doe" }],
        severity: [{ id: 1, name: "Big" }],
        inteverntionType: [{ id: 1, name: "Type" }],
        otherMeans: [{ id: 1, name: "Other" }],
        causes: [{ id: 1, name: "Cause" }],
        actionsTaken: [{ id: 1, name: "Action" }],
        interventionLocation: [{ id: 1, name: "Location" }],
        interventionDestination: [{ id: 1, name: "Destination" }],
        weathers: [{ id: 1, name: "Weather" }],
        winds: [{ id: 1, name: "Wind" }],
        lakeStates: [{ id: 1, name: "Lake" }],
        remark: "remark",
        rescued: 0,
        medicalized: 0,
        deceased: 0,
        boatRegistration: "",
        nCoordinate: "1'138'470°E",
        eCoordinate: "2'560'250°N",
      },
    ];
    let result: IInterventionFormData[] = [];
    for (let i = 0; i < forminterventions.length; i++) {
      const id = await Database.getInstance().addFormIntervention(
        forminterventions[i],
      );
      result.push({ id, ...forminterventions[i] });
    }
    const allFormInterventions =
      await Database.getInstance().getAllFormInterventions();
    expect(allFormInterventions).toHaveLength(forminterventions.length);
    expect(allFormInterventions).toEqual(expect.arrayContaining(result));
  });
  /**
   * Test case for clearing all forminterventions from the database.
   */
  test("clearFormInterventions should delete all forminterventions from the database", async () => {
    const forminterventions = [
      {
        startedAt: dayjs(),
        endedAt: dayjs(),
        date: dayjs(),
        pilote: [{ id: 1, name: "John Doe" }],
        crew: [
          { id: 2, name: "Jane Smith" },
          { id: 3, name: "Bob Johnson" },
        ],
        alarmedBy: [{ id: 1, name: "John Doe" }],
        severity: [{ id: 1, name: "Big" }],
        inteverntionType: [{ id: 1, name: "Type" }],
        otherMeans: [{ id: 1, name: "Other" }],
        causes: [{ id: 1, name: "Cause" }],
        actionsTaken: [{ id: 1, name: "Action" }],
        interventionLocation: [{ id: 1, name: "Location" }],
        interventionDestination: [{ id: 1, name: "Destination" }],
        weathers: [{ id: 1, name: "Weather" }],
        winds: [{ id: 1, name: "Wind" }],
        lakeStates: [{ id: 1, name: "Lake" }],
        remark: "remark",
        rescued: 0,
        medicalized: 0,
        deceased: 0,
        boatRegistration: "",
        nCoordinate: "1'138'470°E",
        eCoordinate: "2'560'250°N",
      },
      {
        startedAt: dayjs(),
        endedAt: dayjs(),
        date: dayjs(),
        pilote: [{ id: 4, name: "John Doe4" }],
        crew: [
          { id: 5, name: "Jane Smith5" },
          { id: 6, name: "Bob Johnson6" },
        ],
        alarmedBy: [{ id: 1, name: "John Doe" }],
        severity: [{ id: 1, name: "Big" }],
        inteverntionType: [{ id: 1, name: "Type" }],
        otherMeans: [{ id: 1, name: "Other" }],
        causes: [{ id: 1, name: "Cause" }],
        actionsTaken: [{ id: 1, name: "Action" }],
        interventionLocation: [{ id: 1, name: "Location" }],
        interventionDestination: [{ id: 1, name: "Destination" }],
        weathers: [{ id: 1, name: "Weather" }],
        winds: [{ id: 1, name: "Wind" }],
        lakeStates: [{ id: 1, name: "Lake" }],
        remark: "remark",
        rescued: 0,
        medicalized: 0,
        deceased: 0,
        boatRegistration: "",
        nCoordinate: "1'138'470°E",
        eCoordinate: "2'560'250°N",
      },
      {
        startedAt: dayjs(),
        endedAt: dayjs(),
        date: dayjs(),
        pilote: [{ id: 7, name: "John Doe7" }],
        crew: [
          { id: 8, name: "Jane Smith8" },
          { id: 9, name: "Bob Johnson9" },
        ],
        alarmedBy: [{ id: 1, name: "John Doe" }],
        severity: [{ id: 1, name: "Big" }],
        inteverntionType: [{ id: 1, name: "Type" }],
        otherMeans: [{ id: 1, name: "Other" }],
        causes: [{ id: 1, name: "Cause" }],
        actionsTaken: [{ id: 1, name: "Action" }],
        interventionLocation: [{ id: 1, name: "Location" }],
        interventionDestination: [{ id: 1, name: "Destination" }],
        weathers: [{ id: 1, name: "Weather" }],
        winds: [{ id: 1, name: "Wind" }],
        lakeStates: [{ id: 1, name: "Lake" }],
        remark: "remark",
        rescued: 0,
        medicalized: 0,
        deceased: 0,
        boatRegistration: "",
        nCoordinate: "1'138'470°E",
        eCoordinate: "2'560'250°N",
      },
    ];
    for (const formintervention of forminterventions) {
      await Database.getInstance().addFormIntervention(formintervention);
    }
    await Database.getInstance().clearFormInterventions();
    const allFormInterventions =
      await Database.getInstance().getAllFormInterventions();
    expect(allFormInterventions).toHaveLength(0);
  });
  /**
   * Test case for fetching a formintervention from the database.
   */
  test("getFormIntervention should fetch a formintervention from the database", async () => {
    const input = {
      startedAt: dayjs(),
      endedAt: dayjs(),
      date: dayjs(),
      pilote: [{ id: 1, name: "John Doe" }],
      crew: [
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Bob Johnson" },
      ],
      alarmedBy: [{ id: 1, name: "John Doe" }],
      severity: [{ id: 1, name: "Big" }],
      inteverntionType: [{ id: 1, name: "Type" }],
      otherMeans: [{ id: 1, name: "Other" }],
      causes: [{ id: 1, name: "Cause" }],
      actionsTaken: [{ id: 1, name: "Action" }],
      interventionLocation: [{ id: 1, name: "Location" }],
      interventionDestination: [{ id: 1, name: "Destination" }],
      weathers: [{ id: 1, name: "Weather" }],
      winds: [{ id: 1, name: "Wind" }],
      lakeStates: [{ id: 1, name: "Lake" }],
      remark: "remark",
      rescued: 0,
      medicalized: 0,
      deceased: 0,
      boatRegistration: "",
      nCoordinate: "1'138'470°E",
      eCoordinate: "2'560'250°N",
    };
    const id = await Database.getInstance().addFormIntervention(input);
    const formintervention =
      await Database.getInstance().getFormIntervention(id);
    expect(formintervention).toEqual({
      ...input,
      id: id,
    });
  });

  /**
   * Test for creating a new instance of the Database class.
   */
  test("should create a new instance of the Database class", () => {
    expect(db).toBeInstanceOf(Database);
  });
});
