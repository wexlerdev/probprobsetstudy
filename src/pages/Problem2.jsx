import { useEffect } from 'react'
import Toggle from '../components/Toggle'
import Term from '../components/Term'
import Callout from '../components/Callout'
import Step from '../components/Step'
import MathBlock from '../components/MathBlock'
import Box from '../components/Box'
import Footer from '../components/Footer'

export default function Problem2() {
  useEffect(() => {
    document.title = 'PS4 Problem 2 — Chernoff\'s Inequality Revisited'
  }, [])

  return (
    <div className="container">

      {/* Header */}
      <div className="label">PROBLEM SET 4 · PROBLEM 2</div>
      <h1>Chernoff's Inequality Revisited</h1>
      <p className="subtitle">
        From the exact rate function to Hoeffding to Okamoto — three levels of precision
        for controlling the tail of a sum of independent Bernoulli trials.
      </p>

      {/* SETUP */}
      <div className="part-header">
        <h2>Setup & Definitions</h2>
        <div className="part-goal">The objects and machinery you need before any of the three parts.</div>
      </div>

      <Step badge="SETUP" title="The random variables">
        <p>Let X ~ Bernoulli(p) with p ∈ (0,1), and let X₁, …, Xₙ be independent copies. Define:</p>
        <MathBlock>Sₙ = X₁ + X₂ + ⋯ + Xₙ</MathBlock>
        <p>So Sₙ ~ Binomial(n, p) with E[Sₙ] = np and Var(Sₙ) = np(1−p).</p>
        <p>The entire problem is about controlling P(Sₙ deviates far from np) — how tightly
        is this sum concentrated around its mean?</p>
      </Step>

      <Step badge="SETUP" title="The Chernoff method — the key machine">
        <p>The
          {' '}<Term tooltip="The sharpest exponential tail bound you can get from moment generating functions. The idea: for any θ > 0, P(Z ≥ s) = P(e^{θZ} ≥ e^{θs}) ≤ E[e^{θZ}]/e^{θs} by Markov. Then optimize over θ to get the tightest bound.">Chernoff bound</Term>
          {' '}works in three steps:
        </p>

        <p><strong>Step 1 — Exponential tilt.</strong> For any θ {'>'} 0 and any random variable Z:</p>
        <MathBlock>P(Z ≥ s) = P(e<sup>θZ</sup> ≥ e<sup>θs</sup>) ≤ E[e<sup>θZ</sup>] / e<sup>θs</sup> = exp(Λ<sub>Z</sub>(θ) − θs)</MathBlock>

        <p>where <span className="math-inline">Λ<sub>Z</sub>(θ) = log E[e<sup>θZ</sup>]</span> is the
          {' '}<Term tooltip="Also called the log-moment generating function. Λ(θ) = log E[e^{θZ}]. Its key property: for independent Z₁, …, Zₙ, the CGF of the sum is the sum of the CGFs. This is why independence makes Chernoff bounds work — the CGF splits additively.">cumulant generating function (CGF)</Term>.
        </p>

        <p><strong>Step 2 — Optimize.</strong> Since the bound holds for all θ {'>'} 0, take the infimum:</p>
        <MathBlock>P(Z ≥ s) ≤ inf<sub>θ{'>'} 0</sub> exp(Λ<sub>Z</sub>(θ) − θs) = exp(−sup<sub>θ{'>'} 0</sub> {'{'}θs − Λ<sub>Z</sub>(θ){'}'})</MathBlock>

        <p><strong>Step 3 — Name the result.</strong> The optimized exponent is the
          {' '}<Term tooltip="Also called the Cramér transform or rate function. Λ*(s) = sup_θ {θs − Λ(θ)} is the convex conjugate of the CGF. It measures the &quot;cost&quot; of a deviation of size s — larger Λ*(s) means the deviation is exponentially less likely. In information theory, this turns out to equal the KL divergence." wide>Legendre-Fenchel transform</Term>
          {' '}(rate function):
        </p>
        <MathBlock>Λ<sub>Z</sub>*(s) = sup<sub>θ</sub> {'{'}θs − Λ<sub>Z</sub>(θ){'}'}</MathBlock>
        <p>So the Chernoff bound is: <span className="math-inline">P(Z ≥ s) ≤ exp(−Λ<sub>Z</sub>*(s))</span></p>

        <Callout type="key">
          <p>The entire Chernoff method is: apply Markov to e<sup>θZ</sup> instead of Z, then pick the best θ.
          That's it. Everything in this problem is computing what "best θ" looks like for Bernoulli sums
          and then relaxing the result to get cleaner (but looser) formulas.</p>
        </Callout>

        <Toggle label="Why is the exponential tilt so powerful?">
          <p>Markov's inequality on Z gives P(Z ≥ s) ≤ E[Z]/s — this only uses the first moment.
          But e<sup>θZ</sup> grows exponentially, so it amplifies the tail. By choosing θ, you're
          reweighting the distribution to make the tail event "expensive." The optimization over θ
          is finding the reweighting that makes the tail maximally expensive.</p>
          <p>This is why Chernoff gives exponential bounds (exp(−cn)) while Chebyshev only gives
          polynomial bounds (1/n). You're using infinitely many moments at once — the entire MGF —
          instead of just the first two.</p>
        </Toggle>
      </Step>

      <Step badge="SETUP" title="The function H(x, p) — KL divergence">
        <p>The problem defines:</p>
        <MathBlock>H(x, p) = x log(x/p) + (1−x) log((1−x)/(1−p)),     x, p ∈ (0,1)</MathBlock>

        <p>This is the
          {' '}<Term tooltip={`D_KL(Ber(x) ‖ Ber(p)) — the "distance" from Bernoulli(p) to Bernoulli(x). It measures how "surprised" you'd be if the true parameter were p but the empirical frequency were x. It's always ≥ 0, equals 0 iff x = p, and is not symmetric: H(x,p) ≠ H(p,x) in general.`} wide>Kullback-Leibler divergence</Term>
          {' '}from Bernoulli(p) to Bernoulli(x). Key properties you'll need:
        </p>

        <MathBlock>{`H(p, p) = 0            (no divergence from yourself)
H(x, p) ≥ 0           (always, by Gibbs' inequality)
∂H/∂x = log(x/p) − log((1−x)/(1−p))
∂H/∂x |`}<sub>x=p</sub>{` = 0     (p is the minimum)
∂²H/∂x² = 1/(x(1−x))  (curvature — this drives parts b and c)`}</MathBlock>

        <Callout type="connection">
          <p>H(x, p) showing up here is not a coincidence. The rate function for Bernoulli sums
          is <em>always</em> a KL divergence — this is Sanov's theorem. The exponent in the Chernoff bound
          measures how "information-theoretically far" the observed frequency s/n is from the true probability p.
          This is the bridge to entropy in Week 14.</p>
        </Callout>

        <Toggle label="Derivation of ∂²H/∂x²">
          <MathBlock>{`∂H/∂x = log(x/p) − log((1−x)/(1−p))
       = log(x) − log(p) − log(1−x) + log(1−p)

∂²H/∂x² = 1/x + 1/(1−x) = 1/(x(1−x))`}</MathBlock>
          <p>This is the curvature of H at point x. Note it blows up as x → 0 or x → 1
          (very curved near the boundary) and is minimized at x = 1/2 where it equals 4.
          This curvature is what controls how tight each bound is.</p>
        </Toggle>
      </Step>


      {/* ============= PART (a) ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>Part (a) — The Exact Rate Function</h2>
        <div className="part-goal">
          Goal: show that Λ*<sub>Sₙ−E[Sₙ]</sub>(s) = nH(s/n + p, p).
          This is the exact, unrelaxed Chernoff exponent.
        </div>
      </div>

      <Step badge="A.1" title="Factor the rate function using independence">
        <p>Since X₁, …, Xₙ are independent, the CGF splits additively:</p>
        <MathBlock>{`Λ`}<sub>Sₙ−np</sub>{`(θ) = log E[e`}<sup>θ(Sₙ−np)</sup>{`]
             = log ∏ᵢ E[e`}<sup>θ(Xᵢ−p)</sup>{`]     (independence)
             = Σᵢ log E[e`}<sup>θ(Xᵢ−p)</sup>{`]
             = n · Λ`}<sub>X−p</sub>{`(θ)              (identically distributed)`}</MathBlock>

        <p>Now take the Legendre transform:</p>
        <MathBlock>{`Λ*`}<sub>Sₙ−np</sub>{`(s) = sup`}<sub>θ</sub>{` {θs − nΛ`}<sub>X−p</sub>{`(θ)}
                 = n · sup`}<sub>θ</sub>{` {θ(s/n) − Λ`}<sub>X−p</sub>{`(θ)}
                 = n · Λ*`}<sub>X−p</sub>{`(s/n)`}</MathBlock>

        <Callout type="key">
          <p>The factorization Λ*(s) = n · Λ*<sub>single</sub>(s/n) is saying: the cost of a total deviation
          of s across n trials equals n times the cost of a per-trial deviation of s/n. This is the
          "rate function scales linearly" property — the exponent in the Chernoff bound grows like n,
          giving you exponentially decaying tails.</p>
        </Callout>
      </Step>

      <Step badge="A.2" title="Compute the CGF of X − p">
        <p>For a single Bernoulli(p) variable X:</p>
        <MathBlock>{`E[e`}<sup>θ(X−p)</sup>{`] = e`}<sup>−θp</sup>{` · E[e`}<sup>θX</sup>{`]
                = e`}<sup>−θp</sup>{` · [(1−p) + pe`}<sup>θ</sup>{`]`}</MathBlock>
        <p>since X = 0 with probability 1−p and X = 1 with probability p. Therefore:</p>
        <MathBlock>Λ<sub>X−p</sub>(θ) = −θp + log[(1−p) + pe<sup>θ</sup>]</MathBlock>
      </Step>

      <Step badge="A.3" title="Optimize — find the best θ">
        <p>We need to compute Λ*<sub>X−p</sub>(u) where u = s/n. This means solving:</p>
        <MathBlock>{`Λ*`}<sub>X−p</sub>{`(u) = sup`}<sub>θ</sub>{` {θu − Λ`}<sub>X−p</sub>{`(θ)}
                 = sup`}<sub>θ</sub>{` {θu + θp − log[(1−p) + pe`}<sup>θ</sup>{`]}
                 = sup`}<sub>θ</sub>{` {θ(u+p) − log[(1−p) + pe`}<sup>θ</sup>{`]}`}</MathBlock>

        <p>Differentiate with respect to θ and set to zero:</p>
        <MathBlock>d/dθ: (u + p) − pe<sup>θ</sup> / [(1−p) + pe<sup>θ</sup>] = 0</MathBlock>

        <p>Let <span className="math-inline">x = u + p = s/n + p</span> (the "tilted" frequency). Then:</p>
        <MathBlock>x = pe<sup>θ</sup> / [(1−p) + pe<sup>θ</sup>]</MathBlock>

        <p>Solving for θ*:</p>
        <MathBlock>{`pe`}<sup>θ</sup>{`(1−x) = x(1−p)
e`}<sup>θ*</sup>{` = x(1−p) / [p(1−x)]
θ* = log[x(1−p) / (p(1−x))]`}</MathBlock>

        <Callout type="intuition">
          <p>The optimal tilt θ* is the log-odds ratio between Bernoulli(x) and Bernoulli(p).
          When x = p (no deviation), θ* = 0 — no tilting needed. As x moves away from p,
          you need to tilt harder to make the deviation "visible" to the exponential.</p>
        </Callout>
      </Step>

      <Step badge="A.4" title="Substitute θ* back to get H(x, p)">
        <p>Plug θ* into the expression we're optimizing. First, compute the log term:</p>
        <MathBlock>{`pe`}<sup>θ*</sup>{` = x(1−p)/(1−x)

(1−p) + pe`}<sup>θ*</sup>{` = (1−p) + x(1−p)/(1−x)
                    = (1−p) · [1 + x/(1−x)]
                    = (1−p) · [1/(1−x)]
                    = (1−p)/(1−x)

So: log[(1−p) + pe`}<sup>θ*</sup>{`] = log(1−p) − log(1−x)`}</MathBlock>

        <p>And the θ*·x term:</p>
        <MathBlock>{`θ* · x = x · log[x(1−p) / (p(1−x))]
       = x·log(x/p) + x·log((1−p)/(1−x))`}</MathBlock>

        <p>Putting it together:</p>
        <MathBlock>{`Λ*`}<sub>X−p</sub>{`(u) = θ*·x − log[(1−p)/(1−x)]
              = x·log(x/p) + x·log((1−p)/(1−x)) − log(1−p) + log(1−x)
              = x·log(x/p) + (x−1)·log(1−p) + (1−x)·log(1−x)    ...rearranging
              = x·log(x/p) + (1−x)·[log(1−x) − log(1−p)]
              = x·log(x/p) + (1−x)·log((1−x)/(1−p))
              = H(x, p)     ✓`}</MathBlock>

        <p>Since x = s/n + p, we have:</p>
        <MathBlock>Λ*<sub>Sₙ−np</sub>(s) = n · Λ*<sub>X−p</sub>(s/n) = n · H(s/n + p, p)     □</MathBlock>

        <Callout type="connection">
          <p>The rate function equals KL divergence. This means: the probability of seeing empirical
          frequency x when the true parameter is p decays like exp(−n · D<sub>KL</sub>(Ber(x) ‖ Ber(p))).
          The "cost" of a deviation is measured in information-theoretic units (nats or bits).
          This exact statement is the content of Cramér's theorem / Sanov's theorem in large deviations theory.</p>
        </Callout>
      </Step>


      {/* ============= PART (b) ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>Part (b) — Hoeffding's Inequality</h2>
        <div className="part-goal">
          Goal: P(|Sₙ − np| {'>'} εn) ≤ 2 exp(−2ε²n). A universal bound — independent of p.
        </div>
      </div>

      <Step badge="B.1" badgeClass="step-badge-b" title="Apply Chernoff to both tails">
        <p>From part (a), the Chernoff bound gives us:</p>
        <MathBlock>{`Upper tail:  P(Sₙ − np > εn)  ≤ exp(−n · H(ε + p, p))
Lower tail:  P(Sₙ − np < −εn) ≤ exp(−n · H(p − ε, p))`}</MathBlock>

        <p>By a union bound:</p>
        <MathBlock>P(|Sₙ − np| {'>'} εn) ≤ exp(−n·H(ε+p, p)) + exp(−n·H(p−ε, p))</MathBlock>

        <p>If we can show <span className="math-inline">H(x, p) ≥ 2(x−p)²</span> for all x, p ∈ (0,1), then
        both exponents are at least 2ε², giving the result.</p>

        <Callout type="warning">
          <p>We need H(p−ε, p) to be defined, which requires p − ε {'>'} 0 and p + ε {'<'} 1.
          For ε ≥ p or ε ≥ 1−p, the probability P(|Sₙ − np| {'>'} εn) can be bounded directly
          (it involves Sₙ leaving [0, n], which is impossible). The interesting case is small ε.</p>
        </Callout>
      </Step>

      <Step badge="B.2" badgeClass="step-badge-b" title="The key lemma: H(x, p) ≥ 2(x − p)²">
        <p>This is the core of part (b). We prove it using Taylor's theorem with the exact second derivative.</p>

        <p><strong>Step 1 — Taylor expand H around x = p.</strong> By Taylor's theorem with Lagrange remainder,
        there exists some c between x and p such that:</p>
        <MathBlock>H(x, p) = H(p, p) + ∂H/∂x|<sub>x=p</sub> · (x−p) + ½ · ∂²H/∂x²|<sub>x=c</sub> · (x−p)²</MathBlock>

        <p>We already know <span className="math-inline">H(p, p) = 0</span> and <span className="math-inline">∂H/∂x|<sub>x=p</sub> = 0</span>
        {' '}(p is the minimum of H). So:</p>
        <MathBlock>H(x, p) = ½ · (1/(c(1−c))) · (x−p)²</MathBlock>

        <p><strong>Step 2 — Bound the curvature from below.</strong> For any c ∈ (0,1):</p>
        <MathBlock>c(1−c) ≤ 1/4     (by AM-GM: c(1−c) is maximized at c = 1/2)</MathBlock>

        <p>Therefore:</p>
        <MathBlock>1/(c(1−c)) ≥ 4     for all c ∈ (0,1)</MathBlock>

        <p><strong>Step 3 — Combine.</strong></p>
        <MathBlock>H(x, p) = ½ · (1/(c(1−c))) · (x−p)² ≥ ½ · 4 · (x−p)² = 2(x−p)²     □</MathBlock>

        <Callout type="key">
          <p>The bound H(x,p) ≥ 2(x−p)² comes from <em>lower bounding the curvature</em> of H by its
          worst case (which occurs at c = 1/2). The factor of 2 is not arbitrary — it's exactly
          half of the minimum curvature 4. This is where the "2" in exp(−2ε²n) comes from.</p>
          <p>This is a <em>lossy</em> step. When p is near 0 or 1, the actual curvature 1/(c(1−c))
          is much larger than 4, so Hoeffding is very loose. That's exactly what part (c) fixes.</p>
        </Callout>

        <Toggle label="Why is the AM-GM bound c(1−c) ≤ 1/4 the right tool here?">
          <p>We need a <em>universal</em> lower bound on 1/(c(1−c)) that works for all c ∈ (0,1) regardless
          of where c falls. AM-GM gives: c + (1−c) = 1, so √(c(1−c)) ≤ (c + (1−c))/2 = 1/2,
          thus c(1−c) ≤ 1/4. This is tight only at c = 1/2.</p>
          <p>The payoff: we get a bound that doesn't depend on p at all. Hoeffding works for
          <em>any</em> Bernoulli parameter. The cost is that we've thrown away information about p.</p>
        </Toggle>
      </Step>

      <Step badge="B.3" badgeClass="step-badge-b" title="Conclude Hoeffding's inequality">
        <p>Plugging H(x, p) ≥ 2(x−p)² into the Chernoff bound from B.1:</p>
        <MathBlock>{`P(Sₙ − np > εn) ≤ exp(−n · H(ε+p, p)) ≤ exp(−n · 2ε²) = exp(−2ε²n)

Similarly for the lower tail.

P(|Sₙ − np| > εn) ≤ 2 exp(−2ε²n)     □`}</MathBlock>

        <Callout type="intuition">
          <p>Hoeffding says: the probability that the empirical frequency S<sub>n</sub>/n deviates from p
          by more than ε decays like exp(−2ε²n). The rate 2ε² doesn't depend on p. This is why
          Hoeffding is the default "safe" concentration bound — you don't need to know the variance.
          But when you do know p, you can do better (part c).</p>
        </Callout>

        <Toggle label="How loose is Hoeffding in practice?">
          <p>Consider p = 0.01 (rare events). The true variance is np(1−p) ≈ 0.01n, which is tiny.
          Hoeffding gives exp(−2ε²n), but the actual tail decays much faster because p(1−p) ≈ 0.01 ≪ 1/4.
          Okamoto (part c) would give exp(−nε²/(0.02)), which is 25× sharper in the exponent.
          For p = 0.5, Hoeffding and Okamoto nearly agree (p(1−p) = 0.25 ≈ 1/4).</p>
        </Toggle>
      </Step>


      {/* ============= PART (c) ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>Part (c) — Okamoto's Refined Estimates</h2>
        <div className="part-goal">
          Goal: sharpen Hoeffding by using the actual variance p(1−p) instead of the universal 1/4.
          The price: the bound only applies to one tail at a time, depending on whether p ≥ 1/2 or p ≤ 1/2.
        </div>
      </div>

      <Step badge="C.0" badgeClass="step-badge-c" title="Why the asymmetry?">
        <p>Before the proof, understand <em>why</em> Okamoto's bounds are one-sided.</p>

        <p>In part (b), we bounded 1/(c(1−c)) ≥ 4 uniformly. Okamoto instead bounds
        1/(c(1−c)) ≥ 1/(p(1−p)), which is tighter when p ≠ 1/2. But this bound only holds
        when c is on a specific side of 1/2 — and which side depends on where c falls relative to p.</p>

        <Callout type="key">
          <p>The function f(x) = x(1−x) is a downward parabola, maximized at x = 1/2.</p>
          <p>If p ≥ 1/2 and we look at the <strong>upper tail</strong> (x = p + ε {'>'} p ≥ 1/2),
          then c ∈ [p, p+ε] is further from 1/2 than p is, so c(1−c) ≤ p(1−p),
          so 1/(c(1−c)) ≥ 1/(p(1−p)). ✓</p>
          <p>If p ≤ 1/2 and we look at the <strong>lower tail</strong> (x = p − ε {'<'} p ≤ 1/2),
          then c ∈ [p−ε, p] is further from 1/2 than p is, so c(1−c) ≤ p(1−p),
          so 1/(c(1−c)) ≥ 1/(p(1−p)). ✓</p>
          <p>In the other cases (upper tail with p {'<'} 1/2, lower tail with p {'>'} 1/2),
          c might cross 1/2 and the bound fails — c could be closer to 1/2 than p is,
          making c(1−c) {'>'} p(1−p).</p>
        </Callout>

        <Toggle label="Concrete example of the asymmetry">
          <p>Take p = 0.9. The distribution is concentrated near 1 — it's very hard to push Sₙ/n
          <em>above</em> 0.9 + ε (there's not much room before hitting 1). So the upper tail decays
          very fast, and Okamoto captures this with the small p(1−p) = 0.09 in the exponent.</p>
          <p>But pushing Sₙ/n <em>below</em> 0.9 − ε is comparatively easier (there's lots of room
          between 0 and 0.9). For the lower tail with p = 0.9 {'>'} 1/2, c might land near 1/2 where
          the curvature is weakest, so the tighter Okamoto bound doesn't apply.</p>
        </Toggle>
      </Step>

      <Step badge="C.1" badgeClass="step-badge-c" title="Part (i): Upper tail when p ≥ 1/2">
        <p>We want to show: if p ≥ 1/2, then for all ε {'>'} 0,</p>
        <MathBlock>P(Sₙ − np {'>'} εn) ≤ exp(−nε² / (2p(1−p)))</MathBlock>

        <p><strong>The argument:</strong> From part (a), we have</p>
        <MathBlock>P(Sₙ − np {'>'} εn) ≤ exp(−n · H(p+ε, p))</MathBlock>

        <p>By the same Taylor expansion as part (b), with c between p and p + ε:</p>
        <MathBlock>H(p+ε, p) = ½ · (1/(c(1−c))) · ε²</MathBlock>

        <p>Now use the monotonicity argument. Since p ≥ 1/2 and c ∈ [p, p+ε]:</p>
        <MathBlock>{`c ≥ p ≥ 1/2

On [1/2, 1), the function x(1−x) is strictly decreasing.
So c ≥ p implies c(1−c) ≤ p(1−p).
Therefore: 1/(c(1−c)) ≥ 1/(p(1−p)).`}</MathBlock>

        <p>Substituting:</p>
        <MathBlock>{`H(p+ε, p) ≥ ½ · (1/(p(1−p))) · ε² = ε² / (2p(1−p))

∴ P(Sₙ − np > εn) ≤ exp(−nε² / (2p(1−p)))     □`}</MathBlock>
      </Step>

      <Step badge="C.2" badgeClass="step-badge-c" title="Part (ii): Lower tail when p ≤ 1/2">
        <p>We want to show: if p ≤ 1/2, then for all ε {'>'} 0,</p>
        <MathBlock>P(Sₙ − np {'<'} −εn) ≤ exp(−nε² / (2p(1−p)))</MathBlock>

        <p><strong>The argument is symmetric.</strong> The Chernoff bound for the lower tail gives:</p>
        <MathBlock>P(Sₙ − np {'<'} −εn) ≤ exp(−n · H(p−ε, p))</MathBlock>

        <p>Taylor expand: for some c between p − ε and p:</p>
        <MathBlock>H(p−ε, p) = ½ · (1/(c(1−c))) · ε²</MathBlock>

        <p>Since p ≤ 1/2 and c ∈ [p−ε, p]:</p>
        <MathBlock>{`c ≤ p ≤ 1/2

On (0, 1/2], the function x(1−x) is strictly increasing.
So c ≤ p implies c(1−c) ≤ p(1−p).
Therefore: 1/(c(1−c)) ≥ 1/(p(1−p)).`}</MathBlock>

        <p>Substituting:</p>
        <MathBlock>{`H(p−ε, p) ≥ ε² / (2p(1−p))

∴ P(Sₙ − np < −εn) ≤ exp(−nε² / (2p(1−p)))     □`}</MathBlock>

        <Callout type="intuition">
          <p>Both cases use the same logic: Taylor expand H, then show the intermediate point c
          has <em>more</em> curvature than p does because c is further from 1/2 (where curvature
          is minimized). The condition p ≥ 1/2 or p ≤ 1/2 ensures c moves away from 1/2,
          not toward it.</p>
        </Callout>
      </Step>


      {/* ============= FULL PICTURE ============= */}
      <div className="separator"></div>

      <Box label="THE THREE LEVELS — WHAT YOU ACTUALLY NEED TO REMEMBER" labelColor="#d4a574">
        <p><strong>Level 1 — Exact (Part a).</strong>
        {' '}The true Chernoff exponent is n · H(s/n + p, p), the KL divergence. This is the sharpest
        possible bound from the MGF method. You rarely compute this directly — it's the reference
        that the other bounds approximate.</p>

        <p><strong>Level 2 — Hoeffding (Part b).</strong>
        {' '}Relax H(x,p) ≥ 2(x−p)² to get exp(−2ε²n). Universal, clean, p-free. Use this when you don't
        know p or don't care about constants. The "2" in the exponent comes from the minimum curvature
        of KL divergence (which is 4, and half of that is 2).</p>

        <p><strong>Level 3 — Okamoto (Part c).</strong>
        {' '}Use the actual curvature at p instead of the worst case: exp(−nε²/(2p(1−p))).
        Sharper than Hoeffding by a factor of 4p(1−p), which matters a lot when p is near 0 or 1.
        The cost: you only get one tail at a time.</p>
      </Box>

      <Box label="THE PROOF PATTERN — REUSABLE EVERYWHERE" labelColor="#7eb8da">
        <p>Every step in this problem follows one template:</p>

        <p><strong>1.</strong> Start with P(Sₙ − np {'>'} s) ≤ exp(−n · H(s/n + p, p)) — the exact Chernoff bound.</p>
        <p><strong>2.</strong> Lower bound H using a Taylor expansion: H(x,p) = ½ · H″(c) · (x−p)².</p>
        <p><strong>3.</strong> Lower bound the curvature H″(c) = 1/(c(1−c)) by some constant K.</p>
        <p><strong>4.</strong> Conclude P(deviation {'>'} ε) ≤ exp(−n · K · ε² / 2).</p>

        <p>The only thing that changes between Hoeffding and Okamoto is the choice of K.
        Hoeffding uses K = 4 (universal). Okamoto uses K = 1/(p(1−p)) (sharper, one-sided).</p>

        <p>If you ever need a concentration bound for bounded random variables, this is the template.
        The generalization to non-Bernoulli bounded variables (the full Hoeffding inequality for
        variables in [a, b]) replaces 1/4 with (b−a)²/4 — same idea, same proof structure.</p>
      </Box>

      <Box label="CONNECTIONS TO THE REST OF PS4" labelColor="#a8d4a0">
        <p><strong>→ Problem 3 (Boosting).</strong> Directly applies part (b). The majority vote of N runs
        of a (1/2 + δ)-correct algorithm is wrong when the Binomial(N, 1/2 + δ) count falls below N/2.
        That's a deviation of δN from the mean — plug into Hoeffding and solve for N.</p>

        <p><strong>→ Problem 4 (Max degree).</strong> Uses Chernoff on individual vertex degrees
        (each is Binomial(n−1, p)) combined with a union bound over all n vertices. The log n / log log n
        threshold comes from optimizing the Chernoff exponent against the union bound factor of n.</p>

        <p><strong>→ Problem 1 (Tail sum formula).</strong> That identity E[Y] = ∫ P(Y ≥ t) dt converts
        tail bounds into expectation bounds. Once you have Chernoff controlling P(Y ≥ t), you can
        integrate to get sharp bounds on E[Y] — a technique used throughout Weeks 7–8.</p>
      </Box>

      <Footer />

    </div>
  )
}
