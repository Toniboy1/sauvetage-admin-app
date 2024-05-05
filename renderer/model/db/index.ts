import Dexie from 'dexie';
import { IPeople } from '../../components/people/types';

/**
 * Sets up and manages the database using Dexie.js.
 */
class Database extends Dexie {
    people: any;
    constructor() {
        super("local-storage");
        this.version(1).stores({
            people: '++id, name' 
        });

        this.people.hook('creating', (primaryKey, obj, transaction) => {
            console.log(`A new person is being added: ${obj.name}`);
        });
    }

    /**
     * Fetches all people from the database.
     * @returns {Promise<Array>} A promise that resolves with the list of all people.
     */
    async getAllPeople(): Promise<Array<IPeople>> {
        return this.people.toArray();
    }

    async getPerson(id: number): Promise<IPeople> {
        return this.people.get(id);
    }

    /**
     * Adds a new person to the database.
     * @param {string} name The name of the person to add.
     * @returns {Promise<number>} A promise that resolves with the new person's ID.
     */
    async addPerson(name: string): Promise<number> {
        return this.people.add({ name });
    }

    /**
     * Updates a person's name in the database.
     * @param {number} id The ID of the person to update.
     * @param {string} name The new name for the person.
     * @returns {Promise<void>} A promise that resolves when the person is updated
     * */
    async updatePerson(id:number, name:string): Promise<void> {
        return this.people.update(id, { name }); 
    }
    /**
     * Deletes a person from the database.
     * @param {number} id The ID of the person to delete.
     * @returns {Promise<void>} A promise that resolves when the person is deleted.
     */
    async deletePerson(id:number): Promise<void> {
        return this.people.delete(id);
    }
}

const db = new Database();
export default db;
