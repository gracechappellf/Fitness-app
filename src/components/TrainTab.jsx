import { useState } from 'react';
import { SCHED } from '../data.js';
import { getMon, dayKeyOf, dowOfOffset, calcStreak, TOD_DOW, getTimeSlot, getLastLog, suggestWeight } from '../utils.js';
import WorkoutLogSheet from './WorkoutLogSheet.jsx';

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const BADGE_CLASS = { strength: 'badge-strength', cardio: 'badge-cardio', class: 'badge-class', rest: 'badge-rest' };

function todayOffset() {
  return [1, 2, 3, 4, 5, 6, 0].indexOf(TOD_DOW);
}

export default function TrainTab({ store, onToggleDone, onSaveWorkoutLog }) {
  const todayIdx = todayOffset();
  const [selIdx, setSelIdx] = useState(todayIdx);
  const [logSheet, setLogSheet] = useState(null);

  const selDow = dowOfOffset(selIdx);
  const selKey = dayKeyOf(selIdx);
  const s = SCHED[selDow];
  const isDone = store.done[selKey];
  const { greeting } = getTimeSlot();
  const streak = calcStreak(store.done);
  const todayKey = dayKeyOf(todayIdx);
  const todaySched = SCHED[TOD_DOW];

  let total = 0, done = 0;
  s.groups.forEach(g => g.items.forEach((_, i) => {
    total++;
    if (store.done[`${selKey}|${g.name}|${i}`]) done++;
  }));

  return (
    <div>
      {/* Hero */}
      <div className="hero-card">
        <div className="hero-greeting">{greeting}, Grace</div>
        <div className="hero-date">{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
        <div className="hero-workout">
          {store.done[todayKey]
            ? <span className="hero-done">{todaySched.label} · Crushed it ✓</span>
            : todaySched.type === 'rest'
              ? <span className="hero-rest">{todaySched.label} · Rest & recover</span>
              : <span>{todaySched.label} · {todaySched.time}</span>
          }
        </div>
        <div className="hero-streak">
          <i className="ti ti-flame"></i>
          <span>{streak} day streak</span>
        </div>
      </div>

      {/* Week pills */}
      <div className="week-pills">
        {Array.from({ length: 7 }, (_, i) => {
          const key = dayKeyOf(i);
          const isDoneDay = store.done[key];
          const isTod = i === todayIdx;
          const isSel = i === selIdx;
          const mon = getMon();
          mon.setDate(mon.getDate() + i);
          let cls = '';
          if (isDoneDay) cls = 'done-day';
          else if (isTod) cls = 'today';
          if (isSel) cls += ' selected';
          return (
            <div key={i} className={`day-pill ${cls}`} onClick={() => setSelIdx(i)}>
              <div className="dn">{DAY_LABELS[i]}</div>
              <div className="dd">{mon.getDate()}</div>
              <div className="day-dot"></div>
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-val">{Object.keys(store.done).filter(k => store.done[k] && k.length === 10).length}</div>
          <div className="stat-lbl">Done this week</div>
        </div>
        <div className="stat-card">
          <div className="stat-val">{streak}</div>
          <div className="stat-lbl">Day streak</div>
        </div>
        <div className="stat-card">
          <div className="stat-val">{total > 0 ? Math.round(done / total * 100) : 0}%</div>
          <div className="stat-lbl">Today's progress</div>
        </div>
      </div>

      {/* Day workout */}
      <div className="card" style={{ marginBottom: 12, borderColor: !isDone ? 'var(--tc)' : undefined }}>
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
              <span className={`badge ${BADGE_CLASS[s.type]}`}>{s.label}</span>
            </div>
            <div className="card-title">{DAY_NAMES[selIdx]}</div>
            <div className="card-sub">⏰ {s.time}</div>
          </div>
          <button className={`done-btn ${isDone ? 'done' : ''}`} onClick={() => onToggleDone(selKey)}>
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
              const k = `${selKey}|${g.name}|${i}`;
              const checked = store.done[k];
              const lastLog = getLastLog(store.workoutLogs, selKey, ex.n);
              const suggested = lastLog ? suggestWeight(lastLog.sets) : null;
              const todayLogKey = `${selKey}|${ex.n}`;
              const todayLog = store.workoutLogs?.[todayLogKey];
              return (
                <div key={i} className="ex-item" onClick={() => onToggleDone(k)}>
                  <div className={`ex-circle ${checked ? 'checked' : ''}`}></div>
                  <div style={{ flex: 1 }}>
                    <div className={`ex-name ${checked ? 'done' : ''}`}>{ex.n}</div>
                    <div className="ex-detail">{ex.d}</div>
                    <div className="ex-cue">{ex.c}</div>
                    {lastLog && (
                      <div className="wl-badge" onClick={e => { e.stopPropagation(); setLogSheet({ exerciseName: ex.n }); }}>
                        Last: {Math.max(...lastLog.sets.map(s => s.weight))}kg
                        {suggested != null && ` · Try: ${suggested}kg`}
                        {todayLog && ' · Logged ✓'}
                        <i className="ti ti-chevron-right" style={{ fontSize: 10, marginLeft: 4 }}></i>
                      </div>
                    )}
                    {!lastLog && (
                      <button className="wl-log-new-btn" onClick={e => { e.stopPropagation(); setLogSheet({ exerciseName: ex.n }); }}>
                        <i className="ti ti-plus"></i> Log weight
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <WorkoutLogSheet
        open={!!logSheet}
        onClose={() => setLogSheet(null)}
        exerciseName={logSheet?.exerciseName || ''}
        dateKey={selKey}
        workoutLogs={store.workoutLogs}
        onSave={onSaveWorkoutLog}
      />
    </div>
  );
}
