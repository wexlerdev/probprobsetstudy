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

      <p className="part-label">Part (a). For monotone f, g and any random variable ξ: E[f(ξ)g(ξ)] ≥ E[f(ξ)] · E[g(ξ)].</p>

      <p>Start with a pointwise fact: for all real s, t,</p>
      <Tex block>{String.raw`(f(t) - f(s))(g(t) - g(s)) \;\ge\; 0.`}</Tex>
      <p>(If t ≥ s, both factors are ≥ 0 since f and g are increasing; if t &lt; s, both factors are ≤ 0; product is nonneg either way.)</p>

      <p>Let ξ' be an independent copy of ξ — same distribution, independent of ξ. The pointwise inequality holds for any pair of real numbers, so it holds when we plug in random ones:</p>
      <Tex block>{String.raw`(f(\xi) - f(\xi'))(g(\xi) - g(\xi')) \;\ge\; 0 \quad\text{almost surely}.`}</Tex>

      <p>Take expectations and expand the product (FOIL):</p>
      <Tex block>{String.raw`0 \;\le\; E[f(\xi)g(\xi)] \;-\; E[f(\xi)g(\xi')] \;-\; E[f(\xi')g(\xi)] \;+\; E[f(\xi')g(\xi')].`}</Tex>

      <p>Now simplify each cross term using independence: ξ ⊥ ξ' gives E[f(ξ)g(ξ')] = E[f(ξ)] · E[g(ξ')], and ξ' has the same distribution as ξ, so E[g(ξ')] = E[g(ξ)]. Thus:</p>
      <Tex block>{String.raw`E[f(\xi)g(\xi')] \;=\; E[f(\xi)] \cdot E[g(\xi)],`}</Tex>
      <p>and the same argument gives E[f(ξ')g(ξ)] = E[f(ξ)] · E[g(ξ)]. The remaining diagonal term: ξ' has the same distribution as ξ, so E[f(ξ')g(ξ')] = E[f(ξ)g(ξ)]. Substituting all four:</p>
      <Tex block>{String.raw`0 \;\le\; 2\,E[f(\xi)g(\xi)] \;-\; 2\,E[f(\xi)] \cdot E[g(\xi)],`}</Tex>
      <p>which gives E[f(ξ)g(ξ)] ≥ E[f(ξ)] · E[g(ξ)].</p>

      <p className="part-label">Part (b). For coordinatewise-monotone F, G : ℝⁿ → ℝ and independent X = (X<sub>1</sub>, ..., X<sub>n</sub>): E[F(X)G(X)] ≥ E[F(X)] · E[G(X)].</p>

      <p>Induct on n. The base case n = 1 is part (a) directly.</p>

      <p>For the inductive step, define</p>
      <Tex block>{String.raw`f(x) \;:=\; E[F(x, X_2, \ldots, X_n)], \qquad g(x) \;:=\; E[G(x, X_2, \ldots, X_n)].`}</Tex>

      <p>Both f and g are monotone increasing in x: if x ≤ y, then F(x, ·) ≤ F(y, ·) pointwise (coordinatewise monotonicity), and expectation preserves the inequality. Same for g.</p>

      <p>By the inductive hypothesis on the n − 1 independent variables X<sub>2</sub>, ..., X<sub>n</sub> (with x held fixed):</p>
      <Tex block>{String.raw`E[F(x, X_2, \ldots, X_n) \cdot G(x, X_2, \ldots, X_n)] \;\ge\; f(x) \cdot g(x).`}</Tex>

      <p>This holds for every x. Take expectation over X<sub>1</sub> using the tower property:</p>
      <Tex block>{String.raw`E[F(X) G(X)] \;=\; E\!\left[E[F G \mid X_1]\right] \;\ge\; E[f(X_1) \cdot g(X_1)].`}</Tex>

      <p>Now apply part (a) to the monotone single-variable functions f, g and the random variable X<sub>1</sub>:</p>
      <Tex block>{String.raw`E[f(X_1) g(X_1)] \;\ge\; E[f(X_1)] \cdot E[g(X_1)] \;=\; E[F(X)] \cdot E[G(X)],`}</Tex>
      <p>where the last equality uses the tower property again to identify E[f(X<sub>1</sub>)] = E[E[F(X) | X<sub>1</sub>]] = E[F(X)]. Combining: E[F(X)G(X)] ≥ E[F(X)] · E[G(X)].</p>

      <p className="part-label">Part (c). For nonneg coordinatewise-monotone F<sub>1</sub>, ..., F<sub>m</sub>: E[∏ F<sub>j</sub>(X)] ≥ ∏ E[F<sub>j</sub>(X)].</p>

      <p>Induct on m. The base case m = 1 is trivial.</p>

      <p>For the inductive step, let Π := ∏<sub>j=1</sub><sup>m−1</sup> F<sub>j</sub>. The product of nonneg increasing functions is increasing: if x ≤ y in some coordinate, every F<sub>j</sub>(x) ≤ F<sub>j</sub>(y) and all the values are ≥ 0, so multiplying preserves the order. So Π is itself nonneg and coordinatewise monotone.</p>

      <p>Apply part (b) to F<sub>m</sub> and Π:</p>
      <Tex block>{String.raw`E[F_m \cdot \Pi] \;\ge\; E[F_m] \cdot E[\Pi].`}</Tex>

      <p>By the inductive hypothesis on the m − 1 functions F<sub>1</sub>, ..., F<sub>m−1</sub>, E[Π] ≥ ∏<sub>j&lt;m</sub> E[F<sub>j</sub>]. Multiplying both sides by E[F<sub>m</sub>] ≥ 0 preserves the inequality:</p>
      <Tex block>{String.raw`E\!\left[\prod_{j=1}^{m} F_j\right] \;\ge\; E[F_m] \cdot \prod_{j=1}^{m-1} E[F_j] \;=\; \prod_{j=1}^{m} E[F_j].`}</Tex>

      <p className="qed">∎</p>
    </div>
  )
}

export default function Problem4() {
  useEffect(() => {
    document.title = 'PS6 Problem 4 — Harris / FKG Correlation Inequality'
  }, [])

  const { mode } = useDifficulty()

  return (
    <div className="container container-narrow">

      {/* Header */}
      <div className="label">PROBLEM SET 6 · PROBLEM 4</div>
      <h1>Harris / FKG: Monotone Functions Are Positively Correlated</h1>
      <p className="subtitle">
        Three escalating forms of the same idea. (a) For one variable: monotone f, g satisfy
        E[fg] ≥ E[f]E[g]. (b) For n independent variables and coordinatewise-monotone F, G: same
        inequality. (c) For m coordinatewise-monotone nonnegative functions: E[∏ Fⱼ] ≥ ∏ E[Fⱼ].
        The slick two-independent-copies trick powers the whole tower.
      </p>

      <DifficultyDial modes={PROOF_MODES} />

      {mode === MODES.PROOF ? <FormalProof /> : (<>

      {/* ============= ORIENT ============= */}
      <Step
        badge="STEP 0"
        title="Orientation — what's a 'correlation inequality' and why does monotonicity give one?"
        hint="Correlation inequality: E[fg] ≥ E[f]E[g] (or ≤). Holds when f, g 'increase together' — captured by monotonicity."
        decision="Three new things: what 'correlation inequality' means here, what (coordinatewise) monotonicity means, and the inductive structure relating the three parts. Lay all three out before the algebra starts."
      >
        <p><strong>What's a "correlation inequality"?</strong> Independence of X and Y gives E[XY] = E[X]E[Y]. When X and Y are <em>not</em> independent, generally E[XY] ≠ E[X]E[Y]. A <em>correlation inequality</em> says: under some structural hypothesis on X and Y, E[XY] ≥ E[X]E[Y] (positive correlation) or ≤ (negative correlation). Here the structural hypothesis is monotonicity: f, g both grow in the same direction with respect to the underlying randomness.</p>

        <Callout type="intuition">
          <p>Picture plotting f(ξ) on the x-axis and g(ξ) on the y-axis as ξ ranges over its possible values. If f and g are both monotone increasing, big ξ gives big f(ξ) <em>and</em> big g(ξ); small ξ gives small <em>and</em> small. The scatter plot tilts up-right — they're positively correlated. Mathematically: E[fg] ≥ E[f]E[g], i.e., averaging the product beats the product of the averages.</p>
        </Callout>

        <p><strong>Monotone functions.</strong> A function f : ℝ → ℝ is{' '}
          <Term wide tooltip="A function f is monotonically increasing (or weakly increasing) if x ≤ y implies f(x) ≤ f(y). Note 'increasing' here is the weak version — equality is allowed. A constant function is technically monotone increasing under this definition. Some authors say 'non-decreasing' for the weak version and reserve 'increasing' for strict.">monotonically increasing</Term>
          {' '}if x ≤ y implies f(x) ≤ f(y). For functions F : ℝⁿ → ℝ on n-dimensional input, "<Term wide tooltip="A function F : ℝⁿ → ℝ is coordinatewise monotonically increasing if increasing any single coordinate (with the others held fixed) doesn't decrease F. Formally: if x_i ≤ y_i and x_j = y_j for j ≠ i, then F(x_1, ..., x_n) ≤ F(y_1, ..., y_n). The condition only constrains coordinate-by-coordinate behavior; F can do anything when multiple coordinates change at once (subject to the partial ordering).">coordinatewise monotone</Term>" means: increasing any single coordinate (with the others fixed) doesn't decrease F.</p>

        <p><strong>The three parts.</strong></p>
        <ul>
          <li><strong>(a) Base case (one variable).</strong> If f, g are monotone (same direction) and ξ is any real-valued random variable, then E[f(ξ)g(ξ)] ≥ E[f(ξ)]·E[g(ξ)]. The professor's hint hands us the trick: introduce ξ' independent of ξ.</li>
          <li><strong>(b) Multivariate (n independent inputs).</strong> If F, G : ℝⁿ → ℝ are coordinatewise monotone (same direction) and X = (X<sub>1</sub>, ..., X<sub>n</sub>) has independent coordinates, then E[F(X)G(X)] ≥ E[F(X)]·E[G(X)]. By induction on n, with the base case = (a).</li>
          <li><strong>(c) Many functions.</strong> If F<sub>1</sub>, ..., F<sub>m</sub> are coordinatewise monotone <em>nonnegative</em> functions on independent X = (X<sub>1</sub>, ..., X<sub>n</sub>), then E[∏<sub>j=1</sub><sup>m</sup> F<sub>j</sub>(X)] ≥ ∏<sub>j=1</sub><sup>m</sup> E[F<sub>j</sub>(X)]. By induction on m, using (b).</li>
        </ul>

        <p>The whole tower rests on (a)'s slick two-copies argument. (b) and (c) are inductions that re-use (a) by conditioning.</p>

        <Callout type="connection">
          <p>The case (c) is essentially the classical{' '}
            <Term wide tooltip="Theodore Harris (1960): for Bernoulli percolation on the integer lattice, increasing events are positively correlated. The 'increasing event' framework — and the inequality bounding their probabilities — became the foundation for percolation theory. Generalized to the FKG inequality (Fortuin–Kasteleyn–Ginibre 1971) for any distribution satisfying the FKG lattice condition, including Ising models. Both names — Harris's inequality and FKG inequality — get used for the iid product-measure version proven here.">Harris (or FKG) inequality</Term>
            {' '}for product measures. It's the foundation for analyzing positively-correlated events in percolation, the Ising model, and random graph theory.</p>
        </Callout>
      </Step>


      {/* ============= PART (a) ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>Part (a) — Single-variable Harris inequality</h2>
        <p className="part-goal">Goal: for monotone increasing f, g : ℝ → ℝ and any real-valued random variable ξ, show E[f(ξ)g(ξ)] ≥ E[f(ξ)]·E[g(ξ)].</p>
      </div>

      <Step
        badge="A.1"
        title="The pointwise lemma — monotone f, g make (f(t)−f(s))(g(t)−g(s)) ≥ 0"
        hint="If f, g both increase: t ≥ s ⟹ both factors ≥ 0; t < s ⟹ both ≤ 0. Either way, product ≥ 0."
        decision="Before invoking any randomness, state the deterministic fact about real numbers: when f, g are both monotone increasing, the product (f(t)−f(s))(g(t)−g(s)) is non-negative for ALL t, s ∈ ℝ. Case analysis."
      >
        <p>Fix any real numbers s, t.</p>

        <p><em>Case 1: t ≥ s.</em> Monotonicity of f gives f(t) ≥ f(s), so f(t) − f(s) ≥ 0. Same for g. Product of two nonneg numbers is nonneg.</p>

        <p><em>Case 2: t {'<'} s.</em> Now f(t) ≤ f(s), so f(t) − f(s) ≤ 0. Same for g. Product of two nonpos numbers is nonneg.</p>

        <p>Either way:</p>
        <MathBlock>(f(t) − f(s)) · (g(t) − g(s)) ≥ 0      for every s, t ∈ ℝ.</MathBlock>

        <Callout type="key">
          <p>This is the geometric encoding of "f and g grow in the same direction." If f were decreasing while g were increasing, the two factors would have opposite signs and the product would be ≤ 0 — which would give the <em>opposite</em> correlation inequality. The hypothesis "same monotonicity direction" is what gives the ≥ sign in the conclusion.</p>
        </Callout>
      </Step>

      <Step
        badge="A.2"
        title="Introduce ξ' — an independent copy of ξ"
        hint="Replace s, t in the pointwise lemma with two independent copies of ξ. The pointwise inequality lifts to a probabilistic one."
        decision="Where does ξ' come from? Reverse-engineer: we want a product of differences that's pointwise non-negative AND whose expectation factors nicely. Setting s = ξ', t = ξ with ξ' independent of ξ does exactly this — independence makes the cross-expectations split."
      >
        <p>Here's the creative move. Let ξ' be an{' '}
          <Term wide tooltip="An 'independent copy' of ξ is a random variable ξ' that has the same distribution as ξ AND is independent of ξ. You can construct one by taking the product probability space — informally, 'reroll ξ.' Independent copies are a powerful technical device: they let you apply pointwise inequalities involving two values (s, t) to a single random variable (ξ, ξ').">independent copy</Term>
          {' '}of ξ — a random variable with the same distribution as ξ that is independent of ξ. Apply the pointwise lemma A.1 with s = ξ', t = ξ. Since the lemma holds for <em>every</em> pair of real numbers s, t, it holds with random arguments too:</p>
        <MathBlock>(f(ξ) − f(ξ')) · (g(ξ) − g(ξ')) ≥ 0      almost surely.</MathBlock>

        <Callout type="key">
          <p><strong>Why this construction?</strong> We want to prove E[fg] ≥ E[f]E[g] — a relation between an expectation of a product and a product of expectations. The product E[f]·E[g] is what you get when f and g use <em>independent</em> copies of the input. So if we expand the inequality above, we'll see E[f(ξ)g(ξ)] (the lhs of the target), E[f(ξ')g(ξ')] (same thing by symmetry, since ξ' has the same distribution), and cross terms like E[f(ξ)g(ξ')] (which factor as E[f]E[g] by independence). The construction is engineered to make the algebra produce exactly the target inequality.</p>
        </Callout>
      </Step>

      <Step
        badge="A.3"
        title="Take expectations and expand the product"
        hint="E[(f(ξ)−f(ξ'))(g(ξ)−g(ξ'))] ≥ 0; expand to four expectations."
        decision="Expectation preserves the pointwise inequality (monotonicity of expectation). Expand the product into four terms — keep every step explicit."
      >
        <p>Take expectations of both sides. By monotonicity of expectation (X ≥ 0 a.s. ⟹ E[X] ≥ 0):</p>
        <MathBlock>E[(f(ξ) − f(ξ')) · (g(ξ) − g(ξ'))] ≥ 0.</MathBlock>

        <p>Expand the product (FOIL):</p>
        <MathBlock>(f(ξ) − f(ξ')) · (g(ξ) − g(ξ')) = f(ξ)g(ξ) − f(ξ)g(ξ') − f(ξ')g(ξ) + f(ξ')g(ξ').</MathBlock>

        <p>Take expectations of all four terms (linearity of expectation):</p>
        <MathBlock>E[f(ξ)g(ξ)] − E[f(ξ)g(ξ')] − E[f(ξ')g(ξ)] + E[f(ξ')g(ξ')] ≥ 0.</MathBlock>
      </Step>

      <Step
        badge="A.4"
        title="Apply independence to simplify the cross terms"
        hint="ξ ⊥ ξ' makes E[f(ξ)g(ξ')] = E[f(ξ)]E[g(ξ')]. Same distribution makes E[g(ξ')] = E[g(ξ)]. Both cross terms become E[f]E[g]."
        decision="ξ' was chosen to be independent of ξ — that's the key property that makes the cross terms factor. Same-distribution lets us replace ξ' with ξ inside individual expectations."
      >
        <p>For each term, use independence and same-distribution:</p>

        <p><strong>The two cross terms.</strong> Independence of ξ and ξ' gives</p>
        <MathBlock>E[f(ξ)g(ξ')] = E[f(ξ)] · E[g(ξ')] = E[f(ξ)] · E[g(ξ)].</MathBlock>
        <p>(The first equality is independence; the second is "ξ' has the same distribution as ξ.") Similarly</p>
        <MathBlock>E[f(ξ')g(ξ)] = E[f(ξ')] · E[g(ξ)] = E[f(ξ)] · E[g(ξ)].</MathBlock>

        <p><strong>The two diagonal terms.</strong> ξ' has the same distribution as ξ, so any single-variable expectation involving only ξ' equals the same expectation involving ξ. In particular:</p>
        <MathBlock>E[f(ξ')g(ξ')] = E[f(ξ)g(ξ)].</MathBlock>
        <p>(Both sides are integrals of the function (x) ↦ f(x)g(x) against the same distribution.)</p>

        <p>Substitute all four into the inequality from A.3:</p>
        <MathBlock>E[f(ξ)g(ξ)] − E[f(ξ)]E[g(ξ)] − E[f(ξ)]E[g(ξ)] + E[f(ξ)g(ξ)] ≥ 0.</MathBlock>

        <Callout type="warning">
          <p>This step uses two distinct properties of ξ': <strong>independence</strong> (lets the cross terms factor) and <strong>same distribution</strong> (lets us replace ξ' with ξ inside individual expectations). Neither alone is enough. The "independent copy" construction gives us both at once.</p>
        </Callout>
      </Step>

      <Step
        badge="A.5"
        title="Collect like terms and finish"
        hint="2 E[fg] − 2 E[f]E[g] ≥ 0 ⟹ E[fg] ≥ E[f]E[g]."
        decision="The four-term expansion has collapsed to two pairs. Collect and divide by 2."
      >
        <p>Group the inequality from A.4:</p>
        <MathBlock>2 E[f(ξ)g(ξ)] − 2 E[f(ξ)] E[g(ξ)] ≥ 0.</MathBlock>

        <p>Divide both sides by 2:</p>
        <MathBlock>E[f(ξ)g(ξ)] ≥ E[f(ξ)] · E[g(ξ)].    □</MathBlock>

        <Callout type="key">
          <p>The whole proof in one breath: <em>pointwise non-negativity of (f(ξ)−f(ξ'))(g(ξ)−g(ξ')) ⟹ expectation ≥ 0 ⟹ expand and use independence ⟹ Harris.</em> Five steps, one creative idea (the independent copy), and the rest is bookkeeping. This is one of the slickest arguments in probability.</p>
        </Callout>

        <Toggle label="What if f and g have opposite monotonicity?">
          <p>If f is increasing and g is decreasing, then in Case 1 of A.1 the f-difference is ≥ 0 and the g-difference is ≤ 0; in Case 2 the signs flip. Product is always ≤ 0. The same chain then yields E[fg] ≤ E[f]E[g] — <em>negative correlation</em>. The key takeaway: same direction → positive correlation; opposite directions → negative correlation; one constant or non-monotone → no general statement.</p>
        </Toggle>
      </Step>


      {/* ============= PART (b) ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>Part (b) — Multivariate Harris (n independent coordinates)</h2>
        <p className="part-goal">Goal: for coordinatewise-monotone-increasing F, G : ℝⁿ → ℝ and independent X = (X<sub>1</sub>, ..., X<sub>n</sub>), show E[F(X)G(X)] ≥ E[F(X)]·E[G(X)].</p>
      </div>

      <Step
        badge="B.1"
        badgeClass="step-badge-b"
        title="Strategy — induct on n; condition on X_1; apply (a) to the marginals"
        hint="Base n = 1 is part (a). Inductive step: condition on X_1, get a (n−1)-variable problem (apply IH), then a 1-variable problem in X_1 (apply part a)."
        decision="The induction structure is forced by the form of the result. Condition on the first coordinate X_1 — this freezes one input, leaving an (n−1)-variable problem the inductive hypothesis handles. Then average over X_1 using part (a) at the outer level."
      >
        <p>Induct on n.</p>

        <p><strong>Base case n = 1.</strong> F and G are functions of a single variable X<sub>1</sub>. "Coordinatewise monotone" reduces to "monotone." The claim is exactly part (a) with ξ = X<sub>1</sub>, f = F, g = G. ✓</p>

        <p><strong>Inductive step.</strong> Assume the claim holds for n − 1 independent variables and any coordinatewise-monotone F, G : ℝ<sup>n−1</sup> → ℝ. Prove it for n.</p>

        <p>Fix x ∈ ℝ. Define</p>
        <MathBlock>F<sub>x</sub>(y<sub>2</sub>, ..., y<sub>n</sub>) := F(x, y<sub>2</sub>, ..., y<sub>n</sub>),     G<sub>x</sub>(y<sub>2</sub>, ..., y<sub>n</sub>) := G(x, y<sub>2</sub>, ..., y<sub>n</sub>).</MathBlock>
        <p>These are functions of n − 1 variables, with x fixed as a parameter. They are coordinatewise monotone in (y<sub>2</sub>, ..., y<sub>n</sub>) because F, G were coordinatewise monotone in all n variables.</p>
      </Step>

      <Step
        badge="B.2"
        badgeClass="step-badge-b"
        title="Apply the inductive hypothesis with X_1 frozen"
        hint="For each fixed x: E[F_x(X_2..X_n) G_x(X_2..X_n)] ≥ E[F_x(X_2..X_n)] · E[G_x(X_2..X_n)] by IH on n−1 variables."
        decision="Once X_1 = x is fixed, the remaining randomness is in X_2, ..., X_n (independent), and F_x, G_x are coordinatewise monotone — exactly the IH's setting."
      >
        <p>For each fixed x, apply the inductive hypothesis to the (n−1)-variable functions F<sub>x</sub>, G<sub>x</sub> with the independent variables X<sub>2</sub>, ..., X<sub>n</sub>:</p>
        <MathBlock>E[F<sub>x</sub>(X<sub>2</sub>, ..., X<sub>n</sub>) · G<sub>x</sub>(X<sub>2</sub>, ..., X<sub>n</sub>)] ≥ E[F<sub>x</sub>(X<sub>2</sub>, ..., X<sub>n</sub>)] · E[G<sub>x</sub>(X<sub>2</sub>, ..., X<sub>n</sub>)].</MathBlock>

        <p>Both sides depend on the parameter x. Define the marginal expectations as functions of x:</p>
        <MathBlock>f(x) := E[F<sub>x</sub>(X<sub>2</sub>, ..., X<sub>n</sub>)] = E[F(x, X<sub>2</sub>, ..., X<sub>n</sub>)],</MathBlock>
        <MathBlock>g(x) := E[G<sub>x</sub>(X<sub>2</sub>, ..., X<sub>n</sub>)] = E[G(x, X<sub>2</sub>, ..., X<sub>n</sub>)].</MathBlock>

        <p>The inequality reads:</p>
        <MathBlock>E[F(x, X<sub>2</sub>, ..., X<sub>n</sub>) · G(x, X<sub>2</sub>, ..., X<sub>n</sub>)] ≥ f(x) · g(x).</MathBlock>
      </Step>

      <Step
        badge="B.3"
        badgeClass="step-badge-b"
        title="Verify f(x) and g(x) are monotone in x"
        hint="F is monotone in its first coordinate (with others fixed), so f(x) = E[F(x, X_2..X_n)] inherits monotonicity in x by monotonicity of expectation."
        decision="To apply part (a) at the outer level (over X_1), we need f and g to be monotone single-variable functions. Coordinatewise-monotonicity of F in its first coordinate transfers to f(x) via monotonicity of expectation."
      >
        <p>Suppose x ≤ y. By coordinatewise monotonicity of F (in the first coordinate, with the others fixed):</p>
        <MathBlock>F(x, X<sub>2</sub>, ..., X<sub>n</sub>) ≤ F(y, X<sub>2</sub>, ..., X<sub>n</sub>)      almost surely.</MathBlock>

        <p>Take expectations (which preserve inequalities):</p>
        <MathBlock>f(x) = E[F(x, X<sub>2</sub>, ..., X<sub>n</sub>)] ≤ E[F(y, X<sub>2</sub>, ..., X<sub>n</sub>)] = f(y).</MathBlock>

        <p>So f is monotone increasing in x. Same argument gives monotonicity of g.</p>

        <Toggle label="Why does monotonicity of expectation preserve coordinatewise monotonicity?">
          <p>Expectation is an integral against a probability measure — it adds up f weighted by probabilities. If F(x, ·) ≤ F(y, ·) pointwise (for a.e. realization of X<sub>2</sub>, ..., X<sub>n</sub>), then their integrals satisfy the same inequality. There's no subtlety here; it's just that integrals respect ≤.</p>
        </Toggle>
      </Step>

      <Step
        badge="B.4"
        badgeClass="step-badge-b"
        title="Take expectation over X_1 and apply part (a)"
        hint="E[F(X)G(X)] = E_{X_1}[E[F(X_1,X_2..X_n)G(X_1,X_2..X_n) | X_1]] ≥ E_{X_1}[f(X_1)g(X_1)] ≥ E[f(X_1)]E[g(X_1)] = E[F(X)]E[G(X)]."
        decision="Tower property of expectation: split E[F(X)G(X)] into E_{X_1}[E[· | X_1]]. Inside, the IH (B.2) gives the f·g lower bound. Then apply part (a) to the monotone single-variable functions f, g of X_1."
      >
        <p>Use the tower property of expectation, conditioning on X<sub>1</sub>:</p>
        <MathBlock>E[F(X) G(X)] = E[ E[F(X<sub>1</sub>, X<sub>2</sub>, ..., X<sub>n</sub>) G(X<sub>1</sub>, X<sub>2</sub>, ..., X<sub>n</sub>) | X<sub>1</sub>] ].</MathBlock>

        <p>The inner conditional expectation, with X<sub>1</sub> = x, is the lhs of the B.2 inequality (X<sub>2</sub>, ..., X<sub>n</sub> are independent of X<sub>1</sub>, so conditioning on X<sub>1</sub> doesn't affect their distribution). Apply B.2:</p>
        <MathBlock>E[F(X<sub>1</sub>, ..., X<sub>n</sub>) G(X<sub>1</sub>, ..., X<sub>n</sub>) | X<sub>1</sub>] ≥ f(X<sub>1</sub>) · g(X<sub>1</sub>).</MathBlock>

        <p>Take outer expectation (which preserves inequalities):</p>
        <MathBlock>E[F(X) G(X)] ≥ E[f(X<sub>1</sub>) · g(X<sub>1</sub>)].</MathBlock>

        <p>Now apply <strong>part (a)</strong> to the single-variable, monotone functions f and g (B.3 verified monotonicity) with the random variable X<sub>1</sub>:</p>
        <MathBlock>E[f(X<sub>1</sub>) · g(X<sub>1</sub>)] ≥ E[f(X<sub>1</sub>)] · E[g(X<sub>1</sub>)].</MathBlock>

        <p>Finally, by definition of f and g (as marginal expectations):</p>
        <MathBlock>E[f(X<sub>1</sub>)] = E[E[F(X<sub>1</sub>, X<sub>2</sub>, ..., X<sub>n</sub>) | X<sub>1</sub>]] = E[F(X)],</MathBlock>
        <MathBlock>E[g(X<sub>1</sub>)] = E[G(X)].</MathBlock>

        <p>(Tower property again.) Chain everything:</p>
        <MathBlock>E[F(X) G(X)] ≥ E[f(X<sub>1</sub>) g(X<sub>1</sub>)] ≥ E[f(X<sub>1</sub>)] E[g(X<sub>1</sub>)] = E[F(X)] · E[G(X)].    □</MathBlock>

        <Callout type="key">
          <p>The induction is doing two things: <strong>conditioning</strong> reduces n variables to n − 1 (handled by IH), and <strong>part (a)</strong> handles the single remaining variable. The whole thing is "(a) + induction by conditioning" — a template you'll see again in (c).</p>
        </Callout>
      </Step>


      {/* ============= PART (c) ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>Part (c) — Product of m coordinatewise-monotone nonnegative functions</h2>
        <p className="part-goal">Goal: for nonneg, coordinatewise-monotone F<sub>1</sub>, ..., F<sub>m</sub> : ℝⁿ → ℝ and independent X = (X<sub>1</sub>, ..., X<sub>n</sub>), show E[∏<sub>j=1</sub><sup>m</sup> F<sub>j</sub>(X)] ≥ ∏<sub>j=1</sub><sup>m</sup> E[F<sub>j</sub>(X)].</p>
      </div>

      <Step
        badge="C.1"
        badgeClass="step-badge-c"
        title="Strategy — induct on m, peel off F_m and apply (b)"
        hint="Base m = 1 is trivial. Inductive step: write ∏ F_j = F_m · ∏_{j<m} F_j; apply (b) with the two factors; then IH on the (m−1)-fold product."
        decision="Induction on m. The two-factor case is part (b). For more factors, peel off one and treat the remaining product as a single function. Both pieces are coordinatewise monotone (here the nonneg hypothesis matters)."
      >
        <p>Induct on m.</p>

        <p><strong>Base case m = 1.</strong> The claim becomes E[F<sub>1</sub>(X)] ≥ E[F<sub>1</sub>(X)], which is trivially true (with equality). ✓</p>

        <p><strong>Inductive step.</strong> Assume the claim holds for m − 1 functions; prove it for m. Write</p>
        <MathBlock>∏<sub>j=1</sub><sup>m</sup> F<sub>j</sub>(X) = F<sub>m</sub>(X) · (∏<sub>j=1</sub><sup>m−1</sup> F<sub>j</sub>(X)).</MathBlock>
        <p>The plan is to apply part (b) to the two factors F<sub>m</sub> and Π := ∏<sub>j=1</sub><sup>m−1</sup> F<sub>j</sub>. For (b) to apply, both factors must be coordinatewise monotone increasing.</p>
      </Step>

      <Step
        badge="C.2"
        badgeClass="step-badge-c"
        title="Verify ∏ F_j is coordinatewise monotone (this needs the nonneg hypothesis)"
        hint="Product of nonneg increasing functions is increasing."
        decision="The induction needs the (m−1)-fold product to be coordinatewise monotone — but a product of monotone functions is generally NOT monotone unless they're nonneg. Hence the nonneg hypothesis. Verify the monotonicity claim."
      >
        <p><strong>Claim.</strong> If F<sub>1</sub>, ..., F<sub>m−1</sub> are nonneg coordinatewise-monotone-increasing functions, then their product Π = ∏<sub>j=1</sub><sup>m−1</sup> F<sub>j</sub> is also nonneg and coordinatewise-monotone-increasing.</p>

        <p>Suppose x ≤ y in the i-th coordinate (other coordinates equal). For each j: F<sub>j</sub>(x) ≤ F<sub>j</sub>(y), and both are ≥ 0. So:</p>
        <MathBlock>0 ≤ F<sub>j</sub>(x) ≤ F<sub>j</sub>(y)      for every j.</MathBlock>

        <p>Multiplying nonnegative numbers preserves order:</p>
        <MathBlock>F<sub>1</sub>(x) F<sub>2</sub>(x) · · · F<sub>m−1</sub>(x) ≤ F<sub>1</sub>(y) F<sub>2</sub>(y) · · · F<sub>m−1</sub>(y),</MathBlock>
        <p>i.e., Π(x) ≤ Π(y). Coordinatewise monotonicity is preserved. And Π is nonneg as a product of nonneg numbers. ✓</p>

        <Callout type="warning">
          <p><strong>Why nonneg matters.</strong> Without it, the product of monotone-increasing functions need NOT be monotone-increasing. Example: f<sub>1</sub>(x) = f<sub>2</sub>(x) = x (both increasing on ℝ). Their product is f<sub>1</sub>(x)f<sub>2</sub>(x) = x², which is <em>not</em> monotone increasing on ℝ — it decreases on (−∞, 0). The nonneg hypothesis rules this out.</p>
        </Callout>
      </Step>

      <Step
        badge="C.3"
        badgeClass="step-badge-c"
        title="Apply part (b) to F_m and Π"
        hint="(b) gives E[F_m · Π] ≥ E[F_m] · E[Π]."
        decision="F_m is coordinatewise monotone (given). Π is coordinatewise monotone (C.2). Both are functions of independent X. Part (b) directly applies."
      >
        <p>F<sub>m</sub> and Π are both coordinatewise-monotone-increasing functions of the independent variables X = (X<sub>1</sub>, ..., X<sub>n</sub>). Apply <strong>part (b)</strong> to them:</p>
        <MathBlock>E[F<sub>m</sub>(X) · Π(X)] ≥ E[F<sub>m</sub>(X)] · E[Π(X)],</MathBlock>
        <p>i.e.,</p>
        <MathBlock>E[∏<sub>j=1</sub><sup>m</sup> F<sub>j</sub>(X)] ≥ E[F<sub>m</sub>(X)] · E[∏<sub>j=1</sub><sup>m−1</sup> F<sub>j</sub>(X)].</MathBlock>
      </Step>

      <Step
        badge="C.4"
        badgeClass="step-badge-c"
        title="Apply the inductive hypothesis and finish"
        hint="IH on F_1, ..., F_{m−1}: E[∏_{<m} F_j] ≥ ∏_{<m} E[F_j]. Substitute."
        decision="The inductive hypothesis bounds the (m−1)-fold expectation by the (m−1)-fold product of expectations. Plug into C.3's inequality."
      >
        <p>By the inductive hypothesis applied to F<sub>1</sub>, ..., F<sub>m−1</sub>:</p>
        <MathBlock>E[∏<sub>j=1</sub><sup>m−1</sup> F<sub>j</sub>(X)] ≥ ∏<sub>j=1</sub><sup>m−1</sup> E[F<sub>j</sub>(X)].</MathBlock>

        <p>Substitute into the C.3 chain (the inequality is preserved when we multiply by the nonneg factor E[F<sub>m</sub>(X)] ≥ 0):</p>
        <MathBlock>E[∏<sub>j=1</sub><sup>m</sup> F<sub>j</sub>(X)] ≥ E[F<sub>m</sub>(X)] · E[∏<sub>j=1</sub><sup>m−1</sup> F<sub>j</sub>(X)] ≥ E[F<sub>m</sub>(X)] · ∏<sub>j=1</sub><sup>m−1</sup> E[F<sub>j</sub>(X)] = ∏<sub>j=1</sub><sup>m</sup> E[F<sub>j</sub>(X)].</MathBlock>

        <p>That is:</p>
        <MathBlock>E[∏<sub>j=1</sub><sup>m</sup> F<sub>j</sub>(X)] ≥ ∏<sub>j=1</sub><sup>m</sup> E[F<sub>j</sub>(X)].    □</MathBlock>

        <Callout type="key">
          <p>The whole tower in one breath: <strong>(a)</strong> = two-copies trick for one variable; <strong>(b)</strong> = induction on n using (a) + conditioning; <strong>(c)</strong> = induction on m using (b) on the peeled-off F<sub>m</sub> and the rest. Each level reuses the previous as a black box. The single creative idea (the independent copy) lives only at the bottom.</p>
        </Callout>
      </Step>


      {/* ============= CLOSING BOXES ============= */}
      <div className="separator"></div>

      <Box label="PROOF AT A GLANCE" labelColor="#7eb8da">
        <div className="proof-summary">
          <div className="comment">// Part (a): single variable, two-copies trick</div>
          <div>Pointwise: (f(t)−f(s))(g(t)−g(s)) ≥ 0 for monotone f, g (case analysis on t ⋛ s).</div>
          <div>Plug s = ξ', t = ξ with ξ' ⊥ ξ same distribution:</div>
          <div>0 ≤ E[(f(ξ)−f(ξ'))(g(ξ)−g(ξ'))] = 2 E[f(ξ)g(ξ)] − 2 E[f] E[g]   (independence + same dist)</div>
          <div>⟹ E[f(ξ)g(ξ)] ≥ E[f] · E[g].</div>
          <div>&nbsp;</div>
          <div className="comment">// Part (b): n independent variables, induct on n</div>
          <div>Base n = 1: part (a) with ξ = X<sub>1</sub>.</div>
          <div>Step: condition on X<sub>1</sub>. Define f(x) := E[F(x, X<sub>2</sub>..X<sub>n</sub>)], g(x) := E[G(x, X<sub>2</sub>..X<sub>n</sub>)].</div>
          <div>IH on n − 1 vars: E[FG | X<sub>1</sub>=x] ≥ f(x) g(x). f, g monotone in x ⟹ part (a) on X<sub>1</sub>.</div>
          <div>Chain: E[FG] ≥ E[f(X<sub>1</sub>) g(X<sub>1</sub>)] ≥ E[f(X<sub>1</sub>)] E[g(X<sub>1</sub>)] = E[F] E[G].</div>
          <div>&nbsp;</div>
          <div className="comment">// Part (c): m monotone nonneg functions, induct on m</div>
          <div>Base m = 1: trivial.</div>
          <div>Step: ∏<sub>j=1</sub><sup>m−1</sup> F<sub>j</sub> is monotone nonneg (product of monotone nonneg is monotone).</div>
          <div>Apply (b): E[F<sub>m</sub> · ∏<sub>&lt;m</sub> F<sub>j</sub>] ≥ E[F<sub>m</sub>] · E[∏<sub>&lt;m</sub> F<sub>j</sub>].</div>
          <div>Apply IH: E[∏<sub>&lt;m</sub> F<sub>j</sub>] ≥ ∏<sub>&lt;m</sub> E[F<sub>j</sub>]. Combine.   □</div>
        </div>
      </Box>

      <Box label="WHY THIS MATTERS" labelColor="#d4a574">
        <p><strong>1. The two-copies trick is one of the slickest moves in probability.</strong>
          {' '}Replace s, t in a pointwise inequality with two independent copies of a random variable, and an unconditional probabilistic inequality drops out for free. You'll see this argument again — in proofs of correlation inequalities for symmetric stochastic dynamics, in statistical mechanics, and in concentration of measure for product spaces.</p>

        <p><strong>2. Harris/FKG underpins percolation theory.</strong>
          {' '}In Bernoulli percolation, an "increasing event" is one that becomes more likely when more edges are open (e.g., "a left-right crossing exists"). Harris (1960) proved increasing events are positively correlated — exactly part (c) with F<sub>j</sub>'s being indicator functions of increasing events. This unlocked nearly all of percolation theory: critical probabilities, RSW (Russo-Seymour-Welsh) theory, scaling limits.</p>

        <p><strong>3. The induction template.</strong>
          {' '}(a) → (b) by conditioning on one variable + IH on the rest; (b) → (c) by peeling off one function + IH on the rest. Both inductions follow the same skeleton: identify a "single thing" that the inductive hypothesis can absorb, peel it off, apply the previous-level result. This is a reusable proof move whenever you're scaling a single-object inequality up to a product or a sum.</p>

        <p><strong>4. The nonneg hypothesis is structural, not technical.</strong>
          {' '}It's tempting to think "f<sub>1</sub>, f<sub>2</sub> increasing ⟹ f<sub>1</sub>·f<sub>2</sub> increasing." False, as the x · x = x² counterexample shows. The nonneg hypothesis isn't fluff; it's what makes the induction in (c) actually work. Whenever you see "monotone" combined with "nonneg," part of the work is happening in the nonneg constraint.</p>
      </Box>

      <Box label="CONNECTIONS" labelColor="#a8d4a0">
        <p><strong>→ Indicator functions of increasing events.</strong> If A ⊆ ℝⁿ is "increasing" (membership preserved by raising any coordinate), then 𝟙<sub>A</sub> is coordinatewise monotone and nonneg. Part (c) gives P(A<sub>1</sub> ∩ ··· ∩ A<sub>m</sub>) ≥ ∏ P(A<sub>j</sub>) for any collection of increasing events on independent inputs. This is the classical Harris inequality form.</p>

        <p><strong>→ FKG lattice condition.</strong> The result generalizes from product measures (independent X<sub>i</sub>'s) to any distribution satisfying the "FKG lattice condition" (a log-supermodularity property of the density). The Ising model satisfies it in the ferromagnetic regime — which is why FKG is so central to statistical mechanics.</p>

        <p><strong>→ Random graphs.</strong> In G(n, p), most natural events are increasing (more edges = more of nearly anything). FKG implies properties like "is connected" and "contains a triangle" are positively correlated. This drives many threshold results — once one increasing property appears, related ones tend to come together.</p>

        <p><strong>→ Contrast: anti-concentration (Unit 5 P1).</strong> Both Harris and the anti-concentration result of Unit 5 P1 are about products of independent ±1's. There the question was "how often is a signed sum FAR from zero?"; here it's "how do monotone functionals correlate?" Different statistics, same independent-product setting — the toolkit is reused throughout.</p>
      </Box>

      </>)}

      <Footer />

    </div>
  )
}
