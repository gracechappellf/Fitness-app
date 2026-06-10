import { useState } from 'react';
import { GUT, DIARY_SYMPTOM_TAGS } from '../data.js';
import AiInsightSheet from './AiInsightSheet.jsx';

const TODAY_ISO = new Date().toISOString().slice(0, 10);

function RatingRow({ label, value, onChange }) {
  return (
    <div className="diary-rating-row">
      <div className="diary-rating-label">{label}</div>
      <div className="diary-rating-stars">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            className={`diary-rating-dot ${value >= n ? 'active' : ''}`}
            onClick={() => onChange(n === value ? 0 : n)}
          ></button>
        ))}
      </div>
      <div className="diary-rating-val">{value || '—'}</div>
    </div>
  );
}

export default function DiaryTab({ store, onSaveDiaryEntry, onToggleGut, onCacheInsight }) {
  const [date, setDate] = useState(TODAY_ISO);
  const [gutOpen, setGutOpen] = useState(null);
  const [insightOpen, setInsightOpen] = useState(false);

  const entry = store.diary?.[date] || {};
  const [mealsText, setMealsText] = useState(entry.mealsLogged?.join(', ') || '');
  const [bloating, setBloating] = useState(entry.bloating || 0);
  const [energy, setEnergy] = useState(entry.energy || 0);
  const [symptoms, setSymptoms] = useState(entry.symptoms || []);
  const [notes, setNotes] = useState(entry.notes || '');
  const [water, setWater] = useState(entry.waterLitres || '');

  function loadEntry(d) {
    const e = store.diary?.[d] || {};
    setDate(d);
    setMealsText(e.mealsLogged?.join(', ') || '');
    setBloating(e.bloating || 0);
    setEnergy(e.energy || 0);
    setSymptoms(e.symptoms || []);
    setNotes(e.notes || '');
    setWater(e.waterLitres || '');
  }

  function toggleSymptom(tag) {
    setSymptoms(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  }

  function handleSave() {
    const mealsLogged = mealsText.split(',').map(s => s.trim()).filter(Boolean);
    onSaveDiaryEntry(date, {
      mealsLogged,
      bloating,
      energy,
      symptoms,
      notes,
      waterLitres: water ? parseFloat(water) : undefined,
    });
  }

  const diaryDates = Object.keys(store.diary || {}).sort().reverse().slice(0, 14);

  return (
    <div>
      {/* Today's entry form */}
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="card-header" style={{ paddingBottom: 8 }}>
          <div className="card-title">Daily log</div>
          <input
            type="date"
            className="diary-date-input"
            value={date}
            max={TODAY_ISO}
            onChange={e => loadEntry(e.target.value)}
          />
        </div>

        <div style={{ padding: '0 16px 4px' }}>
          <div className="diary-field-label">What did you eat today?</div>
          <input
            className="diary-text-input"
            placeholder="e.g. Overnight oats, Chicken bowl, Salmon pasta"
            value={mealsText}
            onChange={e => setMealsText(e.target.value)}
          />
        </div>

        <div style={{ padding: '0 16px 4px' }}>
          <RatingRow label="Bloating" value={bloating} onChange={setBloating} />
          <RatingRow label="Energy" value={energy} onChange={setEnergy} />
        </div>

        <div style={{ padding: '0 16px 4px' }}>
          <div className="diary-field-label">Symptoms</div>
          <div className="symptom-tags">
            {DIARY_SYMPTOM_TAGS.map(tag => (
              <button
                key={tag}
                className={`symptom-tag ${symptoms.includes(tag) ? 'active' : ''}`}
                onClick={() => toggleSymptom(tag)}
              >{tag}</button>
            ))}
          </div>
        </div>

        <div style={{ padding: '0 16px 4px' }}>
          <div className="diary-field-label">Water (litres)</div>
          <input
            className="diary-text-input"
            type="number"
            inputMode="decimal"
            placeholder="2.5"
            value={water}
            onChange={e => setWater(e.target.value)}
            style={{ width: 100 }}
          />
        </div>

        <div style={{ padding: '0 16px 12px' }}>
          <div className="diary-field-label">Notes</div>
          <textarea
            className="diary-textarea"
            placeholder="How did you feel? Any patterns noticed?"
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: 8, padding: '0 16px 16px' }}>
          <button className="btn-p" style={{ flex: 1 }} onClick={handleSave}>Save entry</button>
          <button
            className="ai-swap-btn"
            onClick={() => setInsightOpen(true)}
            disabled={!store.ai?.apiKey}
            title={!store.ai?.apiKey ? 'Add API key in Me tab' : ''}
          >
            <i className="ti ti-sparkles"></i> AI insights
          </button>
        </div>
      </div>

      {/* Recent history */}
      {diaryDates.length > 0 && (
        <>
          <div className="sec-title">Recent entries</div>
          {diaryDates.map(d => {
            const e = store.diary[d];
            return (
              <div key={d} className="diary-entry-card" onClick={() => loadEntry(d)}>
                <div className="diary-entry-date">{new Date(d + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}</div>
                <div className="diary-entry-row">
                  {e.bloating > 0 && <span className="diary-entry-chip bloat">Bloat {e.bloating}/5</span>}
                  {e.energy > 0 && <span className="diary-entry-chip energy">Energy {e.energy}/5</span>}
                  {e.symptoms?.map(s => <span key={s} className="diary-entry-chip">{s}</span>)}
                </div>
                {e.notes && <div className="diary-entry-notes">{e.notes}</div>}
              </div>
            );
          })}
        </>
      )}

      {/* Gut tips */}
      <div className="sec-title">Gut health reference</div>
      {GUT.map((tip, i) => (
        <div key={i} className="tip-card" onClick={() => setGutOpen(gutOpen === i ? null : i)}>
          <div className="tip-header">
            <div className="tip-icon"><i className={`ti ${tip.icon}`}></i></div>
            <div className="tip-title">{tip.title}</div>
            <i className={`ti ${gutOpen === i ? 'ti-chevron-up' : 'ti-chevron-down'} tip-chevron`}></i>
          </div>
          {gutOpen === i && <div className="tip-body open">{tip.body}</div>}
        </div>
      ))}

      <AiInsightSheet
        open={insightOpen}
        onClose={() => setInsightOpen(false)}
        diary={store.diary}
        store={store}
        onCacheInsight={onCacheInsight}
      />
    </div>
  );
}
