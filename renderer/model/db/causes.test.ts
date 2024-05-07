import { Database } from "./index";
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
    db = new Database(true);
    await db.clearCauses();
  });

  /**
   * Test case for adding a new cause to the database.
   */
  test("addCause should add a new cause to the database", async () => {
    const name = "John Doe";
    const id = await db.addCause(name);
    const cause = await db.getCause(id);
    expect(cause).toEqual({ id, name });
  });

  /**
   * Test case for updating a cause's name in the database.
   */
  test("updateCause should update a cause's name in the database", async () => {
    const name = "John Doe";
    const newName = "Jane Smith";
    const id = await db.addCause(name);
    await db.updateCause(id, newName);
    const updatedCause = await db.getCause(id);

    expect(updatedCause).toEqual({ id, name: newName });
  });

  /**
   * Test case for deleting a cause from the database.
   */
  test("deleteCause should delete a cause from the database", async () => {
    const name = "John Doe";

    const id = await db.addCause(name);
    await db.deleteCause(id);
    const deletedCause = await db.getCause(id);

    expect(deletedCause).toBeUndefined();
  });

  /**
   * Test case for retrieving all causes from the database.
   */
  test("getAllCauses should return all causes from the database", async () => {
    const causes = [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ];
    for (const cause of causes) {
      await db.addCause(cause.name);
    }
    const allCauses = await db.getAllCauses();
    expect(allCauses).toHaveLength(causes.length);
    expect(allCauses.map((p) => p.name)).toEqual(
      expect.arrayContaining(causes.map((p) => p.name)),
    );
  });
  /**
   * Test case for clearing all causes from the database.
   */
  test("clearCauses should delete all causes from the database", async () => {
    const causes = [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ];
    for (const cause of causes) {
      await db.addCause(cause.name);
    }
    await db.clearCauses();
    const allCauses = await db.getAllCauses();
    expect(allCauses).toHaveLength(0);
  });
  /**
   * Test case for fetching a cause from the database.
   */
  test("getCause should fetch a cause from the database", async () => {
    const name = "John Doe";
    const id = await db.addCause(name);
    const cause = await db.getCause(id);
    expect(cause).toEqual({ id, name });
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
  test("should throw an error if a cause with the same name already exists", async () => {
    const name = "John Doe";
    await db.addCause(name);
    await expect(db.addCause(name)).rejects.toThrow();
  });
});
