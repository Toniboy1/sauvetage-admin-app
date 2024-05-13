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
    await Database.getInstance().clearAlarms();
  });

  /**
   * Test case for adding a new alarm to the database.
   */
  test("addAlarm should add a new alarm to the database", async () => {
    const name = "John Doe";
    const id = await Database.getInstance().addAlarm(name);
    const alarm = await Database.getInstance().getAlarm(id);
    expect(alarm).toEqual({ id, name });
  });

  /**
   * Test case for updating a alarm's name in the database.
   */
  test("updateAlarm should update a alarm's name in the database", async () => {
    const name = "John Doe";
    const newName = "Jane Smith";
    const id = await Database.getInstance().addAlarm(name);
    await Database.getInstance().updateAlarm(id, newName);
    const updatedAlarm = await Database.getInstance().getAlarm(id);

    expect(updatedAlarm).toEqual({ id, name: newName });
  });

  /**
   * Test case for deleting a alarm from the database.
   */
  test("deleteAlarm should delete a alarm from the database", async () => {
    const name = "John Doe";

    const id = await Database.getInstance().addAlarm(name);
    await Database.getInstance().deleteAlarm(id);
    const deletedAlarm = await Database.getInstance().getAlarm(id);

    expect(deletedAlarm).toBeUndefined();
  });

  /**
   * Test case for retrieving all alarms from the database.
   */
  test("getAllAlarms should return all alarms from the database", async () => {
    const alarms = [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ];
    for (const alarm of alarms) {
      await Database.getInstance().addAlarm(alarm.name);
    }
    const allAlarms = await Database.getInstance().getAllAlarms();
    expect(allAlarms).toHaveLength(alarms.length);
    expect(allAlarms.map((p) => p.name)).toEqual(
      expect.arrayContaining(alarms.map((p) => p.name)),
    );
  });
  /**
   * Test case for clearing all alarms from the database.
   */
  test("clearAlarms should delete all alarms from the database", async () => {
    const alarms = [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ];
    for (const alarm of alarms) {
      await Database.getInstance().addAlarm(alarm.name);
    }
    await Database.getInstance().clearAlarms();
    const allAlarms = await Database.getInstance().getAllAlarms();
    expect(allAlarms).toHaveLength(0);
  });
  /**
   * Test case for fetching a alarm from the database.
   */
  test("getAlarm should fetch a alarm from the database", async () => {
    const name = "John Doe";
    const id = await Database.getInstance().addAlarm(name);
    const alarm = await Database.getInstance().getAlarm(id);
    expect(alarm).toEqual({ id, name });
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
  test("should throw an error if a alarm with the same name already exists", async () => {
    const name = "John Doe";
    await Database.getInstance().addAlarm(name);
    await expect(Database.getInstance().addAlarm(name)).rejects.toThrow();
  });
  /**
   *  test case Search for alarms by name
   */
  test("searchAlarms should return alarms with matching names", async () => {
    const datas = [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ];
    for (const data of datas) {
      await Database.getInstance().addAlarm(data.name);
    }
    const searchResults = await Database.getInstance().searchAlarms("John");
    expect(searchResults).toHaveLength(1);
  });
});
