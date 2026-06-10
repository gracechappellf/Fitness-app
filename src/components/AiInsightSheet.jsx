import { useState } from 'react';
import { callClaude } from '../ai.js';

const SYSTEM = `You are a gut health and nutrition coach. Analyse the user's food and symptom diary entries.
Identify the top 2–3 potential bloat or symptom triggers based on patterns.
Give 2–3 actionable dietary suggestions.
Be warm, practical and concise. Use plain text, no markdown headers.`;

export default function AiInsightSheet({ open, onClose, diary, store, onCacheInsight }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const dates = Object.keys(diary || {}).sort().slice(-14);
  const cacheKey = dates.length ? `${dates[0]}|${dates[dates.length - 1]}` : '';
  const cached = store.ai?.insightCache?.[cacheKey];

  async function generate() {
    if (!store.ai?.apiKey || !dates.length) return;
    setLoading(true);
    setError('');
    try {
      const entries = dates.map(d => {
        const e = diary[d];
        const parts = [];
        if (e.mealsLogged?.length) parts.push(`Meals: ${e.mealsLogged.join(', ')}`);
        if (e.bloating) parts.push(`Bloating: ${e.bloating}/5`);
        if (e.energy) parts.push(`Energy: ${e.energy}/5`);
        if (e.symptoms?.length) parts.push(`Symptoms: ${e.symptoms.join(', ')}`);
        if (e.notes) parts.push(`Notes: ${e.notes}`);
        if (e.waterLitres) parts.push(`Water: ${e.waterLitres}L`);
        return `${d}: ${parts.join(' | ')}`;
      }).join('\n');
      const result = await callClaude(
        store.ai.apiKey,
        SYSTEM,
        `Diary entries (last ${dates.length} days):\n${entries}`,
        store.ai.model,
      );
      onCacheInsight(cacheKey, result);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="sheet-bg" onClick={onClose}>
      <div className="sheet sheet-tall" onClick={e => e.stopPropagation()}>
        <div className="sheet-handle"></div>
        <div className="sheet-title">AI Health Insights</div>
        <div className="sheet-sub">Based on your last {dates.length} diary entries</div>

        {!store.ai?.apiKey && (
          <div className="ai-no-key" style={{ marginTop: 16 }}>
            Add your Claude API key in the Me tab to use AI insights
          </div>
        )}

        {store.ai?.apiKey && !cached && !loading && !error && (
          <button className="btn-p" style={{ width: '100%', marginTop: 16 }} onClick={generate} disabled={!dates.length}>
            <i className="ti ti-sparkles"></i>
            {dates.length ? 'Analyse my diary' : 'No diary entries yet'}
          </button>
        )}

        {loading && (
          <div className="ai-loading">
            <span className="ai-spinner"></span> Analysing your diary...
          </div>
        )}

        {error && (
          <div>
            <div className="ai-error">{error}</div>
            <button className="btn-s" style={{ width: '100%', marginTop: 8 }} onClick={generate}>Try again</button>
          </div>
        )}

        {cached && (
          <div>
            <div className="ai-result-card" style={{ marginTop: 16 }}>
              <div className="ai-result-label">
                <i className="ti ti-sparkles"></i> Analysis
              </div>
              <div className="ai-result-text">{cached}</div>
            </div>
            <button className="wl-add-set-btn" style={{ marginTop: 8 }} onClick={generate}>
              <i className="ti ti-refresh"></i> Refresh analysis
            </button>
          </div>
        )}

        <button className="btn-s" style={{ width: '100%', marginTop: 16 }} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
