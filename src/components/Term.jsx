export default function Term({ children, tooltip, wide }) {
  return (
    <span className="term">
      {children}
      <span className={`term-tooltip${wide ? ' term-tooltip-wide' : ''}`}>{tooltip}</span>
    </span>
  )
}
