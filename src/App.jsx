import { useState } from 'react';
import { useStore } from './useStore.js';
import Header from './components/Header.jsx';
import TrainTab from './components/TrainTab.jsx';
import FuelTab from './components/FuelTab.jsx';
import ShopTab from './components/ShopTab.jsx';
import DiaryTab from './components/DiaryTab.jsx';
import MeTab from './components/MeTab.jsx';

const NAV = [
  { id: 'train', icon: 'ti-barbell',       label: 'Train' },
  { id: 'fuel',  icon: 'ti-bowl',          label: 'Meals' },
  { id: 'shop',  icon: 'ti-shopping-cart', label: 'Shop' },
  { id: 'diary', icon: 'ti-notebook',      label: 'Diary' },
  { id: 'me',    icon: 'ti-user',          label: 'Me' },
];

export default function App() {
  const {
    store,
    toggleDone,
    toggleMealCheck,
    toggleGrocery,
    resetGrocery,
    toggleGut,
    saveWorkoutLog,
    addWeightEntry,
    setMealRotation,
    setMealOverride,
    clearMealOverride,
    setPantryItem,
    removePantryItem,
    saveDiaryEntry,
    setAiKey,
    setAiModel,
    cacheInsight,
    clearV2Backup,
  } = useStore();

  const [activeTab, setActiveTab] = useState('train');
  const [scrollRefs] = useState({});

  function showTab(id) {
    setActiveTab(id);
  }

  return (
    <div className="app">
      <Header store={store} activeTab={activeTab} />

      <div className="stripe-bar"><span></span><span></span><span></span></div>

      <div className="scroll">
        <div className={`section ${activeTab === 'train' ? 'active' : ''}`}>
          <TrainTab
            store={store}
            onToggleDone={toggleDone}
            onSaveWorkoutLog={saveWorkoutLog}
          />
        </div>
        <div className={`section ${activeTab === 'fuel' ? 'active' : ''}`}>
          <FuelTab
            store={store}
            onToggleMealCheck={toggleMealCheck}
            setMealRotation={setMealRotation}
            onSetMealOverride={setMealOverride}
            onClearMealOverride={clearMealOverride}
          />
        </div>
        <div className={`section ${activeTab === 'shop' ? 'active' : ''}`}>
          <ShopTab
            store={store}
            onToggleGrocery={toggleGrocery}
            onResetGrocery={resetGrocery}
            onSetPantryItem={setPantryItem}
            onRemovePantryItem={removePantryItem}
          />
        </div>
        <div className={`section ${activeTab === 'diary' ? 'active' : ''}`}>
          <DiaryTab
            store={store}
            onSaveDiaryEntry={saveDiaryEntry}
            onToggleGut={toggleGut}
            onCacheInsight={cacheInsight}
          />
        </div>
        <div className={`section ${activeTab === 'me' ? 'active' : ''}`}>
          <MeTab
            store={store}
            onAddWeightEntry={addWeightEntry}
            onSetAiKey={setAiKey}
            onSetAiModel={setAiModel}
            onClearV2Backup={clearV2Backup}
          />
        </div>
      </div>

      <nav className="bottom-nav">
        {NAV.map(n => (
          <button
            key={n.id}
            className={`nav-btn ${activeTab === n.id ? 'active' : ''}`}
            onClick={() => showTab(n.id)}
          >
            <i className={`ti ${n.icon}`}></i>
            <span>{n.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
