import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing state synchronized with localStorage
 * 
 * Features:
 * - Persists state to localStorage automatically
 * - Syncs state across browser tabs/windows
 * - Handles JSON serialization/deserialization
 * - Provides stable callback references
 * - Graceful error handling
 * 
 * @param {string} key - The localStorage key to use
 * @param {*} initialValue - Initial value if key doesn't exist in localStorage
 * @returns {[*, Function, Function]} Tuple of [storedValue, setValue, removeValue]
 * 
 * @example
 * const [settings, setSettings, removeSettings] = useLocalStorage('app-settings', { theme: 'dark' });
 * setSettings({ theme: 'light' }); // Updates state and localStorage
 * setSettings(prev => ({ ...prev, theme: 'light' })); // Functional update
 * removeSettings(); // Removes from localStorage and resets to initialValue
 */
const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = useCallback((value) => {
        try {
            // Use functional update to avoid dependency on storedValue
            setStoredValue((prevValue) => {
                const valueToStore = value instanceof Function ? value(prevValue) : value;
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
                return valueToStore;
            });
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    }, [key]);

    const removeValue = useCallback(() => {
        try {
            window.localStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            console.error(`Error removing localStorage key "${key}":`, error);
        }
    }, [key, initialValue]);

    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === key && e.newValue) {
                try {
                    setStoredValue(JSON.parse(e.newValue));
                } catch (error) {
                    console.error(`Error parsing storage event for key "${key}":`, error);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [key]);

    return [storedValue, setValue, removeValue];
};

export default useLocalStorage;
