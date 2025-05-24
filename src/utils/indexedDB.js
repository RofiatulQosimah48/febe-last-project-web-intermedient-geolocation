import { openDB } from 'idb';

const dbName = 'blue-geolocation-db';
const storeName = 'locations';
const version = 1;

const initDB = async () => {
  const db = await openDB(dbName, version, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        const store = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        store.createIndex('timestamp', 'timestamp');
      }
    },
  });
  return db;
};

export const saveLocation = async (locationData) => {
  const db = await initDB();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  const id = await store.add({
    ...locationData,
    timestamp: Date.now(),
  });
  await tx.done;
  return id;
};

export const getLocations = async () => {
  const db = await initDB();
  const tx = db.transaction(storeName, 'readonly');
  const store = tx.objectStore(storeName);
  const locations = await store.getAll();
  await tx.done;
  return locations;
};

export const deleteLocation = async (id) => {
  const db = await initDB();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  await store.delete(id);
  await tx.done;
};

export const clearLocations = async () => {
  const db = await initDB();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  await store.clear();
  await tx.done;
}; 