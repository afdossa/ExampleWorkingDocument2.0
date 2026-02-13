import { STORAGE_KEY_DATA, INITIAL_ROWS, STORAGE_KEY_USER } from '../constants';
import { CellState, User } from '../types';

export const loadMatrixState = (): Record<string, boolean> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_DATA);
    if (stored) {
      return JSON.parse(stored);
    }
    
    // Initialize default state if nothing stored
    const defaults: Record<string, boolean> = {};
    INITIAL_ROWS.forEach(row => {
      row.initialValues.forEach((val, index) => {
        const cellId = `${row.id}-col-${index}`;
        defaults[cellId] = val;
      });
    });
    return defaults;
  } catch (e) {
    console.error("Failed to load state", e);
    return {};
  }
};

export const saveMatrixState = (state: Record<string, boolean>) => {
  try {
    localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save state", e);
  }
};

export const loadUser = (): User | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_USER);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const saveUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEY_USER);
  }
};