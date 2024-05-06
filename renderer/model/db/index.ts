import Dexie from "dexie";
import { IPeople } from "../../components/people/types";
import { IAlarm } from "../../components/alarm/types";
import { ISeverity } from "../../components/severities/types";

/**
 * Sets up and manages the database using Dexie.js.
 */
export class Database extends Dexie {
    people: Dexie.Table<IPeople, number>;
    alarms: Dexie.Table<IAlarm, number>;
    severities: Dexie.Table<ISeverity, number>;
    /**
     * Represents the database index.
     * @param isTest - Indicates whether the database is for testing purposes.
     */
    constructor(isTest = false) {
        super(isTest ? "test-local-storage" : "local-strorage");
        this.version(1).stores({
            people: '++id, &name',
            alarms: '++id, &name',
            severities: '++id, &name'
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

    /**
     * Fetches all alarms from the database.
     * @returns A promise that resolves with the list of all alarms.
     */
    async getAllAlarms(): Promise<Array<IAlarm>> {
        return this.alarms.toArray() as Promise<Array<IAlarm>>;
    }

    /**
     * Deletes all alarms from the database.
     */
    async clearAlarms() {
        try {
            await this.transaction('rw', this.alarms, async () => {
                await this.alarms.clear();
            });
        } catch (error) {
            console.error("Failed to clear the alarms table:", error);
            throw error;
        }
    }

    /**
     * Fetches an alarm from the database.
     * @param id The ID of the alarm to fetch.
     * @returns A promise that resolves with the alarm.
     */
    async getAlarm(id: number): Promise<IAlarm> {
        return this.alarms.get(id);
    }

    /**
     * Adds a new alarm to the database.
     * @param name The name of the alarm to add.
     * @returns A promise that resolves with the new alarm's ID.
     */
    async addAlarm(name: string): Promise<number> {
        return this.alarms.add({
            name: name
        });
    }

    /**
     * Updates an alarm's name in the database.
     * @param id The ID of the alarm to update.
     * @param name The new name for the alarm.
     * @returns A promise that resolves with the alarm's ID.
     */
    async updateAlarm(id: number, name: string): Promise<number> {
        return this.alarms.update(id, { name });
    }
    /**
     * Deletes an alarm from the database.
     * @param id The ID of the alarm to delete.
     * @returns A promise that resolves when the alarm is deleted.
     */
    async deleteAlarm(id: number): Promise<void> {
        return this.alarms.delete(id);
    }

    /**
     * Deletes all data from the database.
     */
    async clearAll() {
        await this.clearPeople();
        await this.clearAlarms();
        await this.clearSeverities();
    }

    /**
     * Fetches all severities from the database.
     * @returns A promise that resolves with the list of all severities.
     */
    async getAllSeverities(): Promise<Array<ISeverity>> {
        return this.severities.toArray() as Promise<Array<ISeverity>>;
    }

    /**
     * Deletes all severities from the database.
     */
    async clearSeverities() {
        try {
            await this.transaction('rw', this.severities, async () => {
                await this.severities.clear();
            });
        } catch (error) {
            console.error("Failed to clear the severities table:", error);
            throw error;
        }
    }

    /**
     * Fetches an severity from the database.
     * @param id The ID of the severity to fetch.
     * @returns A promise that resolves with the severity.
     */
    async getSeverity(id: number): Promise<ISeverity> {
        return this.severities.get(id);
    }

    /**
     * Adds a new severity to the database.
     * @param name The name of the severity to add.
     * @returns A promise that resolves with the new severity's ID.
     */
    async addSeverity(name: string): Promise<number> {
        return this.severities.add({
            name: name
        });
    }

    /**
     * Updates an severity's name in the database.
     * @param id The ID of the severity to update.
     * @param name The new name for the severity.
     * @returns A promise that resolves with the severity's ID.
     */
    async updateSeverity(id: number, name: string): Promise<number> {
        return this.severities.update(id, { name });
    }
    /**
     * Deletes an severity from the database.
     * @param id The ID of the severity to delete.
     * @returns A promise that resolves when the severity is deleted.
     */
    async deleteSeverity(id: number): Promise<void> {
        return this.severities.delete(id);
    }
    
}

const db = new Database();
export default db;
