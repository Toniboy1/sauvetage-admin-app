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
    await Database.getInstance().clearSeverities();
  });

  /**
   * Test case for adding a new severity to the database.
   */
  test("addSeverity should add a new severity to the database", async () => {
    const name = "John Doe";
    const id = await Database.getInstance().addSeverity(name);
    const severity = await Database.getInstance().getSeverity(id);
    expect(severity).toEqual({ id, name });
  });

  /**
   * Test case for updating a severity's name in the database.
   */
  test("updateSeverity should update a severity's name in the database", async () => {
    const name = "John Doe";
    const newName = "Jane Smith";
    const id = await Database.getInstance().addSeverity(name);
    await Database.getInstance().updateSeverity(id, newName);
    const updatedSeverity = await Database.getInstance().getSeverity(id);

    expect(updatedSeverity).toEqual({ id, name: newName });
  });

  /**
   * Test case for deleting a severity from the database.
   */
  test("deleteSeverity should delete a severity from the database", async () => {
    const name = "John Doe";

    const id = await Database.getInstance().addSeverity(name);
    await Database.getInstance().deleteSeverity(id);
    const deletedSeverity = await Database.getInstance().getSeverity(id);

    expect(deletedSeverity).toBeUndefined();
  });

  /**
   * Test case for retrieving all severities from the database.
   */
  test("getAllSeverities should return all severities from the database", async () => {
    const severities = [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ];
    for (const severity of severities) {
      await Database.getInstance().addSeverity(severity.name);
    }
    const allSeverities = await Database.getInstance().getAllSeverities();
    expect(allSeverities).toHaveLength(severities.length);
    expect(allSeverities.map((p) => p.name)).toEqual(
      expect.arrayContaining(severities.map((p) => p.name)),
    );
  });
  /**
   * Test case for clearing all severities from the database.
   */
  test("clearSeverities should delete all severities from the database", async () => {
    const severities = [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ];
    for (const severity of severities) {
      await Database.getInstance().addSeverity(severity.name);
    }
    await Database.getInstance().clearSeverities();
    const allSeverities = await Database.getInstance().getAllSeverities();
    expect(allSeverities).toHaveLength(0);
  });
  /**
   * Test case for fetching a severity from the database.
   */
  test("getSeverity should fetch a severity from the database", async () => {
    const name = "John Doe";
    const id = await Database.getInstance().addSeverity(name);
    const severity = await Database.getInstance().getSeverity(id);
    expect(severity).toEqual({ id, name });
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
  test("should throw an error if a severity with the same name already exists", async () => {
    const name = "John Doe";
    await Database.getInstance().addSeverity(name);
    await expect(db.addSeverity(name)).rejects.toThrow();
  });
});
