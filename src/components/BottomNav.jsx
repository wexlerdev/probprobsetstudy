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
]

export default function BottomNav() {
  const { pathname } = useLocation()

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

  if (!currentUnit) return null

  const prev = currentUnit.problems[currentIdx - 1]
  const next = currentUnit.problems[currentIdx + 1]

  return (
    <>
      <style>{`
        .bottom-nav {
          display: flex;
          justify-content: space-between;
          align-items: stretch;
          margin-top: 48px;
          padding-top: 24px;
          border-top: 1px solid #2e2924;
          gap: 16px;
        }
        .bottom-nav-link {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 14px 18px;
          border-radius: 6px;
          text-decoration: none;
          border: 1px solid #2e2924;
          transition: border-color 0.15s, background 0.15s;
          min-width: 0;
          flex: 0 1 auto;
          max-width: 48%;
        }
        .bottom-nav-link:hover {
          border-color: #d4a574;
          background: #211c16;
        }
        .bottom-nav-link.next {
          margin-left: auto;
          text-align: right;
        }
        .bottom-nav-dir {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #8a7e6e;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .bottom-nav-title {
          font-size: 14px;
          color: #d4a574;
          font-weight: 600;
        }
        .bottom-nav-link:hover .bottom-nav-title {
          color: #f0e6d3;
        }
      `}</style>

      <nav className="bottom-nav">
        {prev ? (
          <Link to={prev.path} className="bottom-nav-link prev">
            <span className="bottom-nav-dir">← Previous</span>
            <span className="bottom-nav-title">Problem {prev.num}: {prev.title}</span>
          </Link>
        ) : <span />}
        {next ? (
          <Link to={next.path} className="bottom-nav-link next">
            <span className="bottom-nav-dir">Next →</span>
            <span className="bottom-nav-title">Problem {next.num}: {next.title}</span>
          </Link>
        ) : <span />}
      </nav>
    </>
  )
}
