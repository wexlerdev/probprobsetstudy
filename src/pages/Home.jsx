import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const units = [
  {
    num: 4,
    label: 'UNIT 4',
    problems: [
      {
        num: 1,
        title: 'Tail Sum Formula for Expectation',
        route: '/unit-4/problem-1',
        subtitle:
          'Proving that for a non-negative random variable Y on a finite probability space: E[Y] = \u222B\u2080\u221E P(Y \u2265 t) dt',
      },
      {
        num: 2,
        title: "Chernoff's Inequality Revisited",
        route: '/unit-4/problem-2',
        subtitle:
          'From the exact rate function to Hoeffding to Okamoto \u2014 three levels of precision for controlling the tail of a sum of independent Bernoulli trials.',
      },
      {
        num: 3,
        title: 'Boosting Randomized Algorithms',
        route: '/unit-4/problem-3',
        subtitle:
          'You have an algorithm that\u2019s barely better than a coin flip. Run it many times, take majority vote, and the error probability drops exponentially.',
      },
      {
        num: 4,
        title: 'Maximal Degree on Random Graphs',
        route: '/unit-4/problem-4',
        subtitle:
          'In a sparse Erd\u0151s\u2013R\u00e9nyi graph with constant expected degree, the maximum degree is \u0398(log n / log log n) with high probability.',
      },
    ],
  },
  {
    num: 5,
    label: 'UNIT 5',
    problems: [
      {
        num: 1,
        title: 'Probabilistic Method: 0\u20131 Matrices',
        route: '/unit-5/problem-1',
        subtitle:
          'Use random matrices and anti-concentration to prove the existence of a 0\u20131 matrix where every sign vector produces a large entry.',
      },
      {
        num: 2,
        title: 'Moment & MGF Bounds',
        route: '/unit-5/problem-2',
        subtitle:
          'Taylor truncation gives an upper bound via moments; the Gaussian integral trick turns sub-Gaussian tails into sub-exponential control of \u03BE\u00B2.',
      },
      {
        num: 3,
        title: 'Dimension Reduction Limits',
        route: '/unit-5/problem-3',
        subtitle:
          'Isometric embeddings of N points need N dimensions. Allow factor-2 distortion and log N suffices \u2014 a volumetric packing argument.',
      },
      {
        num: 4,
        title: 'Dependent Variables: Lower Bound on P(S\u2099 > 0)',
        route: '/unit-5/problem-4',
        subtitle:
          'The 1/S\u2099 trick plus Jensen\u2019s inequality gives a lower bound on the probability that a sum of (possibly dependent) 0\u20131 variables is positive.',
      },
    ],
  },
  {
    num: 6,
    label: 'UNIT 6',
    problems: [
      {
        num: 1,
        title: 'Martingale Increments',
        route: '/unit-6/problem-1',
        subtitle:
          'Square-integrable martingale differences are pairwise uncorrelated, their squared means sum to the total variance V, and at least one obeys a Chebyshev-style tail bound V/(nt\u00b2).',
      },
      {
        num: 2,
        title: 'Bin Packing: Bounds and Concentration',
        route: '/unit-6/problem-2',
        subtitle:
          'Compute B on two concrete inputs, bound it linearly by total mass, then use McDiarmid\u2019s bounded-differences inequality to prove exponential concentration of B\u2099 around its mean.',
      },
      {
        num: 3,
        title: 'Discrepancy via the Lov\u00e1sz Local Lemma',
        route: '/unit-6/problem-3',
        subtitle:
          'For an m-uniform set system where each point lies in at most t sets, find a \u00b11 coloring with discrepancy O(\u221a(m log(mt))). The union bound is too weak; LLL is the right hammer.',
      },
      {
        num: 4,
        title: 'Harris / FKG Correlation Inequality',
        route: '/unit-6/problem-4',
        subtitle:
          'Monotone functions of a random input are positively correlated \u2014 (a) single variable via the two-copies trick, (b) n independent variables via induction, (c) product of m nonneg monotone functions.',
      },
    ],
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
          margin-top: 16px;
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
        .unit-heading {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: #d4a574;
          letter-spacing: 2px;
          margin-top: 40px;
          margin-bottom: 4px;
          padding-bottom: 8px;
          border-bottom: 1px solid #2e2924;
        }
        .unit-heading:first-of-type {
          margin-top: 32px;
        }
      `}</style>

      <div className="container">
        <p className="label">PROB AND COMPUTING</p>
        <h1>Study Guide</h1>
        <p className="subtitle">
          Step-by-step proof walkthroughs with intuition, key ideas, and
          the formal details worked out in full.
        </p>

        {units.map((unit) => (
          <div key={unit.num}>
            <div className="unit-heading">{unit.label}</div>
            <div className="home-cards">
              {unit.problems.map((p) => (
                <Link key={p.route} to={p.route} className="home-card">
                  <div className="home-card-num">PROBLEM {p.num}</div>
                  <div className="home-card-title">{p.title}</div>
                  <div className="home-card-subtitle">{p.subtitle}</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
