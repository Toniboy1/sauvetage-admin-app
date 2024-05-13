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
    await Database.getInstance().clearWinds();
  });

  /**
   * Test case for adding a new wind to the database.
   */
  test("addWind should add a new wind to the database", async () => {
    const name = "John Doe";
    const id = await Database.getInstance().addWind(name);
    const wind = await Database.getInstance().getWind(id);
    expect(wind).toEqual({ id, name });
  });

  /**
   * Test case for updating a wind's name in the database.
   */
  test("updateWind should update a wind's name in the database", async () => {
    const name = "John Doe";
    const newName = "Jane Smith";
    const id = await Database.getInstance().addWind(name);
    await Database.getInstance().updateWind(id, newName);
    const updatedWind = await Database.getInstance().getWind(id);

    expect(updatedWind).toEqual({ id, name: newName });
  });

  /**
   * Test case for deleting a wind from the database.
   */
  test("deleteWind should delete a wind from the database", async () => {
    const name = "John Doe";

    const id = await Database.getInstance().addWind(name);
    await Database.getInstance().deleteWind(id);
    const deletedWind = await Database.getInstance().getWind(id);

    expect(deletedWind).toBeUndefined();
  });

  /**
   * Test case for retrieving all winds from the database.
   */
  test("getAllWinds should return all winds from the database", async () => {
    const winds = [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ];
    for (const wind of winds) {
      await Database.getInstance().addWind(wind.name);
    }
    const allWinds = await Database.getInstance().getAllWinds();
    expect(allWinds).toHaveLength(winds.length);
    expect(allWinds.map((p) => p.name)).toEqual(
      expect.arrayContaining(winds.map((p) => p.name)),
    );
  });
  /**
   * Test case for clearing all winds from the database.
   */
  test("clearWinds should delete all winds from the database", async () => {
    const winds = [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ];
    for (const wind of winds) {
      await Database.getInstance().addWind(wind.name);
    }
    await Database.getInstance().clearWinds();
    const allWinds = await Database.getInstance().getAllWinds();
    expect(allWinds).toHaveLength(0);
  });
  /**
   * Test case for fetching a wind from the database.
   */
  test("getWind should fetch a wind from the database", async () => {
    const name = "John Doe";
    const id = await Database.getInstance().addWind(name);
    const wind = await Database.getInstance().getWind(id);
    expect(wind).toEqual({ id, name });
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
  test("should throw an error if a wind with the same name already exists", async () => {
    const name = "John Doe";
    await Database.getInstance().addWind(name);
    await expect(Database.getInstance().addWind(name)).rejects.toThrow();
  });
  /**
   *  test case Search for winds by name
   */
  test("searchWinds should return aczions with matching names", async () => {
    const datas = [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ];
    for (const data of datas) {
      await Database.getInstance().addWind(data.name);
    }
    const searchResults = await Database.getInstance().searchWinds("John");
    expect(searchResults).toHaveLength(1);
  });
});
