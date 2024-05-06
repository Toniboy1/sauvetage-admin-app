import Dexie, { UpdateSpec } from "dexie";
import { IPeople } from "../../components/people/types";
import { IAlarm } from "../../components/alarm/types";
import { ISeverity } from "../../components/severities/types";
import { IIntervention } from "../../components/interventions/types";
import { IOtherMean } from "../../components/otherMeans/types";
import { ICause } from "../../components/causes/types";
import { IAction } from "../../components/actions/types";
import { ICommonLocation } from "../../components/location/types";
import { IInterventionFormData } from "../../components/reports/intervention/types";

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
    actions: Dexie.Table<IAction, number>;
    commonlocations: Dexie.Table<ICommonLocation, number>;
    forminterventions: Dexie.Table<IInterventionFormData, number>;
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
            actions: '++id, &name',
            commonlocations: '++id, &name',
            forminterventions: '++id, startedAt, endedAt, date, pilote, crew'
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
    deletePerson(id: number) {
        return this.people.delete(id);
    }
    /**
     *  Search people by name
     * @param input search people by name
     * @returns  A promise that resolves with the list of people.
     */
    searchPeople(input: string): Promise<IPeople[]> {
        return this.people.where('name').startsWithIgnoreCase(input).toArray();
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
     * Fetches an action from the database.
     * @param id The ID of the action to fetch.
     * @returns A promise that resolves with the action.
     */
    async getAction(id: number): Promise<IAction> {
        return this.actions.get(id);
    }

    /**
     * Adds a new action to the database.
     * @param name The name of the action to add.
     * @returns A promise that resolves with the new action's ID.
     */
    async addAction(name: string): Promise<number> {
        return this.actions.add({
            name: name
        });
    }

    /**
     * Updates an action's name in the database.
     * @param id The ID of the action to update.
     * @param name The new name for the action.
     * @returns A promise that resolves with the action's ID.
     */
    async updateAction(id: number, name: string): Promise<number> {
        return this.actions.update(id, { name });
    }
    /**
     * Deletes an action from the database.
     * @param id The ID of the action to delete.
     * @returns A promise that resolves when the action is deleted.
     */
    async deleteAction(id: number): Promise<void> {
        return this.actions.delete(id);
    }
    /**
     * Fetches all alarms from the database.
     * @returns A promise that resolves with the list of all alarms.
     */
    async getAllActions(): Promise<Array<IAction>> {
        return this.actions.toArray() as Promise<Array<IAction>>;
    }

    /**
     * Deletes all actions from the database.
     */
    async clearActions() {
        try {
            await this.transaction('rw', this.actions, async () => {
                await this.actions.clear();
            });
        } catch (error) {
            console.error("Failed to clear the actions table:", error);
            throw error;
        }
    }
    /**
     * Fetches an commonlocation from the database.
     * @param id The ID of the commonlocation to fetch.
     * @returns A promise that resolves with the commonlocation.
     */
    async getCommonLocation(id: number): Promise<ICommonLocation> {
        return this.commonlocations.get(id);
    }

    /**
     * Adds a new commonlocation to the database.
     * @param name The name of the commonlocation to add.
     * @returns A promise that resolves with the new commonlocation's ID.
     */
    async addCommonLocation(name: string): Promise<number> {
        return this.commonlocations.add({
            name: name
        });
    }

    /**
     * Updates an commonlocation's name in the database.
     * @param id The ID of the commonlocation to update.
     * @param name The new name for the commonlocation.
     * @returns A promise that resolves with the commonlocation's ID.
     */
    async updateCommonLocation(id: number, name: string): Promise<number> {
        return this.commonlocations.update(id, { name });
    }
    /**
     * Deletes an commonlocation from the database.
     * @param id The ID of the commonlocation to delete.
     * @returns A promise that resolves when the commonlocation is deleted.
     */
    async deleteCommonLocation(id: number): Promise<void> {
        return this.commonlocations.delete(id);
    }
    /**
     * Fetches all alarms from the database.
     * @returns A promise that resolves with the list of all alarms.
     */
    async getAllCommonLocations(): Promise<Array<ICommonLocation>> {
        return this.commonlocations.toArray() as Promise<Array<ICommonLocation>>;
    }

    /**
     * Deletes all commonlocations from the database.
     */
    async clearCommonLocations() {
        try {
            await this.transaction('rw', this.commonlocations, async () => {
                await this.commonlocations.clear();
            });
        } catch (error) {
            console.error("Failed to clear the commonlocations table:", error);
            throw error;
        }
    }
    /**
     * Fetches all forminterventions from the database.
     * @returns A promise that resolves with the list of all forminterventions.
     */
    async getAllFormInterventions(): Promise<Array<IInterventionFormData>> {
        return this.forminterventions.toArray() as Promise<Array<IInterventionFormData>>;
    }

    /**
     * Deletes all forminterventions from the database.
     */
    async clearFormInterventions() {
        try {
            await this.transaction('rw', this.forminterventions, async () => {
                await this.forminterventions.clear();
            });
        } catch (error) {
            console.error("Failed to clear the forminterventions table:", error);
            throw error;
        }
    }

    /**
     * Fetches a formintervention from the database.
     * @param id The ID of the formintervention to fetch.
     * @returns A promise that resolves with the formintervention.
     */
    async getFormIntervention(id: number): Promise<IInterventionFormData> {
        return this.forminterventions.get(id);
    }

    /**
     * Adds a new formintervention to the database.
     * @param formintervention The formintervention to add.
     * @returns A promise that resolves with the new formintervention's ID.
     */
    async addFormIntervention(formintervention: IInterventionFormData): Promise<number> {
        return this.forminterventions.add(formintervention);
    }

    /**
     * Updates a formintervention in the database.
     * @param id The ID of the formintervention to update.
     * @param formintervention The new formintervention data.
     * @returns A promise that resolves with the formintervention's ID.
     */
    async updateFormIntervention(id: number, formintervention: IInterventionFormData): Promise<number> {
        const changes: UpdateSpec<IInterventionFormData> = { ...formintervention };
        return this.forminterventions.update(id, changes);
    }

    /**
     * Deletes a formintervention from the database.
     * @param id The ID of the formintervention to delete.
     * @returns A promise that resolves when the formintervention is deleted.
     */
    async deleteFormIntervention(id: number): Promise<void> {
        return this.forminterventions.delete(id);
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
        await this.clearActions();
        await this.clearCommonLocations();
        await this.clearFormInterventions();
    }
}

const db = new Database();
export default db;
