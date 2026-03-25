export default function Box({ label, labelColor, children }) {
  return (
    <div className="box">
      <div className="box-label" style={{ color: labelColor }}>{label}</div>
      {children}
    </div>
  )
}
