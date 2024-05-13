import { beforeEach, describe, expect, test } from "@jest/globals";
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
    await Database.getInstance().clearLakeStates();
  });

  /**
   * Test case for adding a new lakestate to the database.
   */
  test("addLakeState should add a new lakestate to the database", async () => {
    const name = "John Doe";
    const id = await Database.getInstance().addLakeState(name);
    const lakestate = await Database.getInstance().getLakeState(id);
    expect(lakestate).toEqual({ id, name });
  });

  /**
   * Test case for updating a lakestate's name in the database.
   */
  test("updateLakeState should update a lakestate's name in the database", async () => {
    const name = "John Doe";
    const newName = "Jane Smith";
    const id = await Database.getInstance().addLakeState(name);
    await Database.getInstance().updateLakeState(id, newName);
    const updatedLakeState = await Database.getInstance().getLakeState(id);

    expect(updatedLakeState).toEqual({ id, name: newName });
  });

  /**
   * Test case for deleting a lakestate from the database.
   */
  test("deleteLakeState should delete a lakestate from the database", async () => {
    const name = "John Doe";

    const id = await Database.getInstance().addLakeState(name);
    await Database.getInstance().deleteLakeState(id);
    const deletedLakeState = await Database.getInstance().getLakeState(id);

    expect(deletedLakeState).toBeUndefined();
  });

  /**
   * Test case for retrieving all lakestates from the database.
   */
  test("getAllLakeStates should return all lakestates from the database", async () => {
    const lakestates = [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ];
    for (const lakestate of lakestates) {
      await Database.getInstance().addLakeState(lakestate.name);
    }
    const allLakeStates = await Database.getInstance().getAllLakeStates();
    expect(allLakeStates).toHaveLength(lakestates.length);
    expect(allLakeStates.map((p) => p.name)).toEqual(
      expect.arrayContaining(lakestates.map((p) => p.name)),
    );
  });
  /**
   * Test case for clearing all lakestates from the database.
   */
  test("clearLakeStates should delete all lakestates from the database", async () => {
    const lakestates = [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ];
    for (const lakestate of lakestates) {
      await Database.getInstance().addLakeState(lakestate.name);
    }
    await Database.getInstance().clearLakeStates();
    const allLakeStates = await Database.getInstance().getAllLakeStates();
    expect(allLakeStates).toHaveLength(0);
  });
  /**
   * Test case for fetching a lakestate from the database.
   */
  test("getLakeState should fetch a lakestate from the database", async () => {
    const name = "John Doe";
    const id = await Database.getInstance().addLakeState(name);
    const lakestate = await Database.getInstance().getLakeState(id);
    expect(lakestate).toEqual({ id, name });
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
  test("should throw an error if a lakestate with the same name already exists", async () => {
    const name = "John Doe";
    await Database.getInstance().addLakeState(name);
    await expect(Database.getInstance().addLakeState(name)).rejects.toThrow();
  });
  /**
   *  test case Search for lakestates by name
   */
  test("searchLakeStates should return aczions with matching names", async () => {
    const datas = [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ];
    for (const data of datas) {
      await Database.getInstance().addLakeState(data.name);
    }
    const searchResults = await Database.getInstance().searchLakeStates("John");
    expect(searchResults).toHaveLength(1);
  });
});
