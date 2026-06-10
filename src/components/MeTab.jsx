import { useState } from 'react';
import { callClaude } from '../ai.js';

const TODAY_ISO = new Date().toISOString().slice(0, 10);

export default function MeTab({ store, onAddWeightEntry, onSetAiKey, onSetAiModel, onClearV2Backup }) {
  const [weightInput, setWeightInput] = useState('');
  const [weightDate, setWeightDate] = useState(TODAY_ISO);
  const [apiKeyInput, setApiKeyInput] = useState(store.ai?.apiKey || '');
  const [keyVisible, setKeyVisible] = useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const [testResult, setTestResult] = useState('');
  const [testError, setTestError] = useState('');
  const [v2Cleared, setV2Cleared] = useState(false);

  const weightLog = (store.weightLog || []).slice().reverse().slice(0, 30);

  function handleAddWeight() {
    const w = parseFloat(weightInput);
    if (!isNaN(w) && w > 0) {
      onAddWeightEntry(weightDate, w);
      setWeightInput('');
    }
  }

  function handleSaveKey() {
    onSetAiKey(apiKeyInput.trim());
  }

  async function handleTestKey() {
    if (!apiKeyInput.trim()) return;
    setTestLoading(true);
    setTestResult('');
    setTestError('');
    try {
      const result = await callClaude(apiKeyInput.trim(), 'Reply with exactly: OK', 'ping', store.ai?.model);
      setTestResult(result.includes('OK') ? 'Connection successful!' : `Received: ${result}`);
    } catch (e) {
      setTestError(e.message);
    } finally {
      setTestLoading(false);
    }
  }

  function handleClearV2() {
    onClearV2Backup();
    setV2Cleared(true);
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(store, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gracefit-backup-${TODAY_ISO}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      {/* Weight log */}
      <div className="sec-title">Body weight</div>
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ padding: '14px 16px' }}>
          <div className="diary-field-label">Log weight</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
            <input
              type="date"
              className="diary-date-input"
              value={weightDate}
              max={TODAY_ISO}
              onChange={e => setWeightDate(e.target.value)}
              style={{ flex: 1 }}
            />
            <input
              className="diary-text-input"
              type="number"
              inputMode="decimal"
              placeholder="kg"
              value={weightInput}
              onChange={e => setWeightInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddWeight()}
              style={{ width: 80 }}
            />
            <button className="btn-p" style={{ padding: '0 16px', height: 40 }} onClick={handleAddWeight}>
              <i className="ti ti-plus"></i>
            </button>
          </div>
        </div>

        {weightLog.length > 0 && (
          <div style={{ borderTop: '0.5px solid var(--border)' }}>
            {weightLog.map((e, i) => (
              <div key={i} className="weight-entry">
                <div className="weight-entry-date">
                  {new Date(e.date + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
                </div>
                <div className="weight-entry-val">{e.weight} kg</div>
              </div>
            ))}
          </div>
        )}

        {weightLog.length === 0 && (
          <div className="empty-state" style={{ padding: '16px' }}>
            <div style={{ color: 'var(--text3)', fontSize: 13 }}>No weight entries yet</div>
          </div>
        )}
      </div>

      {/* AI settings */}
      <div className="sec-title">AI settings</div>
      <div className="card" style={{ marginBottom: 16, padding: '14px 16px' }}>
        <div className="diary-field-label">Claude API key</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 6, marginBottom: 8 }}>
          <input
            className="diary-text-input"
            type={keyVisible ? 'text' : 'password'}
            placeholder="sk-ant-..."
            value={apiKeyInput}
            onChange={e => setApiKeyInput(e.target.value)}
            style={{ flex: 1, fontFamily: 'monospace', fontSize: 12 }}
          />
          <button className="btn-s" style={{ padding: '0 12px', height: 40 }} onClick={() => setKeyVisible(v => !v)}>
            <i className={`ti ${keyVisible ? 'ti-eye-off' : 'ti-eye'}`}></i>
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <button className="btn-p" style={{ flex: 1 }} onClick={handleSaveKey}>Save key</button>
          <button className="btn-s" style={{ flex: 1 }} onClick={handleTestKey} disabled={testLoading || !apiKeyInput.trim()}>
            {testLoading ? <span className="ai-spinner"></span> : 'Test connection'}
          </button>
        </div>
        {testResult && <div className="ai-success">{testResult}</div>}
        {testError && <div className="ai-error">{testError}</div>}

        <div className="ai-key-guide">
          <div className="ai-key-guide-title">How to get an API key</div>
          <div className="ai-key-guide-step"><span>1</span>Go to <strong>console.anthropic.com</strong></div>
          <div className="ai-key-guide-step"><span>2</span>Sign in → Settings → API Keys → Create Key</div>
          <div className="ai-key-guide-step"><span>3</span>Paste it above — stored only on this device</div>
        </div>

        <div style={{ marginTop: 12 }}>
          <div className="diary-field-label">Model</div>
          <select
            className="diary-text-input"
            value={store.ai?.model || 'claude-haiku-4-5'}
            onChange={e => onSetAiModel(e.target.value)}
            style={{ marginTop: 6 }}
          >
            <option value="claude-haiku-4-5">claude-haiku-4-5 (fast, cheap)</option>
            <option value="claude-sonnet-4-6">claude-sonnet-4-6 (smarter)</option>
          </select>
        </div>
      </div>

      {/* Data */}
      <div className="sec-title">Data</div>
      <div className="card" style={{ padding: '14px 16px', marginBottom: 32 }}>
        <button className="btn-s" style={{ width: '100%', marginBottom: 8 }} onClick={exportData}>
          <i className="ti ti-download"></i> Export data (JSON)
        </button>
        {!v2Cleared && (
          <button className="btn-s" style={{ width: '100%', color: 'var(--text3)' }} onClick={handleClearV2}>
            <i className="ti ti-trash"></i> Clear v2 backup
          </button>
        )}
        {v2Cleared && (
          <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--text3)', padding: 8 }}>v2 backup cleared</div>
        )}
      </div>
    </div>
  );
}
