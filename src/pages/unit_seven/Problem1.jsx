import { useEffect } from 'react'
import DifficultyDial from '../../components/DifficultyDial'
import Toggle from '../../components/Toggle'
import Term from '../../components/Term'
import Callout from '../../components/Callout'
import Step from '../../components/Step'
import MathBlock from '../../components/MathBlock'
import Box from '../../components/Box'
import Footer from '../../components/Footer'
import Tex from '../../components/Tex'
import { useDifficulty, MODES } from '../../components/DifficultyContext'

const PROOF_MODES = [MODES.LEARN, MODES.PRACTICE, MODES.QUIZ, MODES.PROOF]

function FormalProof() {
  return (
    <div className="formal-proof">
      <h2>Proof</h2>

      <p className="part-label">Part (a). There exists x ∈ {'{'}−1,1{'}'}<sup>n</sup> with ‖Ax‖<sub>∞</sub> = O(√(n log n)).</p>

      <p>Pick x uniformly at random from {'{'}−1,1{'}'}<sup>n</sup>. Fix a row i of A. The i-th coordinate of Ax is</p>
      <Tex block>{String.raw`(Ax)_i \;=\; \sum_{j=1}^{n} a_{ij}\, x_j,`}</Tex>
      <p>which is a sum of independent random variables: each term is either 0 (when a<sub>ij</sub> = 0) or ±1 with equal probability (when a<sub>ij</sub> = 1). The squared sum of magnitudes is Σ<sub>j</sub> a<sub>ij</sub><sup>2</sup> = Σ<sub>j</sub> a<sub>ij</sub> ≤ n. So Hoeffding's inequality gives, for any t &gt; 0,</p>
      <Tex block>{String.raw`P\bigl(|(Ax)_i| > t\bigr) \;\le\; 2\exp\!\left(-\,\frac{t^{2}}{2 \sum_j a_{ij}^{2}}\right) \;\le\; 2\exp\!\left(-\,\frac{t^{2}}{2n}\right).`}</Tex>

      <p>Union-bound over the n rows:</p>
      <Tex block>{String.raw`P\bigl(\|Ax\|_\infty > t\bigr) \;\le\; 2n\,\exp\!\left(-\,\frac{t^{2}}{2n}\right).`}</Tex>

      <p>Choose t = √(4n log n). Then exp(−t²/(2n)) = n<sup>−2</sup>, so the bound is 2/n &lt; 1 for n ≥ 3. The complementary event ‖Ax‖<sub>∞</sub> ≤ √(4n log n) has positive probability, so some sign vector x achieves it. ‖Ax‖<sub>∞</sub> = O(√(n log n)).</p>

      <p className="part-label">Part (b). There exists B ∈ {'{'}0,1{'}'}<sup>n×n</sup> with ‖By‖<sub>∞</sub> ≥ c√n for every y ∈ {'{'}−1,1{'}'}<sup>n</sup>.</p>

      <p>Pick B random with iid Bernoulli(1/2) entries. Fix any sign vector y. For row i, ⟨b<sub>i</sub>, y⟩ = Σ<sub>j</sub> b<sub>ij</sub> y<sub>j</sub> is a Bernoulli-weighted sum of values |y<sub>j</sub>| = 1 ≥ 1, so HW 2 Problem 4(c) applies:</p>
      <Tex block>{String.raw`P\bigl(|\langle b_i, y\rangle| < c\sqrt{n}\bigr) \;<\; \tfrac{1}{2}`}</Tex>
      <p>for some universal c &gt; 0. The n rows of B are independent, so</p>
      <Tex block>{String.raw`P\bigl(\|By\|_\infty < c\sqrt{n}\bigr) \;=\; \prod_{i=1}^{n} P\bigl(|\langle b_i, y\rangle| < c\sqrt{n}\bigr) \;<\; 2^{-n}.`}</Tex>

      <p>Union-bound over the 2<sup>n</sup> sign vectors y:</p>
      <Tex block>{String.raw`P\bigl(\exists\, y:\, \|By\|_\infty < c\sqrt{n}\bigr) \;\le\; 2^{n}\!\cdot\! 2^{-n} \;=\; 1.`}</Tex>

      <p>The strict &lt; 1/2 in HW 2 P4(c) makes every factor strictly &lt; 1/2, so the union-bound total is strictly &lt; 1. The complementary event has positive probability — some matrix B forces ‖By‖<sub>∞</sub> ≥ c√n for every sign vector y.</p>

      <p className="qed">∎</p>
    </div>
  )
}

export default function Problem1() {
  useEffect(() => {
    document.title = 'Final Exam Problem 1 — 0/1 Matrix Discrepancy'
  }, [])

  const { mode } = useDifficulty()

  return (
    <div className="container container-narrow">

      {/* Header */}
      <div className="label">FINAL EXAM · PROBLEM 1</div>
      <h1>0/1 Matrix Discrepancy: Both Directions</h1>
      <p className="subtitle">
        Two complementary results about ±1 colorings of 0/1 matrices.
        (a) For every 0/1 matrix A, some sign vector x achieves ‖Ax‖<sub>∞</sub> = O(√(n log n)).
        (b) Some 0/1 matrix B forces ‖By‖<sub>∞</sub> ≥ c√n for every sign vector y.
      </p>

      <DifficultyDial modes={PROOF_MODES} />

      {mode === MODES.PROOF ? <FormalProof /> : (<>

      {/* ============= STEP 0: ORIENT ============= */}
      <Step
        badge="STEP 0"
        title="Orientation — what does this problem actually say?"
        hint="Two directions: (a) random sign vector + Hoeffding gives an upper bound on discrepancy; (b) random matrix + HW 2 P4(c) + double union bound gives a lower bound."
        decision="Before any proofs, parse the objects: what is ‖Ax‖∞? What does it mean to 'find' a sign vector? Why are the two parts going opposite directions?"
      >
        <p>
          Let A be an n×n matrix whose entries are 0 or 1. A{' '}
          <Term tooltip="A vector with each coordinate equal to +1 or −1. There are 2^n such vectors.">sign vector</Term>{' '}
          x ∈ {'{'}−1,+1{'}'}<sup>n</sup> tries to "balance" the rows of A by adding row-entries with chosen signs.
        </p>

        <p>
          The product Ax is an n-dimensional vector. Its i-th coordinate is the{' '}
          <Term tooltip="The dot product of row i of A with x: sum_j a_ij * x_j. Because a_ij is 0 or 1, this picks out a subset of the x_j's and adds them with the chosen signs.">inner product</Term>{' '}
          of row i with x:
        </p>
        <MathBlock>(Ax)<sub>i</sub> = &Sigma;<sub>j=1</sub><sup>n</sup> a<sub>ij</sub> x<sub>j</sub></MathBlock>

        <p>
          The{' '}
          <Term tooltip="The infinity norm (or max norm) of a vector v is the largest absolute value among its entries: ||v||_inf = max_i |v_i|. It measures the worst-case coordinate.">infinity norm</Term>{' '}
          ‖Ax‖<sub>∞</sub> = max<sub>i</sub> |(Ax)<sub>i</sub>| is the largest absolute value among the n row inner products. The whole problem is about controlling this single number.
        </p>

        <Callout type="key">
          The two parts go in opposite directions:
          <br /><br />
          <strong>(a) Upper bound</strong> — for <em>every</em> 0/1 matrix A, <em>some</em> sign vector x makes ‖Ax‖<sub>∞</sub> small (only √(n log n)).
          <br />
          <strong>(b) Lower bound</strong> — <em>some</em> 0/1 matrix B forces <em>every</em> sign vector y to make ‖By‖<sub>∞</sub> at least c√n.
          <br /><br />
          The two are not contradictory: (a) is "the smallest discrepancy you can always achieve" and (b) is "this lower bound on best discrepancy can't be beaten by a constant factor." Together they show √n is the right scale.
        </Callout>

        <Callout type="connection">
          <strong>Tight connection to Unit 5 Problem 1.</strong> Part (b) is essentially Unit 5 P1 restated — same random-matrix construction, same HW 2 P4(c) anti-concentration, same union bound. Re-reading Unit 5 P1 first will make Part (b) feel familiar.
        </Callout>

        <Toggle label="What's discrepancy, intuitively?">
          Think of each row i as a subset S<sub>i</sub> ⊆ [n] (the indices j with a<sub>ij</sub> = 1). A sign vector x is a ±1 coloring of [n]. Then ⟨row i, x⟩ = (#blue in S<sub>i</sub>) − (#red in S<sub>i</sub>) — the imbalance of S<sub>i</sub> under the coloring. ‖Ax‖<sub>∞</sub> is the most-imbalanced subset. (a) says you can always color so no subset is too imbalanced; (b) says some set systems force imbalance.
        </Toggle>
      </Step>

      {/* ============= PART (a) ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>Part (a) — Upper bound: random sign vector achieves O(√(n log n))</h2>
        <div className="part-goal">
          Strategy: pick x uniformly at random in {'{'}−1,+1{'}'}<sup>n</sup>, bound the failure probability via Hoeffding + union bound, then conclude existence by the probabilistic method.
        </div>
      </div>

      <Step
        badge="A.1"
        title="Pick x at random and reduce existence to a probability bound"
        hint="Pick x uniform in {−1,+1}^n. Show P(‖Ax‖∞ > t) < 1 for some t = O(√(n log n)); existence follows."
        decision="The matrix A is given to us. The only thing we can randomize is x. The probabilistic method says: if a random x has positive probability of being good, some good x must exist."
      >
        <p>
          The matrix A is <em>fixed</em> in this part — we're trying to color its rows. The trick of the{' '}
          <Term tooltip="A proof technique pioneered by Erdos: to show an object with a desired property exists, show that a random object has the property with positive probability.">probabilistic method</Term>{' '}
          is to randomize the thing we get to choose. So pick x uniformly in {'{'}−1,+1{'}'}<sup>n</sup> — independently flip a fair coin for each x<sub>j</sub>.
        </p>

        <p>The plan: bound</p>
        <MathBlock>P(‖Ax‖<sub>∞</sub> &gt; t) = P(∃ row i: |(Ax)<sub>i</sub>| &gt; t)</MathBlock>
        <p>and pick t large enough that this probability is &lt; 1. Then with positive probability ‖Ax‖<sub>∞</sub> ≤ t, so some sign vector achieves it.</p>

        <Callout type="intuition">
          We never construct x explicitly — we just show the random ensemble contains a good one. This is the same template as Unit 5 P1, but here the roles of "fixed" and "random" are flipped: there, A was random and we union-bounded over fixed sign vectors. Here, x is random and we union-bound over fixed rows.
        </Callout>
      </Step>

      <Step
        badge="A.2"
        title="Bound a single row via Hoeffding for Rademacher sums"
        hint="Each (Ax)_i is a sum of independent ±a_ij (Rademacher-weighted). Σ a_ij² ≤ n. Hoeffding gives 2 exp(−t²/(2n))."
        decision="One row at a time. Each (Ax)_i is a sum of independent bounded random variables — Hoeffding's inequality controls its tails sharply."
      >
        <p>Fix row i. The i-th coordinate of Ax is</p>
        <MathBlock>(Ax)<sub>i</sub> = &Sigma;<sub>j=1</sub><sup>n</sup> a<sub>ij</sub> x<sub>j</sub></MathBlock>

        <p>
          Each term a<sub>ij</sub> x<sub>j</sub> is independent of the others (because the x<sub>j</sub> are independent and a<sub>ij</sub> is fixed). And each term is bounded:
          if a<sub>ij</sub> = 0 the term is 0; if a<sub>ij</sub> = 1 the term is ±1 with equal probability. So each term lies in [−a<sub>ij</sub>, a<sub>ij</sub>].
        </p>

        <Callout type="connection">
          <strong>Hoeffding's inequality (one of the workhorses from class).</strong> If Z<sub>j</sub> are independent and each Z<sub>j</sub> ∈ [−c<sub>j</sub>, c<sub>j</sub>] with E[Z<sub>j</sub>] = 0, then for all t &gt; 0:
          <MathBlock>P(|&Sigma;<sub>j</sub> Z<sub>j</sub>| &gt; t) &le; 2 exp(&minus;t<sup>2</sup>/(2 &Sigma;<sub>j</sub> c<sub>j</sub><sup>2</sup>))</MathBlock>
        </Callout>

        <p>Apply with c<sub>j</sub> = a<sub>ij</sub>. The denominator is</p>
        <MathBlock>&Sigma;<sub>j=1</sub><sup>n</sup> a<sub>ij</sub><sup>2</sup> = &Sigma;<sub>j=1</sub><sup>n</sup> a<sub>ij</sub> &le; n,</MathBlock>
        <p>using a<sub>ij</sub> ∈ {'{'}0,1{'}'} so a<sub>ij</sub><sup>2</sup> = a<sub>ij</sub>, and at most n nonzero terms. So:</p>
        <MathBlock>P(|(Ax)<sub>i</sub>| &gt; t) &le; 2 exp(&minus;t<sup>2</sup>/(2n))</MathBlock>

        <Callout type="warning">
          The denominator 2n is a worst case (a row of all 1's). For sparse rows the bound is much tighter, but worst case is what we union-bound against, so 2n is what we use.
        </Callout>

        <Toggle label="Why does Hoeffding apply when E[Z_j] = 0 here?">
          E[a<sub>ij</sub> x<sub>j</sub>] = a<sub>ij</sub> · E[x<sub>j</sub>] = a<sub>ij</sub> · 0 = 0, since x<sub>j</sub> is uniform on {'{'}−1, +1{'}'}. So the row sum has mean zero, satisfying Hoeffding's hypothesis exactly.
        </Toggle>
      </Step>

      <Step
        badge="A.3"
        title="Union bound over the n rows"
        hint="P(some row exceeds t) ≤ n · 2 exp(−t²/(2n))."
        decision="The infinity norm exceeds t iff at least one row exceeds t. Union bound is the canonical tool for 'there exists' over a finite collection."
      >
        <p>The infinity norm exceeds t exactly when some row exceeds t:</p>
        <MathBlock>P(‖Ax‖<sub>∞</sub> &gt; t) = P(&exist; i: |(Ax)<sub>i</sub>| &gt; t)</MathBlock>

        <p>
          By the{' '}
          <Term tooltip="For any countable collection of events A_1, A_2, ..., the probability that at least one occurs is at most the sum of their individual probabilities. The most basic tool for 'there exists' statements.">union bound</Term>:
        </p>
        <MathBlock>&le; &Sigma;<sub>i=1</sub><sup>n</sup> P(|(Ax)<sub>i</sub>| &gt; t) &le; n &middot; 2 exp(&minus;t<sup>2</sup>/(2n))</MathBlock>
      </Step>

      <Step
        badge="A.4"
        title="Choose t to make the bound &lt; 1"
        hint="Set t = √(4n log n). Then exp(−t²/(2n)) = n^(−2), and the bound is 2/n < 1."
        decision="We want the smallest t for which the union-bound total is strictly less than 1. Set 2n exp(−t²/(2n)) = 1, solve for t."
      >
        <p>We want 2n exp(−t²/(2n)) &lt; 1, i.e.</p>
        <MathBlock>exp(t<sup>2</sup>/(2n)) &gt; 2n &nbsp; &hArr; &nbsp; t<sup>2</sup>/(2n) &gt; log(2n) &nbsp; &hArr; &nbsp; t &gt; &radic;(2n log(2n))</MathBlock>

        <p>It's cleaner to take a slightly larger t. Pick t = √(4n log n). Then</p>
        <MathBlock>exp(&minus;t<sup>2</sup>/(2n)) = exp(&minus;2 log n) = n<sup>&minus;2</sup>,</MathBlock>
        <p>and the union-bound total is 2n · n<sup>−2</sup> = 2/n, which is &lt; 1 for n ≥ 3.</p>

        <p>So:</p>
        <MathBlock>P(‖Ax‖<sub>∞</sub> &le; &radic;(4n log n)) = 1 &minus; P(‖Ax‖<sub>∞</sub> &gt; &radic;(4n log n)) &gt; 0</MathBlock>

        <p>Some sign vector x achieves ‖Ax‖<sub>∞</sub> ≤ √(4n log n) = O(√(n log n)).  ✓</p>

        <Callout type="key">
          The √(n log n) scaling is fundamentally the union-bound penalty: bounding n events each with Hoeffding-Gaussian tails forces a √(log n) factor in t. Without the log, you can't beat the union bound.
        </Callout>

        <Toggle label="Can we do better than √(n log n)?">
          Yes — Spencer's "six standard deviations suffice" theorem (1985) shows you can achieve O(√n), shaving the √(log n). The proof is much harder (it uses the entropy method + a partial-coloring argument). For the exam, √(n log n) via Hoeffding + union is what's asked.
        </Toggle>
      </Step>

      {/* ============= PART (b) ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>Part (b) — Lower bound: some 0/1 matrix forces every sign vector to give ‖By‖<sub>∞</sub> ≥ c√n</h2>
        <div className="part-goal">
          Strategy: random Bernoulli(1/2) matrix, anti-concentration on each row (HW 2 P4(c)), independence of rows, double union bound over 2<sup>n</sup> sign vectors.
        </div>
      </div>

      <Step
        badge="B.1"
        title="Now flip the randomization: random matrix, fixed sign vectors"
        hint="Pick B with iid Bernoulli(1/2) entries. Show P(some y has ‖By‖∞ < c√n) < 1 by union bound over 2^n sign vectors."
        decision="In (a) the matrix was given. In (b) the matrix is what we get to design — so randomize it. The sign vectors are now adversarial, so we union-bound over all 2^n of them."
      >
        <p>
          Now A is what we want to find, so randomize <em>it</em>. Let each entry b<sub>ij</sub> be an independent{' '}
          <Term tooltip="A random variable that equals 1 with probability 1/2 and 0 with probability 1/2 — a fair coin flip.">Bernoulli(1/2)</Term>.
        </p>

        <p>The plan, mirroring Unit 5 P1:</p>
        <Callout type="key">
          <strong>Three-part argument.</strong>
          <br /><br />
          <strong>1.</strong> Fix a single sign vector y. Bound P(‖By‖<sub>∞</sub> &lt; c√n) by a per-row anti-concentration result.
          <br />
          <strong>2.</strong> Independence of rows turns the intersection into a product: per-row probability ≤ 1/2 each gives 2<sup>−n</sup> total.
          <br />
          <strong>3.</strong> Union-bound over 2<sup>n</sup> sign vectors y. Total ≤ 2<sup>n</sup> · 2<sup>−n</sup> = 1, with strictness coming from the strict 1/2 in HW 2 P4(c).
        </Callout>
      </Step>

      <Step
        badge="B.2"
        title="Recall HW 2 Problem 4(c) — anti-concentration of Bernoulli sums"
        badgeClass="step-badge-b"
        hint="HW 2 P4(c): for |x_j| ≥ 1 and δ_j iid Bernoulli(1/2), P(|Σ δ_j x_j| < c√n) < 1/2."
        decision="We need a lower bound on the probability that a row's inner product with y is large. Anti-concentration is the right hammer."
      >
        <p>From HW 2 Problem 4(c) we have:</p>

        <Callout type="connection">
          <strong>HW 2 Problem 4(c).</strong> Let x<sub>1</sub>, ..., x<sub>n</sub> be real numbers with |x<sub>j</sub>| ≥ 1, and let δ<sub>1</sub>, ..., δ<sub>n</sub> be independent Bernoulli(1/2) random variables. There exists a universal constant c &gt; 0 such that:
          <MathBlock>P(|&Sigma;<sub>j=1</sub><sup>n</sup> &delta;<sub>j</sub> x<sub>j</sub>| &lt; c&radic;n) &lt; 1/2</MathBlock>
        </Callout>

        <p>
          In words: a random Bernoulli-weighted sum of "big enough" numbers is{' '}
          <Term tooltip="An anti-concentration inequality says a random variable is NOT too concentrated near a single value. It gives a lower bound on P(|X| ≥ threshold). The opposite of concentration (Chernoff/Hoeffding).">anti-concentrated</Term>{' '}
          — it lands at distance at least c√n from 0 with probability strictly greater than 1/2.
        </p>
      </Step>

      <Step
        badge="B.3"
        title="Apply the anti-concentration bound to one row"
        badgeClass="step-badge-b"
        hint="Per row: δ_j = b_ij ~ Bern(1/2), x_j = y_j has |y_j| = 1. So P(|⟨b_i, y⟩| < c√n) < 1/2."
        decision="The hypotheses of HW 2 P4(c) match exactly: random coefficients are Bernoulli(1/2), fixed values y_j are ±1."
      >
        <p>Fix any sign vector y ∈ {'{'}−1,+1{'}'}<sup>n</sup>. Consider row i of B:</p>
        <MathBlock>&lang;b<sub>i</sub>, y&rang; = &Sigma;<sub>j=1</sub><sup>n</sup> b<sub>ij</sub> y<sub>j</sub></MathBlock>

        <p>Map to HW 2 P4(c): δ<sub>j</sub> = b<sub>ij</sub> are iid Bernoulli(1/2), and x<sub>j</sub> = y<sub>j</sub> have |y<sub>j</sub>| = 1 ≥ 1. The hypotheses are met exactly. Applying:</p>

        <MathBlock>P(|&lang;b<sub>i</sub>, y&rang;| &lt; c&radic;n) &lt; 1/2</MathBlock>
      </Step>

      <Step
        badge="B.4"
        title="Independence of rows: all rows small with probability &lt; 2^(−n)"
        badgeClass="step-badge-b"
        hint="Rows are independent. P(every row has |⟨b_i, y⟩| < c√n) = ∏_i (per-row probability) < (1/2)^n."
        decision="‖By‖∞ is small iff EVERY row is small. Independence turns the intersection into a product."
      >
        <p>‖By‖<sub>∞</sub> &lt; c√n iff every row's inner product is &lt; c√n in absolute value:</p>
        <MathBlock>P(‖By‖<sub>∞</sub> &lt; c&radic;n) = P(&forall; i: |&lang;b<sub>i</sub>, y&rang;| &lt; c&radic;n)</MathBlock>

        <p>The rows of B are independent (each entry independent ⇒ rows independent), so the events {'{'}|⟨b<sub>i</sub>, y⟩| &lt; c√n{'}'} are independent across i:</p>
        <MathBlock>= &prod;<sub>i=1</sub><sup>n</sup> P(|&lang;b<sub>i</sub>, y&rang;| &lt; c&radic;n) &lt; (1/2)<sup>n</sup> = 2<sup>&minus;n</sup></MathBlock>

        <Callout type="intuition">
          Each row independently has at least a 50/50 shot of being large. The probability that <em>all</em> n rows fail is exponentially small. This 2<sup>−n</sup> is exactly what we need to absorb the 2<sup>n</sup> sign vectors in the next step.
        </Callout>
      </Step>

      <Step
        badge="B.5"
        title="Union bound over the 2^n sign vectors"
        badgeClass="step-badge-b"
        hint="2^n sign vectors × 2^(−n) per vector = 1. Strict <1/2 in P4(c) makes the total strictly <1."
        decision="The intersection of bad events over all y is what we want to rule out. Union bound; the 2^n × 2^(−n) cancellation is the exact accounting that makes the probabilistic method work here."
      >
        <p>The bad event is "some y is bad":</p>
        <MathBlock>P(&exist; y: ‖By‖<sub>∞</sub> &lt; c&radic;n) &le; &Sigma;<sub>y &isin; {'{'}&minus;1,+1{'}'}<sup>n</sup></sub> P(‖By‖<sub>∞</sub> &lt; c&radic;n) &lt; 2<sup>n</sup> &middot; 2<sup>&minus;n</sup> = 1</MathBlock>

        <Callout type="warning">
          The naive bound gives ≤ 1, not &lt; 1. To get strict inequality, recall the strict &lt; in HW 2 P4(c): the per-row probability is &lt; 1/2 (not ≤). Let q = max<sub>y</sub> per-vector probability. Then q &lt; 2<sup>−n</sup> strictly, and 2<sup>n</sup> · q &lt; 1.
        </Callout>

        <p>So with positive probability, every sign vector y has ‖By‖<sub>∞</sub> ≥ c√n. Therefore some matrix B works.  ✓</p>
      </Step>

      {/* ============= CLOSING BOXES ============= */}
      <div className="separator"></div>

      <Box label="PROOF AT A GLANCE" labelColor="#7eb8da">
        <div className="proof-summary">
          <div className="comment">// Part (a) — A fixed, randomize x</div>
          <div>x ∼ Unif({'{'}−1,+1{'}'}<sup>n</sup>);  (Ax)<sub>i</sub> = Σ a<sub>ij</sub> x<sub>j</sub></div>
          <div>Hoeffding: P(|(Ax)<sub>i</sub>| &gt; t) ≤ 2 exp(−t²/(2n))     [since Σ a<sub>ij</sub>² ≤ n]</div>
          <div>Union over n rows: P(‖Ax‖<sub>∞</sub> &gt; t) ≤ 2n exp(−t²/(2n))</div>
          <div>t = √(4n log n) ⇒ bound = 2/n &lt; 1 ⇒ some x achieves O(√(n log n))   ✓</div>
          <br />
          <div className="comment">// Part (b) — B random Bernoulli(1/2), y fixed (then quantify)</div>
          <div>Per row: HW 2 P4(c) ⇒ P(|⟨b<sub>i</sub>, y⟩| &lt; c√n) &lt; 1/2</div>
          <div>Indep. rows: P(‖By‖<sub>∞</sub> &lt; c√n) &lt; 2<sup>−n</sup></div>
          <div>Union over 2<sup>n</sup> y's: P(∃ y: ‖By‖<sub>∞</sub> &lt; c√n) &lt; 2<sup>n</sup> · 2<sup>−n</sup> = 1</div>
          <div>⇒ Some B forces ‖By‖<sub>∞</sub> ≥ c√n for every y.   □</div>
        </div>
      </Box>

      <Box label="WHY THIS MATTERS" labelColor="#d4a574">
        <p><strong>1. Two faces of the probabilistic method.</strong>{' '}
        Both parts use the same template — randomize what you're trying to find, bound the failure probability, conclude existence. The flip in <em>what</em> is randomized (x in (a), B in (b)) is the whole creative content.</p>

        <p><strong>2. The √n vs √(n log n) gap is the union bound.</strong>{' '}
        Each direction gets the union bound at a different scale. Part (a) union-bounds over n rows, paying √(log n). Part (b) union-bounds over 2<sup>n</sup> sign vectors but the per-vector probability is exponentially small, so the union is just constants. The two penalties don't match — Spencer's theorem closes the gap on the upper bound to O(√n).</p>

        <p><strong>3. Anti-concentration as a tool.</strong>{' '}
        Concentration says "X is close to its mean." Anti-concentration says "X is not too close to any specific value." The lower bound (b) needs anti-concentration: we can't allow ⟨b<sub>i</sub>, y⟩ to be small with high probability, or the bound fails. HW 2 P4(c) is the clean statement of this.</p>

        <p><strong>4. Discrepancy theory.</strong>{' '}
        The quantity min<sub>x</sub> ‖Ax‖<sub>∞</sub> is the <em>discrepancy</em> of the set system encoded by A. Determining its scaling for various matrix families is a core problem in combinatorics (Spencer, Beck-Fiala, Komlós conjecture). This problem is a clean entry point.</p>
      </Box>

      <Box label="CONNECTIONS" labelColor="#a8d4a0">
        <p>
          <strong>← Unit 5 Problem 1.</strong> The lower bound in Part (b) is essentially Unit 5 P1: same random matrix, same per-row anti-concentration, same double union bound. Re-reading Unit 5 P1 gives identical machinery in identical roles.
        </p>
        <p>
          <strong>↑ HW 2 Problem 4(c).</strong> The anti-concentration result is the only nontrivial ingredient in (b). The exam hint references this problem directly.
        </p>
        <p>
          <strong>→ Spencer's theorem (1985).</strong> "Six standard deviations suffice" — for any 0/1 matrix A, there exists a sign vector with ‖Ax‖<sub>∞</sub> = O(√n), removing the √(log n) factor from (a). The proof uses the entropy method and a partial-coloring argument.
        </p>
        <p>
          <strong>→ Komlós conjecture.</strong> If columns of A have ℓ<sub>2</sub> norm ≤ 1, then the optimal discrepancy is O(1) — a long-standing open problem.
        </p>
      </Box>

      <Footer />
      </>)}
    </div>
  )
}
