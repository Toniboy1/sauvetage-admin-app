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
    await db.clearActions();
  });

  /**
   * Test case for adding a new action to the database.
   */
  test("addAction should add a new action to the database", async () => {
    const name = "John Doe";
    const id = await db.addAction(name);
    const action = await db.getAction(id);
    expect(action).toEqual({ id, name });
  });

  /**
   * Test case for updating a action's name in the database.
   */
  test("updateAction should update a action's name in the database", async () => {
    const name = "John Doe";
    const newName = "Jane Smith";
    const id = await db.addAction(name);
    await db.updateAction(id, newName);
    const updatedAction = await db.getAction(id);

    expect(updatedAction).toEqual({ id, name: newName });
  });

  /**
   * Test case for deleting a action from the database.
   */
  test("deleteAction should delete a action from the database", async () => {
    const name = "John Doe";

    const id = await db.addAction(name);
    await db.deleteAction(id);
    const deletedAction = await db.getAction(id);

    expect(deletedAction).toBeUndefined();
  });

  /**
   * Test case for retrieving all actions from the database.
   */
  test("getAllActions should return all actions from the database", async () => {
    const actions = [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ];
    for (const action of actions) {
      await db.addAction(action.name);
    }
    const allActions = await db.getAllActions();
    expect(allActions).toHaveLength(actions.length);
    expect(allActions.map(p => p.name)).toEqual(expect.arrayContaining(actions.map(p => p.name)));
  });
  /**
   * Test case for clearing all actions from the database.
   */
  test("clearActions should delete all actions from the database", async () => {
    const actions = [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ];
    for (const action of actions) {
      await db.addAction(action.name);
    }
    await db.clearActions();
    const allActions = await db.getAllActions();
    expect(allActions).toHaveLength(0);
  }
  );
  /**
   * Test case for fetching a action from the database.
   */
  test("getAction should fetch a action from the database", async () => {
    const name = "John Doe";
    const id = await db.addAction(name);
    const action = await db.getAction(id);
    expect(action).toEqual({ id, name });
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
  test("should throw an error if a action with the same name already exists", async () => {
    const name = "John Doe";
    await db.addAction(name);
    await expect(db.addAction(name)).rejects.toThrow();
  }
  );
});
