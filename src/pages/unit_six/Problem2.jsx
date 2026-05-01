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
      <h2>Formal Proof</h2>

      <p className="part-label">Part (a). Two explicit values of B.</p>
      <Tex block>{String.raw`\begin{aligned}
        & B\!\left(\tfrac12, \tfrac13, \tfrac23, \tfrac23, \tfrac34\right): \\
        & \quad \tfrac{2}{3}+\tfrac{2}{3} > 1,\ \tfrac{2}{3}+\tfrac{3}{4} > 1
            && \text{(big items pairwise conflict} \Rightarrow B \ge 3) \\
        & \quad \tfrac12 + (\text{any big}) > 1
            && \text{(}\tfrac12 \text{ in own bin or with } \tfrac13 \Rightarrow B \ge 4\text{)} \\
        & \quad \bigl\{\tfrac34\bigr\},\ \bigl\{\tfrac23, \tfrac13\bigr\},\ \bigl\{\tfrac23\bigr\},\ \bigl\{\tfrac12\bigr\}
            && \text{(valid 4-bin packing} \Rightarrow B \le 4) \\
        & \quad \therefore\; B = 4. \\[4pt]
        & B\!\left(\tfrac12, \tfrac14, \dots, \tfrac{1}{2^m}\right) = 1:
            \quad \textstyle\sum_{k=1}^m 2^{-k} = 1 - 2^{-m} < 1.
      \end{aligned}`}</Tex>

      <p className="part-label">Part (b). For x<sub>1</sub>, ..., x<sub>n</sub> ∈ [0, 1]: Σ x<sub>i</sub> ≤ B ≤ 1 + 2 Σ x<sub>i</sub>.</p>
      <Tex block>{String.raw`\begin{aligned}
        \textstyle\sum_{i=1}^n x_i &\le B
          && \text{(each bin holds mass} \le 1; B \text{ bins hold all items)} \\
        \text{First-Fit} & : \text{at most one bin ends with fill} \le \tfrac12;
          && \text{(else first item in later half-empty bin would fit earlier)} \\
        \textstyle\sum x_i &> (B_{\!FF} - 1)/2
          && \text{(sum of fills)} \\
        B \;\le\; B_{\!FF} &\;\le\; 1 + 2\,\textstyle\sum_{i=1}^n x_i.
          && \text{(} B_{\!FF} \text{ integer)}
      \end{aligned}`}</Tex>

      <p className="part-label">Part (c). E[X<sub>i</sub>] ≥ 0.1 ⟹ B<sub>N</sub> concentrates around E[B<sub>N</sub>] ≍ N.</p>
      <Tex block>{String.raw`\begin{aligned}
        0.1\,N \;\le\; \mathbb{E}[B_N] \;&\le\; 1 + 2N \;\Longrightarrow\; \mathbb{E}[B_N] \asymp N
          && \text{(take \(\mathbb{E}\) of (b))} \\
        \bigl|\,B_N(x) - B_N(x \text{ with one } x_i \text{ swapped})\,\bigr| \;&\le\; 1
          && \text{(open one new bin for the replacement)} \\
        \text{McDiarmid } (c_i = 1) :\; \mathbb{P}\!\bigl(|B_N - \mathbb{E}[B_N]| \ge t\bigr) \;&\le\; 2\,\exp\!\bigl(-2t^2/N\bigr) \\
        t = 0.01\,\mathbb{E}[B_N],\;\, \mathbb{E}[B_N] \ge 0.1\,N \;&\Longrightarrow\; \text{bound} \le 2\,e^{-2 \cdot 10^{-6}\,N} \le e^{-cN}.
      \end{aligned}`}</Tex>

      <p className="qed">∎</p>
    </div>
  )
}

export default function Problem2() {
  useEffect(() => {
    document.title = 'PS6 Problem 2 — Bin Packing: Bounds and Concentration'
  }, [])

  const { mode } = useDifficulty()

  return (
    <div className="container container-narrow">

      {/* Header */}
      <div className="label">PROBLEM SET 6 · PROBLEM 2</div>
      <h1>Bin Packing: Concrete Computations, Linear Bounds, and Concentration</h1>
      <p className="subtitle">
        Three escalating tasks on the bin-packing function B(x₁, ..., xₙ): (a) compute it for two
        explicit inputs, (b) bound it on both sides by a linear function of the total mass,
        and (c) prove that for random inputs B<sub>N</sub> concentrates exponentially around its mean
        via McDiarmid's bounded-differences inequality.
      </p>

      <DifficultyDial modes={PROOF_MODES} />

      {mode === MODES.PROOF ? <FormalProof /> : (<>

      {/* ============= ORIENT ============= */}
      <Step
        badge="STEP 0"
        title="Orientation — what is bin packing, and what are the three parts asking?"
        hint="Define B(x_1, ..., x_n) as the min number of unit-capacity bins to hold the items; preview (a) compute, (b) bound, (c) concentrate."
        decision="Three different flavors here — combinatorial in (a), algorithmic in (b), probabilistic in (c). The throughline is the function B; understanding it is step zero."
      >
        <p><strong>The bin-packing function.</strong> Given items <span className="math-inline">x<sub>1</sub>, ..., x<sub>n</sub> ∈ [0, 1]</span>, define</p>
        <MathBlock>B(x<sub>1</sub>, ..., x<sub>n</sub>) = min number of unit-capacity bins needed to hold all the items.</MathBlock>
        <p>Each bin has capacity 1, and an item must go entirely in one bin (no splitting). A "packing" assigns each x<sub>i</sub> to a bin so that the sum of items in any bin is at most 1; B is the minimum number of bins over all valid packings.</p>

        <Callout type="intuition">
          <p>Picture packing groceries into shopping bags, each holding 1 unit of weight. The items are the x<sub>i</sub>'s. You want to use as few bags as possible — but you can't split an item across bags. The answer depends not just on the total weight, but on the <em>geometry</em>: three items of weight 2/3 each can't share any bag (any pair sums to 4/3 {'>'} 1), so they need three bags even though their total weight is 2.</p>
        </Callout>

        <p><strong>The three parts.</strong></p>
        <ul>
          <li><strong>(a)</strong> Compute B for two specific inputs: <span className="math-inline">B(1/2, 1/3, 2/3, 2/3, 3/4)</span> and <span className="math-inline">B(1/2, 1/4, 1/8, ..., 1/2<sup>m</sup>)</span>. Concrete combinatorics.</li>
          <li><strong>(b)</strong> For arbitrary x<sub>1</sub>, ..., x<sub>n</sub> ∈ [0, 1], show <span className="math-inline">Σ x<sub>i</sub> ≤ B ≤ 1 + 2 Σ x<sub>i</sub></span>. Two-sided linear control.</li>
          <li><strong>(c)</strong> If X<sub>1</sub>, ..., X<sub>N</sub> are independent with E[X<sub>i</sub>] ≥ 0.1, then <span className="math-inline">B<sub>N</sub> = B(X<sub>1</sub>, ..., X<sub>N</sub>)</span> concentrates exponentially around its mean: <span className="math-inline">0.99 E[B<sub>N</sub>] ≤ B<sub>N</sub> ≤ 1.01 E[B<sub>N</sub>]</span> with probability {'>'} 1 − e<sup>−cN</sup>, and E[B<sub>N</sub>] ≍ N. Probabilistic concentration via McDiarmid.</li>
        </ul>

        <p><strong>The throughline.</strong> Part (a) gives concrete intuition for what B looks like. Part (b) gives uniform linear bounds — these will let us show E[B<sub>N</sub>] = Θ(N) in part (c), which is needed for McDiarmid's bound to come out as e<sup>−cN</sup>. Part (c) then turns to the <Term wide tooltip="A theorem due to Colin McDiarmid (1989): if f(x_1, ..., x_N) is a function of N independent random inputs with the property that changing any single input by any amount changes the output by at most c_i, then f concentrates around its mean with Gaussian-like tails. Specifically: P(|f − E[f]| ≥ t) ≤ 2 exp(−2t² / Σ c_i²). It's the workhorse concentration inequality for any 'Lipschitz function of independent variables.'">bounded differences inequality</Term> — a sharp concentration tool for any "Lipschitz function of independent inputs."</p>

        <Toggle label="What does the symbol ≍ mean?">
          <p>f(N) ≍ g(N) means f and g grow at the same rate up to constants — equivalently, f(N) = Θ(g(N)). There exist constants c, C {'>'} 0 with c · g(N) ≤ f(N) ≤ C · g(N) for all sufficiently large N. So E[B<sub>N</sub>] ≍ N just means there exist constants 0 {'<'} c ≤ C with cN ≤ E[B<sub>N</sub>] ≤ CN.</p>
        </Toggle>
      </Step>


      {/* ============= PART (a) ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>Part (a) — Compute two specific values of B</h2>
        <p className="part-goal">Goal: find <span className="math-inline">B(1/2, 1/3, 2/3, 2/3, 3/4)</span> and <span className="math-inline">B(1/2, 1/4, 1/8, ..., 1/2<sup>m</sup>)</span> exactly.</p>
      </div>

      <Step
        badge="A.1"
        title="Compute B(1/2, 1/3, 2/3, 2/3, 3/4)"
        hint="Three 'big' items (2/3, 2/3, 3/4) pairwise exceed 1, so each needs its own bin. The 1/2 cannot join any of them, so a fourth bin is forced. Answer: 4."
        decision="To pin down B exactly: (i) construct a valid packing achieving some count k, giving B ≤ k; (ii) prove no packing with fewer bins exists, giving B ≥ k. The big items pairwise conflict, which forces the lower bound."
      >
        <p>The five items: <span className="math-inline">1/2, 1/3, 2/3, 2/3, 3/4</span>. Total mass:</p>
        <MathBlock>1/2 + 1/3 + 2/3 + 2/3 + 3/4 = 6/12 + 4/12 + 8/12 + 8/12 + 9/12 = 35/12 ≈ 2.917.</MathBlock>

        <p><strong>Lower bound by mass alone:</strong> total mass is 35/12, so B ≥ ⌈35/12⌉ = 3. (Each bin holds at most weight 1, so B bins hold at most weight B.) But this is just the mass bound; the geometry can force more.</p>

        <p><strong>The "big items" argument.</strong> Look at the three items 2/3, 2/3, 3/4. Any pair of them sums to:</p>
        <ul>
          <li>2/3 + 2/3 = 4/3 {'>'} 1</li>
          <li>2/3 + 3/4 = 8/12 + 9/12 = 17/12 {'>'} 1</li>
        </ul>
        <p>so no two of these three can share a bin. They occupy three distinct bins. Therefore B ≥ 3.</p>

        <p><strong>Where can 1/2 go?</strong> Check whether 1/2 can join any of the big items:</p>
        <ul>
          <li>1/2 + 2/3 = 7/6 {'>'} 1 ✗</li>
          <li>1/2 + 3/4 = 5/4 {'>'} 1 ✗</li>
        </ul>
        <p>So 1/2 cannot join any big-item bin. It needs either its own bin, or to share with 1/3 (since 1/2 + 1/3 = 5/6 ≤ 1 ✓). Either way, the 1/2 is <em>not</em> in any of the three big-item bins.</p>

        <Callout type="key">
          <p>This forces B ≥ 4. The three big items occupy three bins, and 1/2 occupies (at least part of) a fourth bin. So at least 4 bins are needed regardless of how we handle 1/3.</p>
        </Callout>

        <p><strong>A 4-bin packing exists.</strong></p>
        <MathBlock>Bin 1: {'{'}3/4{'}'},     Bin 2: {'{'}2/3, 1/3{'}'} = 1.0,     Bin 3: {'{'}2/3{'}'},     Bin 4: {'{'}1/2{'}'}.</MathBlock>
        <p>All sums are ≤ 1. So B ≤ 4. Combined with B ≥ 4:</p>
        <MathBlock>B(1/2, 1/3, 2/3, 2/3, 3/4) = 4.</MathBlock>

        <Toggle label="Why doesn't the mass lower bound (B ≥ 3) tighten further by itself?">
          <p>The mass bound only sees total weight; it doesn't see the structural constraint that some items <em>can't fit together</em>. Here mass gives 3 but the right answer is 4 — the gap comes entirely from the "big items pairwise conflict" structure. In general, B can exceed the mass bound by an arbitrary amount; the upper bound in part (b) shows that the gap is at most (roughly) Σ x<sub>i</sub> + 1.</p>
        </Toggle>
      </Step>

      <Step
        badge="A.2"
        title="Compute B(1/2, 1/4, 1/8, ..., 1/2^m)"
        hint="Geometric sum 1/2 + 1/4 + ... + 1/2^m = 1 − 1/2^m < 1, so all items fit in one bin."
        decision="When the total mass is less than 1, you can dump every item into a single bin (provided no item exceeds 1, which trivially holds since each is in [0,1]). Geometric series tells us the total mass."
      >
        <p>The items are <span className="math-inline">1/2, 1/4, 1/8, ..., 1/2<sup>m</sup></span> — m items, the k-th equal to <span className="math-inline">1/2<sup>k</sup></span>. Their sum is the partial geometric series:</p>
        <MathBlock>Σ<sub>k=1</sub><sup>m</sup> 1/2<sup>k</sup> = (1/2)·(1 − (1/2)<sup>m</sup>) / (1 − 1/2) = 1 − 1/2<sup>m</sup>.</MathBlock>

        <p>Since 1 − 1/2<sup>m</sup> {'<'} 1, the entire collection fits in a <em>single</em> bin (their total weight is below capacity). So:</p>
        <MathBlock>B(1/2, 1/4, ..., 1/2<sup>m</sup>) = 1.</MathBlock>

        <Toggle label="Quick derivation of the geometric sum">
          <p>Let S = 1/2 + 1/4 + ... + 1/2<sup>m</sup>. Multiply by 2: 2S = 1 + 1/2 + ... + 1/2<sup>m−1</sup>. Subtract: 2S − S = 1 − 1/2<sup>m</sup>, so S = 1 − 1/2<sup>m</sup>. (Or use the closed form for a geometric series with first term a = 1/2, ratio r = 1/2, m terms: S = a·(1 − r<sup>m</sup>)/(1 − r) = (1/2)·(1 − (1/2)<sup>m</sup>)/(1/2) = 1 − 1/2<sup>m</sup>.)</p>
        </Toggle>

        <Callout type="intuition">
          <p>This is the opposite extreme from A.1. There the mass was {'>'}1 with conflicting items, forcing many bins. Here the mass is asymptotically full (→1 as m → ∞), but stays just short — so a single bin always suffices. The contrast highlights that B is sensitive to the <em>distribution</em> of item sizes, not just the total.</p>
        </Callout>
      </Step>


      {/* ============= PART (b) ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>Part (b) — Two-sided linear bound</h2>
        <p className="part-goal">Goal: show <span className="math-inline">Σ<sub>i=1</sub><sup>n</sup> x<sub>i</sub> ≤ B(x<sub>1</sub>, ..., x<sub>n</sub>) ≤ 1 + 2 Σ<sub>i=1</sub><sup>n</sup> x<sub>i</sub></span> for any x<sub>1</sub>, ..., x<sub>n</sub> ∈ [0, 1].</p>
      </div>

      <Step
        badge="B.1"
        badgeClass="step-badge-b"
        title="Lower bound — total mass cannot exceed total bin capacity"
        hint="B bins hold capacity B; they hold all items, so Σ x_i ≤ B."
        decision="Trivial volume / capacity argument. B bins of capacity 1 each hold at most B mass; they hold every item, so the total mass is at most B."
      >
        <p>Let the optimal packing use B bins. Each bin holds total weight ≤ 1. The B bins together hold all n items, so:</p>
        <MathBlock>Σ<sub>i=1</sub><sup>n</sup> x<sub>i</sub> = (total mass packed) ≤ Σ<sub>bins</sub> (capacity per bin) = B · 1 = B.</MathBlock>
        <p>This is a <em>volumetric</em> lower bound — B is at least the rounded-up total mass. (We saw in A.1 that B can exceed the volumetric bound when items conflict.)</p>
      </Step>

      <Step
        badge="B.2"
        badgeClass="step-badge-b"
        title="Upper bound strategy — analyze a concrete packing algorithm"
        hint="The optimal B is at most the count produced by any specific packing algorithm. Pick a simple one: First-Fit."
        decision="We don't need to find the optimal packing — any concrete packing gives an upper bound on B (since B is the MIN). First-Fit is the simplest algorithm to analyze."
      >
        <p>To upper-bound B, we exhibit a specific packing and count its bins. Since B is the minimum over all packings, B ≤ (count of any specific packing).</p>

        <p>The simplest algorithm to analyze is{' '}
          <Term wide tooltip="A greedy bin-packing algorithm. Process items in the given order. For each item, scan the currently-open bins in order opened; place the item in the first bin where it fits. If none fits, open a new bin and place it there. Easy to implement, easy to analyze, gives a 2-approximation to optimal bin packing."><strong>First-Fit (FF)</strong></Term>:</p>
        <ol>
          <li>Process items x<sub>1</sub>, x<sub>2</sub>, ..., x<sub>n</sub> in order.</li>
          <li>For each x<sub>i</sub>, place it in the first (lowest-indexed) currently-open bin where it fits.</li>
          <li>If no open bin has room, open a new bin and place x<sub>i</sub> there.</li>
        </ol>

        <p>Let B<sub>FF</sub> be the number of bins FF uses. Since B is the minimum over all packings:</p>
        <MathBlock>B ≤ B<sub>FF</sub>.</MathBlock>

        <p>If we show B<sub>FF</sub> ≤ 1 + 2 Σ x<sub>i</sub>, we're done.</p>
      </Step>

      <Step
        badge="B.3"
        badgeClass="step-badge-b"
        title="Key lemma — at most one FF bin ends up at most half full"
        hint="If two bins were ≤ 1/2 full at end, the first item placed in the later-opened bin could have gone in the earlier one, contradicting FF's rule."
        decision="This is the crux: the structural property of FF that powers the upper bound. Prove it by contradiction — assume two bins are half-full and derive a contradiction with how FF placed items."
      >
        <p><strong>Lemma.</strong> When First-Fit terminates, at most one bin has total fill ≤ 1/2.</p>

        <p><em>Proof by contradiction.</em> Suppose two bins B<sub>i</sub> and B<sub>j</sub> with i {'<'} j (so B<sub>i</sub> was opened first) both have final fill ≤ 1/2.</p>

        <p>Let z be the <em>first</em> item placed in B<sub>j</sub>. When FF processed z, it tried bins in order and found that none of B<sub>1</sub>, ..., B<sub>j−1</sub> had room — that's why it opened B<sub>j</sub>. In particular, B<sub>i</sub> had no room at that moment.</p>

        <p>"No room" means: <em>(B<sub>i</sub>'s fill at that time) + z {'>'} 1</em>.</p>

        <p>But:</p>
        <ul>
          <li>B<sub>i</sub>'s fill at that time ≤ B<sub>i</sub>'s final fill ≤ 1/2 (fill only grows over time as items are added).</li>
          <li>z is one item placed in B<sub>j</sub>, so z ≤ (B<sub>j</sub>'s final fill) ≤ 1/2.</li>
        </ul>

        <p>Adding: (B<sub>i</sub>'s fill at that time) + z ≤ 1/2 + 1/2 = 1.</p>

        <p>This contradicts "no room." Hence at most one of B<sub>i</sub>, B<sub>j</sub> can have final fill ≤ 1/2 — i.e., at most one bin total. □</p>

        <Callout type="warning">
          <p>The argument uses two non-obvious monotonicities. First, "fill only grows" — items are added, never removed, so an earlier fill is always ≤ a later fill. Second, the size of a single item placed in a bin is bounded by the bin's <em>final</em> fill (the total of all items in the bin). Both are easy to miss but essential.</p>
        </Callout>
      </Step>

      <Step
        badge="B.4"
        badgeClass="step-badge-b"
        title="Conclude B ≤ 1 + 2 Σ x_i"
        hint="At most one bin has fill ≤ 1/2; the rest have fill > 1/2. Sum of fills = Σ x_i, giving Σ x_i > (B_FF − 1)/2."
        decision="Use the lemma: of B_FF bins, at least B_FF − 1 are 'mostly full' (fill > 1/2). Their fills add to a strict lower bound on Σ x_i, which solves to B_FF ≤ 1 + 2 Σ x_i."
      >
        <p>Suppose FF uses B<sub>FF</sub> bins with fills f<sub>1</sub>, ..., f<sub>B<sub>FF</sub></sub>. By the lemma, at most one f<sub>s</sub> ≤ 1/2; the other B<sub>FF</sub> − 1 fills are strictly greater than 1/2. The total fill equals the total item mass:</p>
        <MathBlock>Σ<sub>i=1</sub><sup>n</sup> x<sub>i</sub> = Σ<sub>s=1</sub><sup>B<sub>FF</sub></sup> f<sub>s</sub> {'>'} (B<sub>FF</sub> − 1) · (1/2) + 0 = (B<sub>FF</sub> − 1)/2.</MathBlock>

        <p>Solve for B<sub>FF</sub>:</p>
        <MathBlock>B<sub>FF</sub> − 1 {'<'} 2 Σ x<sub>i</sub>      ⟹      B<sub>FF</sub> {'<'} 1 + 2 Σ x<sub>i</sub>.</MathBlock>

        <p>Since B<sub>FF</sub> is an integer:</p>
        <MathBlock>B<sub>FF</sub> ≤ 1 + 2 Σ x<sub>i</sub>.</MathBlock>

        <p>Combined with B ≤ B<sub>FF</sub> (Step B.2):</p>
        <MathBlock>B ≤ 1 + 2 Σ<sub>i=1</sub><sup>n</sup> x<sub>i</sub>.    □</MathBlock>

        <Callout type="key">
          <p>The whole upper bound stems from one structural fact: <em>FF leaves at most one half-empty bin.</em> Everything else is bookkeeping. This is a 2-approximation result — FF uses at most twice the optimal number of bins (asymptotically). Tighter algorithms exist (First-Fit Decreasing achieves 11/9), but for the linear bound we want, plain FF is enough.</p>
        </Callout>
      </Step>


      {/* ============= PART (c) ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>Part (c) — B<sub>N</sub> concentrates exponentially around its mean</h2>
        <p className="part-goal">Goal: with X<sub>1</sub>, ..., X<sub>N</sub> ∈ [0, 1] independent and E[X<sub>i</sub>] ≥ 0.1, show <span className="math-inline">P(0.99 E[B<sub>N</sub>] ≤ B<sub>N</sub> ≤ 1.01 E[B<sub>N</sub>]) {'>'} 1 − e<sup>−cN</sup></span> and <span className="math-inline">E[B<sub>N</sub>] ≍ N</span>.</p>
      </div>

      <Step
        badge="C.1"
        badgeClass="step-badge-c"
        title="Show E[B_N] ≍ N using part (b)"
        hint="Take expectation of part (b)'s bounds: 0.1N ≤ E[B_N] ≤ 1 + 2N. Hence E[B_N] = Θ(N)."
        decision="Part (b) gave Σ x_i ≤ B ≤ 1 + 2 Σ x_i pointwise. Take expectations and use E[X_i] ≥ 0.1 and X_i ≤ 1. The two-sided bound makes E[B_N] = Θ(N)."
      >
        <p>Part (b) holds pointwise (for every realization), so taking expectations preserves the inequalities by{' '}
          <Term wide tooltip="If random variables X and Y satisfy X ≤ Y for every outcome, then E[X] ≤ E[Y]. This follows directly from the definition of expectation as an integral with respect to the probability measure: integrals respect pointwise inequalities. Combined with linearity of expectation, monotonicity is one of the workhorses for translating deterministic facts into probabilistic ones.">monotonicity of expectation</Term>
          {' '}and{' '}
          <Term tooltip="For any random variables Y_1, ..., Y_m: E[Y_1 + ... + Y_m] = E[Y_1] + ... + E[Y_m]. Holds without any independence assumption.">linearity of expectation</Term>:</p>

        <p><strong>Lower bound on E[B<sub>N</sub>]:</strong></p>
        <MathBlock>E[B<sub>N</sub>] ≥ E[Σ X<sub>i</sub>] = Σ E[X<sub>i</sub>] ≥ Σ (0.1) = 0.1 N.</MathBlock>

        <p><strong>Upper bound on E[B<sub>N</sub>]:</strong></p>
        <MathBlock>E[B<sub>N</sub>] ≤ E[1 + 2 Σ X<sub>i</sub>] = 1 + 2 Σ E[X<sub>i</sub>] ≤ 1 + 2 Σ 1 = 1 + 2N.</MathBlock>

        <p>Combining:</p>
        <MathBlock>0.1 N ≤ E[B<sub>N</sub>] ≤ 1 + 2N      ⟹      E[B<sub>N</sub>] ≍ N.</MathBlock>

        <p>This is half of the conclusion. The other half — concentration — comes from McDiarmid in the next steps.</p>
      </Step>

      <Step
        badge="C.2"
        badgeClass="step-badge-c"
        title="Verify the bounded-differences condition: changing one X_i shifts B_N by at most 1"
        hint="Take an optimal packing for the original inputs; remove the changed item; place the replacement in a brand-new bin. That uses ≤ B_N + 1 bins."
        decision="McDiarmid requires per-coordinate Lipschitz bounds c_i. For B_N, c_i = 1 holds because changing one item never forces more than one extra bin: just open a new bin for the replacement."
      >
        <p>Fix indices x<sub>1</sub>, ..., x<sub>N</sub> and a single index i. Compare B<sub>N</sub>(x<sub>1</sub>, ..., x<sub>i</sub>, ..., x<sub>N</sub>) with B<sub>N</sub>(x<sub>1</sub>, ..., x'<sub>i</sub>, ..., x<sub>N</sub>) for any replacement x'<sub>i</sub> ∈ [0, 1].</p>

        <p><strong>Claim.</strong> <span className="math-inline">|B<sub>N</sub>(x<sub>1</sub>, ..., x<sub>i</sub>, ..., x<sub>N</sub>) − B<sub>N</sub>(x<sub>1</sub>, ..., x'<sub>i</sub>, ..., x<sub>N</sub>)| ≤ 1</span>.</p>

        <p><em>Proof.</em> Take an optimal packing of (x<sub>1</sub>, ..., x<sub>N</sub>) using B<sub>N</sub>(x) bins. Remove x<sub>i</sub> from whichever bin it sat in (call this packing P). Now we have a valid packing of (x<sub>1</sub>, ..., x<sub>i−1</sub>, x<sub>i+1</sub>, ..., x<sub>N</sub>) using ≤ B<sub>N</sub>(x) bins.</p>

        <p>Now insert x'<sub>i</sub> into a brand-new bin by itself (this is always legal, since x'<sub>i</sub> ≤ 1 fits in an empty bin). The result is a valid packing of (x<sub>1</sub>, ..., x'<sub>i</sub>, ..., x<sub>N</sub>) using ≤ B<sub>N</sub>(x) + 1 bins. Hence:</p>
        <MathBlock>B<sub>N</sub>(x<sub>1</sub>, ..., x'<sub>i</sub>, ..., x<sub>N</sub>) ≤ B<sub>N</sub>(x<sub>1</sub>, ..., x<sub>i</sub>, ..., x<sub>N</sub>) + 1.</MathBlock>

        <p>By symmetry (swap the roles of x<sub>i</sub> and x'<sub>i</sub>):</p>
        <MathBlock>B<sub>N</sub>(x<sub>1</sub>, ..., x<sub>i</sub>, ..., x<sub>N</sub>) ≤ B<sub>N</sub>(x<sub>1</sub>, ..., x'<sub>i</sub>, ..., x<sub>N</sub>) + 1.</MathBlock>

        <p>Together:</p>
        <MathBlock>|B<sub>N</sub>(x<sub>1</sub>, ..., x<sub>i</sub>, ..., x<sub>N</sub>) − B<sub>N</sub>(x<sub>1</sub>, ..., x'<sub>i</sub>, ..., x<sub>N</sub>)| ≤ 1.    □</MathBlock>

        <Callout type="warning">
          <p>The bound is exactly 1, not 0 — replacing an item really can change B by 1. (Example: if the original x<sub>i</sub> happened to fit in a leftover slot but x'<sub>i</sub> doesn't, you might need an extra bin. Or the reverse.) The point is the change is at most 1, no matter how dramatic the swap.</p>
          <p>This argument is delicate because B<sub>N</sub> is the <em>optimal</em> count, which is hard to compute. We're using the fact that we can <em>construct a feasible packing</em> with one extra bin — that's enough to bound the optimum.</p>
        </Callout>
      </Step>

      <Step
        badge="C.3"
        badgeClass="step-badge-c"
        title="Apply McDiarmid's inequality"
        hint="With c_i = 1 for all i, McDiarmid gives P(|B_N − E[B_N]| ≥ t) ≤ 2 exp(−2t²/N)."
        decision="C.2 just verified the per-coordinate Lipschitz constants c_i = 1. Plug into McDiarmid (a black-box theorem we'll state and use; its proof builds on Problem 1's machinery)."
      >
        <p>State the inequality:</p>

        <Callout type="connection">
          <p><strong>McDiarmid's Bounded Differences Inequality.</strong> Let f: [0, 1]<sup>N</sup> → ℝ. Suppose there exist constants c<sub>1</sub>, ..., c<sub>N</sub> such that for every i and every x<sub>1</sub>, ..., x<sub>N</sub>, x'<sub>i</sub>:</p>
          <MathBlock>|f(x<sub>1</sub>, ..., x<sub>i</sub>, ..., x<sub>N</sub>) − f(x<sub>1</sub>, ..., x'<sub>i</sub>, ..., x<sub>N</sub>)| ≤ c<sub>i</sub>.</MathBlock>
          <p>If X<sub>1</sub>, ..., X<sub>N</sub> are independent random variables in [0, 1] then for all t {'>'} 0:</p>
          <MathBlock>P(|f(X<sub>1</sub>, ..., X<sub>N</sub>) − E[f(X<sub>1</sub>, ..., X<sub>N</sub>)]| ≥ t) ≤ 2 exp(−2t² / Σ<sub>i=1</sub><sup>N</sup> c<sub>i</sub>²).</MathBlock>
        </Callout>

        <Toggle label="Where does McDiarmid come from?">
          <p>The proof builds the <em>Doob martingale</em> M<sub>k</sub> = E[f(X<sub>1</sub>, ..., X<sub>N</sub>) | X<sub>1</sub>, ..., X<sub>k</sub>], so M<sub>0</sub> = E[f] and M<sub>N</sub> = f(X<sub>1</sub>, ..., X<sub>N</sub>). The bounded-differences condition forces the martingale increments |M<sub>k</sub> − M<sub>k−1</sub>| ≤ c<sub>k</sub>. Then Azuma–Hoeffding's inequality on bounded martingale increments gives the exponential tail bound. Notice that Problem 1 (uncorrelated increments + variance decomposition) provides exactly the ingredients Azuma needs.</p>
        </Toggle>

        <p>Apply with f = B<sub>N</sub>, c<sub>i</sub> = 1 for all i. Then Σ c<sub>i</sub>² = N, and:</p>
        <MathBlock>P(|B<sub>N</sub> − E[B<sub>N</sub>]| ≥ t) ≤ 2 exp(−2t² / N).</MathBlock>
      </Step>

      <Step
        badge="C.4"
        badgeClass="step-badge-c"
        title="Plug in t = 0.01 E[B_N] and conclude"
        hint="t² ≥ (0.01 · 0.1 N)² = 10^{−6} N²; bound becomes 2 exp(−2 · 10^{−6} N) = e^{−cN}."
        decision="Set t to the relative deviation we want (1% of the mean). Use the lower bound E[B_N] ≥ 0.1N from C.1 to convert t² into a multiple of N². The exponent then reduces to −cN."
      >
        <p>Set t = 0.01 E[B<sub>N</sub>]. The event we care about is the <em>complement</em> of the concentration claim:</p>
        <MathBlock>{'{'}|B<sub>N</sub> − E[B<sub>N</sub>]| ≥ 0.01 E[B<sub>N</sub>]{'}'} = {'{'}B<sub>N</sub> {'<'} 0.99 E[B<sub>N</sub>] or B<sub>N</sub> {'>'} 1.01 E[B<sub>N</sub>]{'}'}.</MathBlock>

        <p>Apply C.3 with this t:</p>
        <MathBlock>P(|B<sub>N</sub> − E[B<sub>N</sub>]| ≥ 0.01 E[B<sub>N</sub>]) ≤ 2 exp(−2 · (0.01 E[B<sub>N</sub>])² / N) = 2 exp(−(2·10<sup>−4</sup>) · E[B<sub>N</sub>]² / N).</MathBlock>

        <p>Now use E[B<sub>N</sub>] ≥ 0.1 N (from C.1):</p>
        <MathBlock>E[B<sub>N</sub>]² / N ≥ (0.1 N)² / N = (0.01) · N.</MathBlock>

        <p>Substitute:</p>
        <MathBlock>P(|B<sub>N</sub> − E[B<sub>N</sub>]| ≥ 0.01 E[B<sub>N</sub>]) ≤ 2 exp(−(2·10<sup>−4</sup>) · (0.01) · N) = 2 exp(−(2·10<sup>−6</sup>) N).</MathBlock>

        <p>For any constant <em>c</em> with 0 {'<'} c {'<'} 2·10<sup>−6</sup>, we have 2 e<sup>−2·10<sup>−6</sup> · N</sup> ≤ e<sup>−cN</sup> for all sufficiently large N. (Specifically, 2 e<sup>−2·10<sup>−6</sup> · N</sup> = e<sup>ln 2</sup> · e<sup>−2·10<sup>−6</sup> · N</sup>; absorb the ln 2 into the exponent by reducing the constant slightly.) So:</p>
        <MathBlock>P(0.99 E[B<sub>N</sub>] ≤ B<sub>N</sub> ≤ 1.01 E[B<sub>N</sub>]) ≥ 1 − e<sup>−cN</sup>      for some constant c {'>'} 0.    □</MathBlock>

        <Callout type="key">
          <p>Three ingredients combined: (i) part (b)'s linear bound — gave us E[B<sub>N</sub>] ≍ N; (ii) part C.2's bounded differences |ΔB| ≤ 1 — gave us c<sub>i</sub> = 1 in McDiarmid; (iii) McDiarmid itself — gave us Gaussian-tailed concentration. The two pieces of (i) play different roles: the upper bound was implicit (it's why we trust E[B<sub>N</sub>] is finite), the lower bound was crucial (it's how we converted t² into Θ(N²) and hence the exponent into Θ(−N)).</p>
        </Callout>

        <Toggle label="Why does the constant c shrink slightly when we absorb the prefactor 2?">
          <p>The bound 2 e<sup>−aN</sup> is not the same as e<sup>−aN</sup>; it's larger by a factor of 2. To write it as e<sup>−cN</sup> with c {'<'} a, we need 2 e<sup>−aN</sup> ≤ e<sup>−cN</sup>, i.e., (a − c) N ≥ ln 2. For any fixed c {'<'} a, this holds when N ≥ ln 2 / (a − c). For small N you can absorb the prefactor into a larger constant on the front, or just note that "≤ e<sup>−cN</sup> for some c {'>'} 0" is what the problem demands — and it holds for N ≥ N<sub>0</sub>(c), with N<sub>0</sub> finite. The polynomial-vs-exponential dominance does the work.</p>
        </Toggle>
      </Step>


      {/* ============= CLOSING BOXES ============= */}
      <div className="separator"></div>

      <Box label="PROOF AT A GLANCE" labelColor="#d4a574">
        <div className="proof-summary">
          <div className="comment">// Part (a): explicit computations</div>
          <div>B(1/2, 1/3, 2/3, 2/3, 3/4) = 4   (3 big items pairwise conflict; 1/2 needs a 4th)</div>
          <div>B(1/2, 1/4, 1/8, ..., 1/2<sup>m</sup>) = 1   (geometric sum = 1 − 1/2<sup>m</sup> {'<'} 1)</div>
          <div>&nbsp;</div>
          <div className="comment">// Part (b): two-sided linear bound</div>
          <div>Σ x<sub>i</sub> ≤ B           (volume: B bins hold mass ≤ B)</div>
          <div>B ≤ B<sub>FF</sub> ≤ 1 + 2 Σ x<sub>i</sub>   (FF leaves ≤ 1 half-empty bin)</div>
          <div>&nbsp;</div>
          <div className="comment">// Part (c): exponential concentration</div>
          <div>0.1 N ≤ E[B<sub>N</sub>] ≤ 1 + 2N      ⟹  E[B<sub>N</sub>] ≍ N    (take E of part b)</div>
          <div>|B<sub>N</sub>(x) − B<sub>N</sub>(x with one x<sub>i</sub> swapped)| ≤ 1   (open one extra bin)</div>
          <div>McDiarmid with c<sub>i</sub> = 1: P(|B<sub>N</sub> − E[B<sub>N</sub>]| ≥ t) ≤ 2 e<sup>−2t²/N</sup></div>
          <div>t = 0.01 E[B<sub>N</sub>]:  bound ≤ 2 e<sup>−2·10<sup>−6</sup>N</sup> ≤ e<sup>−cN</sup>.    □</div>
        </div>
      </Box>

      <Box label="WHY THIS MATTERS" labelColor="#7eb8da">
        <p><strong>1. The 2-approximation phenomenon.</strong>
          {' '}Bin packing is NP-hard to solve exactly, yet First-Fit gets within a factor of 2 of optimal in <em>linear</em> time. The single structural fact "at most one bin half-empty" is the entire reason. This pattern — a simple greedy algorithm + a key lemma about its leftovers = constant-factor approximation — recurs throughout combinatorial optimization (set cover, scheduling, vertex cover).</p>

        <p><strong>2. McDiarmid is the universal Lipschitz concentration tool.</strong>
          {' '}Whenever a quantity is a function of independent inputs and changing any single input perturbs it by a bounded amount, McDiarmid gives Gaussian-tailed concentration. This is the right hammer for: longest increasing subsequence, chromatic number of a random graph, max bin load in hashing, traveling salesman on random points, ... The argument <em>here</em> (bounded differences with c<sub>i</sub> = 1) is the simplest case and shows the pattern in pure form.</p>

        <p><strong>3. Doob martingales connect concentration to martingale theory.</strong>
          {' '}McDiarmid is proven by building the Doob martingale M<sub>k</sub> = E[f | first k inputs] and applying Azuma's inequality on bounded martingale differences. Azuma in turn relies on the variance decomposition you proved in <em>Problem 1 part (b)</em>. So this problem is the payoff for the machinery you developed in P1 — concentration of a complicated combinatorial quantity, achieved by reducing it to bounded martingale increments.</p>

        <p><strong>4. Volume vs structure.</strong>
          {' '}Part (a) made vivid that B sees both <em>total mass</em> and <em>geometry</em> (which items can co-exist). Part (b) showed the geometric overhead is at most a factor of 2 plus an additive 1. Part (c) showed that for random inputs the geometric noise washes out exponentially. This three-step pattern — concrete examples → uniform structural bound → probabilistic tightening — is a recurring template for analyzing combinatorial random objects.</p>
      </Box>

      </>)}

      <Footer />

    </div>
  )
}
