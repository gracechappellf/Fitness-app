import { useState } from 'react';
import { callClaude } from '../ai.js';

const SYSTEM_SWAP = `You are a nutritionist. The user wants a gluten-free version of their meal.
Rewrite the prep instructions replacing any gluten-containing ingredients with GF alternatives (e.g. GF bread, tamari instead of soy sauce, rice/quinoa instead of wheat pasta, GF oats).
Keep the same macros, protein focus, and format. Be concise.`;

const SYSTEM_PANTRY = `You are a nutritionist. Adapt the recipe to use ingredients from the user's pantry where possible.
Keep macros similar and the recipe high-protein. Be concise and practical.`;

export default function MealRecipeSheet({ open, onClose, meal, mealKey, store, onSetOverride, onClearOverride }) {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const hasKey = !!(store.ai?.apiKey);
  const isOverridden = !!store.mealOverrides?.[mealKey];

  async function handleSwap(type) {
    if (!hasKey) return;
    setAiLoading(true);
    setAiError('');
    try {
      const pantryList = Object.keys(store.pantry || {}).join(', ') || 'nothing in pantry';
      const userMsg = type === 'gf'
        ? `Make this meal gluten-free:\n${meal.name}: ${meal.desc}\n\nPrep:\n${meal.prep}`
        : `Adapt this recipe to use pantry items (${pantryList}):\n${meal.name}: ${meal.desc}\n\nPrep:\n${meal.prep}`;
      const system = type === 'gf' ? SYSTEM_SWAP : SYSTEM_PANTRY;
      const result = await callClaude(store.ai.apiKey, system, userMsg, store.ai.model);
      onSetOverride(mealKey, { ...meal, prep: result, desc: type === 'gf' ? `${meal.desc} (GF)` : `${meal.desc} (pantry)` });
    } catch (e) {
      setAiError(e.message);
    } finally {
      setAiLoading(false);
    }
  }

  if (!open || !meal) return null;

  return (
    <div className="sheet-bg" onClick={onClose}>
      <div className="sheet sheet-tall" onClick={e => e.stopPropagation()}>
        <div className="sheet-handle"></div>
        <div className="sheet-time-badge">{meal.time}</div>
        <div className="sheet-title">{meal.name}</div>
        <div className="sheet-sub">{meal.desc}</div>

        <div className="meal-macros" style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden', marginBottom: 16 }}>
          <div className="macro-cell"><div className="macro-val">{meal.kcal}</div><div className="macro-lbl">kcal</div></div>
          <div className="macro-cell"><div className="macro-val">{meal.p}g</div><div className="macro-lbl">protein</div></div>
          <div className="macro-cell"><div className="macro-val">{meal.c}g</div><div className="macro-lbl">carbs</div></div>
          <div className="macro-cell"><div className="macro-val">{meal.f}g</div><div className="macro-lbl">fat</div></div>
        </div>

        <div className="sec-title">How to prep</div>
        <div className="meal-expand" style={{ borderRadius: 'var(--radius-sm)', marginBottom: 16 }}>{meal.prep}</div>

        {isOverridden && (
          <button className="wl-add-set-btn" style={{ marginBottom: 8 }} onClick={() => onClearOverride(mealKey)}>
            <i className="ti ti-refresh"></i> Restore original
          </button>
        )}

        {aiError && <div className="ai-error">{aiError}</div>}

        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <button
            className="ai-swap-btn"
            onClick={() => handleSwap('gf')}
            disabled={aiLoading || !hasKey}
            title={!hasKey ? 'Add API key in Me tab' : ''}
          >
            {aiLoading ? <span className="ai-spinner"></span> : <i className="ti ti-sparkles"></i>}
            GF version
          </button>
          <button
            className="ai-swap-btn"
            onClick={() => handleSwap('pantry')}
            disabled={aiLoading || !hasKey}
            title={!hasKey ? 'Add API key in Me tab' : ''}
          >
            {aiLoading ? <span className="ai-spinner"></span> : <i className="ti ti-package"></i>}
            Use my pantry
          </button>
        </div>

        {!hasKey && (
          <div className="ai-no-key">Add your API key in the Me tab to enable AI meal swaps</div>
        )}

        <button className="btn-s" style={{ width: '100%', marginTop: 8 }} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
