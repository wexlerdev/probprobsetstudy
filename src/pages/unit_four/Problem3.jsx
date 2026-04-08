import { useEffect } from 'react'
import Toggle from '../../components/Toggle'
import Term from '../../components/Term'
import Callout from '../../components/Callout'
import Step from '../../components/Step'
import MathBlock from '../../components/MathBlock'
import Box from '../../components/Box'
import Footer from '../../components/Footer'
import BottomNav from '../../components/BottomNav'

export default function Problem3() {
  useEffect(() => {
    document.title = 'PS4 Problem 3 — Boosting Randomized Algorithms'
  }, [])

  return (
    <div className="container">

      {/* Header */}
      <div className="label">PROBLEM SET 4 · PROBLEM 3</div>
      <h1>Boosting Randomized Algorithms</h1>
      <p className="subtitle">
        You have an algorithm that's barely better than a coin flip. Run it many times, take majority vote,
        and the error probability drops exponentially. How many runs do you need?
      </p>

      {/* ============= SETUP ============= */}
      <div className="part-header">
        <h2>Setup — The Model</h2>
        <div className="part-goal">Understanding exactly what we have, what we want, and how to translate it into the language of Problem 2.</div>
      </div>

      <Step badge="SETUP" title="What we have">
        <p>We have a randomized algorithm for a
          <Term tooltip="A problem with a YES/NO answer. Examples: &quot;Is this number prime?&quot;, &quot;Does this graph have a Hamiltonian cycle?&quot;, &quot;Is this string in the language L?&quot; The algorithm outputs one bit: correct or incorrect.">decision problem</Term>.
          On any input, it returns the correct answer with probability 1/2 + δ for some fixed δ &gt; 0.
        </p>

        <Callout type="key">
          <p>The parameter δ is the <em>advantage</em> over random guessing. A fair coin gives you 1/2.
          This algorithm gives you 1/2 + δ — it's only a <em>little</em> better than useless.
          The question is: can you amplify a tiny advantage into an arbitrarily reliable algorithm?</p>
          <p>The answer is yes, and the cost is O(δ⁻² log(1/ε)) repetitions. This is one of the
          foundational results in
            <Term tooltip="BPP = Bounded-error Probabilistic Polynomial time. The class of decision problems solvable by a randomized algorithm that runs in polynomial time and has error probability ≤ 1/3 (or any constant < 1/2). Boosting shows the choice of 1/3 doesn't matter — any constant < 1/2 gives the same class, since you can amplify to any desired error ε with only O(log(1/ε)) overhead.">complexity theory (BPP)</Term>.
          </p>
        </Callout>
      </Step>

      <Step badge="SETUP" title="What we do">
        <p>Run the algorithm N times independently on the same input. Let Y<sub>i</sub> be the indicator
        that the i-th run gives the correct answer. Then:</p>
        <MathBlock>{`Y₁, Y₂, …, Y_N  are i.i.d. Bernoulli(1/2 + δ)

S_N = Y₁ + Y₂ + ⋯ + Y_N  =  number of correct answers`}</MathBlock>

        <p>We take the
          <Term tooltip='Output "correct" if more than half the runs agree, i.e., if S_N > N/2. If exactly N/2 agree (N even), break ties arbitrarily — this doesn&#39;t affect the asymptotic analysis.'>majority vote</Term>:
          output the answer that the majority of the N runs agree on.
        </p>

        <p>The majority vote is <strong>wrong</strong> when fewer than half the runs are correct:</p>
        <MathBlock>P(majority wrong) = P(S_N ≤ N/2)</MathBlock>

        <Callout type="intuition">
          <p>Each run is a slightly biased coin — heads (correct) with probability 1/2 + δ.
          The majority vote is wrong when the coin comes up tails more than half the time,
          <em>despite</em> being biased toward heads. We need to bound the probability that
          a Binomial(N, 1/2 + δ) variable falls below N/2.</p>
          <p>This is exactly a deviation from the mean — and that's exactly what Chernoff/Hoeffding controls.</p>
        </Callout>
      </Step>

      <Step badge="SETUP" title="What we want">
        <p>We want the majority vote to be correct with probability at least 1 − ε. Equivalently:</p>
        <MathBlock>P(majority wrong) = P(S_N ≤ N/2) ≤ ε</MathBlock>

        <p>We need to find how large N must be (as a function of δ and ε) to guarantee this.</p>

        <p>The problem asks us to show: <span className="math-inline">N = Ω(δ⁻² log(1/ε))</span> suffices.</p>

        <Toggle label="What does Ω(·) mean here?">
          <p><span className="math-inline">N = Ω(f(δ, ε))</span> means there exists a constant C &gt; 0 such that
          N ≥ C · f(δ, ε) is sufficient. We don't care about the exact constant — we care about
          the scaling: N scales like 1/δ² in the advantage and like log(1/ε) in the target error.
          The log(1/ε) scaling is remarkable — to go from ε = 0.1 to ε = 0.001, you only need
          to roughly triple N, not multiply by 100.</p>
        </Toggle>
      </Step>


      {/* ============= THE TRANSLATION ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>The Translation — Connecting to Problem 2</h2>
        <div className="part-goal">Rewriting the boosting question in the exact language of Hoeffding's inequality.</div>
      </div>

      <Step badge="1" title="Identify the parameters">
        <p>Let's match notation with Problem 2. We have:</p>
        <MathBlock>{`S_N = Y₁ + ⋯ + Y_N,     Yᵢ ~ Bernoulli(p),     p = 1/2 + δ

E[S_N] = Np = N(1/2 + δ)`}</MathBlock>

        <p>The majority vote is wrong when S_N ≤ N/2, which we rewrite as a <em>downward</em> deviation from the mean:</p>
        <MathBlock>{`S_N ≤ N/2
⟺  S_N − E[S_N] ≤ N/2 − N(1/2 + δ)
⟺  S_N − E[S_N] ≤ −Nδ
⟺  S_N − E[S_N] < −δN`}</MathBlock>

        <Callout type="key">
          <p>The majority fails when S_N drops below N/2. Since E[S_N] = N/2 + Nδ, this means
          S_N must deviate <em>downward</em> from its mean by at least Nδ. The advantage δ sets
          the "gap" between the mean and the failure threshold.</p>
          <p>In the notation of Problem 2(b): we need the deviation to exceed εN where ε = δ.</p>
        </Callout>
      </Step>


      {/* ============= THE PROOF ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>The Proof</h2>
        <div className="part-goal">Apply Hoeffding, then solve for N.</div>
      </div>

      <Step badge="2" title="Apply Hoeffding's inequality">
        <p>From Problem 2(b), for any ε &gt; 0 and a sum of N independent Bernoulli(p) variables:</p>
        <MathBlock>P(|S_N − E[S_N]| &gt; εN) ≤ 2 exp(−2ε²N)</MathBlock>

        <p>We only need the <strong>one-sided lower tail</strong>. Since P(S_N − E[S_N] &lt; −εN) ≤ P(|S_N − E[S_N]| &gt; εN),
        we have the cleaner bound:</p>
        <MathBlock>P(S_N − E[S_N] &lt; −εN) ≤ exp(−2ε²N)</MathBlock>

        <p>Setting ε = δ (the advantage is the deviation we need to survive):</p>
        <MathBlock>P(majority wrong) = P(S_N − E[S_N] &lt; −δN) ≤ exp(−2δ²N)</MathBlock>

        <Callout type="intuition">
          <p>The error probability decays <em>exponentially</em> in N. Each additional run of the
          algorithm multiplies the error probability by a constant factor exp(−2δ²) &lt; 1.
          This is why boosting is so powerful — linear investment in repetitions buys exponential
          improvement in reliability.</p>
        </Callout>

        <Toggle label="Why use the one-sided bound instead of the two-sided 2·exp(−2ε²N)?">
          <p>The factor of 2 in Hoeffding accounts for <em>both</em> tails — the probability of
          being too high or too low. But the majority vote only fails when S_N is too <em>low</em>.
          We don't care if S_N is larger than expected (that just means more correct answers).</p>
          <p>Dropping the factor of 2 gives a slightly tighter bound. Some presentations keep it
          and absorb the constant into the Ω(·) — either works for the asymptotic result.
          You can also use the one-sided Hoeffding directly: for the lower tail,
          P(S_N − E[S_N] &lt; −εN) ≤ exp(−2ε²N) without the factor of 2.</p>
        </Toggle>

        <Toggle label="Could we use Okamoto instead for a tighter bound?">
          <p>Yes! Since p = 1/2 + δ ≥ 1/2, Okamoto's part (ii) doesn't directly apply to the lower tail.
          But if δ is small, p ≈ 1/2, and p(1−p) ≈ 1/4, so Okamoto and Hoeffding nearly agree anyway.</p>
          <p>For the problem's purposes, Hoeffding is cleaner and sufficient. The Ω(·) notation
          absorbs constant factors, so the sharper Okamoto bound wouldn't change the asymptotic answer.</p>
        </Toggle>
      </Step>

      <Step badge="3" title="Solve for N">
        <p>We want <span className="math-inline">P(majority wrong) ≤ ε</span>. It suffices to have:</p>
        <MathBlock>exp(−2δ²N) ≤ ε</MathBlock>

        <p>Take the natural log of both sides (log is monotone increasing, inequality preserved):</p>
        <MathBlock>{`−2δ²N ≤ log(ε)
 2δ²N ≥ log(1/ε)        (multiply by −1, flip inequality)
     N ≥ log(1/ε) / (2δ²)`}</MathBlock>

        <p>Therefore:</p>
        <MathBlock>{`N ≥ (1/(2δ²)) · log(1/ε)     suffices.

Equivalently:  N = Ω(δ⁻² log(1/ε))     □`}</MathBlock>

        <Callout type="key">
          <p>The constant in the Ω is 1/(2δ²) from our application of Hoeffding. A different
          concentration inequality would give a different constant but the same scaling.
          The two things that matter:</p>
          <p><strong>1/δ² scaling:</strong> If your advantage halves (δ → δ/2), you need 4× as many runs.
          This is because the standard deviation of S_N scales like √N, so you need the mean gap
          δN to be a constant number of standard deviations away, which requires N ∝ 1/δ².</p>
          <p><strong>log(1/ε) scaling:</strong> Going from 99% confidence to 99.99% confidence only
          doubles N (roughly). Exponential tails make boosting cheap.</p>
        </Callout>
      </Step>


      {/* ============= UNPACKING THE SCALING ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>Unpacking the Scaling</h2>
        <div className="part-goal">Why δ⁻² and not δ⁻¹? Why log(1/ε) and not 1/ε? Building the right intuition.</div>
      </div>

      <Step badge="4" title="Why 1/δ² — the signal-to-noise argument">
        <p>Here's the deeper reason the scaling is quadratic in 1/δ, not linear.</p>

        <p>After N runs, we have:</p>
        <MathBlock>{`E[S_N] = N(1/2 + δ)         ← the "signal": mean is above N/2 by Nδ
 Std(S_N) = √(Np(1−p)) ≈ √(N/4) = √N/2    ← the "noise": fluctuation scale`}</MathBlock>

        <p>The majority vote fails when noise overwhelms signal:</p>
        <MathBlock>{`We need:  signal ≫ noise
           Nδ ≫ √N/2
           √N ≫ 1/(2δ)
           N ≫ 1/(4δ²)`}</MathBlock>

        <p>This is a
          <Term tooltip="SNR = signal / noise = Nδ / (√N/2) = 2δ√N. The majority vote succeeds reliably when SNR is large. Setting SNR ≥ c for some constant c gives N ≥ c²/(4δ²). The SNR grows like √N because the mean grows linearly but the standard deviation grows like √N — the mean wins eventually." wide>signal-to-noise ratio</Term>
          {' '}argument. The mean (signal) grows like N while the standard deviation (noise) grows like √N.
          The signal-to-noise ratio is Nδ / √N = δ√N, which grows with N — but you need it to be
          large enough, and that requires N ∝ 1/δ².
        </p>

        <Callout type="intuition">
          <p>Think of it physically. You're trying to detect a tiny bias δ in a coin by flipping it N times.
          The expected fraction of heads is 1/2 + δ, but the observed fraction fluctuates with
          standard deviation ≈ 1/(2√N). To reliably distinguish "biased" from "fair," you need
          the bias δ to be much larger than the fluctuation 1/√N. That gives N ≫ 1/δ².</p>
          <p>This is the same scaling that appears everywhere in statistics: sample sizes scale like
          1/(effect size)². Halving the effect you want to detect costs 4× the samples.</p>
        </Callout>
      </Step>

      <Step badge="5" title="Why log(1/ε) — the power of exponential tails">
        <p>Compare what you'd get from Chebyshev vs. Hoeffding:</p>
        <MathBlock>{`Chebyshev:  P(error) ≤ Var(S_N) / (Nδ)² = p(1−p)/(Nδ²) ≈ 1/(4Nδ²)
  → To get P(error) ≤ ε: need N = Ω(1/(εδ²))
  → Scaling in ε: 1/ε  (polynomial)

Hoeffding:  P(error) ≤ exp(−2δ²N)
  → To get P(error) ≤ ε: need N = Ω(log(1/ε)/δ²)
  → Scaling in ε: log(1/ε)  (logarithmic)`}</MathBlock>

        <Callout type="key">
          <p>Chebyshev would require N = O(1/(εδ²)) — if you want ε = 10⁻⁶, you need a million
          times more runs than for ε = 1. Hoeffding only needs N = O(log(10⁶)/δ²) ≈ 14/δ²
          additional runs.</p>
          <p>This is the whole reason Chernoff/Hoeffding bounds exist. Polynomial tail bounds (Chebyshev)
          give polynomial sample complexity. Exponential tail bounds (Hoeffding) give logarithmic
          sample complexity. The exponential tilt from Problem 2 is what buys this.</p>
        </Callout>

        <Toggle label="Concrete numbers to feel the difference">
          <p>Suppose δ = 0.05 (algorithm is 55% correct) and we want ε = 0.001 (99.9% reliable).</p>
          <MathBlock>{`Hoeffding:  N ≥ log(1000) / (2 · 0.05²)
            = 6.91 / 0.005
            ≈ 1382 runs

Chebyshev:  N ≥ 1 / (4 · 0.001 · 0.05²)
            = 1 / 0.00001
            = 100,000 runs`}</MathBlock>
          <p>Hoeffding needs ~1400 runs. Chebyshev needs ~100,000. That's a 70× difference,
          and it only gets worse as ε shrinks.</p>
        </Toggle>
      </Step>


      {/* ============= CONTEXT ============= */}
      <div className="separator"></div>

      <Box label="PROOF AT A GLANCE" labelColor="#7eb8da">
        <div className="proof-summary">
          <div className="comment">// Model</div>
          <div>Yᵢ ~ Bernoulli(1/2 + δ),  S_N = ΣYᵢ</div>
          <div>&nbsp;</div>
          <div className="comment">// Majority wrong ⟺ downward deviation of δN</div>
          <div>P(wrong) = P(S_N ≤ N/2) = P(S_N − E[S_N] ≤ −δN)</div>
          <div>&nbsp;</div>
          <div className="comment">// Apply Hoeffding (Problem 2b) with ε = δ</div>
          <div>≤ exp(−2δ²N)</div>
          <div>&nbsp;</div>
          <div className="comment">// Set ≤ ε, solve for N</div>
          <div>exp(−2δ²N) ≤ ε  ⟹  N ≥ log(1/ε) / (2δ²)</div>
          <div>&nbsp;</div>
          <div>∴  N = Ω(δ⁻² log(1/ε))     □</div>
        </div>
      </Box>

      <Box label="WHY VALETTAS ASSIGNED THIS" labelColor="#d4a574">
        <p><strong>1. It's the payoff for Problem 2.</strong> You just spent pages deriving Hoeffding's
        inequality — this problem shows you what it's <em>for</em>. The abstract bound exp(−2ε²n)
        directly translates into a concrete algorithmic guarantee. Theory → application in one step.</p>

        <p><strong>2. The scaling is the lesson, not the proof.</strong> The proof itself is three lines
        (apply Hoeffding, take logs, solve). The insight is understanding <em>why</em> the answer is
        δ⁻² log(1/ε) and not something else. The 1/δ² comes from signal-to-noise (fundamental, unavoidable).
        The log(1/ε) comes from exponential tails (the reward for using Hoeffding instead of Chebyshev).</p>

        <p><strong>3. It connects to Week 2.</strong> Remember the amplification trick from PIT
        (Polynomial Identity Testing) early in the course? That was the same idea: run a randomized
        test multiple times to boost confidence. Now you have the precise quantitative statement of
        how that boosting works.</p>

        <p><strong>4. It's a BPP theorem.</strong> This result implies that the complexity class BPP is robust:
        any error probability &lt; 1/2 can be amplified to any desired ε with only O(log(1/ε)) overhead.
        The definition of BPP uses error probability 1/3, but it wouldn't change if you used 0.499 or 0.01 —
        boosting makes them all equivalent up to polynomial factors.</p>
      </Box>

      <Box label="CONNECTIONS" labelColor="#a8d4a0">
        <p><strong>→ Problem 2(b).</strong> This is a direct application. The entire proof is
        "substitute into Hoeffding." If you can prove Hoeffding, you can prove boosting.</p>

        <p><strong>→ Problem 4 (Max degree).</strong> Both problems use Chernoff-type bounds, but in different ways.
        Boosting bounds a <em>single</em> sum's deviation. Problem 4 bounds the <em>maximum</em> of n sums
        using a union bound — you'll need P(any vertex exceeds degree k) ≤ Σ P(vertex v exceeds k) ≤ n · (Chernoff bound).
        That's why Problem 4 gets log n in the answer: the union bound over n vertices costs a factor of n in
        the probability, which translates to log n in the threshold.</p>

        <p><strong>→ Week 8 (Derandomization).</strong> Boosting is one half of the randomness story.
        The other half: can you <em>remove</em> the randomness entirely? The conditional expectation method
        (Week 9) shows that if a random algorithm achieves something in expectation, a deterministic
        algorithm can match it. Boosting + derandomization together say: randomness is a tool, not a necessity.</p>

        <p><strong>→ Week 15 (Statistical learning).</strong> The same 1/δ² log(1/ε) scaling shows up
        in sample complexity bounds for learning. To learn a concept to accuracy 1−ε with advantage δ
        over random guessing, you need O(δ⁻² log(1/ε)) samples. Same math, different interpretation.</p>
      </Box>

      <BottomNav />
      <Footer />

    </div>
  )
}
