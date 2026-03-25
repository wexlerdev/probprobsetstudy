import { useState } from 'react'

export default function Toggle({ label, children }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="toggle">
      <button className="toggle-btn" onClick={() => setOpen(o => !o)}>
        {open ? '\u25be' : '\u25b8'} {label}
      </button>
      <div className={`toggle-content${open ? ' open' : ''}`}>
        {children}
      </div>
    </div>
  )
}
