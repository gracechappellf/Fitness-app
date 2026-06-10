import { GUT } from '../data.js';

export default function GutTab({ store, onToggleGut }) {
  return (
    <div>
      {GUT.map((t, i) => {
        const open = store[`gut${i}`];
        return (
          <div key={i} className="tip-card" onClick={() => onToggleGut(i)}>
            <div className="tip-header">
              <div className="tip-icon"><i className={`ti ${t.icon}`}></i></div>
              <div className="tip-title">{t.title}</div>
              <i className={`ti ${open ? 'ti-chevron-up' : 'ti-chevron-down'} tip-chevron`}></i>
            </div>
            <div className={`tip-body ${open ? 'open' : ''}`}>{t.body}</div>
          </div>
        );
      })}
    </div>
  );
}
