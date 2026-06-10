import { useState } from 'react';
import { migrate } from './migrate.js';

const KEY = 'gracefit-v3';

function persist(state) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
}

export function useStore() {
  const [raw, setRaw] = useState(() => migrate());

  const store = {
    done: {},
    meals: {},
    grocery: {},
    workoutLogs: {},
    weightLog: [],
    mealPlanRotation: { currentWeek: 'A', weekStartDate: '' },
    mealOverrides: {},
    pantry: {},
    diary: {},
    ai: { apiKey: '', model: 'claude-haiku-4-5', insightCache: {} },
    ...raw,
  };

  function update(fn) {
    setRaw(prev => {
      const next = fn({ ...prev });
      persist(next);
      return next;
    });
  }

  function toggleDone(key) {
    update(s => ({ ...s, done: { ...s.done, [key]: !s.done[key] } }));
  }

  function toggleMealCheck(i, e) {
    if (e) e.stopPropagation();
    update(s => ({ ...s, meals: { ...s.meals, [`c${i}`]: !s.meals[`c${i}`] } }));
  }

  function toggleMealExp(i) {
    update(s => ({ ...s, meals: { ...s.meals, [`e${i}`]: !s.meals[`e${i}`] } }));
  }

  function toggleGrocery(key) {
    update(s => ({ ...s, grocery: { ...s.grocery, [key]: !s.grocery[key] } }));
  }

  function resetGrocery() {
    update(s => ({ ...s, grocery: {} }));
  }

  function toggleGut(i) {
    update(s => ({ ...s, [`gut${i}`]: !s[`gut${i}`] }));
  }

  function saveWorkoutLog(dateKey, exerciseName, sets) {
    update(s => ({
      ...s,
      workoutLogs: {
        ...s.workoutLogs,
        [`${dateKey}|${exerciseName}`]: { date: dateKey, sets },
      },
    }));
  }

  function addWeightEntry(date, weight) {
    update(s => {
      const existing = (s.weightLog || []).filter(e => e.date !== date);
      return {
        ...s,
        weightLog: [...existing, { date, weight }].sort((a, b) => a.date.localeCompare(b.date)),
      };
    });
  }

  function setMealRotation(rotation) {
    update(s => ({ ...s, mealPlanRotation: { ...s.mealPlanRotation, ...rotation } }));
  }

  function setMealOverride(key, meal) {
    update(s => ({ ...s, mealOverrides: { ...s.mealOverrides, [key]: meal } }));
  }

  function clearMealOverride(key) {
    update(s => {
      const overrides = { ...s.mealOverrides };
      delete overrides[key];
      return { ...s, mealOverrides: overrides };
    });
  }

  function setPantryItem(name, data) {
    update(s => ({ ...s, pantry: { ...s.pantry, [name.toLowerCase()]: data } }));
  }

  function removePantryItem(name) {
    update(s => {
      const p = { ...s.pantry };
      delete p[name.toLowerCase()];
      return { ...s, pantry: p };
    });
  }

  function saveDiaryEntry(date, entry) {
    update(s => ({
      ...s,
      diary: { ...s.diary, [date]: { ...(s.diary[date] || {}), ...entry } },
    }));
  }

  function setAiKey(apiKey) {
    update(s => ({ ...s, ai: { ...s.ai, apiKey } }));
  }

  function setAiModel(model) {
    update(s => ({ ...s, ai: { ...s.ai, model } }));
  }

  function cacheInsight(cacheKey, text) {
    update(s => ({
      ...s,
      ai: { ...s.ai, insightCache: { ...(s.ai?.insightCache || {}), [cacheKey]: text } },
    }));
  }

  function clearV2Backup() {
    try { localStorage.removeItem('gracefit-v2'); } catch {}
  }

  return {
    store,
    toggleDone,
    toggleMealCheck,
    toggleMealExp,
    toggleGrocery,
    resetGrocery,
    toggleGut,
    saveWorkoutLog,
    addWeightEntry,
    setMealRotation,
    setMealOverride,
    clearMealOverride,
    setPantryItem,
    removePantryItem,
    saveDiaryEntry,
    setAiKey,
    setAiModel,
    cacheInsight,
    clearV2Backup,
  };
}
