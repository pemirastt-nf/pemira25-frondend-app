// Storage utility with prefix to avoid conflicts
const STORAGE_PREFIX = 'pemira_';

export const storage = {
  setItem: (key: string, value: string) => {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, value);
  },
  
  getItem: (key: string): string | null => {
    return localStorage.getItem(`${STORAGE_PREFIX}${key}`);
  },
  
  removeItem: (key: string) => {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
  },
  
  clear: () => {
    Object.keys(localStorage)
      .filter(key => key.startsWith(STORAGE_PREFIX))
      .forEach(key => localStorage.removeItem(key));
  }
};