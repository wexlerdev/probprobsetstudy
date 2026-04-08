import { useState } from 'react'
import { useDifficulty, MODES } from './DifficultyContext'

export default function Step({ badge, badgeClass, title, hint, decision, children }) {
  const ctx = useDifficulty()
  const mode = ctx?.mode || MODES.LEARN
  const [revealed, setRevealed] = useState(false)

  const collapsed = mode !== MODES.LEARN
  const showContent = mode === MODES.LEARN || revealed

  return (
    <div className="step">
      <div className="step-header">
        <span className={`step-badge${badgeClass ? ' ' + badgeClass : ''}`}>{badge}</span>
        <span className="step-title">{title}</span>
      </div>

      {/* Quiz mode: show hint */}
      {mode === MODES.QUIZ && hint && !revealed && (
        <p style={{ color: '#8a7e6e', fontStyle: 'italic', fontSize: '14px', marginTop: '8px' }}>
          {hint}
        </p>
      )}

      {/* Practice mode: show decision logic */}
      {mode === MODES.PRACTICE && decision && !revealed && (
        <p style={{ color: '#a89880', fontSize: '14px', marginTop: '8px' }}>
          {decision}
        </p>
      )}

      {/* Reveal button */}
      {collapsed && !revealed && (
        <button
          onClick={() => setRevealed(true)}
          style={{
            background: 'none',
            border: '1px dashed #3a3530',
            borderRadius: '4px',
            color: '#d4a574',
            cursor: 'pointer',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            padding: '4px 12px',
            marginTop: '10px',
            opacity: 0.7,
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={(e) => (e.target.style.opacity = 1)}
          onMouseLeave={(e) => (e.target.style.opacity = 0.7)}
        >
          reveal
        </button>
      )}

      {/* Collapse button */}
      {collapsed && revealed && (
        <button
          onClick={() => setRevealed(false)}
          style={{
            background: 'none',
            border: 'none',
            color: '#5a5245',
            cursor: 'pointer',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            padding: '0',
            marginTop: '10px',
          }}
        >
          collapse
        </button>
      )}

      {showContent && children}
    </div>
  )
}
