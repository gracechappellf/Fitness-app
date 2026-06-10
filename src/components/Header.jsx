import { calcStreak, getTimeSlot } from '../utils.js';

const TAB_TITLES = {
  train: 'Train',
  fuel:  'Fuel',
  shop:  'Shop',
  diary: 'Diary',
  me:    'Me',
};

export default function Header({ store, activeTab }) {
  const streak = calcStreak(store.done);
  const { greeting } = getTimeSlot();
  const rotation = store.mealPlanRotation?.currentWeek;

  return (
    <div className="header">
      <div className="header-row">
        <div>
          <div className="header-title">Grace Fit</div>
          <div className="header-sub">
            {activeTab === 'train' ? greeting : TAB_TITLES[activeTab]}
            {activeTab === 'fuel' && rotation && (
              <span className="header-rotation-chip">Week {rotation}</span>
            )}
          </div>
        </div>
        <div className="header-streak">
          <i className="ti ti-flame"></i>
          <span>{streak}</span>
        </div>
      </div>
    </div>
  );
}
