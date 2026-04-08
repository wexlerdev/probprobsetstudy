import { useEffect } from 'react'
import DifficultyDial from '../../components/DifficultyDial'
import Toggle from '../../components/Toggle'
import Term from '../../components/Term'
import Callout from '../../components/Callout'
import Step from '../../components/Step'
import MathBlock from '../../components/MathBlock'
import Box from '../../components/Box'
import Footer from '../../components/Footer'

export default function Problem4() {
  useEffect(() => {
    document.title = 'PS5 Problem 4 — Lower Bound on P(Sₙ > 0)'
  }, [])

  return (
    <div className="container container-narrow">

      {/* Header */}
      <div className="label">PROBLEM SET 5 · PROBLEM 4</div>
      <h1>A Lower Bound on P(S<sub>n</sub> {'>'} 0)</h1>
      <p className="subtitle">
        Proving that for 0-1 random variables (not necessarily independent) with S<sub>n</sub> = X<sub>1</sub> + ... + X<sub>n</sub>:
      </p>
      <MathBlock>
        P(S<sub>n</sub> {'>'} 0) ≥ Σ<sub>i=1</sub><sup>n</sup> E[X<sub>i</sub>] / E[S<sub>n</sub> | X<sub>i</sub> = 1]
      </MathBlock>

      <DifficultyDial />

      {/* STEP 0: Orientation */}
      <Step
        badge="STEP 0"
        title="What is this inequality actually saying?"
        hint="The RHS is a sum of ratios — each term measures how much Xi contributes relative to the conditional total."
        decision="Before proving anything, understand the statement. What does each side mean? When would you use this?"
      >
        <p>Let's unpack the pieces. We have <span className="math-inline">X<sub>1</sub>, ..., X<sub>n</sub></span> —
          these are{' '}
          <Term tooltip="Random variables that only take values 0 or 1. Also called Bernoulli random variables. Crucially, this problem does NOT assume they are independent — they can have arbitrary correlations.">0-1 random variables</Term>
          {' '}(indicators), but we make <strong>no independence assumption</strong>. Their sum{' '}
          <span className="math-inline">S<sub>n</sub> = X<sub>1</sub> + ... + X<sub>n</sub></span>{' '}
          counts how many of the X<sub>i</sub>'s are "on."
        </p>

        <p>The left side, <span className="math-inline">P(S<sub>n</sub> {'>'} 0)</span>, is the probability
          that <em>at least one</em> X<sub>i</sub> equals 1. The right side is a sum of terms{' '}
          <span className="math-inline">E[X<sub>i</sub>] / E[S<sub>n</sub> | X<sub>i</sub> = 1]</span>.
          Each term asks: what is the probability that X<sub>i</sub> is on, divided by the expected total count
          <em>given that X<sub>i</sub> is on</em>?
        </p>

        <Callout type="intuition">
          <p>Think of each X<sub>i</sub> as an "event happening." The question is: what's the chance
          that <em>something</em> happens? If the events were independent, you'd use inclusion-exclusion
          or a union bound. But they're not independent — they could be positively correlated, negatively correlated,
          anything.</p>
          <p>This inequality says: even without independence, you can get a lower bound by looking at each
          event's contribution weighted by "how crowded things are when this event fires." If{' '}
          <span className="math-inline">E[S<sub>n</sub> | X<sub>i</sub> = 1]</span> is large, it means
          when X<sub>i</sub> is on, lots of other things tend to be on too — so X<sub>i</sub> gives less
          "unique" information about S<sub>n</sub> {'>'} 0, and its term in the bound is smaller.</p>
        </Callout>

        <Toggle label="When is this useful in practice?">
          <p>This inequality is a cornerstone of the{' '}
            <Term tooltip="A method for proving that a random variable is positive with decent probability. The 'second moment method' gives P(X > 0) >= E[X]^2 / E[X^2]. This problem's inequality is a refinement that can give tighter bounds when the Xi's have different conditional expectations.">second moment method</Term>.
            {' '}It shows up whenever you need to prove that at least one of many (possibly dependent)
            events occurs. Classic applications: existence of combinatorial structures in random graphs,
            satisfying assignments in random SAT, and as a building block toward the{' '}
            <Term tooltip="A powerful result that gives conditions under which, roughly, 'bad events' can all be simultaneously avoided. It requires that the events have 'limited dependence.' The inequality in this problem is a key ingredient in understanding the probabilistic toolbox that leads to the LLL.">Lovasz Local Lemma</Term>.
          </p>
        </Toggle>
      </Step>

      {/* STEP 1: Define Y */}
      <Step
        badge="STEP 1"
        title="Define the auxiliary random variable Y"
        hint="Y = 1/Sn when Sn > 0, and 0 otherwise. This is the hint Valettas gives."
        decision="The RHS has terms like E[Xi]/E[Sn | Xi=1] — these involve 1/Sn. We need a random variable that 'carries' the 1/Sn factor and distributes across the Xi's. The hint suggests Y = 1/Sn on {Sn > 0}."
      >
        <p>This is the creative step. Define:</p>
        <MathBlock>
          Y = (1/S<sub>n</sub>) · 𝟙{'{'}S<sub>n</sub> {'>'} 0{'}'}
        </MathBlock>

        <p>In words: Y equals <span className="math-inline">1/S<sub>n</sub></span> when at least one X<sub>i</sub> is on, and
          Y = 0 when all X<sub>i</sub>'s are 0. This is well-defined because we only divide by S<sub>n</sub> when S<sub>n</sub> ≥ 1.</p>

        <Callout type="key">
          <p>Where does this come from? Look at the right side of what we want to prove — it involves{' '}
            <span className="math-inline">1/E[S<sub>n</sub> | X<sub>i</sub> = 1]</span>. That's a reciprocal
            of a conditional expectation of S<sub>n</sub>. To get a reciprocal of S<sub>n</sub> into the picture,
            we need a random variable involving 1/S<sub>n</sub>. And we need it to interact with the{' '}
            <Term tooltip="A random variable that equals 1 when a condition holds and 0 otherwise. Written as 𝟙{A} or 1_A. Here, 𝟙{Sn > 0} is 1 when at least one Xi is on.">indicator</Term>
            {' '}𝟙{'{'}S<sub>n</sub> {'>'} 0{'}'}, since that's the probability we want on the left side.</p>
          <p>The definition of Y is engineered so that Y · S<sub>n</sub> collapses into exactly that indicator.
            That's the engine of the proof.</p>
        </Callout>
      </Step>

      {/* STEP 2: Y · Sn = indicator */}
      <Step
        badge="STEP 2"
        title="The key identity: Y · Sₙ = 𝟙{Sₙ > 0}"
        hint="Multiply Y by Sn and simplify — the 1/Sn cancels."
        decision="We defined Y to make this product collapse. This connects P(Sn > 0) to expectations involving Y."
      >
        <p>Compute the product Y · S<sub>n</sub>:</p>
        <MathBlock>
          Y · S<sub>n</sub> = (1/S<sub>n</sub>) · 𝟙{'{'}S<sub>n</sub> {'>'} 0{'}'} · S<sub>n</sub> = 𝟙{'{'}S<sub>n</sub> {'>'} 0{'}'}
        </MathBlock>

        <p>When S<sub>n</sub> {'>'} 0, we get (1/S<sub>n</sub>) · S<sub>n</sub> = 1, which matches the indicator being 1.
          When S<sub>n</sub> = 0, we get 0 · 0 = 0, which matches the indicator being 0.</p>

        <p>Taking expectations:</p>
        <MathBlock>
          E[Y · S<sub>n</sub>] = E[𝟙{'{'}S<sub>n</sub> {'>'} 0{'}'}] = P(S<sub>n</sub> {'>'} 0)
        </MathBlock>

        <Callout type="intuition">
          <p>This is the same trick as PS4 Problem 1, where writing a number as an integral of an indicator
            was "the engine." Here, writing P(S<sub>n</sub> {'>'} 0) as E[Y · S<sub>n</sub>] is the engine —
            it lets us expand S<sub>n</sub> into its pieces and analyze each one separately.</p>
        </Callout>
      </Step>

      {/* STEP 3: Expand Sn */}
      <Step
        badge="STEP 3"
        title="Expand Sₙ = Σ Xᵢ and distribute"
        hint="Replace Sn by Σ Xi in Y · Sn, then swap the sum and expectation."
        decision="We have P(Sn > 0) = E[Y · Sn]. Now expand Sn to get a sum of terms we can analyze individually."
      >
        <p>Since S<sub>n</sub> = X<sub>1</sub> + ... + X<sub>n</sub>, we can write:</p>
        <MathBlock>
          Y · S<sub>n</sub> = Y · Σ<sub>i=1</sub><sup>n</sup> X<sub>i</sub> = Σ<sub>i=1</sub><sup>n</sup> Y · X<sub>i</sub>
        </MathBlock>

        <p>Taking expectations (linearity — no independence needed):</p>
        <MathBlock>
          P(S<sub>n</sub> {'>'} 0) = E[Y · S<sub>n</sub>] = Σ<sub>i=1</sub><sup>n</sup> E[Y · X<sub>i</sub>]
        </MathBlock>

        <p>We've decomposed the probability into n terms, one per variable. Now we need to analyze each
          term E[Y · X<sub>i</sub>].</p>
      </Step>

      {/* STEP 4: Analyze each term */}
      <Step
        badge="STEP 4"
        title="Compute E[Y · Xᵢ] via conditioning on Xᵢ"
        hint="Split into cases: when Xi = 0, the term vanishes. When Xi = 1, Sn ≥ 1 so Y = 1/Sn."
        decision="Each term E[Y · Xi] involves both Y and Xi. Since Xi is 0-1, conditioning on its value is the natural move — it separates the two cases cleanly."
      >
        <p>Since X<sub>i</sub> is a 0-1 variable, we split into two cases:</p>

        <p><strong>Case X<sub>i</sub> = 0:</strong> The product Y · X<sub>i</sub> = Y · 0 = 0. This case contributes nothing.</p>

        <p><strong>Case X<sub>i</sub> = 1:</strong> When X<sub>i</sub> = 1, we know S<sub>n</sub> ≥ 1 {'>'} 0 (since S<sub>n</sub> includes X<sub>i</sub>).
          So Y = 1/S<sub>n</sub>, and the product is Y · X<sub>i</sub> = 1/S<sub>n</sub>.</p>

        <p>Therefore, using the{' '}
          <Term tooltip="E[Z] = E[Z | A] · P(A) + E[Z | A^c] · P(A^c). For a 0-1 variable Xi: E[f(Xi)] = E[f(Xi) | Xi=1] · P(Xi=1) + E[f(Xi) | Xi=0] · P(Xi=0). This is just the law of total expectation applied to the partition {Xi=1, Xi=0}.">law of total expectation</Term>:
        </p>
        <MathBlock>
          {'E[Y · X_i] = E[Y · X_i | X_i = 1] · P(X_i = 1) + E[Y · X_i | X_i = 0] · P(X_i = 0)'}
        </MathBlock>
        <MathBlock>
          {'= E[1/S_n | X_i = 1] · P(X_i = 1) + 0'}
        </MathBlock>
        <MathBlock>
          {'= E[X_i] · E[1/S_n | X_i = 1]'}
        </MathBlock>

        <p>(The last line uses P(X<sub>i</sub> = 1) = E[X<sub>i</sub>] since X<sub>i</sub> is 0-1.)</p>

        <Callout type="warning">
          <p>Notice we used the fact that when X<sub>i</sub> = 1, S<sub>n</sub> is guaranteed to be positive.
            This is essential — without it, 1/S<sub>n</sub> wouldn't be defined. The observation is simple
            but load-bearing: S<sub>n</sub> = X<sub>1</sub> + ... + X<sub>n</sub> ≥ X<sub>i</sub> = 1.</p>
        </Callout>
      </Step>

      {/* STEP 5: Jensen */}
      <Step
        badge="STEP 5"
        title="Apply Jensen's inequality"
        hint="1/x is convex, so E[1/Sn | Xi=1] ≥ 1/E[Sn | Xi=1]."
        decision="We have E[1/Sn | Xi=1] but we want 1/E[Sn | Xi=1] (which is what appears in the target bound). The function 1/x is convex, so Jensen gives the right direction."
      >
        <p>Substituting Step 4 into the sum from Step 3:</p>
        <MathBlock>
          P(S<sub>n</sub> {'>'} 0) = Σ<sub>i=1</sub><sup>n</sup> E[X<sub>i</sub>] · E[1/S<sub>n</sub> | X<sub>i</sub> = 1]
        </MathBlock>

        <p>Now we apply{' '}
          <Term tooltip="For a convex function f and a random variable Z: E[f(Z)] ≥ f(E[Z]). The inequality flips for concave functions. Jensen's inequality is one of the most fundamental tools in probability — it connects expectations of transformed variables to transformations of expectations.">Jensen's inequality</Term>
          {' '}to each term. The function f(x) = 1/x is{' '}
          <Term tooltip="A function f is convex on an interval I if f(λx + (1-λ)y) ≤ λf(x) + (1-λ)f(y) for all x, y in I and λ in [0,1]. Equivalently, f''(x) ≥ 0 on I. For f(x) = 1/x on (0, ∞): f''(x) = 2/x³ > 0, so it's convex.">convex</Term>
          {' '}on (0, ∞). Since S<sub>n</sub> ≥ 1 {'>'} 0 when X<sub>i</sub> = 1, we are applying Jensen in the valid range:</p>
        <MathBlock>
          E[1/S<sub>n</sub> | X<sub>i</sub> = 1] ≥ 1/E[S<sub>n</sub> | X<sub>i</sub> = 1]
        </MathBlock>

        <p>This is Jensen applied to the{' '}
          <Term tooltip="The conditional expectation E[Z | A] is itself a valid expectation — it's the expectation of Z under the conditional probability measure P(· | A). Jensen's inequality applies to any expectation, including conditional ones. So E[f(Z) | A] ≥ f(E[Z | A]) whenever f is convex.">conditional expectation</Term>
          {' '}<span className="math-inline">E[· | X<sub>i</sub> = 1]</span>, which is a perfectly valid expectation operator
          (with respect to the conditional probability measure).</p>

        <Toggle label="Why is 1/x convex?">
          <p>For f(x) = 1/x on (0, ∞): f'(x) = -1/x² and f''(x) = 2/x³ {'>'} 0 for all x {'>'} 0.
            Since the second derivative is positive everywhere on the domain, f is convex.</p>
          <p>Geometrically: the graph of 1/x curves upward. A secant line between any two points lies
            above the curve. That's exactly what convexity means, and it's what Jensen exploits —
            the "average of 1/x" is at least "1/(average of x)."</p>
        </Toggle>
      </Step>

      {/* STEP 6: Combine */}
      <Step
        badge="STEP 6"
        title="Combine everything"
        hint="Chain the equality from Steps 3-4 with the Jensen bound from Step 5."
        decision="We have an exact expression and a one-sided bound. Combining them gives the target inequality."
      >
        <p>Putting Steps 3, 4, and 5 together:</p>
        <MathBlock>
          P(S<sub>n</sub> {'>'} 0) = Σ<sub>i=1</sub><sup>n</sup> E[X<sub>i</sub>] · E[1/S<sub>n</sub> | X<sub>i</sub> = 1]
          {' '}≥ Σ<sub>i=1</sub><sup>n</sup> E[X<sub>i</sub>] / E[S<sub>n</sub> | X<sub>i</sub> = 1]
        </MathBlock>

        <p>which is exactly what we wanted to prove. <strong>QED.</strong></p>

        <Callout type="key">
          <p>Notice what we never assumed: independence. The X<sub>i</sub>'s can be arbitrarily correlated.
            The only properties we used were: (1) each X<sub>i</sub> is 0-1, (2) the definition of conditional expectation,
            and (3) Jensen's inequality for convex functions. That's it.</p>
        </Callout>

        <Toggle label="What happens when the Xᵢ's are independent?">
          <p>When the X<sub>i</sub>'s are independent with P(X<sub>i</sub> = 1) = p<sub>i</sub>, then
            S<sub>n</sub> is a sum of independent Bernoullis. Conditioning on X<sub>i</sub> = 1 just shifts the sum by 1:</p>
          <MathBlock>
            E[S<sub>n</sub> | X<sub>i</sub> = 1] = 1 + Σ<sub>j≠i</sub> p<sub>j</sub> = 1 + E[S<sub>n</sub>] - p<sub>i</sub>
          </MathBlock>
          <p>If all p<sub>i</sub> = p (i.i.d. case), then E[S<sub>n</sub> | X<sub>i</sub> = 1] = 1 + (n-1)p and the bound becomes:</p>
          <MathBlock>
            P(S<sub>n</sub> {'>'} 0) ≥ np / (1 + (n-1)p)
          </MathBlock>
          <p>Compare with the exact answer via independence: P(S<sub>n</sub> {'>'} 0) = 1 - (1-p)<sup>n</sup>.
            For small p, both are approximately np. The bound is pretty good in the sparse regime.</p>
        </Toggle>

        <Toggle label="Connection to the second moment method">
          <p>The classical{' '}
            <Term tooltip="If X ≥ 0 is a random variable, then P(X > 0) ≥ E[X]² / E[X²]. This follows from Cauchy-Schwarz: E[X]² = E[X · 1_{X>0}]² ≤ E[X²] · P(X > 0). It's the standard 'second moment method' for proving things exist.">second moment bound</Term>
            {' '}says P(S<sub>n</sub> {'>'} 0) ≥ E[S<sub>n</sub>]² / E[S<sub>n</sub>²].
            The inequality we just proved is actually a <em>refinement</em>. You can show that</p>
          <MathBlock>
            Σ<sub>i</sub> E[X<sub>i</sub>] / E[S<sub>n</sub> | X<sub>i</sub> = 1] ≥ E[S<sub>n</sub>]² / E[S<sub>n</sub>²]
          </MathBlock>
          <p>so our bound is at least as strong as the second moment method (and often strictly stronger).
            The reason: the second moment method uses Cauchy-Schwarz, which is a cruder inequality than
            applying Jensen term-by-term. This refinement matters in applications where different X<sub>i</sub>'s
            have very different conditional behaviors — the term-by-term bound captures heterogeneity
            that the global second moment misses.</p>
        </Toggle>
      </Step>

      {/* Proof at a Glance */}
      <Box label="PROOF AT A GLANCE" labelColor="#7eb8da">
        <div className="proof-summary">
          <div className="comment">// Define auxiliary variable</div>
          <div>Y = (1/S<sub>n</sub>) · 𝟙{'{'}S<sub>n</sub> {'>'} 0{'}'}</div>
          <div>&nbsp;</div>
          <div className="comment">// Key identity</div>
          <div>Y · S<sub>n</sub> = 𝟙{'{'}S<sub>n</sub> {'>'} 0{'}'}</div>
          <div>&nbsp;</div>
          <div className="comment">// Expand and take expectations</div>
          <div>P(S<sub>n</sub> {'>'} 0) = E[Y · S<sub>n</sub>] = Σ E[Y · X<sub>i</sub>]</div>
          <div>&nbsp;</div>
          <div className="comment">// Condition on X<sub>i</sub> = 1 (where S<sub>n</sub> ≥ 1)</div>
          <div>E[Y · X<sub>i</sub>] = E[X<sub>i</sub>] · E[1/S<sub>n</sub> | X<sub>i</sub> = 1]</div>
          <div>&nbsp;</div>
          <div className="comment">// Jensen: 1/x convex ⇒ E[1/S<sub>n</sub>] ≥ 1/E[S<sub>n</sub>]</div>
          <div>≥ E[X<sub>i</sub>] / E[S<sub>n</sub> | X<sub>i</sub> = 1]</div>
          <div>&nbsp;</div>
          <div className="comment">// Sum over i</div>
          <div>P(S<sub>n</sub> {'>'} 0) ≥ Σ<sub>i</sub> E[X<sub>i</sub>] / E[S<sub>n</sub> | X<sub>i</sub> = 1]     □</div>
        </div>
      </Box>

      {/* Why This Matters */}
      <Box label="WHY THIS MATTERS" labelColor="#d4a574">
        <p><strong>1. It works without independence.</strong>
          {' '}Most concentration inequalities (Chernoff, Hoeffding, etc.) require independent random variables.
          This bound requires nothing — just 0-1 variables and their conditional expectations. When you're
          working with dependent events (random graphs, percolation, constraint satisfaction), this is exactly
          the kind of tool you need.</p>

        <p><strong>2. It refines the second moment method.</strong>
          {' '}The standard second moment bound P(S<sub>n</sub> {'>'} 0) ≥ E[S<sub>n</sub>]²/E[S<sub>n</sub>²]
          is a workhorse, but it treats all terms uniformly. This inequality is term-by-term: it gives each
          X<sub>i</sub> its own contribution weighted by its conditional environment. In applications where
          some variables are more "important" than others, this refinement can give significantly tighter bounds.</p>

        <p><strong>3. The Y-trick is a proof pattern.</strong>
          {' '}Defining an auxiliary variable that "distributes" a global quantity across local pieces is a
          recurring strategy in probabilistic combinatorics. Valettas is teaching you to recognize when a
          target bound suggests a specific auxiliary construction. The hint in the problem — "consider Y = 1/S<sub>n</sub>" —
          is pointing at this meta-skill: read the bound you want, reverse-engineer the random variable that would produce it.</p>

        <p><strong>4. It connects to the Lovasz Local Lemma.</strong>
          {' '}The LLL is one of the most powerful tools in the course, and its proof machinery relies on
          carefully bounding conditional probabilities of dependent events. The inequality here gives you a taste
          of the same flavor: controlling the probability of a union of dependent events through conditional expectations.
          When you reach the LLL in later weeks, this problem will feel like useful warm-up.</p>
      </Box>

      <div className="footer">
        Hover dotted terms for definitions · click arrows for deeper context
      <Footer />

      </div>

    </div>
  )
}
