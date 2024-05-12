import Database from "../../../renderer/model/db";
import fakeIndexedDB from 'fake-indexeddb';
import FDBKeyRange from 'fake-indexeddb/lib/FDBKeyRange';
import { describe, expect, beforeEach, it, beforeAll, afterEach } from "@jest/globals";
import structuredClone from 'structured-clone';
global.structuredClone = structuredClone;
global.Blob = require('blob-polyfill').Blob;
describe('Database Tests', () => {
    let db: Database;

    beforeAll(() => {
        window.indexedDB = fakeIndexedDB;
        window.IDBKeyRange = FDBKeyRange;
    });

    beforeEach(async () => {
        db = Database.getInstance(true); 
        await db.open();
    });
    afterEach(async () => {
        await db.close();  // Close the database after each test to clean up
    });

    describe('Singleton Behavior', () => {
        it('should return the same instance of the database', () => {
            const instance1 = Database.getInstance();
            const instance2 = Database.getInstance();
            expect(instance1).toBe(instance2);
        });

    });
    describe('Database Initialization', () => {
        it('should initialize with predefined tables and indexes', () => {
            expect(db.table('people').name).toBeDefined();
            expect(db.table('alarms').name).toBeDefined();
            expect(db.table('severities').name).toBeDefined();
            expect(db.table('interventions').name).toBeDefined();
            expect(db.table('otherMeans').name).toBeDefined();
            expect(db.table('causes').name).toBeDefined();
            expect(db.table('actions').name).toBeDefined();
            expect(db.table('commonlocations').name).toBeDefined();
            expect(db.table('forminterventions').name).toBeDefined();
        });
    });

    describe('Database Deletion', () => {
        it('should delete the database', async () => {
            await expect(db.deleteDb()).resolves.toBeUndefined();
        });
    })

    describe('Import/Export Database', () => {
        it('should export the database to a blob', async () => {
            expect(db.isOpen()).toBe(true);
            const blob = await db.exportDatabase();
            expect(blob).toBeInstanceOf(Blob);
        });
        it('should import database from a file', async () => {
            const json = {
                people: [
                    { id:1,name: "John Doe" }
                ]
            };
            const blob = new Blob([JSON.stringify(json)], { type: 'application/json' });
            const file = new File([blob], 'db.json');
            console.log(file);
            await db.importDatabase(file);
            const peopleResult = await db.getAllPeople();
            expect(peopleResult).toHaveLength(1);
            expect(peopleResult[0].name).toBe("John Doe");
        });
    });
});
