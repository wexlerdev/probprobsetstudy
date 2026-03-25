export default function Callout({ type, label, children }) {
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
