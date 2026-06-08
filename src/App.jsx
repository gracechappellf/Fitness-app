import { useState, useRef } from 'react';
import { useStore } from './useStore.js';
import { TOD_DOW, dayKeyOf, offsetOfDow } from './utils.js';
import Header from './components/Header.jsx';
import WeekTab from './components/WeekTab.jsx';
import TodayTab from './components/TodayTab.jsx';
import MealsTab from './components/MealsTab.jsx';
import GroceryTab from './components/GroceryTab.jsx';
import GutTab from './components/GutTab.jsx';
import Modal from './components/Modal.jsx';

const TABS = ['week', 'today', 'meals', 'grocery', 'gut'];
const NAV = [
  { id: 'week', icon: 'ti-calendar-week', label: 'Week' },
  { id: 'today', icon: 'ti-lightning-bolt', label: 'Today' },
  { id: 'meals', icon: 'ti-bowl', label: 'Meals' },
  { id: 'grocery', icon: 'ti-shopping-cart', label: 'Grocery' },
  { id: 'gut', icon: 'ti-leaf', label: 'Gut' },
];

export default function App() {
  const { store, toggleDone, toggleMealCheck, toggleMealExp, toggleGrocery, resetGrocery, toggleGut } = useStore();
  const [activeTab, setActiveTab] = useState('week');
  const [viewDow, setViewDow] = useState(TOD_DOW);
  const [viewKey, setViewKey] = useState(() => dayKeyOf(offsetOfDow(TOD_DOW)));
  const [modalOpen, setModalOpen] = useState(false);
  const scrollRef = useRef(null);

  function showTab(id) {
    setActiveTab(id);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }

  function jumpToDay(dow, key) {
    setViewDow(dow);
    setViewKey(key);
    showTab('today');
  }

  function handleLogActivity() {
    const key = dayKeyOf(offsetOfDow(TOD_DOW));
    toggleDone(key);
    // Ensure it's set to true even if it was already true
    setModalOpen(false);
  }

  return (
    <div className="app">
      <Header store={store} />

      <div className="scroll" ref={scrollRef}>
        <div className={`section ${activeTab === 'week' ? 'active' : ''}`}>
          <WeekTab
            store={store}
            onJumpToDay={jumpToDay}
            onOpenModal={() => setModalOpen(true)}
            onQuickDone={toggleDone}
          />
        </div>
        <div className={`section ${activeTab === 'today' ? 'active' : ''}`}>
          <TodayTab
            store={store}
            viewDow={viewDow}
            viewKey={viewKey}
            onToggleEx={toggleDone}
            onToggleDone={toggleDone}
          />
        </div>
        <div className={`section ${activeTab === 'meals' ? 'active' : ''}`}>
          <MealsTab
            store={store}
            onToggleMealCheck={toggleMealCheck}
            onToggleMealExp={toggleMealExp}
          />
        </div>
        <div className={`section ${activeTab === 'grocery' ? 'active' : ''}`}>
          <GroceryTab
            store={store}
            onToggleGrocery={toggleGrocery}
            onResetGrocery={resetGrocery}
          />
        </div>
        <div className={`section ${activeTab === 'gut' ? 'active' : ''}`}>
          <GutTab store={store} onToggleGut={toggleGut} />
        </div>
      </div>

      <nav className="bottom-nav">
        {NAV.map(n => (
          <button key={n.id} className={`nav-btn ${activeTab === n.id ? 'active' : ''}`} onClick={() => showTab(n.id)}>
            <i className={`ti ${n.icon}`}></i>
            <span>{n.label}</span>
          </button>
        ))}
      </nav>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onLog={handleLogActivity}
      />
    </div>
  );
}
