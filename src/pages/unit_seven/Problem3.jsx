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

      <p className="part-label">Part (a). 0 ≤ H(X) ≤ log₂|S|.</p>

      <p>For each x ∈ S with p(x) := P(X = x) ∈ [0, 1], the term −p(x) log₂ p(x) is nonneg (with the convention 0 · log 0 = 0). Summing,</p>
      <Tex block>{String.raw`H(X) \;=\; \sum_{x \in S} -p(x) \log_{2} p(x) \;\ge\; 0.`}</Tex>

      <p>For the upper bound, rewrite H(X) as an expectation and apply Jensen's inequality to the concave function log₂:</p>
      <Tex block>{String.raw`H(X) \;=\; E\!\left[\log_{2}\!\frac{1}{p(X)}\right] \;\le\; \log_{2} E\!\left[\frac{1}{p(X)}\right] \;=\; \log_{2}\!\left(\sum_{x:\,p(x)>0} p(x)\cdot\frac{1}{p(x)}\right) \;=\; \log_{2}|\mathrm{supp}(X)| \;\le\; \log_{2}|S|.`}</Tex>

      <p className="part-label">Part (b). For any extraction function Ext : S → {'{'}0,1{'}'}*, E[|Ext(X)|] ≤ H(X).</p>

      <p>The defining property of an extraction function is that the output Ext(X) is uniform on its image, equivalently P(Ext(X) = y) = 2<sup>−|y|</sup> for each y in the image. Since {'{'}X = x{'}'} ⊆ {'{'}Ext(X) = Ext(x){'}'},</p>
      <Tex block>{String.raw`p(x) \;=\; P(X = x) \;\le\; P(Ext(X) = Ext(x)) \;=\; 2^{-|Ext(x)|}.`}</Tex>

      <p>Take −log₂ of both sides (preserves ≥):</p>
      <Tex block>{String.raw`-\log_{2} p(x) \;\ge\; |Ext(x)|.`}</Tex>

      <p>Multiply by p(x) ≥ 0 (preserves ≥) and sum over x ∈ S:</p>
      <Tex block>{String.raw`H(X) \;=\; \sum_{x} p(x)\cdot\bigl(-\log_{2} p(x)\bigr) \;\ge\; \sum_{x} p(x)\cdot |Ext(x)| \;=\; E\bigl[|Ext(X)|\bigr].`}</Tex>

      <p className="qed">∎</p>
    </div>
  )
}

export default function Problem3() {
  useEffect(() => {
    document.title = 'Final Exam Problem 3 — Entropy and Extraction'
  }, [])

  const { mode } = useDifficulty()

  return (
    <div className="container container-narrow">

      {/* Header */}
      <div className="label">FINAL EXAM · PROBLEM 3</div>
      <h1>Entropy Bounds and Extraction Functions</h1>
      <p className="subtitle">
        Two foundational entropy inequalities. (a) Entropy is bounded between 0 and log₂|S|, with equality at the right endpoint iff X is uniform. (b) For any extraction function from X, the average output length is at most H(X) — you can't extract more randomness than the source has.
      </p>

      <DifficultyDial modes={PROOF_MODES} />

      {mode === MODES.PROOF ? <FormalProof /> : (<>

      {/* ============= STEP 0: ORIENT ============= */}
      <Step
        badge="STEP 0"
        title="Orientation — entropy and extraction from the ground up"
        hint="Define H(X) and 'extraction function' carefully. (a) is Jensen on log. (b) is Kraft-style: a per-x inequality, then sum."
        decision="Both parts are short technically, but they sit on top of two definitions that are easy to misremember. Build them from scratch first."
      >
        <p>
          The{' '}
          <Term tooltip="The Shannon entropy of a discrete random variable X. With p(x) = P(X=x), H(X) = -sum_x p(x) log_2 p(x). Convention: 0·log 0 = 0 (justified by lim_{p→0+} p log p = 0). Units: bits.">entropy</Term>{' '}
          of a discrete random variable X taking values in a finite set S is
        </p>
        <MathBlock>H(X) = − &Sigma;<sub>x &isin; S</sub> p(x) log<sub>2</sub> p(x),     where p(x) = P(X = x).</MathBlock>
        <p>
          Convention: <strong>0 · log 0 = 0</strong> (justified by lim<sub>p→0⁺</sub> p log p = 0, so values with probability 0 contribute nothing).
        </p>

        <Callout type="intuition">
          What is entropy? Three equivalent ways to think about it:
          <br /><br />
          <strong>•</strong> The <em>average surprise</em>: the expected value of −log<sub>2</sub> p(X), where −log<sub>2</sub> p(x) is the "surprise" of seeing outcome x (rare ⇒ surprising).
          <br />
          <strong>•</strong> The <em>average bits to describe X</em>: how many yes/no questions you'd need on average to identify X.
          <br />
          <strong>•</strong> The <em>fundamental limit on lossless compression</em>: Shannon's source coding theorem.
          <br /><br />
          For a uniform distribution on |S| outcomes, H = log<sub>2</sub>|S|. For a deterministic distribution (one outcome), H = 0. The bounds in (a) say these are the extremes.
        </Callout>

        <p>An{' '}
          <Term tooltip="An extraction function Ext: S → {0,1}* maps each value of X to a binary string, with the goal that Ext(X) be uniform on its image. The defining property: P(Ext(X) = y) = 2^(-|y|) for each y in the image. The point is to extract uniform random bits from a non-uniform source X.">extraction function</Term>{' '}
          is a map Ext: S → {'{'}0,1{'}'}* that takes each value of X to a binary string. The point of an extraction function is to <em>extract uniform random bits</em> from a possibly-biased source X. The defining property:
        </p>
        <Callout type="key">
          For each y in the image of Ext, P(Ext(X) = y) = 2<sup>−|y|</sup>.
          <br /><br />
          Equivalently: the output Ext(X) is uniform on {'{'}0,1{'}'}<sup>|y|</sup> conditional on each output length. This is what "extracts randomness" means.
        </Callout>

        <p>
          Why study extraction? In cryptography you have a biased source of randomness (radio noise, mouse movements) and want clean uniform bits. The function Ext does the cleaning. The question is: <em>how many bits can you extract on average?</em> Part (b) says the answer is at most H(X) — you can't manufacture randomness, only refine it.
        </p>

        <Callout type="warning">
          Don't confuse extraction with compression. <em>Compression</em> codes (Huffman, Shannon-Fano) satisfy E[|Code(X)|] ≥ H(X) — the inequality goes the other way. Compression maps the source to a string we can <em>decode</em> back; extraction maps the source to a string that <em>looks random</em>. Different goals, opposite-direction inequalities, both with H(X) as the boundary.
        </Callout>

        <p>The two parts:</p>
        <Callout type="intuition">
          <strong>(a)</strong> Jensen's inequality on log<sub>2</sub> (concave) gives the upper bound H(X) ≤ log<sub>2</sub>|S|. The lower bound H(X) ≥ 0 is term-by-term.
          <br /><br />
          <strong>(b)</strong> The defining property gives a per-x inequality p(x) ≤ 2<sup>−|Ext(x)|</sup>. Take −log, multiply by p(x), sum.
        </Callout>
      </Step>

      {/* ============= PART (a) ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>Part (a) — 0 ≤ H(X) ≤ log₂|S|</h2>
        <div className="part-goal">
          Lower bound: each term in the sum is ≥ 0 (with the 0·log 0 convention). Upper bound: rewrite as E[log(1/p(X))] and apply Jensen on the concave log.
        </div>
      </div>

      <Step
        badge="A.1"
        title="Lower bound: H(X) ≥ 0 term-by-term"
        hint="For p ∈ (0,1], log₂ p ≤ 0, so −p log₂ p ≥ 0. With 0·log 0 = 0, sum is ≥ 0."
        decision="The lower bound is immediate from the sign of each summand."
      >
        <p>For each x ∈ S, p(x) ∈ [0, 1]. There are two cases:</p>

        <ul>
          <li><strong>p(x) = 0:</strong> term is 0 · log 0 = 0 by convention.</li>
          <li><strong>p(x) ∈ (0, 1]:</strong> log<sub>2</sub> p(x) ≤ 0 (since log of a number in (0,1] is non-positive). So −p(x) log<sub>2</sub> p(x) ≥ 0.</li>
        </ul>

        <p>Sum of non-negatives is non-negative:</p>
        <MathBlock>H(X) = − &Sigma;<sub>x &isin; S</sub> p(x) log<sub>2</sub> p(x) ≥ 0.</MathBlock>

        <Callout type="intuition">
          Each term −p(x) log<sub>2</sub> p(x) measures the contribution of outcome x to total surprise. It's max'd at p ≈ 1/e ≈ 0.368, giving a single term value of (log<sub>2</sub> e)/e ≈ 0.531 bits.
        </Callout>

        <Toggle label="Why is 0·log 0 = 0 the right convention?">
          Take the limit: lim<sub>p→0⁺</sub> p log p. By L'Hôpital (or the substitution p = e<sup>−t</sup>): lim<sub>t→∞</sub> e<sup>−t</sup> · (−t) = 0. So the convention is just continuity. Without it, an outcome of probability 0 would contribute "0 · ∞" of indeterminate value.
        </Toggle>
      </Step>

      <Step
        badge="A.2"
        title="Upper bound: rewrite H(X) as an expectation"
        hint="H(X) = −E[log p(X)] = E[log(1/p(X))]. Now it's an expectation of log of a positive random variable — set up for Jensen."
        decision="Jensen needs an expectation of a function of a random variable. Rewrite H so log is on the outside."
      >
        <p>Note that</p>
        <MathBlock>H(X) = − &Sigma;<sub>x</sub> p(x) log<sub>2</sub> p(x) = &Sigma;<sub>x</sub> p(x) · log<sub>2</sub>(1/p(x)) = E[log<sub>2</sub>(1/p(X))]</MathBlock>
        <p>where in the last step we recognize the sum as an expectation (sum over x ∈ S of p(x) times a function of x = expected value of that function applied to X).</p>

        <Callout type="key">
          The trick is to make 1/p(X) — a positive random variable — the argument of log<sub>2</sub>. Then we have E[log<sub>2</sub>(positive r.v.)], which is the perfect setup for Jensen on the concave function log<sub>2</sub>.
        </Callout>
      </Step>

      <Step
        badge="A.3"
        title="Apply Jensen's inequality on log₂ (concave)"
        hint="Jensen for concave: E[f(Y)] ≤ f(E[Y]). Apply with f = log₂ and Y = 1/p(X)."
        decision="Jensen's inequality is the standard tool for moving an expectation through a concave/convex function. Log is concave."
      >
        <p>Recall:</p>
        <Callout type="connection">
          <strong>Jensen's inequality (for concave f).</strong> If f is concave and Y is a random variable with finite expectation, then
          <MathBlock>E[f(Y)] &le; f(E[Y]).</MathBlock>
          (For convex f, the inequality reverses.)
        </Callout>

        <Toggle label="Why is log₂ concave?">
          The second derivative of log<sub>2</sub>(y) = (ln y)/(ln 2) is −1/(y² ln 2), which is negative for y &gt; 0. Negative second derivative ⇒ concave. Geometrically, log lies below its tangent line at every point.
        </Toggle>

        <p>Apply Jensen with f = log<sub>2</sub> and Y = 1/p(X):</p>
        <MathBlock>H(X) = E[log<sub>2</sub>(1/p(X))] ≤ log<sub>2</sub>(E[1/p(X)])</MathBlock>

        <p>Now compute the inner expectation:</p>
        <MathBlock>E[1/p(X)] = &Sigma;<sub>x: p(x) &gt; 0</sub> p(x) · (1/p(x)) = &Sigma;<sub>x: p(x) &gt; 0</sub> 1 = |supp(X)|</MathBlock>
        <p>where supp(X) = {'{'}x ∈ S : p(x) &gt; 0{'}'} is the <em>support</em> of X. Since supp(X) ⊆ S:</p>
        <MathBlock>E[1/p(X)] = |supp(X)| ≤ |S|.</MathBlock>

        <p>Substituting back:</p>
        <Callout type="key">
          H(X) ≤ log<sub>2</sub>(|supp(X)|) ≤ log<sub>2</sub>|S|.   ✓
        </Callout>

        <Toggle label="When is the upper bound tight?">
          H(X) = log<sub>2</sub>|S| iff (i) supp(X) = S (every outcome has positive probability) AND (ii) Jensen's inequality is an equality. Jensen is tight on log iff 1/p(X) is constant a.s., i.e. p(x) is constant on supp(X). Combined: X is <strong>uniform on S</strong>. So entropy is maximized exactly by the uniform distribution — consistent with intuition that "uniform = most random."
        </Toggle>
      </Step>

      {/* ============= PART (b) ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>Part (b) — E[|Ext(X)|] ≤ H(X) for any extraction function</h2>
        <div className="part-goal">
          The hint gives a per-x inequality p(x) ≤ 2<sup>−|Ext(x)|</sup>. Take −log<sub>2</sub>; multiply by p(x); sum.
        </div>
      </div>

      <Step
        badge="B.1"
        title="The hint inequality: p(x) ≤ 2^(−|Ext(x)|)"
        badgeClass="step-badge-b"
        hint="Defining property of extraction: P(Ext(X) = y) = 2^(−|y|) on the image. Since {X = x} ⊆ {Ext(X) = Ext(x)}, p(x) ≤ 2^(−|Ext(x)|)."
        decision="This is the bridge between the source distribution p and the code length |Ext(x)|. It comes directly from the definition of an extraction function."
      >
        <p>The hint says: <strong>P(X = x) ≤ 2<sup>−|Ext(x)|</sup></strong> for all x ∈ S. Why does this hold?</p>

        <p>The defining property of an extraction function is that for each output string y in the image of Ext, P(Ext(X) = y) = 2<sup>−|y|</sup>. Now, the event {'{'}X = x{'}'} is contained in the event {'{'}Ext(X) = Ext(x){'}'} (because if X = x then Ext(X) = Ext(x) deterministically). So:</p>

        <MathBlock>p(x) = P(X = x) ≤ P(Ext(X) = Ext(x)) = 2<sup>−|Ext(x)|</sup></MathBlock>

        <Callout type="key">
          This per-x inequality is the entire technical content of (b). The rest is algebra: take logs, multiply, sum.
        </Callout>

        <Toggle label="Why is the defining property P(Ext(X) = y) = 2^(−|y|)?">
          For Ext(X) to be a "good" extraction — uniform random bits — it must be the case that conditional on the output length being ℓ, every length-ℓ string is equally likely. There are 2<sup>ℓ</sup> length-ℓ strings, so each gets probability 2<sup>−ℓ</sup> conditional on length ℓ. The unconditional version P(Ext(X) = y) = 2<sup>−|y|</sup> packages this together. Different sources (Valettas's class definition vs textbooks like Vadhan's <em>Pseudorandomness</em>) phrase it slightly differently, but the operational content is the inequality the hint tells us to use.
        </Toggle>

        <Callout type="warning">
          Be careful with the direction. p(x) ≤ 2<sup>−|Ext(x)|</sup> means short codes go to high-probability outcomes (since high p ⇒ small −log p ⇒ small |Ext|). This is the same direction as Huffman coding — but the inequality is opposite, since for compression we'd have P(Code(X) = y) ≥ something rather than ≤.
        </Callout>
      </Step>

      <Step
        badge="B.2"
        title="Take −log₂ of both sides"
        badgeClass="step-badge-b"
        hint="−log₂ is decreasing, so p(x) ≤ 2^(−|Ext(x)|) ⇒ −log₂ p(x) ≥ |Ext(x)|."
        decision="To turn p(x) into the entropy ingredient −log₂ p(x), take −log₂. Note the direction flip is built into the −."
      >
        <p>Apply −log<sub>2</sub> to both sides of p(x) ≤ 2<sup>−|Ext(x)|</sup>. The function −log<sub>2</sub> is decreasing, so the inequality direction would flip, but the negative on both sides handles it:</p>

        <MathBlock>p(x) ≤ 2<sup>−|Ext(x)|</sup>  ⟹  log<sub>2</sub> p(x) ≤ −|Ext(x)|  ⟹  −log<sub>2</sub> p(x) ≥ |Ext(x)|</MathBlock>

        <Toggle label="Step-by-step on the inequality manipulation">
          Start: p(x) ≤ 2<sup>−|Ext(x)|</sup>. Take log<sub>2</sub> of both sides (log<sub>2</sub> is increasing, preserves direction): log<sub>2</sub> p(x) ≤ log<sub>2</sub>(2<sup>−|Ext(x)|</sup>) = −|Ext(x)|. Multiply by −1 (flips direction): −log<sub>2</sub> p(x) ≥ |Ext(x)|. ✓
        </Toggle>
      </Step>

      <Step
        badge="B.3"
        title="Multiply by p(x) ≥ 0 and sum"
        badgeClass="step-badge-b"
        hint="Multiply by p(x) (preserves ≥ since p(x) ≥ 0). Sum over x: LHS = H(X), RHS = E[|Ext(X)|]."
        decision="To turn the per-x inequality into an entropy/expectation inequality, weight by p(x) and sum."
      >
        <p>Multiply both sides of −log<sub>2</sub> p(x) ≥ |Ext(x)| by p(x). Since p(x) ≥ 0, the inequality direction is preserved:</p>

        <MathBlock>p(x) · (−log<sub>2</sub> p(x)) ≥ p(x) · |Ext(x)|</MathBlock>

        <p>Now sum over all x ∈ S:</p>

        <MathBlock>&Sigma;<sub>x</sub> p(x) · (−log<sub>2</sub> p(x)) ≥ &Sigma;<sub>x</sub> p(x) · |Ext(x)|</MathBlock>

        <p>Recognize both sides:</p>
        <ul>
          <li><strong>LHS</strong> = −Σ p(x) log<sub>2</sub> p(x) = <strong>H(X)</strong>, by definition.</li>
          <li><strong>RHS</strong> = Σ p(x) · |Ext(x)| = E[|Ext(X)|], the expected output length.</li>
        </ul>

        <Callout type="key">
          H(X) ≥ E[|Ext(X)|], i.e. <strong>E[|Ext(X)|] ≤ H(X)</strong>.   ✓
        </Callout>

        <Callout type="intuition">
          The inequality is sharp: there exist near-optimal extraction functions for which E[|Ext(X)|] is close to H(X). So entropy is exactly the supremum of extractable bits — a fundamental information-theoretic identity.
        </Callout>
      </Step>

      {/* ============= CLOSING BOXES ============= */}
      <div className="separator"></div>

      <Box label="PROOF AT A GLANCE" labelColor="#7eb8da">
        <div className="proof-summary">
          <div className="comment">// (a) Lower bound: term-by-term</div>
          <div>p(x) ∈ [0,1] ⇒ −p(x) log<sub>2</sub> p(x) ≥ 0 ⇒ H(X) = Σ ≥ 0</div>
          <br />
          <div className="comment">// (a) Upper bound: rewrite + Jensen on concave log</div>
          <div>H(X) = E[log<sub>2</sub>(1/p(X))] ≤ log<sub>2</sub> E[1/p(X)] = log<sub>2</sub>|supp(X)| ≤ log<sub>2</sub>|S|</div>
          <br />
          <div className="comment">// (b) Per-x inequality from extraction property</div>
          <div>p(x) = P(X=x) ≤ P(Ext(X) = Ext(x)) = 2<sup>−|Ext(x)|</sup></div>
          <div>⇒ −log<sub>2</sub> p(x) ≥ |Ext(x)|</div>
          <div>Multiply by p(x), sum: H(X) ≥ Σ p(x)·|Ext(x)| = E[|Ext(X)|]   □</div>
        </div>
      </Box>

      <Box label="WHY THIS MATTERS" labelColor="#d4a574">
        <p><strong>1. Entropy as the right scale of randomness.</strong>{' '}
        Both bounds in this problem characterize entropy by where it sits in inequalities. The upper bound H ≤ log<sub>2</sub>|S| says entropy is at most "naive log of state space." The extraction bound says entropy is at most "best extractable randomness." Both are sharp.</p>

        <p><strong>2. Jensen + concavity of log: a workhorse pattern.</strong>{' '}
        The exact same Jensen-on-log argument proves:
        the AM-GM inequality, the Gibbs inequality (relative entropy ≥ 0), the data processing inequality, and many more. Recognize the pattern E[log Y] ≤ log E[Y] and the proofs unify.</p>

        <p><strong>3. The two faces of the entropy boundary.</strong>{' '}
        For lossless compression: E[|Code(X)|] ≥ H(X) — you can't compress below entropy.
        For randomness extraction: E[|Ext(X)|] ≤ H(X) — you can't extract more than entropy.
        Same H(X) as the dividing line, opposite-direction inequalities. Together they say: entropy is the unique resource cost.</p>

        <p><strong>4. Cryptography and randomness.</strong>{' '}
        Real RNGs (radio noise, ring oscillators, biased physical sources) need extraction to produce uniform bits. Part (b) tells you the budget: at most H(source) bits of clean randomness per sample. Modern extractors (Trevisan, Raz–Reingold–Vadhan) approach this bound efficiently with explicit constructions.</p>
      </Box>

      <Box label="CONNECTIONS" labelColor="#a8d4a0">
        <p>
          <strong>↔ Shannon's source coding theorem.</strong> The compression-side inequality E[|Code(X)|] ≥ H(X) (for prefix-free codes) is the mirror of (b). Both are proved by the same Kraft-style algebra applied with opposite-direction inequalities.
        </p>
        <p>
          <strong>→ Von Neumann's coin extraction.</strong> A biased coin with bias p has entropy h(p) = −p log p − (1−p) log(1−p). Von Neumann's trick (toss in pairs, output 0 for HT and 1 for TH, discard HH and TT) extracts about p(1−p) bits per toss — far below h(p). Better extractors approach h(p), per (b).
        </p>
        <p>
          <strong>→ Pseudorandomness and computational extractors.</strong> When the source is structured (e.g., k-source min-entropy), explicit extractors yield uniform-looking bits with near-optimal length. The information-theoretic bound (b) is the target.
        </p>
        <p>
          <strong>→ Asymptotic equipartition (AEP).</strong> For n iid copies of X, the typical realization has probability ≈ 2<sup>−nH(X)</sup>, so there are ≈ 2<sup>nH(X)</sup> typical sequences — exactly the "log<sub>2</sub>|S| with S replaced by typical set" picture from (a).
        </p>
      </Box>

      <Footer />
      </>)}
    </div>
  )
}
