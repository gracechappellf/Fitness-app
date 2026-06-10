import { useState } from 'react';

const ACTIVITIES = [
  { label: 'Tennis', icon: 'ti-tennis' },
  { label: 'Run', icon: 'ti-run' },
  { label: 'Pilates', icon: 'ti-yoga' },
  { label: "Barry's", icon: 'ti-flame' },
  { label: 'Hot Sculpt', icon: 'ti-fire' },
  { label: 'Reformer', icon: 'ti-activity' },
  { label: 'Spin', icon: 'ti-bike' },
  { label: 'Walk', icon: 'ti-walk' },
  { label: 'Swimming', icon: 'ti-swimming' },
];

export default function Modal({ open, onClose, onLog }) {
  const [sel, setSel] = useState(null);

  function handleLog() {
    if (!sel) return;
    onLog();
    setSel(null);
  }

  function handleClose() {
    setSel(null);
    onClose();
  }

  return (
    <div className={`modal-bg ${open ? 'open' : ''}`} onClick={e => { if (e.target === e.currentTarget) handleClose(); }}>
      <div className="modal">
        <div className="modal-handle"></div>
        <div className="modal-title">Log extra activity</div>
        <div className="act-grid">
          {ACTIVITIES.map(a => (
            <div key={a.label} className={`act-opt ${sel === a.label ? 'sel' : ''}`} onClick={() => setSel(a.label)}>
              <i className={`ti ${a.icon}`}></i>
              {a.label}
            </div>
          ))}
        </div>
        <div className="modal-btns">
          <button className="btn-s" onClick={handleClose}>Cancel</button>
          <button className="btn-p" onClick={handleLog}>Log it</button>
        </div>
      </div>
    </div>
  );
}
