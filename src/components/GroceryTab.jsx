import { GROCERY } from '../data.js';

export default function GroceryTab({ store, onToggleGrocery, onResetGrocery }) {
  let total = 0, ticked = 0;
  GROCERY.forEach(cat => cat.items.forEach((_, i) => {
    total++;
    if (store.grocery[`${cat.cat}-${i}`]) ticked++;
  }));

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{ fontSize: 13, color: 'var(--text2)' }}>{ticked} of {total} items ticked</span>
        <button onClick={onResetGrocery} style={{ fontSize: 12, padding: '5px 12px', borderRadius: 20, border: '1px solid var(--border2)', background: 'none', cursor: 'pointer', color: 'var(--text2)', fontFamily: "'DM Sans', sans-serif" }}>
          Reset list
        </button>
      </div>

      {GROCERY.map(cat => (
        <div key={cat.cat} className="grocery-section">
          <div className="grocery-cat-title">
            <i className={`ti ${cat.icon}`} style={{ color: cat.color }}></i>
            {cat.cat}
          </div>
          <div className="grocery-grid">
            {cat.items.map((item, i) => {
              const key = `${cat.cat}-${i}`;
              const done = store.grocery[key];
              return (
                <div key={i} className={`g-item ${done ? 'ticked' : ''}`} onClick={() => onToggleGrocery(key)}>
                  <div className="g-box"></div>
                  <span className="g-txt">{item}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
