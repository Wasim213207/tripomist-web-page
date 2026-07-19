// Re-export the core Supabase client and provide safeStorage utility
import { supabase as coreSupabase } from '../supabaseClient';
export const supabase = coreSupabase;

// Safe storage helper (same as before)
let storageType = 'local';
if (typeof window !== 'undefined') {
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
  } catch (e) {
    try {
      const testKey = '__storage_test__';
      window.sessionStorage.setItem(testKey, testKey);
      window.sessionStorage.removeItem(testKey);
      storageType = 'session';
    } catch (e2) {
      storageType = 'name';
    }
  }
}

export const safeStorage = {
  getItem: (key) => {
    if (typeof window === 'undefined') return null;
    if (storageType === 'local') {
      try { const val = window.localStorage.getItem(key); if (val !== null) return val; } catch (e) {}
    }
    try { const val = window.sessionStorage.getItem(key); if (val !== null) return val; } catch (e) {}
    try { const data = JSON.parse(window.name || '{}'); return data[key] || null; } catch (e) { return null; }
  },
  setItem: (key, value) => {
    if (typeof window === 'undefined') return;
    if (storageType === 'local') {
      try { window.localStorage.setItem(key, value); } catch (e) {}
    }
    try { window.sessionStorage.setItem(key, value); } catch (e) {}
    try { const data = JSON.parse(window.name || '{}'); data[key] = value; window.name = JSON.stringify(data); } catch (e) {}
  },
  removeItem: (key) => {
    if (typeof window === 'undefined') return;
    if (storageType === 'local') {
      try { window.localStorage.removeItem(key); } catch (e) {}
    }
    try { window.sessionStorage.removeItem(key); } catch (e) {}
    try { const data = JSON.parse(window.name || '{}'); delete data[key]; window.name = JSON.stringify(data); } catch (e) {}
  }
};
