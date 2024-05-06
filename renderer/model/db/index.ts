import Dexie from "dexie";
import { IPeople } from "../../components/people/types";
import { IAlarm } from "../../components/alarm/types";
import { ISeverity } from "../../components/severities/types";
import { IIntervention } from "../../components/interventions/types";
import { IOtherMean } from "../../components/otherMeans/types";
import { ICause } from "../../components/causes/types";

/**
 * Sets up and manages the database using Dexie.js.
 */
export class Database extends Dexie {
    people: Dexie.Table<IPeople, number>;
    alarms: Dexie.Table<IAlarm, number>;
    severities: Dexie.Table<ISeverity, number>;
    interventions: Dexie.Table<IIntervention, number>;
    otherMeans: Dexie.Table<IOtherMean, number>;
    causes: Dexie.Table<ICause, number>;
    /**
     * Represents the database index.
     * @param isTest - Indicates whether the database is for testing purposes.
     */
    constructor(isTest = false) {
        super(isTest ? "test-local-storage" : "local-strorage");
        this.version(1).stores({
            people: '++id, &name',
            alarms: '++id, &name',
            severities: '++id, &name',
            interventions: '++id, &name',
            otherMeans: '++id, &name',
            causes: '++id, &name',
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


    /**
     * Fetches an intervention from the database.
     * @param id The ID of the intervention to fetch.
     * @returns A promise that resolves with the intervention.
     */
    async getIntervention(id: number): Promise<IIntervention> {
        return this.interventions.get(id);
    }

    /**
     * Adds a new intervention to the database.
     * @param name The name of the intervention to add.
     * @returns A promise that resolves with the new intervention's ID.
     */
    async addIntervention(name: string): Promise<number> {
        return this.interventions.add({
            name: name
        });
    }

    /**
     * Updates an intervention's name in the database.
     * @param id The ID of the intervention to update.
     * @param name The new name for the intervention.
     * @returns A promise that resolves with the intervention's ID.
     */
    async updateIntervention(id: number, name: string): Promise<number> {
        return this.interventions.update(id, { name });
    }
    /**
     * Deletes an intervention from the database.
     * @param id The ID of the intervention to delete.
     * @returns A promise that resolves when the intervention is deleted.
     */
    async deleteIntervention(id: number): Promise<void> {
        return this.interventions.delete(id);
    }
    /**
     * Fetches all alarms from the database.
     * @returns A promise that resolves with the list of all alarms.
     */
    async getAllInterventions(): Promise<Array<IIntervention>> {
        return this.interventions.toArray() as Promise<Array<IIntervention>>;
    }

    /**
     * Deletes all interventions from the database.
     */
    async clearInterventions() {
        try {
            await this.transaction('rw', this.interventions, async () => {
                await this.interventions.clear();
            });
        } catch (error) {
            console.error("Failed to clear the interventions table:", error);
            throw error;
        }
    }

    /**
     * Fetches an othermean from the database.
     * @param id The ID of the othermean to fetch.
     * @returns A promise that resolves with the othermean.
     */
    async getOtherMean(id: number): Promise<IOtherMean> {
        return this.otherMeans.get(id);
    }

    /**
     * Adds a new othermean to the database.
     * @param name The name of the othermean to add.
     * @returns A promise that resolves with the new othermean's ID.
     */
    async addOtherMean(name: string): Promise<number> {
        return this.otherMeans.add({
            name: name
        });
    }

    /**
     * Updates an othermean's name in the database.
     * @param id The ID of the othermean to update.
     * @param name The new name for the othermean.
     * @returns A promise that resolves with the othermean's ID.
     */
    async updateOtherMean(id: number, name: string): Promise<number> {
        return this.otherMeans.update(id, { name });
    }
    /**
     * Deletes an othermean from the database.
     * @param id The ID of the othermean to delete.
     * @returns A promise that resolves when the othermean is deleted.
     */
    async deleteOtherMean(id: number): Promise<void> {
        return this.otherMeans.delete(id);
    }
    /**
     * Fetches all alarms from the database.
     * @returns A promise that resolves with the list of all alarms.
     */
    async getAllOtherMeans(): Promise<Array<IOtherMean>> {
        return this.otherMeans.toArray() as Promise<Array<IOtherMean>>;
    }

    /**
     * Deletes all othermeans from the database.
     */
    async clearOtherMeans() {
        try {
            await this.transaction('rw', this.otherMeans, async () => {
                await this.otherMeans.clear();
            });
        } catch (error) {
            console.error("Failed to clear the othermeans table:", error);
            throw error;
        }
    }
    /**
     * Fetches an cause from the database.
     * @param id The ID of the cause to fetch.
     * @returns A promise that resolves with the cause.
     */
    async getCause(id: number): Promise<ICause> {
        return this.causes.get(id);
    }

    /**
     * Adds a new cause to the database.
     * @param name The name of the cause to add.
     * @returns A promise that resolves with the new cause's ID.
     */
    async addCause(name: string): Promise<number> {
        return this.causes.add({
            name: name
        });
    }

    /**
     * Updates an cause's name in the database.
     * @param id The ID of the cause to update.
     * @param name The new name for the cause.
     * @returns A promise that resolves with the cause's ID.
     */
    async updateCause(id: number, name: string): Promise<number> {
        return this.causes.update(id, { name });
    }
    /**
     * Deletes an cause from the database.
     * @param id The ID of the cause to delete.
     * @returns A promise that resolves when the cause is deleted.
     */
    async deleteCause(id: number): Promise<void> {
        return this.causes.delete(id);
    }
    /**
     * Fetches all alarms from the database.
     * @returns A promise that resolves with the list of all alarms.
     */
    async getAllCauses(): Promise<Array<ICause>> {
        return this.causes.toArray() as Promise<Array<ICause>>;
    }

    /**
     * Deletes all causes from the database.
     */
    async clearCauses() {
        try {
            await this.transaction('rw', this.causes, async () => {
                await this.causes.clear();
            });
        } catch (error) {
            console.error("Failed to clear the causes table:", error);
            throw error;
        }
    }

    /**
     * Deletes all data from the database.
     */
    async clearAll() {
        await this.clearPeople();
        await this.clearAlarms();
        await this.clearSeverities();
        await this.clearInterventions();
        await this.clearOtherMeans();
        await this.clearCauses();
    }
}

const db = new Database();
export default db;
