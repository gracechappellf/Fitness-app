import { MEALS } from '../data.js';

export default function MealsTab({ store, onToggleMealCheck, onToggleMealExp }) {
  const totalK = MEALS.reduce((a, m) => a + m.kcal, 0);
  const totalP = MEALS.reduce((a, m) => a + m.p, 0);
  const totalC = MEALS.reduce((a, m) => a + m.c, 0);
  const totalF = MEALS.reduce((a, m) => a + m.f, 0);

  return (
    <div>
      <div className="daily-macros">
        <div className="macro-cell"><div className="macro-val">{totalK}</div><div className="macro-lbl">kcal</div></div>
        <div className="macro-cell"><div className="macro-val">{totalP}g</div><div className="macro-lbl">Protein</div></div>
        <div className="macro-cell"><div className="macro-val">{totalC}g</div><div className="macro-lbl">Carbs</div></div>
        <div className="macro-cell"><div className="macro-val">{totalF}g</div><div className="macro-lbl">Fat</div></div>
      </div>

      <div className="sec-title">Tap meal to expand prep instructions</div>

      {MEALS.map((m, i) => {
        const checked = store.meals[`c${i}`];
        const exp = store.meals[`e${i}`];
        return (
          <div key={i} className="meal-card">
            <div className="meal-row" onClick={() => onToggleMealExp(i)}>
              <div className="meal-time-badge">{m.time}</div>
              <div className="meal-info">
                <div className="meal-name">{m.name}</div>
                <div className="meal-desc">{m.desc}</div>
              </div>
              <div className={`meal-check ${checked ? 'checked' : ''}`} onClick={e => onToggleMealCheck(i, e)}></div>
            </div>
            {exp && <div className="meal-expand">{m.prep}</div>}
            <div className="meal-macros">
              <div className="macro-cell"><div className="macro-val" style={{ fontSize: 13 }}>{m.kcal}</div><div className="macro-lbl">kcal</div></div>
              <div className="macro-cell"><div className="macro-val" style={{ fontSize: 13 }}>{m.p}g</div><div className="macro-lbl">protein</div></div>
              <div className="macro-cell"><div className="macro-val" style={{ fontSize: 13 }}>{m.c}g</div><div className="macro-lbl">carbs</div></div>
              <div className="macro-cell"><div className="macro-val" style={{ fontSize: 13 }}>{m.f}g</div><div className="macro-lbl">fat</div></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
