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
    db = Database.getInstance(true);
    await Database.getInstance().clearCommonLocations();
  });

  /**
   * Test case for adding a new commonlocation to the database.
   */
  test("addCommonLocation should add a new commonlocation to the database", async () => {
    const name = "John Doe";
    const id = await Database.getInstance().addCommonLocation(name);
    const commonlocation = await Database.getInstance().getCommonLocation(id);
    expect(commonlocation).toEqual({ id, name });
  });

  /**
   * Test case for updating a commonlocation's name in the database.
   */
  test("updateCommonLocation should update a commonlocation's name in the database", async () => {
    const name = "John Doe";
    const newName = "Jane Smith";
    const id = await Database.getInstance().addCommonLocation(name);
    await Database.getInstance().updateCommonLocation(id, newName);
    const updatedCommonLocation = await Database.getInstance().getCommonLocation(id);

    expect(updatedCommonLocation).toEqual({ id, name: newName });
  });

  /**
   * Test case for deleting a commonlocation from the database.
   */
  test("deleteCommonLocation should delete a commonlocation from the database", async () => {
    const name = "John Doe";

    const id = await Database.getInstance().addCommonLocation(name);
    await Database.getInstance().deleteCommonLocation(id);
    const deletedCommonLocation = await Database.getInstance().getCommonLocation(id);

    expect(deletedCommonLocation).toBeUndefined();
  });

  /**
   * Test case for retrieving all commonlocations from the database.
   */
  test("getAllCommonLocations should return all commonlocations from the database", async () => {
    const commonlocations = [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ];
    for (const commonlocation of commonlocations) {
      await Database.getInstance().addCommonLocation(commonlocation.name);
    }
    const allCommonLocations = await Database.getInstance().getAllCommonLocations();
    expect(allCommonLocations).toHaveLength(commonlocations.length);
    expect(allCommonLocations.map((p) => p.name)).toEqual(
      expect.arrayContaining(commonlocations.map((p) => p.name)),
    );
  });
  /**
   * Test case for clearing all commonlocations from the database.
   */
  test("clearCommonLocations should delete all commonlocations from the database", async () => {
    const commonlocations = [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ];
    for (const commonlocation of commonlocations) {
      await Database.getInstance().addCommonLocation(commonlocation.name);
    }
    await Database.getInstance().clearCommonLocations();
    const allCommonLocations = await Database.getInstance().getAllCommonLocations();
    expect(allCommonLocations).toHaveLength(0);
  });
  /**
   * Test case for fetching a commonlocation from the database.
   */
  test("getCommonLocation should fetch a commonlocation from the database", async () => {
    const name = "John Doe";
    const id = await Database.getInstance().addCommonLocation(name);
    const commonlocation = await Database.getInstance().getCommonLocation(id);
    expect(commonlocation).toEqual({ id, name });
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
  test("should throw an error if a commonlocation with the same name already exists", async () => {
    const name = "John Doe";
    await Database.getInstance().addCommonLocation(name);
    await expect(db.addCommonLocation(name)).rejects.toThrow();
  });
});
