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

      <p className="part-label">Part (a). For 1 ≤ k &lt; ℓ ≤ n, E[Δ<sub>k</sub>Δ<sub>ℓ</sub>] = 0.</p>
      <Tex block>{String.raw`\begin{aligned}
        \mathbb{E}[\Delta_k \Delta_\ell]
          &= \mathbb{E}\!\bigl[\,\mathbb{E}[\Delta_k \Delta_\ell \mid M_0,\dots,M_{\ell-1}]\,\bigr]
            && \text{(tower)} \\
          &= \mathbb{E}\!\bigl[\Delta_k \cdot \mathbb{E}[\Delta_\ell \mid M_0,\dots,M_{\ell-1}]\bigr]
            && \text{(\(\Delta_k\) measurable in past, \(k<\ell\))} \\
          &= \mathbb{E}[\Delta_k \cdot 0] = 0.
            && \text{(martingale property)}
      \end{aligned}`}</Tex>

      <p className="part-label">Part (b). V := E[(M<sub>n</sub> − M<sub>0</sub>)²] = Σ E[Δ<sub>s</sub>²].</p>
      <Tex block>{String.raw`\begin{aligned}
        M_n - M_0 &= \textstyle\sum_{s=1}^{n} \Delta_s
          && \text{(telescoping)} \\
        \bigl(M_n - M_0\bigr)^2 &= \textstyle\sum_{s=1}^{n} \Delta_s^2 \;+\; 2\!\sum_{1 \le k < \ell \le n} \Delta_k \Delta_\ell
          && \text{(expand the square)} \\
        \mathbb{E}\!\bigl[(M_n - M_0)^2\bigr] &= \textstyle\sum_{s=1}^{n} \mathbb{E}[\Delta_s^2] \;+\; 0 \;=\; \sum_{s=1}^{n} \mathbb{E}[\Delta_s^2].
          && \text{(linearity; (a))}
      \end{aligned}`}</Tex>

      <p className="part-label">Part (c). ∃ 1 ≤ k ≤ n with P(|Δ<sub>k</sub>| &gt; t) ≤ V/(nt²) for all t &gt; 0.</p>
      <Tex block>{String.raw`\begin{aligned}
        \textstyle\sum_{s=1}^n \mathbb{E}[\Delta_s^2] = V
          \;&\Longrightarrow\; \exists\, k:\; \mathbb{E}[\Delta_k^2] \;\le\; V/n
            && \text{(averaging)} \\
        \mathbb{P}\!\bigl(|\Delta_k| > t\bigr)
          &= \mathbb{P}(\Delta_k^2 > t^2)
            \;\le\; \mathbb{E}[\Delta_k^2]\,/\,t^2
            \;\le\; V/(n t^2).
            && \text{(Markov on \(\Delta_k^2\))}
      \end{aligned}`}</Tex>

      <p className="qed">∎</p>
    </div>
  )
}

export default function Problem1() {
  useEffect(() => {
    document.title = 'PS6 Problem 1 — Martingale Increments'
  }, [])

  const { mode } = useDifficulty()

  return (
    <div className="container container-narrow">

      {/* Header */}
      <div className="label">PROBLEM SET 6 · PROBLEM 1</div>
      <h1>Martingale Increments: Uncorrelation, Variance, and a Tail Bound</h1>
      <p className="subtitle">
        Three consequences of the martingale property for square-integrable increments —
        (a) they are pairwise uncorrelated, (b) their squared means sum to the total variance V,
        and (c) at least one of them obeys a Chebyshev-style bound V/(nt²).
      </p>

      <DifficultyDial modes={PROOF_MODES} />

      {mode === MODES.PROOF ? <FormalProof /> : (<>

      {/* ============= STEP 0: ORIENT ============= */}
      <Step
        badge="STEP 0"
        title="Orientation — what's a martingale, and what are we proving?"
        hint="Parse the symbols: the martingale M_k, the increments Δ_k = M_k − M_{k−1}, the hypothesis E[M_k²] < ∞, and the three claims."
        decision="Before touching any algebra, we need to know what every object is, why the square-integrability matters, and the strategic shape of each of the three parts."
      >
        <p><strong>The martingale.</strong> A{' '}
          <Term wide tooltip="A sequence M_0, M_1, ..., M_n of random variables where the expected next value, given everything observed so far, equals the current value. Formally: E[M_k | M_0, ..., M_{k−1}] = M_{k−1} for every k ≥ 1. Think of it as a 'fair game': your expected future wealth, given what you know now, is exactly your current wealth — no drift up or down.">martingale</Term>
          {' '}M<sub>0</sub>, M<sub>1</sub>, ..., M<sub>n</sub> is a sequence of random variables defined by one property: <em>the expected next value, given all past values, equals the current value.</em>
        </p>
        <MathBlock>E[M<sub>k</sub> | M<sub>0</sub>, ..., M<sub>k−1</sub>] = M<sub>k−1</sub>    for every 1 ≤ k ≤ n.</MathBlock>

        <p><strong>The increments.</strong> The{' '}
          <Term wide tooltip="The jump Δ_k = M_k − M_{k−1} — the 'gain on round k' in the fair-game picture. The martingale identity, rewritten in terms of Δ_k, says E[Δ_k | past] = 0: the expected gain on any round, given everything you've seen, is zero.">martingale differences</Term>
          {' '}(or increments) are</p>
        <MathBlock>Δ<sub>k</sub> = M<sub>k</sub> − M<sub>k−1</sub>    for 1 ≤ k ≤ n.</MathBlock>

        <p>Subtract M<sub>k−1</sub> from both sides of the martingale identity above. Since M<sub>k−1</sub> is determined by M<sub>0</sub>, ..., M<sub>k−1</sub>, conditioning on those variables treats it as a known constant, so E[M<sub>k−1</sub> | M<sub>0</sub>, ..., M<sub>k−1</sub>] = M<sub>k−1</sub>. We get the equivalent form:</p>
        <MathBlock>E[Δ<sub>k</sub> | M<sub>0</sub>, ..., M<sub>k−1</sub>] = 0.</MathBlock>

        <p>This is the martingale property in its most usable form: <strong>given the past, the expected next increment is zero.</strong> It will be the engine of everything below.</p>

        <p><strong>The square-integrability assumption.</strong> We're told E[M<sub>k</sub>²] {'<'} ∞ for every k. This ensures each Δ<sub>k</sub> has a finite second moment, so products like Δ<sub>k</sub>Δ<sub>ℓ</sub> are integrable — by Cauchy–Schwarz, |E[Δ<sub>k</sub>Δ<sub>ℓ</sub>]| ≤ (E[Δ<sub>k</sub>²] · E[Δ<sub>ℓ</sub>²])<sup>1/2</sup> {'<'} ∞. Every expectation we compute is licensed by this hypothesis.</p>

        <p><strong>The three parts.</strong></p>
        <ul>
          <li><strong>(a)</strong> For k {'<'} ℓ, the cross expectation E[Δ<sub>k</sub>Δ<sub>ℓ</sub>] = 0. The increments are <em>pairwise uncorrelated</em> — even though they need not be independent.</li>
          <li><strong>(b)</strong> The total variance V = E[(M<sub>n</sub> − M<sub>0</sub>)²] decomposes: V = Σ<sub>s=1</sub><sup>n</sup> E[Δ<sub>s</sub>²]. The variance of the whole walk is the sum of per-step variances — just like in the iid case, with a much weaker hypothesis.</li>
          <li><strong>(c)</strong> Some increment has a small tail: there exists 1 ≤ k ≤ n with P(|Δ<sub>k</sub>| {'>'} t) ≤ V/(nt²) for every t {'>'} 0.</li>
        </ul>

        <Callout type="intuition">
          <p>Picture a gambler playing a fair game over n rounds. M<sub>k</sub> is the bankroll after round k; Δ<sub>k</sub> is the net winnings on round k. The martingale property says: <em>no matter what has happened so far</em>, the expected next-round winnings are zero. No edge.</p>
          <p>Part (a) says winnings on distinct rounds don't correlate on average. Part (b) says the variance of total winnings equals the sum of per-round variances — same conclusion as iid, even though the rounds may depend on each other in complicated ways. Part (c) says at least one round's winnings are small in probability, via pigeonhole on the per-round variances.</p>
        </Callout>

        <Toggle label="What's a 'filtration' and do we need one?">
          <p>In fully formal treatments the conditioning is on an increasing sequence of{' '}
            <Term wide tooltip="A filtration is an increasing sequence of sigma-algebras F_0 ⊆ F_1 ⊆ ... ⊆ F_n, where F_k encodes 'all information observable by time k.' The martingale M_k is required to be F_k-measurable (its value is determined by information available at time k), and we condition on F_k instead of on the raw variables M_0, ..., M_k.">sigma-algebras F<sub>k</sub></Term>
            {' '}— a "filtration" — rather than on the raw variables. We write E[M<sub>k</sub> | F<sub>k−1</sub>] = M<sub>k−1</sub>. The two formulations coincide when F<sub>k</sub> is the sigma-algebra generated by M<sub>0</sub>, ..., M<sub>k</sub>, which is the default if no other filtration is specified. For this problem we don't need the general machinery; conditioning on the raw past values M<sub>0</sub>, ..., M<sub>k−1</sub> is enough.</p>
        </Toggle>
      </Step>


      {/* ============= PART (a) ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>Part (a) — Increments are uncorrelated</h2>
        <p className="part-goal">Goal: show E[Δ<sub>k</sub>Δ<sub>ℓ</sub>] = 0 for 1 ≤ k {'<'} ℓ ≤ n.</p>
      </div>

      <Step
        badge="A.1"
        title="Strategy — insert conditioning via the tower property"
        hint="We need to use E[Δ_ℓ | past] = 0, but E[Δ_k Δ_ℓ] has no conditioning. Tower puts it there."
        decision="The only tool we have is E[Δ_ℓ | M_0..M_{ℓ−1}] = 0 — a statement about a conditional expectation. Our target E[Δ_k Δ_ℓ] has no conditioning. The tower property lets us insert an inner conditional expectation that we can then attack."
      >
        <p>We want E[Δ<sub>k</sub>Δ<sub>ℓ</sub>] = 0, and the only tool available is the martingale property written in increment form:</p>
        <MathBlock>E[Δ<sub>ℓ</sub> | M<sub>0</sub>, ..., M<sub>ℓ−1</sub>] = 0.</MathBlock>

        <p>But that's a statement about a <em>conditional</em> expectation. Our target is <em>unconditional</em>. To bridge them we need the{' '}
          <Term wide tooltip="For any random variable Y and conditioning information G: E[Y] = E[ E[Y | G] ]. 'The expectation of a conditional expectation equals the unconditional expectation.' It lets you freely insert a conditioning step whenever useful — the outer E averages over everything the inner E averaged out.">tower property</Term>:</p>
        <MathBlock>E[Y] = E[ E[Y | G] ]    for any integrable Y and any conditioning G.</MathBlock>

        <p>The plan:</p>
        <ol>
          <li>Tower with Y = Δ<sub>k</sub>Δ<sub>ℓ</sub> and G = {'{'}M<sub>0</sub>, ..., M<sub>ℓ−1</sub>{'}'}.</li>
          <li>Pull Δ<sub>k</sub> out of the inner conditional expectation — legal because k {'<'} ℓ means Δ<sub>k</sub> is determined by the conditioning.</li>
          <li>Apply the martingale property to kill E[Δ<sub>ℓ</sub> | past] = 0.</li>
        </ol>

        <Toggle label="Why does the tower property hold?">
          <p>Intuitively: E[Y] averages Y over all of outcomes; E[Y | G] averages Y over outcomes consistent with what G reveals — so it's a random variable depending on G. Taking E again averages over G's randomness, and two-step averaging gives the same number as one-step averaging.</p>
          <p>Formally it's one of the defining properties of conditional expectation. In a finite probability space it's a rearrangement of the sum defining E[Y]. Durrett §4.1 has the general proof.</p>
        </Toggle>
      </Step>

      <Step
        badge="A.2"
        title="Apply tower with conditioning on the time-(ℓ−1) past"
        hint="E[Δ_k Δ_ℓ] = E[ E[Δ_k Δ_ℓ | M_0, ..., M_{ℓ−1}] ]."
        decision="Condition on everything observable up to time ℓ−1 — this puts Δ_k inside the conditioning (since k < ℓ) and leaves Δ_ℓ available for the martingale property."
      >
        <p>Apply tower with Y = Δ<sub>k</sub>Δ<sub>ℓ</sub> and G = {'{'}M<sub>0</sub>, ..., M<sub>ℓ−1</sub>{'}'}:</p>
        <MathBlock>E[Δ<sub>k</sub>Δ<sub>ℓ</sub>] = E[ E[Δ<sub>k</sub>Δ<sub>ℓ</sub> | M<sub>0</sub>, ..., M<sub>ℓ−1</sub>] ].</MathBlock>
        <p>Now the inner expression has conditioning on the full past up to time ℓ−1 — giving us a place to apply the martingale property. Next: isolate Δ<sub>ℓ</sub> inside that inner expectation.</p>
      </Step>

      <Step
        badge="A.3"
        title="Pull Δ_k out of the inner expectation"
        hint="Δ_k depends only on M_{k−1} and M_k; since k < ℓ, both sit inside the conditioning. Known quantities factor out of conditional E."
        decision="Conditional expectation treats already-determined quantities as constants. Since k < ℓ, Δ_k = M_k − M_{k−1} is determined by the conditioning information M_0, ..., M_{ℓ−1}, so it factors out of the inner E just like a constant."
      >
        <p>The inner expectation conditions on all of M<sub>0</sub>, ..., M<sub>ℓ−1</sub>. And Δ<sub>k</sub> = M<sub>k</sub> − M<sub>k−1</sub> depends on just M<sub>k−1</sub> and M<sub>k</sub>. Since k {'<'} ℓ, both of those are inside the conditioning — so <em>once we've conditioned on the full past up to ℓ−1, the value of Δ<sub>k</sub> is already fixed.</em></p>

        <p>The general rule: if X is determined by the conditioning information G, then for any other random variable Z,</p>
        <MathBlock>E[X · Z | G] = X · E[Z | G].</MathBlock>
        <p>In words: once G is known, X is effectively a scalar, and scalars factor out of expectations.</p>

        <p>Apply this with X = Δ<sub>k</sub>, Z = Δ<sub>ℓ</sub>, G = {'{'}M<sub>0</sub>, ..., M<sub>ℓ−1</sub>{'}'}:</p>
        <MathBlock>E[Δ<sub>k</sub>Δ<sub>ℓ</sub> | M<sub>0</sub>, ..., M<sub>ℓ−1</sub>] = Δ<sub>k</sub> · E[Δ<sub>ℓ</sub> | M<sub>0</sub>, ..., M<sub>ℓ−1</sub>].</MathBlock>

        <Callout type="warning">
          <p>This step looks small but is load-bearing, and it's <em>exactly</em> why the problem insists on k {'<'} ℓ. If we had k = ℓ, the random variable Δ<sub>k</sub> = Δ<sub>ℓ</sub> would depend on M<sub>ℓ</sub> — which is <em>outside</em> the conditioning on {'{'}M<sub>0</sub>, ..., M<sub>ℓ−1</sub>{'}'}. The factoring would fail, and the whole argument collapses. The ordering is the structural input.</p>
        </Callout>

        <Toggle label="Why does 'determined by G' mean 'factors out'?">
          <p>Once the conditioning information G is in hand, there's no residual randomness in Δ<sub>k</sub> (because k {'<'} ℓ means Δ<sub>k</sub> is a function of variables inside G). So inside E[ · | G], Δ<sub>k</sub> acts like a known scalar, and conditional expectation is linear with respect to scalars — that's the rule E[X · Z | G] = X · E[Z | G] when X is G-measurable. If you've seen sigma-algebras, this is the "take out what is known" property of conditional expectation (Durrett Theorem 4.1.14).</p>
        </Toggle>
      </Step>

      <Step
        badge="A.4"
        title="Apply the martingale property and close the loop"
        hint="The inner E[Δ_ℓ | past] = 0. The product collapses to Δ_k · 0 = 0. Outer E of zero is zero."
        decision="With Δ_k factored out, the inner conditional expectation is exactly the one the martingale property annihilates."
      >
        <p>The martingale property gives us</p>
        <MathBlock>E[Δ<sub>ℓ</sub> | M<sub>0</sub>, ..., M<sub>ℓ−1</sub>] = 0.</MathBlock>
        <p>Substitute into A.3's result:</p>
        <MathBlock>E[Δ<sub>k</sub>Δ<sub>ℓ</sub> | M<sub>0</sub>, ..., M<sub>ℓ−1</sub>] = Δ<sub>k</sub> · 0 = 0.</MathBlock>
        <p>Now apply the outer expectation from A.2:</p>
        <MathBlock>E[Δ<sub>k</sub>Δ<sub>ℓ</sub>] = E[ 0 ] = 0.    □</MathBlock>

        <Callout type="key">
          <p>The whole move in one sentence: <strong>tower to expose the conditioning → pull out the past-measurable factor → martingale property kills the rest.</strong> This is the prototypical "martingale cross-term vanishes" argument; you'll see it every time you work with L² martingales.</p>
        </Callout>
      </Step>


      {/* ============= PART (b) ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>Part (b) — Variance decomposes into a sum of squared increments</h2>
        <p className="part-goal">Goal: show V := E[(M<sub>n</sub> − M<sub>0</sub>)²] = Σ<sub>s=1</sub><sup>n</sup> E[Δ<sub>s</sub>²].</p>
      </div>

      <Step
        badge="B.1"
        badgeClass="step-badge-b"
        title="Telescope — write M_n − M_0 as a sum of increments"
        hint="M_n − M_0 = Δ_1 + Δ_2 + ... + Δ_n."
        decision="We need to expose the per-increment structure before anything else can happen. The telescoping sum does exactly this — it rewrites the boundary gap M_n − M_0 as a sum of jumps."
      >
        <p>Write out the increments and sum them:</p>
        <MathBlock>Δ<sub>1</sub> + Δ<sub>2</sub> + ... + Δ<sub>n</sub></MathBlock>
        <MathBlock>= (M<sub>1</sub> − M<sub>0</sub>) + (M<sub>2</sub> − M<sub>1</sub>) + ... + (M<sub>n</sub> − M<sub>n−1</sub>)</MathBlock>
        <MathBlock>= M<sub>n</sub> − M<sub>0</sub>.</MathBlock>

        <p>Every intermediate M<sub>k</sub> appears once with a + sign (from Δ<sub>k</sub>) and once with a − sign (from Δ<sub>k+1</sub>), so they all cancel in pairs. Only the endpoints survive.</p>

        <Toggle label="What's a 'telescoping sum'?">
          <p>A sum whose terms cancel neighbor-by-neighbor, leaving only the boundary. Here, +M<sub>k</sub> in term k cancels −M<sub>k</sub> in term k+1 for k = 1, ..., n−1. Surviving: +M<sub>n</sub> from the last term and −M<sub>0</sub> from the first.</p>
        </Toggle>

        <p>Therefore the quantity we care about is:</p>
        <MathBlock>(M<sub>n</sub> − M<sub>0</sub>)² = (Δ<sub>1</sub> + Δ<sub>2</sub> + ... + Δ<sub>n</sub>)².</MathBlock>
      </Step>

      <Step
        badge="B.2"
        badgeClass="step-badge-b"
        title="Expand the squared sum into diagonal and cross terms"
        hint="(Σ Δ_s)² = Σ Δ_s² + 2 Σ_{k<ℓ} Δ_k Δ_ℓ."
        decision="A squared sum always expands into 'squares of each term' plus 'twice each unordered pair of distinct terms.' Write every term so there are no hidden moves."
      >
        <p>For any finite collection a<sub>1</sub>, ..., a<sub>n</sub>:</p>
        <MathBlock>(a<sub>1</sub> + a<sub>2</sub> + ... + a<sub>n</sub>)² = Σ<sub>s=1</sub><sup>n</sup> a<sub>s</sub>² + 2 Σ<sub>1 ≤ k {'<'} ℓ ≤ n</sub> a<sub>k</sub>a<sub>ℓ</sub>.</MathBlock>

        <Toggle label="Quick sanity check with n = 3">
          <p>(a + b + c)² = a² + b² + c² + 2ab + 2ac + 2bc = (a² + b² + c²) + 2(ab + ac + bc).</p>
          <p>Three diagonal terms (each variable squared); three cross terms (each unordered pair, appearing once, doubled because ab and ba both show up when you FOIL the square).</p>
        </Toggle>

        <p>Apply with a<sub>s</sub> = Δ<sub>s</sub>:</p>
        <MathBlock>(Δ<sub>1</sub> + ... + Δ<sub>n</sub>)² = Σ<sub>s=1</sub><sup>n</sup> Δ<sub>s</sub>² + 2 Σ<sub>1 ≤ k {'<'} ℓ ≤ n</sub> Δ<sub>k</sub>Δ<sub>ℓ</sub>.</MathBlock>

        <p>This is still a pointwise identity — no expectations yet. It holds for every realization of the martingale.</p>
      </Step>

      <Step
        badge="B.3"
        badgeClass="step-badge-b"
        title="Take expectations; cross terms vanish by part (a)"
        hint="Linearity splits the sum into diagonal and cross parts; part (a) makes every cross-term expectation zero."
        decision="Expectation is linear, so it passes through the sum. Every cross-term expectation E[Δ_k Δ_ℓ] for k < ℓ is zero by part (a). The diagonal survives — giving the target identity."
      >
        <p>Apply the expectation to both sides of the B.2 identity. By{' '}
          <Term wide tooltip="For any random variables Y_1, ..., Y_m: E[Y_1 + ... + Y_m] = E[Y_1] + ... + E[Y_m]. This holds for ANY random variables, even heavily dependent ones — independence is NOT required. Linearity of expectation is one of the most fundamental tools in probability, used everywhere.">linearity of expectation</Term>:</p>
        <MathBlock>E[(M<sub>n</sub> − M<sub>0</sub>)²] = E[Σ<sub>s=1</sub><sup>n</sup> Δ<sub>s</sub>²] + 2 E[Σ<sub>k {'<'} ℓ</sub> Δ<sub>k</sub>Δ<sub>ℓ</sub>]</MathBlock>
        <MathBlock>= Σ<sub>s=1</sub><sup>n</sup> E[Δ<sub>s</sub>²] + 2 Σ<sub>k {'<'} ℓ</sub> E[Δ<sub>k</sub>Δ<sub>ℓ</sub>].</MathBlock>

        <p>By part (a), E[Δ<sub>k</sub>Δ<sub>ℓ</sub>] = 0 for every k {'<'} ℓ. The entire second sum vanishes:</p>
        <MathBlock>V = E[(M<sub>n</sub> − M<sub>0</sub>)²] = Σ<sub>s=1</sub><sup>n</sup> E[Δ<sub>s</sub>²].    □</MathBlock>

        <Callout type="key">
          <p>This is the <em>martingale analogue</em> of "variance of a sum of independent variables equals the sum of variances." We reached the same conclusion — no cross terms — from a strictly weaker hypothesis. Martingale differences can be wildly dependent (Δ<sub>ℓ</sub> may be a complicated function of Δ<sub>1</sub>, ..., Δ<sub>ℓ−1</sub>); all we need is that their conditional means given the past are zero.</p>
        </Callout>

        <Callout type="connection">
          <p>The sum Σ<sub>s=1</sub><sup>n</sup> E[Δ<sub>s</sub>²] is called the <em>quadratic variation</em> of the martingale. It's the central object in martingale concentration theory: Azuma–Hoeffding, Freedman's inequality, and McDiarmid's bounded-differences inequality (Unit 6 Problem 2) all bound the tail of (M<sub>n</sub> − M<sub>0</sub>) in terms of this quantity.</p>
        </Callout>
      </Step>


      {/* ============= PART (c) ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>Part (c) — Some increment satisfies a Chebyshev-style tail bound</h2>
        <p className="part-goal">Goal: show there exists 1 ≤ k ≤ n with P(|Δ<sub>k</sub>| {'>'} t) ≤ V/(nt²) for every t {'>'} 0.</p>
      </div>

      <Step
        badge="C.1"
        badgeClass="step-badge-c"
        title="Strategy — averaging (to find a good k) then Markov (to turn mean into tail)"
        hint="The n numbers E[Δ_s²] sum to V; one of them must be ≤ V/n (averaging); Markov on Δ_k² converts that into the tail bound."
        decision="We only need ONE well-behaved k, not all of them. Averaging pins down the existence of a k with small E[Δ_k²]. Markov's inequality applied to Δ_k² converts the moment bound into a probability bound on |Δ_k|."
      >
        <p>From part (b) we have n nonnegative numbers</p>
        <MathBlock>E[Δ<sub>1</sub>²], E[Δ<sub>2</sub>²], ..., E[Δ<sub>n</sub>²]</MathBlock>
        <p>summing to V. We don't know which is smallest, but at least one must be ≤ V/n — otherwise the sum would exceed V. That's step one.</p>

        <p>Step two: for <em>that</em> k, Markov's inequality applied to the nonneg random variable Δ<sub>k</sub>² converts the second-moment bound into a tail bound for |Δ<sub>k</sub>|.</p>

        <Callout type="intuition">
          <p>Picture n rocks with total weight V. The lightest must weigh at most V/n — the minimum never exceeds the average. You don't need to identify which rock; you just know at least one is light enough. That unnamed-existence is exactly what "∃ k" in the problem statement is asking for.</p>
        </Callout>
      </Step>

      <Step
        badge="C.2"
        badgeClass="step-badge-c"
        title="Averaging lemma — some E[Δ_k²] is at most V/n"
        hint="n nonneg numbers summing to V must have a term ≤ V/n."
        decision="Pigeonhole by contradiction. If every term exceeded V/n, the sum would exceed V."
      >
        <p>Let a<sub>s</sub> := E[Δ<sub>s</sub>²] ≥ 0 for s = 1, ..., n. By part (b), Σ<sub>s=1</sub><sup>n</sup> a<sub>s</sub> = V.</p>

        <p><strong>Claim.</strong> There exists k ∈ {'{'}1, ..., n{'}'} with a<sub>k</sub> ≤ V/n.</p>

        <p><em>Proof by contradiction.</em> Suppose a<sub>s</sub> {'>'} V/n for every s = 1, ..., n. Summing:</p>
        <MathBlock>V = Σ<sub>s=1</sub><sup>n</sup> a<sub>s</sub> {'>'} Σ<sub>s=1</sub><sup>n</sup> (V/n) = n · (V/n) = V,</MathBlock>
        <p>i.e. V {'>'} V — a contradiction. So at least one a<sub>k</sub> ≤ V/n.</p>

        <p>Applied to a<sub>s</sub> = E[Δ<sub>s</sub>²]: there exists k with</p>
        <MathBlock>E[Δ<sub>k</sub>²] ≤ V/n.</MathBlock>

        <Callout type="warning">
          <p>The inequality is ≤, not strict. If all the E[Δ<sub>s</sub>²] happen to equal V/n exactly, every k achieves the bound. We only need one k to do the work in C.3, and a non-strict bound is enough.</p>
        </Callout>
      </Step>

      <Step
        badge="C.3"
        badgeClass="step-badge-c"
        title="Apply Markov to Δ_k² to convert the mean bound into a tail bound"
        hint="P(|Δ_k| > t) = P(Δ_k² > t²) ≤ E[Δ_k²]/t² ≤ V/(nt²)."
        decision="Markov needs a nonneg random variable. Δ_k² ≥ 0, and |Δ_k| > t ⟺ Δ_k² > t². Apply Markov, then chain in the C.2 bound."
      >
        <p>Fix the k from C.2 (so E[Δ<sub>k</sub>²] ≤ V/n). Let t {'>'} 0 be arbitrary. Rewrite the event we care about using squares — the map x ↦ x² is strictly increasing on [0, ∞), so:</p>
        <MathBlock>{'{'}|Δ<sub>k</sub>| {'>'} t{'}'} = {'{'}Δ<sub>k</sub>² {'>'} t²{'}'}.</MathBlock>

        <p>Apply{' '}
          <Term wide tooltip="For any nonnegative random variable X and any a > 0: P(X ≥ a) ≤ E[X]/a. It trades moment information (E[X]) for tail information (P(X ≥ a)). Applied to X = Y² it becomes Chebyshev's inequality: P(|Y| ≥ a) ≤ E[Y²]/a². Markov is the most basic one-sided tail bound and the starting point for almost all fancier ones (Chernoff, Hoeffding, McDiarmid).">Markov's inequality</Term>
          {' '}to the nonneg random variable Δ<sub>k</sub>² with threshold t²:</p>
        <MathBlock>P(Δ<sub>k</sub>² {'>'} t²) ≤ E[Δ<sub>k</sub>²] / t².</MathBlock>

        <p>Chain with the averaging bound E[Δ<sub>k</sub>²] ≤ V/n from C.2:</p>
        <MathBlock>P(|Δ<sub>k</sub>| {'>'} t) ≤ E[Δ<sub>k</sub>²] / t² ≤ (V/n) / t² = V/(nt²).    □</MathBlock>

        <Callout type="key">
          <p>The combined move <strong>averaging → Markov on the square</strong> is a staple. You see it whenever you want to show "some index in a bounded-sum family behaves well with high probability." Writing it directly in terms of variance gives Chebyshev's inequality: P(|X − E[X]| ≥ t) ≤ Var(X)/t².</p>
        </Callout>

        <Toggle label="Why does Markov's inequality hold?">
          <p>For any nonneg random variable X and a {'>'} 0:</p>
          <MathBlock>E[X] ≥ E[X · 𝟙{'{'}X ≥ a{'}'}] ≥ E[a · 𝟙{'{'}X ≥ a{'}'}] = a · P(X ≥ a).</MathBlock>
          <p>First step: X ≥ X · 𝟙{'{'}X ≥ a{'}'} pointwise, because X ≥ 0 and the indicator is 0 or 1. Second step: on the event {'{'}X ≥ a{'}'}, we have X ≥ a. Divide both ends by a to get P(X ≥ a) ≤ E[X]/a. Two lines. One of the most-used inequalities in probability.</p>
        </Toggle>
      </Step>


      {/* ============= CLOSING BOXES ============= */}
      <div className="separator"></div>

      <Box label="PROOF AT A GLANCE" labelColor="#7eb8da">
        <div className="proof-summary">
          <div className="comment">// Part (a): cross expectations vanish for k &lt; ℓ</div>
          <div>E[Δ<sub>k</sub>Δ<sub>ℓ</sub>] = E[ E[Δ<sub>k</sub>Δ<sub>ℓ</sub> | M<sub>0</sub>..M<sub>ℓ−1</sub>] ]           (tower)</div>
          <div>           = E[ Δ<sub>k</sub> · E[Δ<sub>ℓ</sub> | M<sub>0</sub>..M<sub>ℓ−1</sub>] ]        (Δ<sub>k</sub> past-measurable)</div>
          <div>           = E[ Δ<sub>k</sub> · 0 ] = 0.                       (martingale property)</div>
          <div>&nbsp;</div>
          <div className="comment">// Part (b): variance = sum of squared increments</div>
          <div>M<sub>n</sub> − M<sub>0</sub> = Δ<sub>1</sub> + Δ<sub>2</sub> + ... + Δ<sub>n</sub>                    (telescoping)</div>
          <div>(M<sub>n</sub> − M<sub>0</sub>)² = Σ Δ<sub>s</sub>² + 2 Σ<sub>k&lt;ℓ</sub> Δ<sub>k</sub>Δ<sub>ℓ</sub>                   (expand square)</div>
          <div>E[(M<sub>n</sub> − M<sub>0</sub>)²] = Σ E[Δ<sub>s</sub>²] + 0 = Σ E[Δ<sub>s</sub>²].             (part (a))</div>
          <div>&nbsp;</div>
          <div className="comment">// Part (c): some increment has a small tail</div>
          <div>Σ E[Δ<sub>s</sub>²] = V  ⟹  ∃ k with E[Δ<sub>k</sub>²] ≤ V/n.          (averaging)</div>
          <div>P(|Δ<sub>k</sub>| {'>'} t) = P(Δ<sub>k</sub>² {'>'} t²) ≤ E[Δ<sub>k</sub>²]/t² ≤ V/(nt²).   (Markov)  □</div>
        </div>
      </Box>

      <Box label="WHY THIS MATTERS" labelColor="#d4a574">
        <p><strong>1. Uncorrelated, not independent.</strong>
          {' '}Martingale differences are the right "slightly weaker than iid" object. They can depend on each other in complicated ways, yet their conditional-mean-zero property forces pairwise uncorrelation. That's exactly enough to make variance decompose as a sum — the right setting for concentration of dependent sequences.</p>

        <p><strong>2. Quadratic variation is the key object.</strong>
          {' '}The sum Σ E[Δ<sub>s</sub>²] is called the <em>quadratic variation</em> of the martingale. Most martingale concentration inequalities — Azuma–Hoeffding, Freedman's inequality, McDiarmid's bounded differences — bound the tail of M<sub>n</sub> − M<sub>0</sub> in terms of this quantity. Part (b) is <em>why</em> quadratic variation is the natural measure of "total randomness" in a martingale.</p>

        <p><strong>3. Pigeonhole in probability.</strong>
          {' '}"Some k has E[Δ<sub>k</sub>²] ≤ V/n" is the averaging move: when nonneg quantities with a fixed sum are spread over n indices, at least one is ≤ average. You'll see it in Doob's maximal inequality, in combinatorial probability ("some color class is small"), and in approximation arguments ("some index fits the bound, we don't care which").</p>

        <p><strong>4. Forward to Problem 2.</strong>
          {' '}The next problem uses the <em>bounded differences inequality</em> (McDiarmid) to prove concentration of a bin-packing statistic. McDiarmid is proven by building a Doob martingale and applying Azuma — which uses exactly parts (a) and (b) of this problem as its engine. You're building the tools here for a bigger job next.</p>
      </Box>

      </>)}

      <Footer />

    </div>
  )
}
