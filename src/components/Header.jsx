import { calcStreak, formatHeaderDate } from '../utils.js';

export default function Header({ store }) {
  const streak = calcStreak(store.done);
  return (
    <div className="header">
      <div className="header-row">
        <div>
          <div className="header-title">Grace Fit</div>
          <div className="header-sub">{formatHeaderDate()}</div>
        </div>
        <div className="header-streak">
          <i className="ti ti-flame"></i>
          <span>{streak}</span>
        </div>
      </div>
    </div>
  );
}
