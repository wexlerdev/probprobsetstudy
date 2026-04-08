import { useDifficulty, MODES } from './DifficultyContext'

export default function Callout({ type, label, children }) {
  const ctx = useDifficulty()
  const mode = ctx?.mode || MODES.LEARN

  // Hide callouts in quiz mode
  if (mode === MODES.QUIZ) return null

  const labels = {
    intuition: 'INTUITION',
    warning: 'WATCH OUT',
    key: 'KEY IDEA',
    connection: 'CONNECTION',
  }

  return (
    <div className={`callout callout-${type}`}>
      <div className="callout-label">{label || labels[type]}</div>
      {children}
    </div>
  )
}
