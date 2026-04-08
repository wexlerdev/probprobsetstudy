import { useEffect } from 'react'
import DifficultyDial from '../../components/DifficultyDial'
import Toggle from '../../components/Toggle'
import Term from '../../components/Term'
import Callout from '../../components/Callout'
import Step from '../../components/Step'
import MathBlock from '../../components/MathBlock'
import Box from '../../components/Box'
import Footer from '../../components/Footer'

export default function Problem2() {
  useEffect(() => {
    document.title = 'PS5 Problem 2 — Exponential Moment Bounds'
  }, [])

  return (
    <div className="container container-narrow">

      {/* Header */}
      <div className="label">PROBLEM SET 5 · PROBLEM 2</div>
      <h1>Exponential Moment Bounds</h1>
      <p className="subtitle">
        Two faces of the same coin: bounding exponential moments using Taylor truncation (part a)
        and the Gaussian integral representation (part b). Professor Valettas builds the toolkit
        for controlling moment generating functions of squared random variables.
      </p>

      <DifficultyDial />

      {/* ============= ORIENTATION ============= */}
      <Step
        badge="ORIENT"
        title="What does the problem ask?"
        hint="Two inequalities for exponential moments of ξ² — one finite-moment, one sub-Gaussian."
        decision="Before touching any algebra, we need to identify the objects and the shape of each bound."
      >
        <p>We have a random variable <span className="math-inline">ξ</span> on some probability space
        {' '}<span className="math-inline">(Ω, F, P)</span>. The problem asks us to prove two inequalities,
        each controlling an exponential moment of <span className="math-inline">ξ²</span>:</p>

        <p><strong>Part (a):</strong> If <span className="math-inline">E[ξ⁴] {'<'} ∞</span>, then for any <span className="math-inline">λ {'>'} 0</span>:</p>
        <MathBlock>E[e<sup>−λξ²</sup>] ≤ 1 − λE[ξ²] + (λ²/2)E[ξ⁴]</MathBlock>

        <p><strong>Part (b):</strong> If <span className="math-inline">ξ</span> is{' '}
          <Term tooltip="A random variable ξ is sub-Gaussian (with parameter 1) if E[e^{tξ}] ≤ e^{t²/2} for all t ∈ ℝ. Intuitively, its tails decay at least as fast as a standard Gaussian. Examples: any bounded random variable, any Gaussian itself.">sub-Gaussian</Term>
          {' '}(meaning <span className="math-inline">E[e<sup>tξ</sup>] ≤ e<sup>t²/2</sup></span> for all <span className="math-inline">t</span>), then:</p>
        <MathBlock>E[e<sup>λξ²</sup>] ≤ 1/√(1 − 2λ)     for 0 {'<'} λ {'<'} 1/2</MathBlock>

        <Callout type="intuition">
          <p>Notice the signs: part (a) has <span className="math-inline">e<sup>−λξ²</sup></span> (a damped exponential — always bounded by 1),
          while part (b) has <span className="math-inline">e<sup>+λξ²</sup></span> (a growing exponential — potentially infinite).
          Part (a) needs only a finite fourth moment. Part (b) needs the much stronger sub-Gaussian condition,
          which controls <em>all</em> exponential moments of ξ.</p>
        </Callout>

        <p><strong>Roadmap:</strong></p>
        <p>Part (a) is a direct Taylor truncation argument — one inequality, one expectation, done.
        Part (b) is more involved: we use a Gaussian integral identity to convert the problem
        into one where the sub-Gaussian hypothesis applies, then evaluate the resulting integral.</p>
      </Step>


      {/* ============= PART (a) ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>Part (a) — Taylor Truncation Bound</h2>
        <p className="part-goal">
          Goal: show E[e<sup>−λξ²</sup>] ≤ 1 − λE[ξ²] + (λ²/2)E[ξ⁴] when E[ξ⁴] {'<'} ∞ and λ {'>'} 0.
        </p>
      </div>

      <Step
        badge="A.1"
        title="Identify the right Taylor bound"
        hint="Use the alternating series truncation: e^{-x} ≤ 1 - x + x²/2 for x ≥ 0."
        decision="We need an upper bound on e^{−λξ²}. The exponential e^{-x} has a well-known Taylor series with alternating signs, and truncating an alternating series gives a one-sided bound. This is the natural starting point."
      >
        <p>The key inequality is the{' '}
          <Term tooltip="When a Taylor series has strictly alternating signs and decreasing term magnitudes, truncating after an even-index term gives an upper bound, and truncating after an odd-index term gives a lower bound. For e^{-x} = 1 - x + x²/2! - x³/3! + ..., stopping at x²/2! gives an upper bound.">Taylor remainder bound</Term>
          {' '}for the exponential:</p>

        <MathBlock>e<sup>−x</sup> ≤ 1 − x + x²/2     for all x ≥ 0</MathBlock>

        <Toggle label="Why does this inequality hold?">
          <p>The Taylor series of <span className="math-inline">e<sup>−x</sup></span> around 0 is:</p>
          <MathBlock>e<sup>−x</sup> = 1 − x + x²/2! − x³/3! + x⁴/4! − ⋯</MathBlock>
          <p>For <span className="math-inline">x ≥ 0</span>, this is an alternating series with decreasing term magnitudes
          (since <span className="math-inline">x<sup>k</sup>/k!</span> eventually decreases). By the alternating series estimation theorem,
          truncating after the <span className="math-inline">x²/2!</span> term — which is a positive term — gives an <em>upper</em> bound.
          The remainder <span className="math-inline">−x³/3! + x⁴/4! − ⋯</span> is negative (the first omitted term dominates).</p>
          <p>More precisely, by Taylor's theorem with integral remainder:</p>
          <MathBlock>e<sup>−x</sup> = 1 − x + x²/2 + R₃(x)</MathBlock>
          <p>where <span className="math-inline">R₃(x) = (−1)³ ∫₀ˣ (x−t)²/2! · e<sup>−t</sup> dt ≤ 0</span> for <span className="math-inline">x ≥ 0</span>.
          So <span className="math-inline">e<sup>−x</sup> ≤ 1 − x + x²/2</span>.</p>
        </Toggle>
      </Step>

      <Step
        badge="A.2"
        title="Apply with x = λξ²"
        hint="Substitute x = λξ² into the Taylor bound — this is non-negative since λ > 0."
        decision="The Taylor bound requires x ≥ 0. We have λ > 0 and ξ² ≥ 0, so x = λξ² ≥ 0 and we can apply the inequality pointwise (for every ω ∈ Ω)."
      >
        <p>Set <span className="math-inline">x = λξ²</span>. Since <span className="math-inline">λ {'>'} 0</span> and
        {' '}<span className="math-inline">ξ² ≥ 0</span>, we have <span className="math-inline">x ≥ 0</span>,
        so the Taylor bound applies pointwise:</p>

        <MathBlock>e<sup>−λξ²</sup> ≤ 1 − λξ² + (λξ²)²/2 = 1 − λξ² + λ²ξ⁴/2</MathBlock>

        <p>This holds for every <span className="math-inline">ω ∈ Ω</span> — it is a deterministic inequality
        applied to the random quantity <span className="math-inline">λξ²(ω)</span>.</p>

        <Callout type="warning">
          <p>Do not confuse this with a probabilistic bound. There is no Markov or Chebyshev here.
          We are using a purely analytic inequality about the function <span className="math-inline">e<sup>−x</sup></span>,
          then plugging in a random variable. The randomness only enters when we take expectations in the next step.</p>
        </Callout>
      </Step>

      <Step
        badge="A.3"
        title="Take expectations"
        hint="Monotonicity of expectation: if X ≤ Y pointwise then E[X] ≤ E[Y]."
        decision="We have a pointwise inequality. Expectation preserves inequalities (monotonicity), so we just integrate both sides. We need E[ξ⁴] < ∞ to ensure the right side is finite and well-defined."
      >
        <p>Take expectations of both sides. By{' '}
          <Term tooltip="If X(ω) ≤ Y(ω) for all ω (or almost surely), then E[X] ≤ E[Y], provided the expectations exist. This follows directly from the definition of the Lebesgue integral: the integral preserves the pointwise ordering.">monotonicity of expectation</Term>:</p>

        <MathBlock>E[e<sup>−λξ²</sup>] ≤ E[1 − λξ² + λ²ξ⁴/2]</MathBlock>

        <p>By linearity of expectation:</p>

        <MathBlock>= E[1] − λE[ξ²] + (λ²/2)E[ξ⁴]</MathBlock>

        <MathBlock>= 1 − λE[ξ²] + (λ²/2)E[ξ⁴]     □</MathBlock>

        <p>The assumption <span className="math-inline">E[ξ⁴] {'<'} ∞</span> guarantees that the right-hand side
        is a finite real number. (Note that <span className="math-inline">E[ξ²] ≤ (E[ξ⁴])<sup>1/2</sup> {'<'} ∞</span> by
        Jensen's inequality, so <span className="math-inline">E[ξ²]</span> is also finite.)</p>

        <Callout type="key">
          <p>The entire proof is three lines: (1) write down the Taylor bound, (2) substitute, (3) take expectations.
          The conceptual content is recognizing that truncating an alternating Taylor series gives
          a <em>one-sided</em> bound, and that the sign works out to give an upper bound here.</p>
        </Callout>

        <Toggle label="Why does Professor Valettas care about this bound?">
          <p>This type of bound appears when analyzing characteristic functions and Laplace transforms.
          The left side <span className="math-inline">E[e<sup>−λξ²</sup>]</span> is the Laplace transform of <span className="math-inline">ξ²</span> evaluated at <span className="math-inline">λ</span>.
          The right side is a polynomial approximation in <span className="math-inline">λ</span> that captures
          the first two moments of <span className="math-inline">ξ²</span>. This technique — bounding a generating function
          by a polynomial in its parameter — is a workhorse in probability. You will see it again
          when proving central limit theorems and in the theory of{' '}
          <Term tooltip="The cumulant generating function of X is Λ(t) = log E[e^{tX}]. Its Taylor coefficients are the cumulants κ₁, κ₂, κ₃, ... The first cumulant is the mean, the second is the variance. Bounding the CGF by a polynomial in t is equivalent to controlling the cumulants.">cumulant generating functions</Term>.</p>
        </Toggle>
      </Step>


      {/* ============= PART (b) ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>Part (b) — Sub-Gaussian Implies Sub-Exponential Squared</h2>
        <p className="part-goal">
          Goal: show E[e<sup>λξ²</sup>] ≤ 1/√(1 − 2λ) for 0 {'<'} λ {'<'} 1/2, assuming E[e<sup>tξ</sup>] ≤ e<sup>t²/2</sup> for all t.
        </p>
      </div>

      <Step
        badge="B.1"
        badgeClass="step-badge-b"
        title="Rewrite λξ² to match the hint"
        hint="Write λξ² = (√(2λ) · ξ)² / 2 to create an α²/2 form."
        decision="The hint tells us to use the identity e^{α²/2} = (1/√(2π)) ∫ e^{-t²/2 + αt} dt. So we need to express e^{λξ²} as e^{α²/2} for some α. Simple algebra: λξ² = (√(2λ)·ξ)²/2, so set α = √(2λ)·ξ."
      >
        <p>We want to use the hint identity. First, rewrite the exponent:</p>

        <MathBlock>λξ² = (2λ)ξ²/2 = (√(2λ) · ξ)² / 2</MathBlock>

        <p>So:</p>

        <MathBlock>e<sup>λξ²</sup> = e<sup>(√(2λ) · ξ)² / 2</sup></MathBlock>

        <p>This is exactly <span className="math-inline">e<sup>α²/2</sup></span> with <span className="math-inline">α = √(2λ) · ξ</span>.
        The rewriting is pure algebra — no probability yet.</p>
      </Step>

      <Step
        badge="B.2"
        badgeClass="step-badge-b"
        title="Apply the Gaussian integral identity"
        hint="Use e^{α²/2} = (1/√(2π)) ∫ e^{-t²/2 + αt} dt with α = √(2λ)·ξ."
        decision="The hint hands us an integral representation. This is useful because the integrand e^{-t²/2 + αt} is linear in α in the exponent, which will let us apply the sub-Gaussian condition E[e^{sξ}] ≤ e^{s²/2} after taking expectations."
      >
        <p>The hint states the Gaussian integral identity: for any real number <span className="math-inline">α</span>,</p>

        <MathBlock>e<sup>α²/2</sup> = (1/√(2π)) ∫<sub>−∞</sub><sup>∞</sup> e<sup>−t²/2 + αt</sup> dt</MathBlock>

        <Toggle label="Why does this identity hold?">
          <p>Complete the square in the exponent:</p>
          <MathBlock>−t²/2 + αt = −(t − α)²/2 + α²/2</MathBlock>
          <p>So the integral becomes:</p>
          <MathBlock>(1/√(2π)) ∫ e<sup>−(t−α)²/2 + α²/2</sup> dt = e<sup>α²/2</sup> · (1/√(2π)) ∫ e<sup>−(t−α)²/2</sup> dt</MathBlock>
          <p>The remaining integral is the total mass of a <span className="math-inline">N(α, 1)</span> density, which equals 1.
          So the whole expression equals <span className="math-inline">e<sup>α²/2</sup></span>.</p>
        </Toggle>

        <p>Apply this with <span className="math-inline">α = √(2λ) · ξ</span>:</p>

        <MathBlock>e<sup>λξ²</sup> = (1/√(2π)) ∫<sub>−∞</sub><sup>∞</sup> e<sup>−t²/2 + √(2λ) · ξ · t</sup> dt</MathBlock>

        <Callout type="key">
          <p>The whole point of this maneuver: the exponent is now <em>linear in ξ</em> (the term <span className="math-inline">√(2λ) · t · ξ</span>).
          When we take expectations over ξ, we will get <span className="math-inline">E[e<sup>s·ξ</sup>]</span> with <span className="math-inline">s = √(2λ) · t</span> — and
          that is exactly where the sub-Gaussian condition applies. The Gaussian integral identity
          has "linearized" the quadratic <span className="math-inline">ξ²</span> in the exponent.</p>
        </Callout>
      </Step>

      <Step
        badge="B.3"
        badgeClass="step-badge-b"
        title="Take expectation and swap with the integral"
        hint="Tonelli's theorem justifies swapping E and ∫ since the integrand is non-negative."
        decision="We need E[e^{λξ²}], so take expectations of both sides. The integral over t is with respect to Lebesgue measure; the expectation is with respect to P. We need to swap their order, which requires justification."
      >
        <p>Take expectations of both sides:</p>

        <MathBlock>E[e<sup>λξ²</sup>] = E[(1/√(2π)) ∫<sub>−∞</sub><sup>∞</sup> e<sup>−t²/2 + √(2λ)ξt</sup> dt]</MathBlock>

        <p>We want to move E inside the integral. The integrand
        {' '}<span className="math-inline">e<sup>−t²/2 + √(2λ)ξt</sup></span> is non-negative (it is an exponential),
        so by{' '}
          <Term tooltip="Tonelli's theorem: if f(x, y) ≥ 0 is measurable, then ∫∫ f dμ dν = ∫∫ f dν dμ — you can swap the order of integration for non-negative functions without any integrability conditions. This is the 'non-negative version' of Fubini's theorem." wide>Tonelli's theorem</Term>
        {' '}we can swap the expectation (integral over Ω with respect to P) and the integral over <span className="math-inline">ℝ</span> (with respect to Lebesgue measure):</p>

        <MathBlock>E[e<sup>λξ²</sup>] = (1/√(2π)) ∫<sub>−∞</sub><sup>∞</sup> e<sup>−t²/2</sup> · E[e<sup>√(2λ)·t·ξ</sup>] dt</MathBlock>

        <Callout type="warning">
          <p>The swap is not free. Tonelli applies because the integrand is non-negative.
          If we had a signed integrand, we would need Fubini's theorem, which requires the additional
          condition that the double integral of the absolute value is finite. Here, non-negativity
          gives us Tonelli for free — no integrability check needed.</p>
        </Callout>
      </Step>

      <Step
        badge="B.4"
        badgeClass="step-badge-b"
        title="Apply the sub-Gaussian condition"
        hint="Use E[e^{sξ}] ≤ e^{s²/2} with s = √(2λ)·t."
        decision="We now have E[e^{√(2λ)tξ}] inside the integral. The sub-Gaussian hypothesis says E[e^{sξ}] ≤ e^{s²/2} for all real s. Set s = √(2λ)·t to bound this factor."
      >
        <p>The{' '}
          <Term tooltip="The sub-Gaussian condition E[e^{tξ}] ≤ e^{t²/2} for all t ∈ ℝ means the MGF of ξ is dominated by the MGF of a standard Gaussian. Equivalently, ξ has 'Gaussian-like tails': P(|ξ| > u) ≤ 2e^{-u²/2}.">sub-Gaussian hypothesis</Term>
        {' '}states that <span className="math-inline">E[e<sup>sξ</sup>] ≤ e<sup>s²/2</sup></span> for all <span className="math-inline">s ∈ ℝ</span>.
        Apply this with <span className="math-inline">s = √(2λ) · t</span>:</p>

        <MathBlock>E[e<sup>√(2λ)·t·ξ</sup>] ≤ e<sup>(√(2λ)·t)²/2</sup> = e<sup>λt²</sup></MathBlock>

        <p>Substituting back into the integral:</p>

        <MathBlock>E[e<sup>λξ²</sup>] ≤ (1/√(2π)) ∫<sub>−∞</sub><sup>∞</sup> e<sup>−t²/2</sup> · e<sup>λt²</sup> dt</MathBlock>

        <p>Combine the exponentials:</p>

        <MathBlock>= (1/√(2π)) ∫<sub>−∞</sub><sup>∞</sup> e<sup>−t²/2 + λt²</sup> dt = (1/√(2π)) ∫<sub>−∞</sub><sup>∞</sup> e<sup>−t²(1 − 2λ)/2</sup> dt</MathBlock>
      </Step>

      <Step
        badge="B.5"
        badgeClass="step-badge-b"
        title="Evaluate the Gaussian integral"
        hint="This is a Gaussian integral with variance 1/(1−2λ); it converges iff 1−2λ > 0."
        decision="We have a standard Gaussian-type integral ∫ e^{-at²/2} dt with a = 1−2λ. This evaluates to √(2π/a) when a > 0, which requires λ < 1/2."
      >
        <p>The integral <span className="math-inline">(1/√(2π)) ∫ e<sup>−at²/2</sup> dt</span> with <span className="math-inline">a = 1 − 2λ</span> is
        a standard Gaussian integral. For <span className="math-inline">a {'>'} 0</span>:</p>

        <MathBlock>∫<sub>−∞</sub><sup>∞</sup> e<sup>−at²/2</sup> dt = √(2π/a)</MathBlock>

        <Toggle label="Quick derivation of the Gaussian integral formula">
          <p>Substitute <span className="math-inline">u = √a · t</span>, so <span className="math-inline">du = √a · dt</span>:</p>
          <MathBlock>∫ e<sup>−at²/2</sup> dt = (1/√a) ∫ e<sup>−u²/2</sup> du = (1/√a) · √(2π) = √(2π/a)</MathBlock>
          <p>where we used the standard result <span className="math-inline">∫ e<sup>−u²/2</sup> du = √(2π)</span>.</p>
        </Toggle>

        <p>Therefore:</p>

        <MathBlock>E[e<sup>λξ²</sup>] ≤ (1/√(2π)) · √(2π/(1 − 2λ)) = 1/√(1 − 2λ)</MathBlock>

        <p>This is valid when <span className="math-inline">1 − 2λ {'>'} 0</span>, i.e., <span className="math-inline">λ {'<'} 1/2</span>.
        Combined with the assumption <span className="math-inline">λ {'>'} 0</span>, we need <span className="math-inline">0 {'<'} λ {'<'} 1/2</span>.     □</p>

        <Callout type="warning">
          <p>If <span className="math-inline">λ ≥ 1/2</span>, the integral diverges — the exponent <span className="math-inline">−t²(1−2λ)/2</span> becomes
          non-negative for all <span className="math-inline">t</span>, so the integrand does not decay. This is not just a
          limitation of the proof; for many sub-Gaussian random variables (e.g., a standard Gaussian),
          <span className="math-inline">E[e<sup>λξ²</sup>]</span> is genuinely infinite when <span className="math-inline">λ ≥ 1/2</span>.
          The bound <span className="math-inline">1/√(1 − 2λ) → ∞</span> as <span className="math-inline">λ → 1/2⁻</span> reflects this blowup.</p>
        </Callout>
      </Step>

      <Step
        badge="B.6"
        badgeClass="step-badge-b"
        title="Sanity check: the Gaussian case"
        hint="If ξ ~ N(0,1), verify the bound is tight."
        decision="A good proof habit from Valettas: check your result against a known case. The standard Gaussian is the canonical sub-Gaussian variable, so the bound should be sharp (or nearly so) there."
      >
        <p>Let <span className="math-inline">ξ ∼ N(0,1)</span>. Then <span className="math-inline">ξ²∼ χ²(1)</span>, and we can compute directly:</p>

        <MathBlock>E[e<sup>λξ²</sup>] = (1/√(2π)) ∫ e<sup>λt²</sup> · e<sup>−t²/2</sup> dt = (1/√(2π)) ∫ e<sup>−t²(1−2λ)/2</sup> dt = 1/√(1 − 2λ)</MathBlock>

        <p>So for the standard Gaussian, <strong>equality holds</strong>. The bound is tight.</p>

        <Callout type="connection">
          <p>This is not a coincidence. The Gaussian is the "worst-case" sub-Gaussian variable —
          it saturates the condition <span className="math-inline">E[e<sup>tξ</sup>] = e<sup>t²/2</sup></span> with equality.
          Our proof turned the inequality into equality exactly when the sub-Gaussian bound is tight.
          So the Gaussian maximizes <span className="math-inline">E[e<sup>λξ²</sup>]</span> among all sub-Gaussian random variables
          with parameter 1.</p>
        </Callout>
      </Step>


      {/* ============= CLOSING BOXES ============= */}
      <div className="separator"></div>

      <Box label="PROOF AT A GLANCE" labelColor="#d4a574">
        <p><strong>Part (a)</strong> — Taylor truncation:</p>
        <p>1. Use <span className="math-inline">e<sup>−x</sup> ≤ 1 − x + x²/2</span> for <span className="math-inline">x ≥ 0</span> (alternating series truncation).</p>
        <p>2. Substitute <span className="math-inline">x = λξ²</span> (non-negative since <span className="math-inline">λ {'>'} 0</span>).</p>
        <p>3. Take expectations (monotonicity + linearity). Done.</p>

        <p style={{ marginTop: '16px' }}><strong>Part (b)</strong> — Gaussian integral trick:</p>
        <p>1. Write <span className="math-inline">e<sup>λξ²</sup> = e<sup>(√(2λ)ξ)²/2</sup></span>.</p>
        <p>2. Apply the identity <span className="math-inline">e<sup>α²/2</sup> = (1/√(2π)) ∫ e<sup>−t²/2+αt</sup> dt</span> with <span className="math-inline">α = √(2λ)ξ</span>.</p>
        <p>3. Take expectations, swap with integral (Tonelli — integrand is non-negative).</p>
        <p>4. Apply sub-Gaussian bound <span className="math-inline">E[e<sup>sξ</sup>] ≤ e<sup>s²/2</sup></span> with <span className="math-inline">s = √(2λ)t</span>.</p>
        <p>5. Evaluate the Gaussian integral: <span className="math-inline">(1/√(2π)) ∫ e<sup>−t²(1−2λ)/2</sup> dt = 1/√(1−2λ)</span>.</p>
      </Box>

      <Box label="WHY THIS MATTERS" labelColor="#7eb8da">
        <p><strong>Part (a)</strong> illustrates a general principle: polynomial approximations to generating
        functions give moment-based bounds. The Taylor truncation trick appears everywhere —
        in proofs of the CLT, in bounding characteristic functions, and in establishing
        Berry-Esseen type results. Whenever you see "assume <span className="math-inline">E[|X|<sup>k</sup>] {'<'} ∞</span>,"
        a Taylor truncation at order <span className="math-inline">k</span> is likely nearby.</p>

        <p><strong>Part (b)</strong> shows that sub-Gaussian random variables have <em>sub-exponential squares</em>.
        The bound <span className="math-inline">E[e<sup>λξ²</sup>] ≤ 1/√(1−2λ)</span> means <span className="math-inline">ξ²</span> is a
        {' '}<Term tooltip="A random variable Y is sub-exponential if E[e^{λY}] ≤ 1/(1−cλ) for small λ, or equivalently, P(Y > t) ≤ Ce^{-ct} for large t. Sub-exponential tails are heavier than Gaussian but still decay exponentially. If ξ is sub-Gaussian, then ξ² is sub-exponential." wide>sub-exponential</Term>
        {' '}random variable. This is the foundation of the sub-Gaussian/sub-exponential hierarchy
        that Valettas builds on in later lectures: sub-Gaussian ξ → sub-exponential ξ² → finite moments of all orders.</p>

        <p><strong>The Gaussian integral trick</strong> in part (b) — representing <span className="math-inline">e<sup>α²/2</sup></span> as a
        Gaussian integral to "linearize" a squared exponent — is a technique you will see again
        in random matrix theory, spin glass models, and the theory of Gaussian processes.
        It is sometimes called the <em>Hubbard-Stratonovich transformation</em> in physics.</p>
      </Box>

      <Footer />

    </div>
  )
}
