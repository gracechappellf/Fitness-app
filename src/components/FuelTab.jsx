import { useState, useEffect } from 'react';
import { MEAL_PLANS } from '../data.js';
import { advanceRotationIfNewWeek } from '../utils.js';
import MealRecipeSheet from './MealRecipeSheet.jsx';

const TODAY_ISO = new Date().toISOString().slice(0, 10);
const MEAL_EMOJI = ['🌅', '🍎', '🥗', '☕', '🍽️', '🍫'];
const ROTATION_NAMES = { A: 'Week A · Balanced', B: 'Week B · Fish', C: 'Week C · Plant' };

function addDays(iso, n) {
  const d = new Date(iso + 'T12:00:00');
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

function formatDayLabel(iso) {
  if (iso === TODAY_ISO) return 'Today';
  if (iso === addDays(TODAY_ISO, -1)) return 'Yesterday';
  if (iso === addDays(TODAY_ISO, 1)) return 'Tomorrow';
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' });
}

export default function FuelTab({ store, onToggleMealCheck, setMealRotation, onSetMealOverride, onClearMealOverride }) {
  const [viewDate, setViewDate] = useState(TODAY_ISO);
  const [recipeSheet, setRecipeSheet] = useState(null);

  useEffect(() => {
    advanceRotationIfNewWeek(store.mealPlanRotation, setMealRotation);
  }, []);

  const rotation = store.mealPlanRotation?.currentWeek || 'A';
  const meals = MEAL_PLANS[rotation] || MEAL_PLANS.A;

  const totalKcal = meals.reduce((s, m) => s + m.kcal, 0);
  const totalP    = meals.reduce((s, m) => s + m.p, 0);
  const totalC    = meals.reduce((s, m) => s + m.c, 0);
  const totalF    = meals.reduce((s, m) => s + m.f, 0);

  const checkedCount = meals.filter((_, i) => store.meals?.[`${viewDate}-c${i}`]).length;

  return (
    <div>
      {/* Day navigation */}
      <div className="day-nav">
        <button className="day-nav-btn" onClick={() => setViewDate(d => addDays(d, -1))}>
          <i className="ti ti-chevron-left"></i>
        </button>
        <div className="day-nav-center">
          <div className="day-nav-label">{formatDayLabel(viewDate)}</div>
          <div className="day-nav-sub">{checkedCount}/{meals.length} meals logged</div>
          {viewDate !== TODAY_ISO && (
            <button className="day-nav-today-btn" onClick={() => setViewDate(TODAY_ISO)}>Back to today</button>
          )}
        </div>
        <button className="day-nav-btn" onClick={() => setViewDate(d => addDays(d, 1))}>
          <i className="ti ti-chevron-right"></i>
        </button>
      </div>

      {/* Rotation selector + macros */}
      <div className="fuel-header">
        <div className="rotation-label" style={{ margin: 0 }}>{ROTATION_NAMES[rotation]}</div>
        <div style={{ display: 'flex', gap: 5 }}>
          {['A', 'B', 'C'].map(r => (
            <button
              key={r}
              className={`rotation-chip ${rotation === r ? 'active' : ''}`}
              onClick={() => setMealRotation({ currentWeek: r })}
            >{r}</button>
          ))}
        </div>
      </div>

      <div className="daily-macros">
        <div className="macro-cell"><div className="macro-val">{totalKcal}</div><div className="macro-lbl">kcal</div></div>
        <div className="macro-cell"><div className="macro-val">{totalP}g</div><div className="macro-lbl">protein</div></div>
        <div className="macro-cell"><div className="macro-val">{totalC}g</div><div className="macro-lbl">carbs</div></div>
        <div className="macro-cell"><div className="macro-val">{totalF}g</div><div className="macro-lbl">fat</div></div>
      </div>

      {meals.map((meal, i) => {
        const mealKey = `${viewDate}-${i}`;
        const checkKey = `${viewDate}-c${i}`;
        const override = store.mealOverrides?.[mealKey];
        const activeMeal = override || meal;
        const checked = store.meals?.[checkKey];
        return (
          <div key={i} className="meal-card" onClick={() => setRecipeSheet({ meal: activeMeal, mealKey, index: i })}>
            <div className="meal-row">
              <div className="meal-time-badge">{MEAL_EMOJI[i]} {activeMeal.time}</div>
              <div className="meal-info">
                <div className="meal-name">{activeMeal.name}</div>
                <div className="meal-desc">{activeMeal.desc}</div>
              </div>
              <div
                className={`meal-check ${checked ? 'checked' : ''}`}
                onClick={e => { e.stopPropagation(); onToggleMealCheck(checkKey, e); }}
              ></div>
            </div>
            <div className="meal-macros">
              <div className="macro-cell"><div className="macro-val">{activeMeal.kcal}</div><div className="macro-lbl">kcal</div></div>
              <div className="macro-cell"><div className="macro-val">{activeMeal.p}g</div><div className="macro-lbl">pro</div></div>
              <div className="macro-cell"><div className="macro-val">{activeMeal.c}g</div><div className="macro-lbl">carb</div></div>
              <div className="macro-cell"><div className="macro-val">{activeMeal.f}g</div><div className="macro-lbl">fat</div></div>
            </div>
            {override && <div className="meal-override-badge">AI swapped</div>}
          </div>
        );
      })}

      <MealRecipeSheet
        open={!!recipeSheet}
        onClose={() => setRecipeSheet(null)}
        meal={recipeSheet?.meal}
        mealKey={recipeSheet?.mealKey}
        store={store}
        onSetOverride={onSetMealOverride}
        onClearOverride={onClearMealOverride}
      />
    </div>
  );
}
