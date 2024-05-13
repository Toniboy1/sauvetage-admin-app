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
    await Database.getInstance().clearUsers();
  });

  /**
   * Test case for adding a new user to the database.
   */
  test("addUser should add a new user to the database", async () => {
    const name = "John Doe";
    const password = "password";
    const id = await Database.getInstance().addUser(name,password);
    const user = await Database.getInstance().getUser(id);
    const res = await  Database.getInstance().comparePassword(password,user.password);
    expect(res).toBe(true);
  });

  /**
   * Test case for updating a user's name in the database.
   */
  test("updateUser should update a user's name in the database", async () => {
    const name = "John Doe";
    const password = "password";
    const newName = "Jane Smith";
    const id = await Database.getInstance().addUser(name,password);
    await Database.getInstance().updateUser(id, newName, password);
    const updatedUser = await Database.getInstance().getUser(id);
    const res = await  Database.getInstance().comparePassword(password,updatedUser.password);
    expect(res).toBe(true);
    expect({id:updatedUser.id, username:updatedUser.username}).toEqual({ id, username: newName });
  });

  /**
   * Test case for deleting a user from the database.
   */
  test("deleteUser should delete a user from the database", async () => {
    const name = "John Doe";
    const password = "password";
    const id = await Database.getInstance().addUser(name,password);
    await Database.getInstance().deleteUser(id);
    const deletedUser = await Database.getInstance().getUser(id);

    expect(deletedUser).toBeUndefined();
  });

  /**
   * Test case for retrieving all users from the database.
   */
  test("getAllUsers should return all users from the database", async () => {
    const users = [
      { username: "John Doe",password: "password"},
      { username: "Jane Smith",password: "password"},
      { username: "Bob Johnson",password: "password"},
    ];
    for (const user of users) {
      await Database.getInstance().addUser(user.username,user.password);
    }
    const allUsers = await Database.getInstance().getAllUsers();
    expect(allUsers).toHaveLength(users.length);
    expect(allUsers.map((p) => p.username)).toEqual(
      expect.arrayContaining(users.map((p) => p.username)),
    );
  });
  /**
   * Test case for clearing all users from the database.
   */
  test("clearUsers should delete all users from the database", async () => {
    const users = [
      { username: "John Doe",password: "password"},
      { username: "Jane Smith",password: "password"},
      { username: "Bob Johnson",password: "password"},
    ];
    for (const user of users) {
      await Database.getInstance().addUser(user.username,user.password);
    }
    await Database.getInstance().clearUsers();
    const allUsers = await Database.getInstance().getAllUsers();
    expect(allUsers).toHaveLength(0);
  });
  /**
   * Test case for fetching a user from the database.
   */
  test("getUser should fetch a user from the database", async () => {
    const name = "John Doe";
    const password = "password";
    const id = await Database.getInstance().addUser(name,password);
    const user = await Database.getInstance().getUser(id);
    const res = await  Database.getInstance().comparePassword(password,user.password);
    expect(res).toBe(true);
    expect({id:user.id, username:user.username}).toEqual({ id, username: name });
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
  test("should throw an error if a user with the same name already exists", async () => {
    const name = "John Doe";
    const password = "password";
    await Database.getInstance().addUser(name,password);
    await expect(Database.getInstance().addUser(name,password)).rejects.toThrow();
  });
  /**
   *  test case Search for users by name
   */
  test("searchUsers should return aczions with matching names", async () => {
    const datas = [
      { username: "John Doe",password: "password"},
      { username: "Jane Smith",password: "password"},
      { username: "Bob Johnson",password: "password"},
    ];
    for (const data of datas) {
      await Database.getInstance().addUser(data.username,data.password);
    }
    const searchResults = await Database.getInstance().searchUsers("John");
    expect(searchResults).toHaveLength(1);
  });

  /**
   * Test case for matching a user by username and password.
   */
  test("matchUser should return the ID of the matching user", async () => {
    const name = "John Doe";
    const password = "password";
    const id = await Database.getInstance().addUser(name,password);
    const matchedId = await Database.getInstance().matchUser(name, password);
    expect(matchedId).toBe(id);
  })
  /**
   * Test case for not matching a user by username and password.
   */
  test("matchUser should return null if no user matches the credentials", async () => {
    const name = "John Doe";
    const password = "password";
    await Database.getInstance().addUser(name,password);
    const matchedId = await Database.getInstance().matchUser(name, "wrongpassword");
    expect(matchedId).toBeNull();
  });
});
