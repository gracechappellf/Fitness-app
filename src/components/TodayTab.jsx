import { SCHED } from '../data.js';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const BADGE_CLASS = { strength: 'badge-strength', cardio: 'badge-cardio', class: 'badge-class', rest: 'badge-rest' };

export default function TodayTab({ store, viewDow, viewKey, onToggleEx, onToggleDone }) {
  const s = SCHED[viewDow];
  const isDone = store.done[viewKey];

  let total = 0, done = 0;
  s.groups.forEach(g => g.items.forEach((_, i) => {
    total++;
    if (store.done[`${viewKey}|${g.name}|${i}`]) done++;
  }));

  return (
    <div>
      <div className="card" style={{ marginBottom: 12, borderColor: !isDone ? 'var(--tc)' : undefined }}>
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
              <span className={`badge ${BADGE_CLASS[s.type]}`}>{s.label}</span>
            </div>
            <div className="card-title">{DAY_NAMES[viewDow]}</div>
            <div className="card-sub">⏰ {s.time}</div>
          </div>
          <button className={`done-btn ${isDone ? 'done' : ''}`} onClick={() => onToggleDone(viewKey)}>
            <i className={`ti ${isDone ? 'ti-check' : 'ti-circle'}`}></i>
            {isDone ? 'Done!' : 'Mark done'}
          </button>
        </div>
        <div className="prog-wrap">
          <div className="prog-bg">
            <div className="prog-fill" style={{ width: total > 0 ? `${Math.round(done / total * 100)}%` : '0%' }}></div>
          </div>
          <span className="prog-txt">{done}/{total}</span>
        </div>
      </div>

      {s.groups.map(g => (
        <div key={g.name}>
          <div className="group-label">{g.name}</div>
          <div className="card" style={{ marginBottom: 12 }}>
            {g.items.map((ex, i) => {
              const k = `${viewKey}|${g.name}|${i}`;
              const checked = store.done[k];
              return (
                <div key={i} className="ex-item" onClick={() => onToggleEx(k)}>
                  <div className={`ex-circle ${checked ? 'checked' : ''}`}></div>
                  <div style={{ flex: 1 }}>
                    <div className={`ex-name ${checked ? 'done' : ''}`}>{ex.n}</div>
                    <div className="ex-detail">{ex.d}</div>
                    <div className="ex-cue">{ex.c}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
