import { SCHED } from '../data.js';
import { getMon, dayKeyOf, dowOfOffset, calcStreak, isThisWeek, TOD_DOW } from '../utils.js';

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TYPE_CLASS = { strength: 'wci-strength', cardio: 'wci-cardio', class: 'wci-class', rest: 'wci-rest' };

export default function WeekTab({ store, onJumpToDay, onOpenModal, onQuickDone }) {
  const streak = calcStreak(store.done);
  const done = Object.keys(store.done).filter(k => store.done[k] && isThisWeek(k)).length;

  return (
    <div>
      {/* Week pills */}
      <div className="week-pills">
        {Array.from({ length: 7 }, (_, i) => {
          const dow = dowOfOffset(i);
          const key = dayKeyOf(i);
          const isDone = store.done[key];
          const isTod = dow === TOD_DOW;
          const mon = getMon();
          mon.setDate(mon.getDate() + i);
          const cls = isDone ? 'done-day' : isTod ? 'today' : '';
          return (
            <div key={i} className={`day-pill ${cls}`} onClick={() => onJumpToDay(dow, key)}>
              <div className="dn">{DAY_LABELS[i]}</div>
              <div className="dd">{mon.getDate()}</div>
              <div className="day-dot"></div>
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card"><div className="stat-val">{done}</div><div className="stat-lbl">Done this week</div></div>
        <div className="stat-card"><div className="stat-val">{streak}</div><div className="stat-lbl">Day streak</div></div>
        <div className="stat-card"><div className="stat-val">{Math.round(done / 7 * 100)}%</div><div className="stat-lbl">Week progress</div></div>
      </div>

      <div className="sec-title">This week</div>

      {/* Week list */}
      {Array.from({ length: 7 }, (_, i) => {
        const dow = dowOfOffset(i);
        const key = dayKeyOf(i);
        const s = SCHED[dow];
        const isTod = dow === TOD_DOW;
        const isDone = store.done[key];
        return (
          <div key={i} className={`week-card ${isTod ? 'today-card' : ''}`} onClick={() => onJumpToDay(dow, key)}>
            <div className={`week-card-icon ${TYPE_CLASS[s.type]}`}>
              <i className={`ti ${s.icon}`}></i>
            </div>
            <div className="week-card-info">
              <div className="week-card-day">{DAY_NAMES[i]}{isTod ? ' · today' : ''}</div>
              <div className="week-card-name">{s.label}</div>
              <div className="week-card-time">{s.icon === 'ti-walk' ? '🧘 ' : '⏰ '}{s.time}</div>
            </div>
            <div
              className={`week-done-badge ${isDone ? 'done' : ''}`}
              onClick={e => { e.stopPropagation(); onQuickDone(key); }}
            ></div>
          </div>
        );
      })}

      <button className="log-btn" onClick={onOpenModal}>
        <i className="ti ti-plus"></i> Log extra activity
      </button>
    </div>
  );
}
