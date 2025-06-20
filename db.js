// db.js
const DB_NAME = "iPlusDB";
const DB_VERSION = 1;
const STORE_NAME = "tasks";

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = function (e) {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
                store.createIndex("checked", "checked", { unique: false });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function insertTask(title, description, date, time) {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    await store.add({ title, description, date, time, checked: false });
    return tx.complete;
}

export async function getPendingTasks() {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const tasks = [];

    return new Promise((resolve, reject) => {
        const req = store.openCursor();
        req.onsuccess = (e) => {
            const cursor = e.target.result;
            if (cursor) {
                if (!cursor.value.checked) tasks.push(cursor.value);
                cursor.continue();
            } else {
                resolve(tasks);
            }
        };
        req.onerror = () => reject(req.error);
    });
}

export async function checkTask(id) {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
        const req = store.get(Number(id));
        req.onsuccess = () => {
            const task = req.result;
            task.checked = true;
            store.put(task);
            resolve(true);
        };
        req.onerror = () => reject(req.error);
    });
}
