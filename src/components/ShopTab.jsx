import { useState } from 'react';
import { GROCERY_PLANS } from '../data.js';
import { callClaude } from '../ai.js';

export default function ShopTab({ store, onToggleGrocery, onResetGrocery, onSetPantryItem, onRemovePantryItem }) {
  const [view, setView] = useState('shopping');
  const [pantryName, setPantryName] = useState('');
  const [pantryQty, setPantryQty] = useState('');
  const [cookLoading, setCookLoading] = useState(false);
  const [cookResult, setCookResult] = useState('');
  const [cookError, setCookError] = useState('');

  const rotation = store.mealPlanRotation?.currentWeek || 'A';
  const grocery = GROCERY_PLANS[rotation] || GROCERY_PLANS.A;
  const pantry = store.pantry || {};
  const pantryKeys = Object.keys(pantry);

  function addPantryItem() {
    const name = pantryName.trim();
    if (!name) return;
    onSetPantryItem(name, { qty: pantryQty.trim() || '', added: new Date().toISOString().slice(0, 10) });
    setPantryName('');
    setPantryQty('');
  }

  async function handleWhatCanIMake() {
    if (!store.ai?.apiKey) return;
    setCookLoading(true);
    setCookResult('');
    setCookError('');
    try {
      const list = pantryKeys.length ? pantryKeys.map(k => `${k}${pantry[k].qty ? ` (${pantry[k].qty})` : ''}`).join(', ') : 'empty pantry';
      const result = await callClaude(
        store.ai.apiKey,
        'You are a nutritionist. Suggest one high-protein meal (under 20 min) using the listed pantry ingredients. Give name, ingredients used, and brief method. Keep it concise.',
        `My pantry: ${list}`,
        store.ai.model,
      );
      setCookResult(result);
    } catch (e) {
      setCookError(e.message);
    } finally {
      setCookLoading(false);
    }
  }

  return (
    <div>
      <div className="seg-control">
        <button className={`seg-btn ${view === 'shopping' ? 'active' : ''}`} onClick={() => setView('shopping')}>
          <i className="ti ti-shopping-cart"></i> Shopping
        </button>
        <button className={`seg-btn ${view === 'pantry' ? 'active' : ''}`} onClick={() => setView('pantry')}>
          <i className="ti ti-package"></i> Pantry
        </button>
      </div>

      {view === 'shopping' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: 'var(--text2)' }}>Week {rotation} list</div>
            <button className="reset-btn" onClick={onResetGrocery}>Clear ticks</button>
          </div>
          {grocery.map((sec, si) => (
            <div key={si} className="grocery-section">
              <div className="grocery-cat-title" style={{ color: sec.color }}>
                <i className={`ti ${sec.icon}`}></i>{sec.cat}
              </div>
              <div className="grocery-grid">
                {sec.items.map((item, ii) => {
                  const key = `${sec.cat}-${ii}`;
                  const ticked = store.grocery?.[key];
                  const inPantry = pantry[item.toLowerCase()];
                  return (
                    <div key={ii} className={`g-item ${ticked ? 'ticked' : ''}`} onClick={() => onToggleGrocery(key)}>
                      <div className="g-box"></div>
                      <div style={{ flex: 1 }}>
                        <div className="g-txt">{item}</div>
                        {inPantry && <div className="g-pantry-tag">In pantry</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'pantry' && (
        <div>
          <div className="pantry-add-row">
            <input
              className="pantry-input"
              placeholder="Item name"
              value={pantryName}
              onChange={e => setPantryName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addPantryItem()}
            />
            <input
              className="pantry-input pantry-qty"
              placeholder="Qty"
              value={pantryQty}
              onChange={e => setPantryQty(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addPantryItem()}
            />
            <button className="btn-p" style={{ padding: '0 16px', height: 40 }} onClick={addPantryItem}>
              <i className="ti ti-plus"></i>
            </button>
          </div>

          {pantryKeys.length === 0 && (
            <div className="empty-state">
              <i className="ti ti-package" style={{ fontSize: 32, color: 'var(--text3)' }}></i>
              <div>Your pantry is empty</div>
              <div style={{ fontSize: 12, color: 'var(--text3)' }}>Add items to track what you have and enable AI recipe suggestions</div>
            </div>
          )}

          {pantryKeys.map(key => (
            <div key={key} className="pantry-item">
              <div>
                <div className="pantry-item-name">{key}</div>
                {pantry[key].qty && <div className="pantry-item-qty">{pantry[key].qty}</div>}
              </div>
              <button className="pantry-remove-btn" onClick={() => onRemovePantryItem(key)}>
                <i className="ti ti-trash"></i>
              </button>
            </div>
          ))}

          {pantryKeys.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <button
                className="ai-swap-btn"
                style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                onClick={handleWhatCanIMake}
                disabled={cookLoading || !store.ai?.apiKey}
              >
                {cookLoading ? <span className="ai-spinner"></span> : <i className="ti ti-sparkles"></i>}
                What can I make?
              </button>
              {!store.ai?.apiKey && (
                <div className="ai-no-key">Add your API key in the Me tab to enable this</div>
              )}
              {cookError && <div className="ai-error">{cookError}</div>}
              {cookResult && (
                <div className="ai-result-card">
                  <div className="ai-result-label">
                    <i className="ti ti-sparkles"></i> Claude suggests
                  </div>
                  <div className="ai-result-text">{cookResult}</div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
