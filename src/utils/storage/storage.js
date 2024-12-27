/* istanbul ignore file */
/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export async function loadString(key) {
    try {
        return await localStorage.getItem(key);
    }
    catch {
        return null;
    }
}
/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function saveString(key, value) {
    try {
        await localStorage.setItem(key, value);
        return true;
    }
    catch {
        return false;
    }
}
/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export async function load(key) {
    try {
        const almostThere = await localStorage.getItem(key);
        return JSON.parse(almostThere || "");
    }
    catch {
        return null;
    }
}
/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function save(key, value) {
    try {
        await localStorage.setItem(key, JSON.stringify(value));
        return true;
    }
    catch {
        return false;
    }
}
/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export async function remove(key) {
    try {
        await localStorage.removeItem(key);
    }
    catch (error) {
        console.log(error);
    }
}
/**
 * Burn it all to the ground.
 */
export async function clear() {
    try {
        await localStorage.clear();
    }
    catch (error) {
        console.log(error);
    }
}
