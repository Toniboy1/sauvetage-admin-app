import dayjs from "dayjs";
import { Database } from "./index";
import { describe, expect, test, beforeEach } from "@jest/globals";
import { IIntervention } from "../../components/interventions/types";
import { IInterventionFormData } from "../../components/reports/intervention/types";
/**
 * Test suite for the Database module.
 */
describe("Database", () => {
  let db: Database;
  /**
   * Clear the database before each test.
   */
  beforeEach(async () => {
    db = new Database(true);
    await db.clearFormInterventions();
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
    };
    const id = await db.addFormIntervention(input);
    const formintervention = await db.getFormIntervention(id);
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
    };
    const id = await db.addFormIntervention(input);
    const update = {
      startedAt: input.startedAt,
      endedAt: input.endedAt,
      date: input.date,
      pilote: [{ id: 6, name: "John Doe6" }],
      crew: [
        { id: 4, name: "Jane Smith4" },
        { id: 5, name: "Bob Johnson5" },
      ],
    };
    await db.updateFormIntervention(id, update);
    const updatedFormIntervention = await db.getFormIntervention(id);
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
    };
    const id = await db.addFormIntervention(input);
    await db.deleteFormIntervention(id);
    const deletedFormIntervention = await db.getFormIntervention(id);
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
      },
    ];
    let result: IInterventionFormData[] = [];
    for (let i = 0; i < forminterventions.length; i++) {
      const id = await db.addFormIntervention(forminterventions[i]);
      result.push({ id, ...forminterventions[i] });
    }
    const allFormInterventions = await db.getAllFormInterventions();
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
      },
    ];
    for (const formintervention of forminterventions) {
      await db.addFormIntervention(formintervention);
    }
    await db.clearFormInterventions();
    const allFormInterventions = await db.getAllFormInterventions();
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
    };
    const id = await db.addFormIntervention(input);
    const formintervention = await db.getFormIntervention(id);
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
