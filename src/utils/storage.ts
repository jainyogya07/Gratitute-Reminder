/**
 * Safe wrapper for localStorage to prevent crashes in restricted environments.
 * If storage is not available (e.g., privacy settings, ifframes), it will:
 * - Return null for getItem
 * - Fail silently for setItem/removeItem/clear (logging a warning in dev)
 */

const isStorageAvailable = () => {
    try {
        const testKey = "__storage_test__";
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        return false;
    }
};

const canUseStorage = isStorageAvailable();

export const safeLocalStorage = {
    getItem: (key: string): string | null => {
        if (!canUseStorage) return null;
        try {
            return localStorage.getItem(key);
        } catch (e) {
            console.warn(`Error reading ${key} from storage:`, e);
            return null;
        }
    },

    setItem: (key: string, value: string): void => {
        if (!canUseStorage) return;
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            console.warn(`Error writing ${key} to storage:`, e);
        }
    },

    removeItem: (key: string): void => {
        if (!canUseStorage) return;
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn(`Error removing ${key} from storage:`, e);
        }
    },

    clear: (): void => {
        if (!canUseStorage) return;
        try {
            localStorage.clear();
        } catch (e) {
            console.warn("Error clearing storage:", e);
        }
    }
};
