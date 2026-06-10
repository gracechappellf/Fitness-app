import { useState, useEffect } from 'react';
import { getLastLog, suggestWeight } from '../utils.js';

export default function WorkoutLogSheet({ open, onClose, exerciseName, dateKey, workoutLogs, onSave }) {
  const lastLog = getLastLog(workoutLogs || {}, dateKey, exerciseName);
  const suggested = lastLog ? suggestWeight(lastLog.sets) : null;
  const todayKey = `${dateKey}|${exerciseName}`;
  const todayLog = workoutLogs?.[todayKey];

  const [sets, setSets] = useState([{ reps: '', weight: '' }]);

  useEffect(() => {
    if (!open) return;
    if (todayLog?.sets?.length) {
      setSets(todayLog.sets.map(s => ({ reps: String(s.reps), weight: String(s.weight) })));
    } else if (lastLog?.sets?.length) {
      setSets(lastLog.sets.map(s => ({ reps: '', weight: String(suggested ?? s.weight) })));
    } else {
      setSets([{ reps: '', weight: '' }]);
    }
  }, [open, exerciseName, dateKey]);

  function updateSet(i, field, val) {
    setSets(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: val } : s));
  }

  function addSet() {
    const last = sets[sets.length - 1];
    setSets(prev => [...prev, { reps: '', weight: last?.weight || '' }]);
  }

  function removeSet(i) {
    if (sets.length === 1) return;
    setSets(prev => prev.filter((_, idx) => idx !== i));
  }

  function handleSave() {
    const valid = sets
      .filter(s => s.reps !== '' && s.weight !== '')
      .map(s => ({ reps: parseFloat(s.reps), weight: parseFloat(s.weight) }));
    if (!valid.length) { onClose(); return; }
    onSave(dateKey, exerciseName, valid);
    onClose();
  }

  const maxToday = todayLog?.sets?.length
    ? Math.max(...todayLog.sets.map(s => s.weight))
    : null;
  const maxLast = lastLog?.sets?.length
    ? Math.max(...lastLog.sets.map(s => s.weight))
    : null;
  const isPR = maxToday != null && maxLast != null && maxToday > maxLast;

  if (!open) return null;

  return (
    <div className="sheet-bg" onClick={onClose}>
      <div className="sheet" onClick={e => e.stopPropagation()}>
        <div className="sheet-handle"></div>
        <div className="sheet-title">{exerciseName}</div>

        {lastLog && (
          <div className="wl-last-session">
            <div className="wl-last-label">Last session</div>
            <div className="wl-last-sets">
              {lastLog.sets.map((s, i) => (
                <span key={i} className="wl-last-set">{s.weight}kg × {s.reps}</span>
              ))}
            </div>
            {suggested != null && (
              <div className="wl-suggest">Target today: <strong>{suggested}kg</strong></div>
            )}
          </div>
        )}

        {isPR && (
          <div className="wl-pr-badge">New best! Keep going</div>
        )}

        <div className="wl-sets-header">
          <span>Set</span><span>Weight (kg)</span><span>Reps</span><span></span>
        </div>

        {sets.map((s, i) => (
          <div key={i} className="wl-set-row">
            <span className="wl-set-num">{i + 1}</span>
            <input
              className="wl-input"
              type="number"
              inputMode="decimal"
              placeholder={suggested ?? '—'}
              value={s.weight}
              onChange={e => updateSet(i, 'weight', e.target.value)}
            />
            <input
              className="wl-input"
              type="number"
              inputMode="numeric"
              placeholder="12"
              value={s.reps}
              onChange={e => updateSet(i, 'reps', e.target.value)}
            />
            <button className="wl-remove-btn" onClick={() => removeSet(i)} disabled={sets.length === 1}>
              <i className="ti ti-x"></i>
            </button>
          </div>
        ))}

        <button className="wl-add-set-btn" onClick={addSet}>
          <i className="ti ti-plus"></i> Add set
        </button>

        <div className="sheet-btns">
          <button className="btn-s" onClick={onClose}>Cancel</button>
          <button className="btn-p" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
