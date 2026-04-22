import { Link, useLocation } from 'react-router-dom'

const units = [
  {
    num: 4,
    label: 'Unit 4',
    problems: [
      { num: 1, title: 'Tail Sum Formula', path: '/unit-4/problem-1' },
      { num: 2, title: "Chernoff's Inequality", path: '/unit-4/problem-2' },
      { num: 3, title: 'Boosting Randomized Alg.', path: '/unit-4/problem-3' },
      { num: 4, title: 'Max Degree Random Graphs', path: '/unit-4/problem-4' },
    ],
  },
  {
    num: 5,
    label: 'Unit 5',
    problems: [
      { num: 1, title: 'Probabilistic Method (Matrix)', path: '/unit-5/problem-1' },
      { num: 2, title: 'Moment & MGF Bounds', path: '/unit-5/problem-2' },
      { num: 3, title: 'Dimension Reduction', path: '/unit-5/problem-3' },
      { num: 4, title: 'Dependent R.V. Inequality', path: '/unit-5/problem-4' },
    ],
  },
  {
    num: 6,
    label: 'Unit 6',
    problems: [
      { num: 1, title: 'Martingale Increments', path: '/unit-6/problem-1' },
    ],
  },
]

export default function Nav() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  // Find current unit and problem
  let currentUnit = null
  let currentIdx = -1
  for (const unit of units) {
    const idx = unit.problems.findIndex((p) => p.path === pathname)
    if (idx !== -1) {
      currentUnit = unit
      currentIdx = idx
      break
    }
  }

  const prev = currentUnit?.problems[currentIdx - 1]
  const next = currentUnit?.problems[currentIdx + 1]

  return (
    <>
      <style>{`
        .nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(26, 22, 18, 0.92);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid #2e2924;
          padding: 0 20px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: -36px -20px 36px;
        }
        .nav-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .nav-brand {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: #d4a574;
          text-decoration: none;
          letter-spacing: 0.5px;
          font-weight: 600;
        }
        .nav-brand:hover { color: #f0e6d3; }
        .nav-sep {
          color: #3a3530;
          font-size: 14px;
          user-select: none;
        }
        .nav-breadcrumb {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #8a7e6e;
          letter-spacing: 0.5px;
        }
        .nav-right {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .nav-unit {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #8a7e6e;
          text-decoration: none;
          padding: 4px 10px;
          border-radius: 4px;
          transition: color 0.15s, background 0.15s;
          letter-spacing: 0.5px;
        }
        .nav-unit:hover { color: #c4b5a0; background: #252019; }
        .nav-unit.active { color: #d4a574; background: #28221a; }
        .nav-unit.disabled {
          color: #5a5245;
          cursor: default;
          pointer-events: none;
        }
        .nav-arrows {
          display: flex;
          align-items: center;
          gap: 2px;
          margin-left: 12px;
        }
        .nav-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 4px;
          text-decoration: none;
          font-size: 14px;
          color: #8a7e6e;
          transition: color 0.15s, background 0.15s;
        }
        .nav-arrow:hover { color: #d4a574; background: #252019; }
        .nav-arrow.disabled {
          color: #3a3530;
          pointer-events: none;
        }
      `}</style>

      <nav className="nav">
        <div className="nav-left">
          <span className="nav-brand">P&C</span>
          {currentUnit && (
            <>
              <span className="nav-sep">/</span>
              <span className="nav-breadcrumb">
                {currentUnit.label} · Problem {currentIdx + 1}
              </span>
            </>
          )}
        </div>

        <div className="nav-right">
          {units.map((u) => {
            const isActive = currentUnit?.num === u.num || (isHome && false)
            const isDisabled = u.problems.length === 0
            return (
              <Link
                key={u.num}
                to={isDisabled ? '#' : u.problems[0].path}
                className={`nav-unit ${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
              >
                {u.label}
              </Link>
            )
          })}

          {currentUnit && (
            <div className="nav-arrows">
              {prev ? (
                <Link to={prev.path} className="nav-arrow" title={prev.title}>←</Link>
              ) : (
                <span className="nav-arrow disabled">←</span>
              )}
              {next ? (
                <Link to={next.path} className="nav-arrow" title={next.title}>→</Link>
              ) : (
                <span className="nav-arrow disabled">→</span>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
