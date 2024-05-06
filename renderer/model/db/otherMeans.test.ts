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
    await db.clearOtherMeans();
  });

  /**
   * Test case for adding a new othermean to the database.
   */
  test("addOtherMean should add a new othermean to the database", async () => {
    const name = "John Doe";
    const id = await db.addOtherMean(name);
    const othermean = await db.getOtherMean(id);
    expect(othermean).toEqual({ id, name });
  });

  /**
   * Test case for updating a othermean's name in the database.
   */
  test("updateOtherMean should update a othermean's name in the database", async () => {
    const name = "John Doe";
    const newName = "Jane Smith";
    const id = await db.addOtherMean(name);
    await db.updateOtherMean(id, newName);
    const updatedOtherMean = await db.getOtherMean(id);

    expect(updatedOtherMean).toEqual({ id, name: newName });
  });

  /**
   * Test case for deleting a othermean from the database.
   */
  test("deleteOtherMean should delete a othermean from the database", async () => {
    const name = "John Doe";

    const id = await db.addOtherMean(name);
    await db.deleteOtherMean(id);
    const deletedOtherMean = await db.getOtherMean(id);

    expect(deletedOtherMean).toBeUndefined();
  });

  /**
   * Test case for retrieving all othermeans from the database.
   */
  test("getAllOtherMeans should return all othermeans from the database", async () => {
    const othermeans = [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ];
    for (const othermean of othermeans) {
      await db.addOtherMean(othermean.name);
    }
    const allOtherMeans = await db.getAllOtherMeans();
    expect(allOtherMeans).toHaveLength(othermeans.length);
    expect(allOtherMeans.map(p => p.name)).toEqual(expect.arrayContaining(othermeans.map(p => p.name)));
  });
  /**
   * Test case for clearing all othermeans from the database.
   */
  test("clearOtherMeans should delete all othermeans from the database", async () => {
    const othermeans = [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ];
    for (const othermean of othermeans) {
      await db.addOtherMean(othermean.name);
    }
    await db.clearOtherMeans();
    const allOtherMeans = await db.getAllOtherMeans();
    expect(allOtherMeans).toHaveLength(0);
  }
  );
  /**
   * Test case for fetching a othermean from the database.
   */
  test("getOtherMean should fetch a othermean from the database", async () => {
    const name = "John Doe";
    const id = await db.addOtherMean(name);
    const othermean = await db.getOtherMean(id);
    expect(othermean).toEqual({ id, name });
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
  test("should throw an error if a othermean with the same name already exists", async () => {
    const name = "John Doe";
    await db.addOtherMean(name);
    await expect(db.addOtherMean(name)).rejects.toThrow();
  }
  );
});
