// Storage adapter - uses localStorage in production
export const storage = {
  async get(key) {
    try {
      const val = localStorage.getItem(key);
      return val ? { value: val } : null;
    } catch(e) { return null; }
  },
  async set(key, value) {
    try { localStorage.setItem(key, value); return true; } catch(e) { return null; }
  },
  async delete(key) {
    try { localStorage.removeItem(key); return true; } catch(e) { return null; }
  }
};
