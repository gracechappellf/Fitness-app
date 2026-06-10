import { getMondayISO } from './utils.js';

export function migrate() {
  try {
    const v3str = localStorage.getItem('gracefit-v3');
    if (v3str) {
      const parsed = JSON.parse(v3str);
      if (parsed.meta?.version === 3) return parsed;
    }
  } catch {}

  let v2 = {};
  try { v2 = JSON.parse(localStorage.getItem('gracefit-v2') || '{}'); } catch {}

  const result = {
    done: v2.done || {},
    meals: v2.meals || {},
    grocery: v2.grocery || {},
    gut0: v2.gut0 || false,
    gut1: v2.gut1 || false,
    gut2: v2.gut2 || false,
    gut3: v2.gut3 || false,
    gut4: v2.gut4 || false,
    gut5: v2.gut5 || false,
    gut6: v2.gut6 || false,
    workoutLogs: {},
    weightLog: [],
    mealPlanRotation: { currentWeek: 'A', weekStartDate: getMondayISO() },
    mealOverrides: {},
    pantry: {},
    diary: {},
    ai: { apiKey: '', model: 'claude-haiku-4-5', insightCache: {} },
    meta: { version: 3, migratedFrom: Object.keys(v2).length > 0 ? 2 : null },
  };

  try { localStorage.setItem('gracefit-v3', JSON.stringify(result)); } catch {}
  return result;
}
