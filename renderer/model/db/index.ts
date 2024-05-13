import bcrypt from "bcryptjs";
import dayjs from "dayjs";
import Dexie, { UpdateSpec } from "dexie";
import IDBExportImport from "indexeddb-export-import";
import { IAction } from "../../components/actions/types";
import { IAlarm } from "../../components/alarm/types";
import { ICause } from "../../components/causes/types";
import { IInterventionType } from "../../components/interventions/types";
import { ILakeState } from "../../components/lakeStates/types";
import { ICommonLocation } from "../../components/location/types";
import { IOtherMean } from "../../components/otherMeans/types";
import { IPeople } from "../../components/people/types";
import {
  IInterventionData,
  IInterventionFormData,
} from "../../components/reports/intervention/types";
import { ISeverity } from "../../components/severities/types";
import { IUser } from "../../components/users/types";
import { IWeather } from "../../components/weathers/types";
import { IWind } from "../../components/winds/types";

/**
 * Sets up and manages the database using Dexie.js.
 */
export class Database extends Dexie {
  static instance: Database;
  people: Dexie.Table<IPeople, number>;
  alarms: Dexie.Table<IAlarm, number>;
  severities: Dexie.Table<ISeverity, number>;
  interventions: Dexie.Table<IInterventionType, number>;
  otherMeans: Dexie.Table<IOtherMean, number>;
  causes: Dexie.Table<ICause, number>;
  actions: Dexie.Table<IAction, number>;
  commonlocations: Dexie.Table<ICommonLocation, number>;
  forminterventions: Dexie.Table<IInterventionData, number>;
  weathers: Dexie.Table<IWeather, number>;
  winds: Dexie.Table<IWind, number>;
  lakeStates: Dexie.Table<ILakeState, number>;
  users: Dexie.Table<IUser, number>;
  /**
   * Represents the database index.
   * @param isTest - Indicates whether the database is for testing purposes.
   */
  private constructor(isTest = false) {
    super(isTest ? "test-local-storage" : "local-strorage");
    this.version(1).stores({
      people: "++id, &name",
      alarms: "++id, &name",
      severities: "++id, &name",
      interventions: "++id, &name",
      otherMeans: "++id, &name",
      causes: "++id, &name",
      actions: "++id, &name",
      commonlocations: "++id, &name",
      forminterventions: "++id, date",
      weathers: "++id, &name",
      winds: "++id, &name",
      lakeStates: "++id, &name",
      users: "++id, &username",
    });
  }
  /**
   * Create default user for the application
   */
  async init() {
    const users = await this.getAllUsers();
    if (users.length === 0) {
      await this.addUser("admin", "admin");
    }
  }
  /**
   * Delete the current instance of the database and clean the local storage.
   */
  async deleteDb() {
    Database.instance = undefined;
    await this.close();
    await this.delete();
  }

  /**
   * Get the singleton instance of the database.
   * @param isTest - Indicates whether the database is for testing purposes.
   * @returns The database instance.
   */
  static getInstance(isTest = true): Database {
    if (!Database.instance) {
      Database.setInstance(new Database(isTest));
      Database.instance.init();
    }
    return Database.instance;
  }
  /**
   * Set current instance with new database
   * @param instance - The new instance of the database.
   * @returns The database instance.
   */
  static setInstance(instance: Database): Database {
    Database.instance = instance;
    return Database.instance;
  }

  /**
   * get current IDB database
   * @returns The IDB database.
   */
  getIdbDatabase() {
    return this.backendDB();
  }
  /**
   * Imports a database from a file and reinitializes the class instance.
   * @param file The file to import.
   * @returns A promise that resolves when the database is successfully re-initialized.
   */
  async importDatabase(file: File): Promise<void> {
    try {
      const jsonString = await new Promise<string>((resolve, reject) => {
        IDBExportImport.exportToJsonString(
          this.getIdbDatabase(),
          (error, jsonString) => {
            if (error) {
              console.error("Serialization failed: ", error);
              reject(error);
            } else {
              resolve(jsonString);
            }
          },
        );
      });
      await new Promise<void>((resolve, reject) => {
        IDBExportImport.clearDatabase(this.getIdbDatabase(), (clearError) => {
          if (clearError) {
            console.error(
              "Failed to clear the data before importing: ",
              clearError,
            );
            reject(clearError);
          } else {
            resolve();
          }
        });
      });
      const text = await file.text();
      await new Promise<void>((resolve, reject) => {
        IDBExportImport.importFromJsonString(
          this.getIdbDatabase(),
          text,
          (importError) => {
            if (importError) {
              console.error("Import failed: ", importError);
              IDBExportImport.importFromJsonString(
                this.getIdbDatabase(),
                jsonString,
                (restoreError) => {
                  if (restoreError) {
                    console.error(
                      "Failed to restore database from backup: ",
                      restoreError,
                    );
                  }
                  reject(importError);
                },
              );
            } else {
              resolve();
            }
          },
        );
      });
    } catch (textError) {
      console.error("Failed during import process: ", textError);
      throw textError;
    }
  }

  /**
   * Export the database to a file.
   * @returns A promise that resolves with the exported file.
   */
  async exportDatabase(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      IDBExportImport.exportToJsonString(
        this.getIdbDatabase(),
        (error, jsonString) => {
          if (error) {
            console.error("Export failed: ", error);
            reject(error);
          } else {
            // Convert jsonString to Blob
            const blob = new Blob([jsonString], { type: "application/json" });
            resolve(blob);
          }
        },
      );
    });
  }

  /**
   * Clear all data from the database
   */
  async clearAllData() {
    return new Promise<void>((resolve, reject) => {
      IDBExportImport.clearDatabase(this.getIdbDatabase(), (error) => {
        if (error) {
          console.error("Failed to clear the database: ", error);
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Fetches all people from the database.
   * @returns A promise that resolves with the list of all people.
   */
  async getAllPeople(): Promise<Array<IPeople>> {
    return this.people.orderBy("name").toArray() as Promise<Array<IPeople>>;
  }
  /**
   * Deletes all people from the database.
   */
  async clearPeople() {
    try {
      await this.transaction("rw", this.people, async () => {
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
      name: name,
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
    return this.people.where("name").startsWithIgnoreCase(input).toArray();
  }

  /**
   * Fetches all alarms from the database.
   * @returns A promise that resolves with the list of all alarms.
   */
  async getAllAlarms(): Promise<Array<IAlarm>> {
    return this.alarms.orderBy("name").toArray() as Promise<Array<IAlarm>>;
  }

  /**
   * Deletes all alarms from the database.
   */
  async clearAlarms() {
    try {
      await this.transaction("rw", this.alarms, async () => {
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
      name: name,
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
   *  Search alarm by name
   * @param input search params
   * @returns list of alarms
   */
  async searchAlarms(input: string): Promise<IAlarm[]> {
    return this.alarms.where("name").startsWithIgnoreCase(input).toArray();
  }

  /**
   * Fetches all severities from the database.
   * @returns A promise that resolves with the list of all severities.
   */
  async getAllSeverities(): Promise<Array<ISeverity>> {
    return this.severities.orderBy("name").toArray() as Promise<
      Array<ISeverity>
    >;
  }

  /**
   * Deletes all severities from the database.
   */
  async clearSeverities() {
    try {
      await this.transaction("rw", this.severities, async () => {
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
      name: name,
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
   * Search severity by name
   * @param input search params
   * @returns matched severities
   */
  async searchSeverities(input: string): Promise<ISeverity[]> {
    return this.severities.where("name").startsWithIgnoreCase(input).toArray();
  }

  /**
   * Fetches an intervention from the database.
   * @param id The ID of the intervention to fetch.
   * @returns A promise that resolves with the intervention.
   */
  async getIntervention(id: number): Promise<IInterventionType> {
    return this.interventions.get(id);
  }

  /**
   * Adds a new intervention to the database.
   * @param name The name of the intervention to add.
   * @returns A promise that resolves with the new intervention's ID.
   */
  async addIntervention(name: string): Promise<number> {
    return this.interventions.add({
      name: name,
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
  async getAllInterventions(): Promise<Array<IInterventionType>> {
    return this.interventions.orderBy("name").toArray() as Promise<
      Array<IInterventionType>
    >;
  }

  /**
   * Deletes all interventions from the database.
   */
  async clearInterventions() {
    try {
      await this.transaction("rw", this.interventions, async () => {
        await this.interventions.clear();
      });
    } catch (error) {
      console.error("Failed to clear the interventions table:", error);
      throw error;
    }
  }

  /**
   *  Search interventions by name
   * @param input search params
   * @returns  matched interventions
   */
  async searchInterventions(input: string): Promise<IInterventionType[]> {
    return this.interventions
      .where("name")
      .startsWithIgnoreCase(input)
      .toArray();
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
      name: name,
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
    return this.otherMeans.orderBy("name").toArray() as Promise<
      Array<IOtherMean>
    >;
  }

  /**
   * Deletes all othermeans from the database.
   */
  async clearOtherMeans() {
    try {
      await this.transaction("rw", this.otherMeans, async () => {
        await this.otherMeans.clear();
      });
    } catch (error) {
      console.error("Failed to clear the othermeans table:", error);
      throw error;
    }
  }

  /**
   *  Search other means by name
   * @param input search params
   * @returns  matched other means
   */
  async searchOtherMeans(input: string): Promise<IOtherMean[]> {
    return this.otherMeans.where("name").startsWithIgnoreCase(input).toArray();
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
      name: name,
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
    return this.causes.orderBy("name").toArray() as Promise<Array<ICause>>;
  }

  /**
   * Deletes all causes from the database.
   */
  async clearCauses() {
    try {
      await this.transaction("rw", this.causes, async () => {
        await this.causes.clear();
      });
    } catch (error) {
      console.error("Failed to clear the causes table:", error);
      throw error;
    }
  }

  /**
   * Search cause by name
   * @param input search params
   * @returns matched causes
   */
  async searchCause(input: string): Promise<ICause[]> {
    return this.causes.where("name").startsWithIgnoreCase(input).toArray();
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
      name: name,
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
    return this.actions.orderBy("name").toArray() as Promise<Array<IAction>>;
  }

  /**
   * Deletes all actions from the database.
   */
  async clearActions() {
    try {
      await this.transaction("rw", this.actions, async () => {
        await this.actions.clear();
      });
    } catch (error) {
      console.error("Failed to clear the actions table:", error);
      throw error;
    }
  }
  /**
   * Search actions by name
   * @param input search params
   * @returns  matched actions
   */
  async searchActions(input: string): Promise<IAction[]> {
    return this.actions.where("name").startsWithIgnoreCase(input).toArray();
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
      name: name,
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
    return this.commonlocations.orderBy("name").toArray() as Promise<
      Array<ICommonLocation>
    >;
  }

  /**
   * Deletes all commonlocations from the database.
   */
  async clearCommonLocations() {
    try {
      await this.transaction("rw", this.commonlocations, async () => {
        await this.commonlocations.clear();
      });
    } catch (error) {
      console.error("Failed to clear the commonlocations table:", error);
      throw error;
    }
  }

  /**
   * Search common locations by name
   * @param input search params
   * @returns matched common locations
   */
  async searchCommonLocation(input: string): Promise<ICommonLocation[]> {
    return this.commonlocations
      .where("name")
      .startsWithIgnoreCase(input)
      .toArray();
  }
  /**
   * Fetches all forminterventions from the database.
   * @returns A promise that resolves with the list of all forminterventions.
   */
  async getAllFormInterventions(): Promise<Array<IInterventionFormData>> {
    const data = await this.forminterventions.orderBy("date").toArray();
    return data.map((data) => {
      return {
        ...data,
        startedAt: dayjs(data.startedAt),
        endedAt: dayjs(data.endedAt),
        date: dayjs(data.date),
      };
    });
  }

  /**
   * Deletes all forminterventions from the database.
   */
  async clearFormInterventions() {
    try {
      await this.transaction("rw", this.forminterventions, async () => {
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
    const data = await this.forminterventions.get(id);
    if (!data) {
      return undefined;
    }
    return {
      ...data,
      startedAt: dayjs(data.startedAt),
      endedAt: dayjs(data.endedAt),
      date: dayjs(data.date),
    };
  }

  /**
   * Adds a new formintervention to the database.
   * @param formintervention The formintervention to add.
   * @returns A promise that resolves with the new formintervention's ID.
   */
  async addFormIntervention(
    formintervention: IInterventionFormData,
  ): Promise<number> {
    return this.forminterventions.add({
      ...formintervention,
      startedAt: formintervention.startedAt.toISOString(), // Convert Day.js object to ISO string
      endedAt: formintervention.endedAt.toISOString(),
      date: formintervention.date.toISOString(),
    });
  }

  /**
   * Updates a formintervention in the database.
   * @param id The ID of the formintervention to update.
   * @param formintervention The new formintervention data.
   * @returns A promise that resolves with the formintervention's ID.
   */
  async updateFormIntervention(
    id: number,
    formintervention: IInterventionFormData,
  ): Promise<number> {
    const changes: UpdateSpec<IInterventionData> = {
      pilote: formintervention.pilote,
      crew: formintervention.crew,
    };
    if (formintervention.startedAt) {
      changes.startedAt = formintervention.startedAt.toISOString();
    }
    if (formintervention.endedAt) {
      changes.endedAt = formintervention.endedAt.toISOString();
    }
    if (formintervention.date) {
      changes.date = formintervention.date.toISOString();
    }
    return await this.forminterventions.update(id, changes);
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
   * get all weathers
   * @returns all weathers
   */
  async getAllWeathers(): Promise<Array<IWeather>> {
    return this.weathers.orderBy("name").toArray() as Promise<Array<IWeather>>;
  }
  /**
   * Deletes all weathers from the database.
   */
  async clearWeathers() {
    try {
      await this.transaction("rw", this.weathers, async () => {
        await this.weathers.clear();
      });
    } catch (error) {
      console.error("Failed to clear the weathers table:", error);
      throw error;
    }
  }

  /**
   * Fetches a weather from the database.
   * @param id The ID of the weather to fetch.
   * @returns A promise that resolves with the weather.
   */
  async getWeather(id: number): Promise<IWeather> {
    return this.weathers.get(id);
  }

  /**
   * Adds a new weather to the database.
   * @param name The name of the weather to add.
   * @returns A promise that resolves with the new weather's ID.
   */
  async addWeather(name: string): Promise<number> {
    return this.weathers.add({
      name: name,
    });
  }

  /**
   * Updates a weather's name in the database.
   * @param id The ID of the weather to update.
   * @param name The new name for the weather.
   * @returns A promise that resolves with the weather's ID.
   */
  async updateWeather(id: number, name: string): Promise<number> {
    return this.weathers.update(id, { name });
  }

  /**
   * Deletes a weather from the database.
   * @param id The ID of the weather to delete.
   * @returns A promise that resolves when the weather is deleted.
   */
  async deleteWeather(id: number): Promise<void> {
    return this.weathers.delete(id);
  }

  /**
   * Search weather by name
   * @param input search params
   * @returns matched weathers
   */
  async searchWeathers(input: string): Promise<IWeather[]> {
    return this.weathers.where("name").startsWithIgnoreCase(input).toArray();
  }

  /**
   * get all lakestates
   * @returns all lakestates
   */
  async getAllLakeStates(): Promise<Array<ILakeState>> {
    return this.lakeStates.orderBy("name").toArray() as Promise<
      Array<ILakeState>
    >;
  }
  /**
   * Deletes all lakestates from the database.
   */
  async clearLakeStates() {
    try {
      await this.transaction("rw", this.lakeStates, async () => {
        await this.lakeStates.clear();
      });
    } catch (error) {
      console.error("Failed to clear the lakestates table:", error);
      throw error;
    }
  }

  /**
   * Fetches a lakestate from the database.
   * @param id The ID of the lakestate to fetch.
   * @returns A promise that resolves with the lakestate.
   */
  async getLakeState(id: number): Promise<ILakeState> {
    return this.lakeStates.get(id);
  }

  /**
   * Adds a new lakestate to the database.
   * @param name The name of the lakestate to add.
   * @returns A promise that resolves with the new lakestate's ID.
   */
  async addLakeState(name: string): Promise<number> {
    return this.lakeStates.add({
      name: name,
    });
  }

  /**
   * Updates a lakestate's name in the database.
   * @param id The ID of the lakestate to update.
   * @param name The new name for the lakestate.
   * @returns A promise that resolves with the lakestate's ID.
   */
  async updateLakeState(id: number, name: string): Promise<number> {
    return this.lakeStates.update(id, { name });
  }

  /**
   * Deletes a lakestate from the database.
   * @param id The ID of the lakestate to delete.
   * @returns A promise that resolves when the lakestate is deleted.
   */
  async deleteLakeState(id: number): Promise<void> {
    return this.lakeStates.delete(id);
  }

  /**
   * Search lakestate by name
   * @param input search params
   * @returns matched lakestates
   */
  async searchLakeStates(input: string): Promise<ILakeState[]> {
    return this.lakeStates.where("name").startsWithIgnoreCase(input).toArray();
  }
  /**
   * get all winds
   * @returns all winds
   */
  async getAllWinds(): Promise<Array<IWind>> {
    return this.winds.orderBy("name").toArray() as Promise<Array<IWind>>;
  }
  /**
   * Deletes all winds from the database.
   */
  async clearWinds() {
    try {
      await this.transaction("rw", this.winds, async () => {
        await this.winds.clear();
      });
    } catch (error) {
      console.error("Failed to clear the winds table:", error);
      throw error;
    }
  }

  /**
   * Fetches a wind from the database.
   * @param id The ID of the wind to fetch.
   * @returns A promise that resolves with the wind.
   */
  async getWind(id: number): Promise<IWind> {
    return this.winds.get(id);
  }

  /**
   * Adds a new wind to the database.
   * @param name The name of the wind to add.
   * @returns A promise that resolves with the new wind's ID.
   */
  async addWind(name: string): Promise<number> {
    return this.winds.add({
      name: name,
    });
  }

  /**
   * Updates a wind's name in the database.
   * @param id The ID of the wind to update.
   * @param name The new name for the wind.
   * @returns A promise that resolves with the wind's ID.
   */
  async updateWind(id: number, name: string): Promise<number> {
    return this.winds.update(id, { name });
  }

  /**
   * Deletes a wind from the database.
   * @param id The ID of the wind to delete.
   * @returns A promise that resolves when the wind is deleted.
   */
  async deleteWind(id: number): Promise<void> {
    return this.winds.delete(id);
  }

  /**
   * Search wind by name
   * @param input search params
   * @returns matched winds
   */
  async searchWinds(input: string): Promise<IWind[]> {
    return this.winds.where("name").startsWithIgnoreCase(input).toArray();
  }

  /**
   * Fetches an user from the database.
   * @param id The ID of the user to fetch.
   * @returns A promise that resolves with the user.
   */
  async getUser(id: number): Promise<IUser> {
    return this.users.get(id);
  }

  /**
   * Adds a new user to the database
   * @param username The username of the user to add.
   * @param password The password of the user to add.
   * @returns A promise that resolves with the new user's ID.
   */
  async addUser(username: string, password: string): Promise<number> {
    return this.users.add({
      username: username,
      password: await this.hashPassword(password),
    });
  }

  /**
   * Updates an user's name in the database.
   * @param id The ID of the user to update.
   * @param username The new username for the user.
   * @param password The new password for the user.
   * @returns A promise that resolves with the user's ID.
   */
  async updateUser(
    id: number,
    username: string,
    password: string,
  ): Promise<number> {
    return this.users.update(id, {
      username,
      password: await this.hashPassword(password),
    });
  }
  /**
   * Deletes an user from the database.
   * @param id The ID of the user to delete.
   * @returns A promise that resolves when the user is deleted.
   */
  async deleteUser(id: number): Promise<void> {
    return this.users.delete(id);
  }
  /**
   * Fetches all alarms from the database.
   * @returns A promise that resolves with the list of all alarms.
   */
  async getAllUsers(): Promise<Array<IUser>> {
    return this.users.orderBy("username").toArray() as Promise<Array<IUser>>;
  }

  /**
   * Deletes all users from the database.
   */
  async clearUsers() {
    try {
      await this.transaction("rw", this.users, async () => {
        await this.users.clear();
      });
    } catch (error) {
      console.error("Failed to clear the users table:", error);
      throw error;
    }
  }
  /**
   * Search users by name
   * @param input search params
   * @returns  matched users
   */
  async searchUsers(input: string): Promise<IUser[]> {
    return this.users.where("username").startsWithIgnoreCase(input).toArray();
  }

  /**
   * match username and compare password with hashed password
   * @param username username
   * @param password password
   * @returns id
   */
  async matchUser(username: string, password: string): Promise<number> {
    const res = await this.users.where("username").equals(username).first();
    const valid = await this.comparePassword(password, res.password);
    return valid ? res.id : null;
  }

  /**
   * Hashes a password using bcrypt.
   * @param password The password to hash.
   * @returns The hashed password.
   */
  async hashPassword(password: string): Promise<string | undefined> {
    const saltRounds = 10;
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      console.error("Hashing failed:", error);
      return undefined;
    }
  }
  /**
   * Compare plain password with hashed password
   * @param plainPassword Plain password
   * @param hashedPassword Hashed password
   * @returns true if password is correct, false otherwise
   */
  async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      console.error("Comparison failed:", error);
      return false;
    }
  }
  /**
   * check credentials
   * @param username Check username
   * @param password Check password
   * @returns IUser or null
   */
  async checkCredentials(username, password) {
    const user = await this.users.where("username").equals(username).first();
    if (!user) {
      return null;
    }
    const isPasswordCorrect = await this.comparePassword(
      password,
      user.password,
    );
    return isPasswordCorrect ? user : null;
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
    await this.clearWeathers();
    await this.clearWinds();
    await this.clearLakeStates();
    await this.clearUsers();
    await this.clearAllData();
  }
}

export default Database;
