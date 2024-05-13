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
    await Database.getInstance().clearWeathers();
  });

  /**
   * Test case for adding a new weather to the database.
   */
  test("addWeather should add a new weather to the database", async () => {
    const name = "John Doe";
    const id = await Database.getInstance().addWeather(name);
    const weather = await Database.getInstance().getWeather(id);
    expect(weather).toEqual({ id, name });
  });

  /**
   * Test case for updating a weather's name in the database.
   */
  test("updateWeather should update a weather's name in the database", async () => {
    const name = "John Doe";
    const newName = "Jane Smith";
    const id = await Database.getInstance().addWeather(name);
    await Database.getInstance().updateWeather(id, newName);
    const updatedWeather = await Database.getInstance().getWeather(id);

    expect(updatedWeather).toEqual({ id, name: newName });
  });

  /**
   * Test case for deleting a weather from the database.
   */
  test("deleteWeather should delete a weather from the database", async () => {
    const name = "John Doe";

    const id = await Database.getInstance().addWeather(name);
    await Database.getInstance().deleteWeather(id);
    const deletedWeather = await Database.getInstance().getWeather(id);

    expect(deletedWeather).toBeUndefined();
  });

  /**
   * Test case for retrieving all weathers from the database.
   */
  test("getAllWeathers should return all weathers from the database", async () => {
    const weathers = [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ];
    for (const weather of weathers) {
      await Database.getInstance().addWeather(weather.name);
    }
    const allWeathers = await Database.getInstance().getAllWeathers();
    expect(allWeathers).toHaveLength(weathers.length);
    expect(allWeathers.map((p) => p.name)).toEqual(
      expect.arrayContaining(weathers.map((p) => p.name)),
    );
  });
  /**
   * Test case for clearing all weathers from the database.
   */
  test("clearWeathers should delete all weathers from the database", async () => {
    const weathers = [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ];
    for (const weather of weathers) {
      await Database.getInstance().addWeather(weather.name);
    }
    await Database.getInstance().clearWeathers();
    const allWeathers = await Database.getInstance().getAllWeathers();
    expect(allWeathers).toHaveLength(0);
  });
  /**
   * Test case for fetching a weather from the database.
   */
  test("getWeather should fetch a weather from the database", async () => {
    const name = "John Doe";
    const id = await Database.getInstance().addWeather(name);
    const weather = await Database.getInstance().getWeather(id);
    expect(weather).toEqual({ id, name });
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
  test("should throw an error if a weather with the same name already exists", async () => {
    const name = "John Doe";
    await Database.getInstance().addWeather(name);
    await expect(Database.getInstance().addWeather(name)).rejects.toThrow();
  });
  /**
   *  test case Search for weathers by name
   */
  test("searchWeathers should return aczions with matching names", async () => {
    const datas = [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ];
    for (const data of datas) {
      await Database.getInstance().addWeather(data.name);
    }
    const searchResults = await Database.getInstance().searchWeathers("John");
    expect(searchResults).toHaveLength(1);
  });
});
