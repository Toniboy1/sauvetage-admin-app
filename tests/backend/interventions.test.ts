import { Database } from "../../renderer/model/db/index";
import { describe, expect, test, beforeEach } from "@jest/globals";
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
    await Database.getInstance().clearInterventions();
  });

  /**
   * Test case for adding a new intervention to the database.
   */
  test("addIntervention should add a new intervention to the database", async () => {
    const name = "John Doe";
    const id = await Database.getInstance().addIntervention(name);
    const intervention = await Database.getInstance().getIntervention(id);
    expect(intervention).toEqual({ id, name });
  });

  /**
   * Test case for updating a intervention's name in the database.
   */
  test("updateIntervention should update a intervention's name in the database", async () => {
    const name = "John Doe";
    const newName = "Jane Smith";
    const id = await Database.getInstance().addIntervention(name);
    await Database.getInstance().updateIntervention(id, newName);
    const updatedIntervention = await Database.getInstance().getIntervention(id);

    expect(updatedIntervention).toEqual({ id, name: newName });
  });

  /**
   * Test case for deleting a intervention from the database.
   */
  test("deleteIntervention should delete a intervention from the database", async () => {
    const name = "John Doe";

    const id = await Database.getInstance().addIntervention(name);
    await Database.getInstance().deleteIntervention(id);
    const deletedIntervention = await Database.getInstance().getIntervention(id);

    expect(deletedIntervention).toBeUndefined();
  });

  /**
   * Test case for retrieving all interventions from the database.
   */
  test("getAllInterventions should return all interventions from the database", async () => {
    const interventions = [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ];
    for (const intervention of interventions) {
      await Database.getInstance().addIntervention(intervention.name);
    }
    const allInterventions = await Database.getInstance().getAllInterventions();
    expect(allInterventions).toHaveLength(interventions.length);
    expect(allInterventions.map((p) => p.name)).toEqual(
      expect.arrayContaining(interventions.map((p) => p.name)),
    );
  });
  /**
   * Test case for clearing all interventions from the database.
   */
  test("clearInterventions should delete all interventions from the database", async () => {
    const interventions = [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ];
    for (const intervention of interventions) {
      await Database.getInstance().addIntervention(intervention.name);
    }
    await Database.getInstance().clearInterventions();
    const allInterventions = await Database.getInstance().getAllInterventions();
    expect(allInterventions).toHaveLength(0);
  });
  /**
   * Test case for fetching a intervention from the database.
   */
  test("getIntervention should fetch a intervention from the database", async () => {
    const name = "John Doe";
    const id = await Database.getInstance().addIntervention(name);
    const intervention = await Database.getInstance().getIntervention(id);
    expect(intervention).toEqual({ id, name });
  });

  /**
   * Test for creating a new instance of the Database class.
   */
  test("should create a new instance of the Database class", () => {
    expect(db).toBeInstanceOf(Database);
  });

  /**
   * Test for name unique constraint creation
   */
  test("should throw an error if a intervention with the same name already exists", async () => {
    const name = "John Doe";
    await Database.getInstance().addIntervention(name);
    await expect(Database.getInstance().addIntervention(name)).rejects.toThrow();
  });

  /**
   *  test case Search for interventions by name
   */
  test("searchInterventions should return interventions with matching names", async () => {
    const datas = [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ];
    for (const data of datas) {
      await Database.getInstance().addIntervention(data.name);
    }
    const searchResults = await Database.getInstance().searchInterventions("John");
    expect(searchResults).toHaveLength(1);
  });
});
