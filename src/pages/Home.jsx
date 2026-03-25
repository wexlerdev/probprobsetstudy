import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const problems = [
  {
    num: 1,
    title: 'Tail Sum Formula for Expectation',
    route: '/problem-1',
    subtitle:
      'Proving that for a non-negative random variable Y on a finite probability space: E[Y] = \u222B\u2080\u221E P(Y \u2265 t) dt',
  },
  {
    num: 2,
    title: "Chernoff's Inequality Revisited",
    route: '/problem-2',
    subtitle:
      'From the exact rate function to Hoeffding to Okamoto \u2014 three levels of precision for controlling the tail of a sum of independent Bernoulli trials.',
  },
  {
    num: 3,
    title: 'Boosting Randomized Algorithms',
    route: '/problem-3',
    subtitle:
      'You have an algorithm that\u2019s barely better than a coin flip. Run it many times, take majority vote, and the error probability drops exponentially.',
  },
  {
    num: 4,
    title: 'Maximal Degree on Random Graphs',
    route: '/problem-4',
    subtitle:
      'In a sparse Erd\u0151s\u2013R\u00e9nyi graph with constant expected degree, the maximum degree is \u0398(log n / log log n) with high probability.',
  },
]

export default function Home() {
  useEffect(() => {
    document.title = 'Prob and Computing Study Guide'
  }, [])

  return (
    <>
      <style>{`
        .home-cards {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 32px;
        }
        .home-card {
          display: block;
          background: #221e1a;
          border: 1px solid #2e2924;
          border-radius: 10px;
          padding: 24px;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
        }
        .home-card:hover {
          border-color: #d4a574;
          background: #28231d;
          transform: translateY(-2px);
        }
        .home-card-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #8a7e6e;
          letter-spacing: 1.5px;
          margin-bottom: 6px;
        }
        .home-card-title {
          font-size: 18px;
          font-weight: 600;
          color: #f0e6d3;
          line-height: 1.3;
          margin-bottom: 8px;
        }
        .home-card-subtitle {
          font-size: 14px;
          color: #8a7e6e;
          line-height: 1.6;
          font-style: italic;
        }
      `}</style>

      <div className="container">
        <p className="label">PROB AND COMPUTING</p>
        <h1>Study Guide</h1>
        <p className="subtitle">
          Step-by-step proof walkthroughs with intuition, key ideas, and
          the formal details worked out in full.
        </p>

        <div className="home-cards">
          {problems.map((p) => (
            <Link key={p.num} to={p.route} className="home-card">
              <div className="home-card-num">PROBLEM {p.num}</div>
              <div className="home-card-title">{p.title}</div>
              <div className="home-card-subtitle">{p.subtitle}</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
