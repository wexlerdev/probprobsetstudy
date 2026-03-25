export default function Step({ badge, badgeClass, title, children }) {
  return (
    <div className="step">
      <div className="step-header">
        <span className={`step-badge${badgeClass ? ' ' + badgeClass : ''}`}>{badge}</span>
        <span className="step-title">{title}</span>
      </div>
      {children}
    </div>
  )
}
