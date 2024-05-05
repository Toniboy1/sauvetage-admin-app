import Dexie from "dexie";
import { IPeople } from "../../components/people/types";

/**
 * Sets up and manages the database using Dexie.js.
 */
export class Database extends Dexie {
    people: Dexie.Table<IPeople, number>;
    /**
     * Represents the database index.
     * @param isTest - Indicates whether the database is for testing purposes.
     */
    constructor(isTest = false) {
        super(isTest ? "test-local-storage" : "local-strorage");
        this.version(1).stores({
            people: '++id, &name' 
        });

    }
    /**
     * Fetches all people from the database.
     * @returns A promise that resolves with the list of all people.
     */
    async getAllPeople(): Promise<Array<IPeople>> {
        return this.people.toArray() as Promise<Array<IPeople>>;
    }
    /**
     * Deletes all people from the database.
     */
    async clearPeople() {
        try {
            await this.transaction('rw', this.people, async () => {
                await this.people.clear();
            });
        } catch (error) {
            console.error("Failed to clear the people table:", error);
            throw error;
        }
    }

    /**
     * Fetches a person from the database.
     * @param id The ID of the person to fetch.
     * @returns A promise that resolves with the person.
     */
    async getPerson(id: number): Promise<IPeople> {
        return this.people.get(id);
    }

    /**
     * Adds a new person to the database.
     * @param name The name of the person to add.
     * @returns A promise that resolves with the new person's ID.
     */
    async addPerson(name: string): Promise<number> {
        return this.people.add({
            name: name
        });
    }

    /**
     * Updates a person's name in the database.
     * @param id The ID of the person to update.
     * @param name The new name for the person.
     * @returns A promise that resolves with the person's ID.
     */
    async updatePerson(id: number, name: string): Promise<number> {
        return this.people.update(id, { name });
    }
    /**
     * Deletes a person from the database.
     * @param id The ID of the person to delete.
     * @returns A promise that resolves when the person is deleted.
     */
    async deletePerson(id: number): Promise<void> {
        return this.people.delete(id);
    }
}

const db = new Database();
export default db;
