import { useEffect } from 'react'
import { useDifficulty, MODES } from './DifficultyContext'

const ALL_OPTIONS = [
  { key: MODES.LEARN, label: 'Learn' },
  { key: MODES.PRACTICE, label: 'Practice' },
  { key: MODES.QUIZ, label: 'Quiz' },
  { key: MODES.PROOF, label: 'Proof' },
]

const DEFAULT_MODES = [MODES.LEARN, MODES.PRACTICE, MODES.QUIZ]

export default function DifficultyDial({ modes = DEFAULT_MODES }) {
  const { mode, setMode } = useDifficulty()

  // If the user navigated here while in a mode that's not enabled on this page,
  // snap back to LEARN so the dial state matches what's actually rendered.
  useEffect(() => {
    if (!modes.includes(mode)) setMode(MODES.LEARN)
  }, [modes, mode, setMode])

  const options = ALL_OPTIONS.filter((o) => modes.includes(o.key))

  return (
    <>
      <style>{`
        .dial {
          display: flex;
          gap: 0;
          background: #1e1a16;
          border: 1px solid #2e2924;
          border-radius: 6px;
          padding: 3px;
          margin-bottom: 32px;
          width: fit-content;
        }
        .dial-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.5px;
          padding: 6px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          background: transparent;
          color: #8a7e6e;
          transition: all 0.15s;
        }
        .dial-btn:hover { color: #c4b5a0; }
        .dial-btn.active {
          background: #28221a;
          color: #d4a574;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
      `}</style>
      <div className="dial">
        {options.map((o) => (
          <button
            key={o.key}
            className={`dial-btn${mode === o.key ? ' active' : ''}`}
            onClick={() => setMode(o.key)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </>
  )
}
