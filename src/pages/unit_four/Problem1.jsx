import { useEffect } from 'react';
import Toggle from '../../components/Toggle';
import Term from '../../components/Term';
import Callout from '../../components/Callout';
import Step from '../../components/Step';
import MathBlock from '../../components/MathBlock';
import Box from '../../components/Box';
import BottomNav from '../../components/BottomNav';

export default function Problem1() {
  useEffect(() => {
    document.title = 'PS4 Problem 1 — Tail Sum Formula for Expectation';
  }, []);

  return (
    <div className="p1-math">
      <div className="container container-narrow">

        {/* Header */}
        <div className="label">PROBLEM SET 4 · PROBLEM 1</div>
        <h1>Tail Sum Formula for Expectation</h1>
        <p className="subtitle">Proving that for a non-negative random variable Y on a finite probability space:</p>
        <MathBlock>E[Y] = ∫₀<sup>∞</sup> P(Y ≥ t) dt</MathBlock>

        {/* STEP 0 */}
        <Step badge="STEP 0" title="What we're given and what we need">
          <p>We have a{' '}
            <Term tooltip="A triple (Ω, F, P) where the sample space Ω = {ω₁, ω₂, …, ωₙ} is a finite set. F is the set of all subsets of Ω (events), and P assigns a probability to each outcome such that Σ P(ωᵢ) = 1.">finite probability space</Term>
            {' '}(Ω, F, P) and a{' '}
            <Term tooltip="A function Y: Ω → [0, ∞). It assigns a non-negative real number to each outcome. &quot;Non-negative&quot; is crucial — the proof breaks for random variables that can be negative.">non-negative random variable</Term>
            {' '}Y on Ω.
          </p>

          <p>The standard definition of expectation for a discrete r.v. is:</p>
          <MathBlock>E[Y] = Σ<sub>ω ∈ Ω</sub> Y(ω) · P(ω)</MathBlock>

          <p>We want to show this equals the integral of the{' '}
            <Term tooltip={'P(Y ≥ t) as a function of t. It starts at 1 (when t = 0, since Y ≥ 0 always) and decreases to 0. The "tail" of the distribution. In your moment explorer, this is the area to the right of t under the PMF — but accumulated.'}>survival function</Term>.
            {' '}This is a change of perspective: instead of summing over outcomes, we integrate over thresholds.
          </p>

          <Callout type="intuition">
            Think of it geometrically. Plot Y(ω) as a bar for each outcome ω.
            E[Y] is the total "weighted area" of all bars.
            You can compute this area by summing horizontally (each bar's height × its probability)
            or by sweeping a horizontal line upward and asking "how much probability mass is still above me at height t?"
            Both give the same area. That's this identity.
          </Callout>
        </Step>

        {/* STEP 1 */}
        <Step badge="STEP 1" title="Rewrite each Y(ω) as an integral">
          <p>This is the hint Valettas gives. For any fixed outcome ω ∈ Ω, the value Y(ω) is just
          a non-negative real number. We can write any non-negative number as the length of an interval:</p>

          <MathBlock>Y(ω) = ∫₀<sup>∞</sup> 𝟙{'{'}t ≤ Y(ω){'}'} dt  =  ∫₀<sup>∞</sup> 𝟙<sub>[0, Y(ω)]</sub>(t) dt</MathBlock>

          <p>where{' '}
            <Term tooltip="The indicator function. It equals 1 when the condition is true (t ≤ Y(ω)) and 0 otherwise. Also written as 𝟙_A(t) where A = [0, Y(ω)]. It &quot;selects&quot; the interval from 0 to Y(ω).">𝟙{'{'}t ≤ Y(ω){'}'}</Term>
            {' '}is the indicator that t falls in [0, Y(ω)].
          </p>

          <Callout type="key">
            <p>Why is this true? The integral of the constant function 1 from 0 to Y(ω) is just Y(ω).
            The indicator function 𝟙{'{'}t ≤ Y(ω){'}'} equals 1 on [0, Y(ω)] and 0 after that, so
            integrating it over [0, ∞) gives exactly the length of that interval — which is Y(ω).</p>
            <p style={{ marginTop: '8px' }}>This is almost tautological, but it's the engine of the entire proof.
            The trick is: we've turned a <em>number</em> into an <em>integral</em>, which lets us
            swap the order of integration and summation in the next step.</p>
          </Callout>

          <Toggle label="Why does this only work for Y ≥ 0?">
            If Y(ω) were negative, the interval [0, Y(ω)] would be empty and the integral would
            be 0, not Y(ω). The representation Y = ∫ 𝟙{'{'}t ≤ Y{'}'} dt only recovers Y when Y ≥ 0.
            For general random variables, you'd need to split into positive and negative parts
            and handle them separately.
          </Toggle>
        </Step>

        {/* STEP 2 */}
        <Step badge="STEP 2" title="Substitute into the definition of E[Y]">
          <p>Starting from the standard definition and plugging in our integral representation:</p>
          <MathBlock>E[Y] = Σ<sub>ω ∈ Ω</sub> Y(ω) · P(ω)</MathBlock>
          <MathBlock>     = Σ<sub>ω ∈ Ω</sub> [ ∫₀<sup>∞</sup> 𝟙{'{'}t ≤ Y(ω){'}'} dt ] · P(ω)</MathBlock>

          <p>This is just a direct substitution — nothing clever yet. We've replaced Y(ω) with
          its integral representation from Step 1.</p>

          <Callout type="warning">
            At this point we have a sum (over ω) of integrals (over t). The next step is to
            swap their order. In general, you can't always swap sums and integrals — you need
            a justification. Here we get it for free because Ω is <strong>finite</strong>.
          </Callout>
        </Step>

        {/* STEP 3 */}
        <Step badge="STEP 3" title="Swap the sum and the integral (Fubini)">
          <p>Because Ω is finite and the integrand is non-negative, we can exchange the order:</p>
          <MathBlock>E[Y] = Σ<sub>ω ∈ Ω</sub> [ ∫₀<sup>∞</sup> 𝟙{'{'}t ≤ Y(ω){'}'} dt ] · P(ω)</MathBlock>
          <MathBlock>     = ∫₀<sup>∞</sup> [ Σ<sub>ω ∈ Ω</sub> 𝟙{'{'}t ≤ Y(ω){'}'} · P(ω) ] dt</MathBlock>

          <p>We pulled the sum inside the integral.{' '}
            <Term tooltip="Fubini's theorem says you can swap the order of integration (or sum and integral) when the function is integrable with respect to the product measure. Tonelli's theorem is the version for non-negative functions, where it always works without checking integrability first. Since Ω is finite, the sum is really just a finite linear combination — you can always swap a finite sum past an integral.">Fubini's theorem / Tonelli's theorem</Term>
          </p>

          <Callout type="key">
            <p>This swap is the <em>core move</em>. Before the swap, we were organized by outcome:
            "for each ω, how much does it contribute?" After the swap, we're organized by threshold:
            "for each height t, how much probability mass sits above t?"</p>
            <p style={{ marginTop: '8px' }}>In this finite setting, the justification is trivial (finite sum always commutes with integral).
            But this exact move — reorganizing a computation by swapping the order — is what Valettas
            wants to burn into your reflexes. It appears in the proof of Markov's inequality, in the
            analysis of randomized algorithms, and throughout Week 6–7 material.</p>
          </Callout>

          <Toggle label="Why is finiteness of Ω important here?">
            A finite sum is just addition — you can always pull a finite sum past an integral (or any
            linear operation). If Ω were countably infinite, you'd need dominated convergence or
            monotone convergence to justify the swap. If Ω were uncountable, you'd need full
            Fubini/Tonelli. The problem specifies "finite probability space" to keep the measure
            theory lightweight, but the result holds much more generally.
          </Toggle>
        </Step>

        {/* STEP 4 */}
        <Step badge="STEP 4" title="Recognize the inner sum as P(Y ≥ t)">
          <p>Look at what's inside the integral now:</p>
          <MathBlock>Σ<sub>ω ∈ Ω</sub> 𝟙{'{'}t ≤ Y(ω){'}'} · P(ω)</MathBlock>

          <p>This is summing P(ω) over exactly those outcomes where Y(ω) ≥ t. That is, by definition:</p>
          <MathBlock>Σ<sub>ω ∈ Ω</sub> 𝟙{'{'}t ≤ Y(ω){'}'} · P(ω)  =  Σ<sub>ω : Y(ω) ≥ t</sub> P(ω)  =  P(Y ≥ t)</MathBlock>

          <p>This is just the definition of probability for a discrete space. The{' '}
            <Term tooltip="𝟙{t ≤ Y(ω)} is 1 when ω is in the event {Y ≥ t} and 0 otherwise. Multiplying by P(ω) and summing gives exactly the probability of that event. This is the bridge: a sum of weighted indicators = probability of the event.">indicator function acts as a filter</Term>,
            {' '}selecting only the outcomes that land in the event {'{'}Y ≥ t{'}'}.
          </p>

          <Callout type="intuition">
            The magic has already happened. We now have E[Y] = ∫ P(Y ≥ t) dt.
            The indicator did double duty: it encoded Y(ω) as a length (Step 1), and after
            the swap, it encoded the event {'{'}Y ≥ t{'}'} as a probability (this step).
            Same function, two readings — that's the elegance.
          </Callout>
        </Step>

        {/* STEP 5 */}
        <Step badge="STEP 5" title="Conclude">
          <p>Combining Steps 3 and 4:</p>
          <MathBlock>E[Y] = ∫₀<sup>∞</sup> P(Y ≥ t) dt          □</MathBlock>

          <Toggle label="What about the upper limit of ∞?">
            Since Ω is finite, Y takes finitely many values — so there's some maximum value M = max Y(ω).
            For all t {'>'} M, the event {'{'}Y ≥ t{'}'} is empty and P(Y ≥ t) = 0. So the integral is really
            from 0 to M, and the ∞ is cosmetic. In the infinite case, you'd need integrability of Y to
            ensure the integral converges.
          </Toggle>
        </Step>

        {/* Why it matters */}
        <Box label="WHY THIS MATTERS FOR THE REST OF THE COURSE" labelColor="#d4a574">
          <p><strong>1. Computing expectations via tail bounds.</strong>
          {' '}Sometimes computing E[X] directly (summing x · P(X = x)) is hard, but you already have
          good bounds on P(X ≥ t). This formula lets you convert tail bounds into expectation bounds.
          Example: expected maximum degree in G(n,p) in Problem 4 — you bound the tail of the
          degree distribution using Chernoff, then integrate.</p>

          <p><strong>2. The "layer cake" principle.</strong>
          {' '}This proof is a special case of a general technique: decompose a quantity into layers
          (here, horizontal slices at each height t), compute each layer separately, then integrate.
          This shows up in bounding moments (E[Y^k] = ∫ k·t^(k-1) P(Y ≥ t) dt), relating
          different norms, and in the entropy material in Week 14.</p>

          <p><strong>3. The Fubini reflex.</strong>
          {' '}The core technical move — "I have a sum of integrals, let me swap the order" — is the
          single most reusable proof technique in the course. Valettas is introducing it here in a
          clean, low-stakes setting so it becomes automatic.</p>

          <p><strong>4. Connecting probability to analysis.</strong>
          {' '}The formula E[Y] = ∫ P(Y ≥ t) dt is really saying: the expectation equals the area under
          the survival curve. This is the probabilistic version of integration by parts, and it's the
          bridge between discrete probability (counting outcomes) and continuous analysis (integrating
          functions). This bridge is exactly what you need for Chernoff bounds (Problem 2), where you
          optimize over a continuous parameter s.</p>
        </Box>

        {/* Proof at a glance */}
        <Box label="PROOF AT A GLANCE" labelColor="#7eb8da">
          <div className="proof-summary">
            <div>E[Y]</div>
            <div className="comment">  // definition</div>
            <div>= Σ<sub>ω</sub> Y(ω) · P(ω)</div>
            <div className="comment">  // represent Y(ω) as ∫ indicator</div>
            <div>= Σ<sub>ω</sub> [∫₀<sup>∞</sup> 𝟙{'{'}t ≤ Y(ω){'}'} dt] · P(ω)</div>
            <div className="comment">  // swap sum and integral (Ω finite)</div>
            <div>= ∫₀<sup>∞</sup> [Σ<sub>ω</sub> 𝟙{'{'}t ≤ Y(ω){'}'} · P(ω)] dt</div>
            <div className="comment">  // inner sum = P(Y ≥ t)</div>
            <div>= ∫₀<sup>∞</sup> P(Y ≥ t) dt</div>
          </div>
        </Box>

        <BottomNav />

        <div className="footer">
          Hover dotted terms for definitions · click arrows for deeper context
        </div>

      </div>
    </div>
  );
}
