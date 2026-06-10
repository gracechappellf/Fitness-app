import { useState, useEffect } from 'react';
import { MEAL_PLANS } from '../data.js';
import { advanceRotationIfNewWeek, dayKeyOf } from '../utils.js';
import MealRecipeSheet from './MealRecipeSheet.jsx';

const ROTATION_NAMES = { A: 'Week A', B: 'Week B · Fish', C: 'Week C · Plant' };

export default function FuelTab({ store, onToggleMealCheck, setMealRotation, onSetMealOverride, onClearMealOverride }) {
  const [recipeSheet, setRecipeSheet] = useState(null);

  useEffect(() => {
    advanceRotationIfNewWeek(store.mealPlanRotation, setMealRotation);
  }, []);

  const rotation = store.mealPlanRotation?.currentWeek || 'A';
  const meals = MEAL_PLANS[rotation] || MEAL_PLANS.A;
  const todayKey = dayKeyOf([1,2,3,4,5,6,0].indexOf(new Date().getDay()));

  const totalKcal = meals.reduce((s, m) => s + m.kcal, 0);
  const totalP = meals.reduce((s, m) => s + m.p, 0);
  const totalC = meals.reduce((s, m) => s + m.c, 0);
  const totalF = meals.reduce((s, m) => s + m.f, 0);

  return (
    <div>
      <div className="fuel-header">
        <div>
          <div className="sec-title" style={{ margin: 0 }}>This week</div>
          <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>Tap a meal for recipe + AI swaps</div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['A', 'B', 'C'].map(r => (
            <button
              key={r}
              className={`rotation-chip ${rotation === r ? 'active' : ''}`}
              onClick={() => setMealRotation({ currentWeek: r })}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="rotation-label">{ROTATION_NAMES[rotation]}</div>

      <div className="daily-macros">
        <div className="macro-cell"><div className="macro-val">{totalKcal}</div><div className="macro-lbl">kcal</div></div>
        <div className="macro-cell"><div className="macro-val">{totalP}g</div><div className="macro-lbl">protein</div></div>
        <div className="macro-cell"><div className="macro-val">{totalC}g</div><div className="macro-lbl">carbs</div></div>
        <div className="macro-cell"><div className="macro-val">{totalF}g</div><div className="macro-lbl">fat</div></div>
      </div>

      {meals.map((meal, i) => {
        const mealKey = `${todayKey}-${i}`;
        const override = store.mealOverrides?.[mealKey];
        const activeMeal = override || meal;
        const checked = store.meals?.[`c${i}`];
        return (
          <div key={i} className="meal-card" onClick={() => setRecipeSheet({ meal: activeMeal, mealKey, index: i })}>
            <div className="meal-row">
              <div className="meal-time-badge">{activeMeal.time}</div>
              <div className="meal-info">
                <div className="meal-name">{activeMeal.name}</div>
                <div className="meal-desc">{activeMeal.desc}</div>
              </div>
              <div
                className={`meal-check ${checked ? 'checked' : ''}`}
                onClick={e => { e.stopPropagation(); onToggleMealCheck(i, e); }}
              ></div>
            </div>
            <div className="meal-macros">
              <div className="macro-cell"><div className="macro-val">{activeMeal.kcal}</div><div className="macro-lbl">kcal</div></div>
              <div className="macro-cell"><div className="macro-val">{activeMeal.p}g</div><div className="macro-lbl">pro</div></div>
              <div className="macro-cell"><div className="macro-val">{activeMeal.c}g</div><div className="macro-lbl">carb</div></div>
              <div className="macro-cell"><div className="macro-val">{activeMeal.f}g</div><div className="macro-lbl">fat</div></div>
            </div>
            {override && (
              <div className="meal-override-badge">AI swapped</div>
            )}
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
