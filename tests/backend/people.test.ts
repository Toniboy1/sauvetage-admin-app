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
    await Database.getInstance().clearPeople();
  });

  /**
   * Test case for adding a new person to the database.
   */
  test("addPerson should add a new person to the database", async () => {
    const name = "John Doe";
    const id = await Database.getInstance().addPerson(name);
    const person = await Database.getInstance().getPerson(id);
    expect(person).toEqual({ id, name });
  });

  /**
   * Test case for updating a person's name in the database.
   */
  test("updatePerson should update a person's name in the database", async () => {
    const name = "John Doe";
    const newName = "Jane Smith";
    const id = await Database.getInstance().addPerson(name);
    await Database.getInstance().updatePerson(id, newName);
    const updatedPerson = await Database.getInstance().getPerson(id);

    expect(updatedPerson).toEqual({ id, name: newName });
  });

  /**
   * Test case for deleting a person from the database.
   */
  test("deletePerson should delete a person from the database", async () => {
    const name = "John Doe";

    const id = await Database.getInstance().addPerson(name);
    await Database.getInstance().deletePerson(id);
    const deletedPerson = await Database.getInstance().getPerson(id);

    expect(deletedPerson).toBeUndefined();
  });

  /**
   * Test case for retrieving all people from the database.
   */
  test("getAllPeople should return all people from the database", async () => {
    const people = [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ];
    for (const person of people) {
      await Database.getInstance().addPerson(person.name);
    }
    const allPeople = await Database.getInstance().getAllPeople();
    expect(allPeople).toHaveLength(people.length);
    expect(allPeople.map((p) => p.name)).toEqual(
      expect.arrayContaining(people.map((p) => p.name)),
    );
  });
  /**
   * Test case for clearing all people from the database.
   */
  test("clearPeople should delete all people from the database", async () => {
    const people = [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ];
    for (const person of people) {
      await Database.getInstance().addPerson(person.name);
    }
    await Database.getInstance().clearPeople();
    const allPeople = await Database.getInstance().getAllPeople();
    expect(allPeople).toHaveLength(0);
  });
  /**
   * Test case for fetching a person from the database.
   */
  test("getPerson should fetch a person from the database", async () => {
    const name = "John Doe";
    const id = await Database.getInstance().addPerson(name);
    const person = await Database.getInstance().getPerson(id);
    expect(person).toEqual({ id, name });
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
  test("should throw an error if a person with the same name already exists", async () => {
    const name = "John Doe";
    await Database.getInstance().addPerson(name);
    await expect(db.addPerson(name)).rejects.toThrow();
  });
});
