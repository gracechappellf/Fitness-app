import { useState } from 'react';

const KEY = 'gracefit-v2';

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); }
  catch { return {}; }
}

function persist(state) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
}

export function useStore() {
  const [raw, setRaw] = useState(load);

  const store = {
    done: raw.done || {},
    meals: raw.meals || {},
    grocery: raw.grocery || {},
    ...raw,
  };

  function update(fn) {
    setRaw(prev => {
      const base = {
        ...prev,
        done: { ...(prev.done || {}) },
        meals: { ...(prev.meals || {}) },
        grocery: { ...(prev.grocery || {}) },
      };
      const next = fn(base);
      persist(next);
      return next;
    });
  }

  function toggleDone(key) {
    update(s => { s.done[key] = !s.done[key]; return s; });
  }

  function toggleMealCheck(i, e) {
    e.stopPropagation();
    update(s => { s.meals[`c${i}`] = !s.meals[`c${i}`]; return s; });
  }

  function toggleMealExp(i) {
    update(s => { s.meals[`e${i}`] = !s.meals[`e${i}`]; return s; });
  }

  function toggleGrocery(key) {
    update(s => { s.grocery[key] = !s.grocery[key]; return s; });
  }

  function resetGrocery() {
    update(s => { s.grocery = {}; return s; });
  }

  function toggleGut(i) {
    update(s => { s[`gut${i}`] = !s[`gut${i}`]; return s; });
  }

  return { store, toggleDone, toggleMealCheck, toggleMealExp, toggleGrocery, resetGrocery, toggleGut };
}
