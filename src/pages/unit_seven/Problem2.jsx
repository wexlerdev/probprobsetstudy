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

      <p className="part-label">Part (a). P(X = 0) ≥ (1−p)<sup>C(n,2)</sup> ≥ e<sup>−pn²</sup>.</p>

      <p>If G has no edges, then G has no triangles, so {'{'}no edges{'}'} ⊆ {'{'}X = 0{'}'}. The C(n,2) potential edges are independent Bernoulli(p), so</p>
      <Tex block>{String.raw`P(X = 0) \;\ge\; P(\text{no edges}) \;=\; (1-p)^{\binom{n}{2}}.`}</Tex>

      <p>For p ∈ (0, 1/2], log(1−p) ≥ −2p (Taylor: −log(1−p) = p + p²/2 + ⋯ ≤ 2p). So</p>
      <Tex block>{String.raw`(1-p)^{\binom{n}{2}} \;=\; \exp\!\left(\binom{n}{2}\log(1-p)\right) \;\ge\; \exp\!\left(-2p\cdot \tfrac{n(n-1)}{2}\right) \;=\; e^{-p n(n-1)} \;\ge\; e^{-pn^{2}}.`}</Tex>

      <p className="part-label">Part (b). P(X = 0) ≥ (1 − p³)<sup>C(n,3)</sup> ≥ e<sup>−p³n³</sup>.</p>

      <p>For each 3-subset t ⊆ [n], let Y<sub>t</sub> = 1 if the triangle on t is present in G. Then X = Σ<sub>t</sub> Y<sub>t</sub> and</p>
      <Tex block>{String.raw`\{X = 0\} \;=\; \bigcap_{t} \{Y_t = 0\} \;=\; \bigcap_{t} \{1 - Y_t = 1\}.`}</Tex>

      <p>Each F<sub>t</sub> := 1 − Y<sub>t</sub>, viewed as a function of the C(n,2) edge indicators, is coordinate-wise <em>decreasing</em>: adding an edge can only turn Y<sub>t</sub> from 0 to 1, never the reverse. The edges are independent, so by the Harris/FKG inequality (HW 6 P4) — decreasing functions of independent variables are positively correlated — applied iteratively to all C(n,3) functions F<sub>t</sub>:</p>
      <Tex block>{String.raw`P\!\left(\bigcap_t \{F_t = 1\}\right) \;\ge\; \prod_t P(F_t = 1) \;=\; \prod_t (1 - p^{3}) \;=\; (1 - p^{3})^{\binom{n}{3}}.`}</Tex>

      <p>For p ≤ 1/2 we have p³ ≤ 1/8 ≤ 1/2, so log(1 − p³) ≥ −2p³, and</p>
      <Tex block>{String.raw`(1-p^{3})^{\binom{n}{3}} \;\ge\; \exp\!\left(-2p^{3}\cdot \tfrac{n(n-1)(n-2)}{6}\right) \;\ge\; e^{-p^{3} n^{3}}.`}</Tex>

      <p className="part-label">Part (c). Combine and compare to Janson.</p>

      <p>Combining (a) and (b),</p>
      <Tex block>{String.raw`P(X = 0) \;\ge\; \max\bigl(e^{-pn^{2}},\, e^{-p^{3}n^{3}}\bigr).`}</Tex>
      <p>The two exponents agree when pn² = p³n³, i.e. p = 1/√n. Janson's inequality gives an upper bound P(X = 0) ≤ exp(−μ + Δ/2) with μ = E[X] = C(n,3)p³ ∼ n³p³/6 and Δ = O(n⁴p⁵). In the sparse regime p = c/n, both bounds are e<sup>−Θ(c³)</sup>, so the lower bound matches Janson's upper bound up to constants.</p>

      <p className="qed">∎</p>
    </div>
  )
}

export default function Problem2() {
  useEffect(() => {
    document.title = 'Final Exam Problem 2 — Triangle-Free Lower Bounds'
  }, [])

  const { mode } = useDifficulty()

  return (
    <div className="container container-narrow">

      {/* Header */}
      <div className="label">FINAL EXAM · PROBLEM 2</div>
      <h1>Lower Bounds on P(triangle-free) in G(n,p)</h1>
      <p className="subtitle">
        Three lower bounds on the triangle-free probability in increasing sophistication:
        (a) trivially via "no edges"; (b) via FKG/Harris on the indicator-of-non-presence; (c) combine and compare to Janson's matching upper bound from class.
      </p>

      <DifficultyDial modes={PROOF_MODES} />

      {mode === MODES.PROOF ? <FormalProof /> : (<>

      {/* ============= STEP 0: ORIENT ============= */}
      <Step
        badge="STEP 0"
        title="Orientation — what's G(n,p), what is X, and what are we proving?"
        hint="X counts triangles in a random graph. P(X=0) is the triangle-free probability. Three lower bounds in increasing sophistication."
        decision="Before any inequality work, parse G(n,p), define X precisely, and see why the three parts ladder upward."
      >
        <p>
          <Term tooltip="The Erdos-Renyi random graph: vertex set [n] = {1,...,n}, and each of the C(n,2) potential edges is present independently with probability p. The most-studied probabilistic model of a graph.">G(n,p)</Term>{' '}
          is the Erdős–Rényi random graph: n vertices, each potential edge present independently with probability p. So there are{' '}
          <Term tooltip="C(n,2) = n(n-1)/2 = number of 2-subsets of [n] = number of potential edges in a graph on n labeled vertices.">C(n,2)</Term>{' '}
          independent Bernoulli(p) edge variables.
        </p>

        <p>
          X = number of triangles in G. There are{' '}
          <Term tooltip="C(n,3) = n(n-1)(n-2)/6 = number of 3-subsets of [n] = number of potential triangles. For each 3-subset t, the triangle on t is present iff all 3 of its edges are.">C(n,3) potential triangles</Term>,
          each with probability p³ of being present (its 3 edges are independent Bernoullis). So{' '}
          E[X] = C(n,3) p³ ∼ n³p³/6.
        </p>

        <p>
          {'P(X = 0) is the probability the graph is '}
          <Term tooltip="A graph is triangle-free if it contains no triangle (no 3 vertices all pairwise connected). Triangle-freeness is a fundamental extremal property — the Mantel/Turán theorems are about how dense a triangle-free graph can be.">triangle-free</Term>.
          {' Bounding it is a foundational question in random graph theory: it locates the "triangle threshold."'}
        </p>

        <Callout type="key">
          The three parts give a ladder of sophistication:
          <br /><br />
          <strong>(a)</strong> Throw away all structure: just demand <em>no edges at all</em>. Trivially gives P(X=0) ≥ (1−p)<sup>C(n,2)</sup>.
          <br />
          <strong>(b)</strong> Use the structure: the events {'{'}triangle t absent{'}'} are <em>positively correlated</em> via FKG/Harris. Gives the tighter (1−p³)<sup>C(n,3)</sup>.
          <br />
          <strong>(c)</strong> Take the max of (a) and (b), and compare to Janson's <em>upper</em> bound from class — the bounds match in scaling.
        </Callout>

        <Callout type="connection">
          <strong>Tight connection to Unit 6 Problem 4.</strong> Part (b) is the direct application of the Harris/FKG inequality from Unit 6 P4. Re-reading that page first will make this proof feel like plugging in.
        </Callout>
      </Step>

      {/* ============= SHARED LEMMA ============= */}
      <Step
        badge="LEMMA"
        title="A small log inequality we'll reuse: (1−x)^N ≥ exp(−2xN) for x ∈ [0, 1/2]"
        hint="Taylor: −log(1−x) = x + x²/2 + ⋯ ≤ 2x for x ≤ 1/2. Exponentiate."
        decision="Both (a) and (b) need to convert (1 − something)^(many) into a clean exponential. Derive the inequality once, reuse twice."
      >
        <p>For x ∈ [0, 1/2], we want log(1 − x) ≥ −2x, since then</p>
        <MathBlock>(1 − x)<sup>N</sup> = exp(N log(1 − x)) ≥ exp(−2xN).</MathBlock>

        <Toggle label="Why log(1−x) ≥ −2x for x ∈ [0, 1/2]?">
          Use the Taylor expansion −log(1 − x) = x + x²/2 + x³/3 + ⋯ Each term is nonneg for x ≥ 0, so −log(1 − x) is increasing in x. At x = 1/2, −log(1/2) = log 2 ≈ 0.693, and 2 · (1/2) = 1, so −log(1−x) ≤ 2x at x = 1/2. By convexity of −log(1−x) and tangency at 0, −log(1 − x) ≤ 2x throughout [0, 1/2]. Hence log(1 − x) ≥ −2x.
        </Toggle>

        <Callout type="warning">
          Direction matters: we want a <em>lower</em> bound on (1−x)<sup>N</sup>, which means a <em>lower</em> bound on log(1−x), which is the side log(1−x) ≥ −2x. The opposite-direction bound log(1−x) ≤ −x gives an upper bound on (1−x)<sup>N</sup> — useful for different purposes but not here.
        </Callout>
      </Step>

      {/* ============= PART (a) ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>Part (a) — Trivial bound: no edges ⇒ no triangles</h2>
        <div className="part-goal">
          The cheapest possible bound: drop all structure and just demand the graph have no edges at all. Independence of edges + the lemma gives e<sup>−pn²</sup>.
        </div>
      </div>

      <Step
        badge="A.1"
        title="Triangle-free is implied by edge-free"
        hint="{no edges} ⊆ {X = 0}. So P(X=0) ≥ P(no edges)."
        decision="The hint says it directly: a graph with no edges has no triangles. This is the laziest possible lower bound — but it works."
      >
        <p>If G has no edges, it certainly has no triangles. Set-theoretically:</p>
        <MathBlock>{'{'}no edges{'}'} ⊆ {'{'}X = 0{'}'}</MathBlock>
        <p>Therefore P(X = 0) ≥ P(no edges).</p>
      </Step>

      <Step
        badge="A.2"
        title="P(no edges) = (1 − p)^C(n,2) by edge independence"
        hint="C(n,2) independent Bernoulli(p) edges; each absent with probability 1−p; product."
        decision="Edges are independent in G(n,p); 'no edges' is the intersection of C(n,2) independent absent-edge events; product of probabilities."
      >
        <p>The edges of G(n,p) are a collection of{' '}
          <Term tooltip="Independent random variables: knowing the value of one tells you nothing about the others. In G(n,p), each potential edge is decided by an independent Bernoulli(p) coin flip.">independent Bernoulli(p)</Term>{' '}
          random variables, one for each of the C(n,2) potential edges. The event {'{'}no edges{'}'} is the intersection of C(n,2) "edge absent" events, each with probability 1 − p:
        </p>
        <MathBlock>P(no edges) = (1 − p)<sup>C(n,2)</sup></MathBlock>
      </Step>

      <Step
        badge="A.3"
        title="Convert to e^(−pn²) via the lemma"
        hint="Apply the lemma with x = p, N = C(n,2): (1−p)^C(n,2) ≥ exp(−2p · n(n−1)/2) = e^(−p·n(n−1)) ≥ e^(−pn²)."
        decision="The lemma converts (1 − p)^big to exp(−2p · big). Just plug in N = C(n,2) and simplify."
      >
        <p>With x = p and N = C(n,2) = n(n−1)/2 in the lemma:</p>
        <MathBlock>(1 − p)<sup>C(n,2)</sup> ≥ exp(−2p · n(n−1)/2) = exp(−p · n(n−1)) ≥ exp(−p · n²)</MathBlock>
        <p>where the last step uses n(n−1) ≤ n². So:</p>

        <Callout type="key">
          P(X = 0) ≥ (1 − p)<sup>C(n,2)</sup> ≥ e<sup>−pn²</sup>.   ✓
        </Callout>
      </Step>

      {/* ============= PART (b) ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>Part (b) — Use FKG/Harris to get (1 − p³)^C(n,3)</h2>
        <div className="part-goal">
          The events {'{'}triangle t absent{'}'} are <em>not</em> independent (they share edges), but they are positively correlated. The FKG/Harris inequality from HW 6 P4 = Unit 6 P4 makes this exact.
        </div>
      </div>

      <Step
        badge="B.1"
        title="Set up the indicator decomposition"
        badgeClass="step-badge-b"
        hint="Y_t = 1[triangle t in G]. Then X = Σ_t Y_t and {X=0} = ∩_t {Y_t = 0} = ∩_t {1 − Y_t = 1}."
        decision="Translate 'X = 0' into an intersection of per-triangle events. We'll then bound the intersection via FKG."
      >
        <p>For each 3-subset t ⊆ [n], let</p>
        <MathBlock>Y<sub>t</sub> = 1 iff the triangle on t is present in G.</MathBlock>
        <p>So X = Σ<sub>t</sub> Y<sub>t</sub>, and X = 0 iff every Y<sub>t</sub> = 0:</p>
        <MathBlock>{'{'}X = 0{'}'} = &cap;<sub>t</sub> {'{'}Y<sub>t</sub> = 0{'}'} = &cap;<sub>t</sub> {'{'}1 − Y<sub>t</sub> = 1{'}'}</MathBlock>
        <p>Why rewrite as 1 − Y<sub>t</sub>? Because we want a <em>decreasing</em> function of the edges, which is what FKG/Harris consumes.</p>
      </Step>

      <Step
        badge="B.2"
        title="Show 1 − Y_t is coordinate-wise decreasing in the edges"
        badgeClass="step-badge-b"
        hint="Adding an edge can only turn Y_t from 0 to 1 (never the reverse). So 1 − Y_t can only go from 1 to 0 (or stay) — decreasing."
        decision="FKG needs a monotone function. Y_t is increasing in edges (more edges ⇒ more likely the triangle exists), so 1 − Y_t is decreasing."
      >
        <p>Let X<sub>1</sub>, ..., X<sub>m</sub> be the edge indicators (m = C(n,2)). View Y<sub>t</sub> as a function F<sub>t</sub>(X<sub>1</sub>, ..., X<sub>m</sub>):</p>
        <MathBlock>Y<sub>t</sub> = X<sub>e<sub>1</sub></sub> · X<sub>e<sub>2</sub></sub> · X<sub>e<sub>3</sub></sub></MathBlock>
        <p>where e<sub>1</sub>, e<sub>2</sub>, e<sub>3</sub> are the three edges of the triangle t. So Y<sub>t</sub> is a <em>product of Bernoullis</em>, which is increasing in each X<sub>e</sub>.</p>

        <Callout type="key">
          The function 1 − Y<sub>t</sub> is therefore <strong>coordinate-wise decreasing</strong>: increasing any X<sub>e</sub> from 0 to 1 either keeps 1 − Y<sub>t</sub> the same or drops it from 1 to 0. This monotonicity is the only structural fact FKG needs.
        </Callout>
      </Step>

      <Step
        badge="B.3"
        title="Apply Harris/FKG: positive correlation of decreasing events"
        badgeClass="step-badge-b"
        hint="HW 6 P4 = Unit 6 P4. Decreasing functions of independent variables are positively correlated. Iterate over all C(n,3) functions."
        decision="The edges X_e are independent. The functions 1 − Y_t are all decreasing. Harris/FKG gives the product lower bound."
      >
        <p>From{' '}
          <Term tooltip="The Harris (or FKG for product distributions) inequality: if X_1, ..., X_m are independent and F, G are both coordinate-wise increasing (or both decreasing) functions, then E[F G] ≥ E[F] E[G]. For indicator events this becomes: P(F=1 ∩ G=1) ≥ P(F=1) P(G=1).">Harris/FKG (HW 6 P4 = Unit 6 P4)</Term>{' '}
          on independent edges X<sub>1</sub>, ..., X<sub>m</sub> with C(n,3) decreasing functions F<sub>t</sub> = 1 − Y<sub>t</sub>:</p>

        <MathBlock>P(&cap;<sub>t</sub> {'{'}F<sub>t</sub> = 1{'}'}) ≥ &prod;<sub>t</sub> P(F<sub>t</sub> = 1)</MathBlock>

        <Toggle label="Why does the product inequality extend from 2 to many functions?">
          Apply Harris to F<sub>1</sub> and F<sub>2</sub>·F<sub>3</sub>·⋯·F<sub>k</sub> (still decreasing). Iterate. Each application removes one factor from the right side and adds it to a product:
          P(F<sub>1</sub> · F<sub>2</sub>F<sub>3</sub>⋯F<sub>k</sub>) ≥ P(F<sub>1</sub>) · P(F<sub>2</sub>F<sub>3</sub>⋯F<sub>k</sub>) ≥ P(F<sub>1</sub>) P(F<sub>2</sub>) · P(F<sub>3</sub>⋯F<sub>k</sub>) ≥ ⋯
        </Toggle>
      </Step>

      <Step
        badge="B.4"
        title="Each factor: P(Y_t = 0) = 1 − p³"
        badgeClass="step-badge-b"
        hint="Triangle t has 3 edges, each independently present with prob p. P(triangle present) = p³, so P(Y_t = 0) = 1 − p³."
        decision="Per-triangle probability is a direct calculation from edge independence."
      >
        <p>For a fixed 3-subset t with edges e<sub>1</sub>, e<sub>2</sub>, e<sub>3</sub>:</p>
        <MathBlock>P(Y<sub>t</sub> = 1) = P(X<sub>e<sub>1</sub></sub>=1, X<sub>e<sub>2</sub></sub>=1, X<sub>e<sub>3</sub></sub>=1) = p · p · p = p<sup>3</sup></MathBlock>
        <p>by edge independence. So P(F<sub>t</sub> = 1) = P(Y<sub>t</sub> = 0) = 1 − p³.</p>

        <p>Combining with B.3:</p>
        <MathBlock>P(X = 0) ≥ &prod;<sub>t ∈ C(n,3)</sub> (1 − p<sup>3</sup>) = (1 − p<sup>3</sup>)<sup>C(n,3)</sup></MathBlock>
      </Step>

      <Step
        badge="B.5"
        title="Convert to e^(−p³n³) via the lemma"
        badgeClass="step-badge-b"
        hint="Lemma with x = p³ ≤ 1/8 ≤ 1/2: (1−p³)^C(n,3) ≥ exp(−2p³ · n(n−1)(n−2)/6) ≥ exp(−p³n³)."
        decision="Same lemma, applied to p³ instead of p. n(n−1)(n−2)/3 ≤ n³ closes it out."
      >
        <p>For p ≤ 1/2, p³ ≤ 1/8 ≤ 1/2, so the lemma applies with x = p³, N = C(n,3) = n(n−1)(n−2)/6:</p>
        <MathBlock>(1 − p<sup>3</sup>)<sup>C(n,3)</sup> ≥ exp(−2p<sup>3</sup> · n(n−1)(n−2)/6) = exp(−p<sup>3</sup> · n(n−1)(n−2)/3) ≥ exp(−p<sup>3</sup>n<sup>3</sup>)</MathBlock>
        <p>where the last step uses n(n−1)(n−2)/3 ≤ n³ (in fact ≤ n³/3 + ⋯, but n³ is the loose bound we need).</p>

        <Callout type="key">
          P(X = 0) ≥ (1 − p<sup>3</sup>)<sup>C(n,3)</sup> ≥ e<sup>−p³n³</sup>.   ✓
        </Callout>
      </Step>

      {/* ============= PART (c) ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>Part (c) — Combine and compare to Janson</h2>
        <div className="part-goal">
          Take the better of the two bounds. Find the crossover regime. Compare to Janson's matching upper bound from class.
        </div>
      </div>

      <Step
        badge="C.1"
        title="Combined bound: P(X=0) ≥ max(e^(−pn²), e^(−p³n³))"
        badgeClass="step-badge-c"
        hint="Take the better of the two; crossover where pn² = p³n³, i.e. p = 1/√n."
        decision="Both bounds hold; the larger is tighter. Compare exponents."
      >
        <p>Both bounds hold simultaneously, so:</p>
        <MathBlock>P(X = 0) ≥ max(e<sup>−pn²</sup>, e<sup>−p³n³</sup>)</MathBlock>

        <p>Which is bigger? Compare exponents pn² vs p³n³. Equal when pn² = p³n³, i.e. p²n = 1, i.e. p = 1/√n.</p>

        <ul>
          <li>For p &lt; 1/√n (sparse): p²n &lt; 1 so p³n³ &lt; pn², so e<sup>−p³n³</sup> &gt; e<sup>−pn²</sup>. <strong>(b) is tighter.</strong></li>
          <li>For p &gt; 1/√n (denser): pn² &lt; p³n³, so e<sup>−pn²</sup> &gt; e<sup>−p³n³</sup>. <strong>(a) is tighter.</strong></li>
        </ul>

        <Callout type="intuition">
          The crossover at p = 1/√n is the threshold where graphs start having lots of edges relative to potential triangles. Below it, "no triangles" is best argued by counting triangles; above it, "no triangles" is best argued by demanding outright that there are no edges (which becomes implausible — bound goes to 0).
        </Callout>
      </Step>

      <Step
        badge="C.2"
        title="Compare to Janson's upper bound from class"
        badgeClass="step-badge-c"
        hint="Janson: P(X=0) ≤ exp(−μ + Δ/2) with μ ∼ n³p³/6 and Δ = O(n⁴p⁵). At p = c/n, both bounds are e^(−Θ(c³))."
        decision="Janson is the matching upper bound. At the threshold scale p = c/n, our lower bound and Janson's upper bound have the same exponent Θ(c³)."
      >
        <p>From class:</p>
        <Callout type="connection">
          <strong>Janson's inequality.</strong> If X = Σ<sub>t</sub> Y<sub>t</sub> is a sum of indicators of "subgraph t present in G(n,p)" type events, then
          <MathBlock>P(X = 0) &le; exp(&minus;μ + Δ/2)</MathBlock>
          where μ = E[X] and Δ = Σ<sub>t ∼ t'</sub> P(Y<sub>t</sub> = Y<sub>t'</sub> = 1) summed over <em>distinct</em> triangle pairs sharing an edge.
        </Callout>

        <p>For triangles in G(n,p):</p>
        <ul>
          <li>μ = E[X] = C(n,3) · p³ ∼ n³p³/6.</li>
          <li>Δ counts pairs (t, t') of distinct triangles sharing exactly one edge: there are O(n⁴) such pairs (choose the shared edge, then 2 third vertices), each contributing p<sup>5</sup> (5 distinct edges across the two triangles). So Δ = O(n⁴p⁵).</li>
        </ul>

        <p>At the threshold scale p = c/n:</p>
        <MathBlock>μ ∼ c<sup>3</sup>/6,  Δ ∼ c<sup>5</sup>/n → 0,</MathBlock>
        <p>so Janson gives P(X = 0) ≤ e<sup>−c³/6 + o(1)</sup>.</p>

        <p>Our lower bound (b) at p = c/n: P(X = 0) ≥ e<sup>−p³n³</sup> = e<sup>−c³</sup>.</p>

        <Callout type="key">
          The two bounds agree to within a constant in the exponent: lower bound c³ vs Janson's c³/6. Both say P(X = 0) is exp(−Θ(c³)) at p = c/n. <strong>The threshold for triangle-freeness is exactly p ∼ 1/n, with a clean exponential probability there.</strong>
        </Callout>

        <Toggle label="Why c³ vs c³/6 — is one of them loose?">
          Both. Our lower bound used (1−p³)<sup>C(n,3)</sup> ≥ e<sup>−p³n³</sup>, which loses a factor of 6 from C(n,3) ∼ n³/6. Janson's upper bound is sharp in the exponent up to o(1). So Janson's c³/6 is the truth; our (b) is correct in scaling and only loses a constant. With the Δ term included exactly, Janson is tight.
        </Toggle>
      </Step>

      {/* ============= CLOSING BOXES ============= */}
      <div className="separator"></div>

      <Box label="PROOF AT A GLANCE" labelColor="#7eb8da">
        <div className="proof-summary">
          <div className="comment">// (a) Trivially: no edges ⇒ no triangles</div>
          <div>P(X = 0) ≥ P(no edges) = (1−p)<sup>C(n,2)</sup> ≥ e<sup>−pn²</sup>     [lemma: log(1−p) ≥ −2p]</div>
          <br />
          <div className="comment">// (b) FKG: 1 − Y_t are decreasing in independent edges ⇒ positive correlation</div>
          <div>P(X = 0) = P(∩<sub>t</sub> {'{'}1−Y<sub>t</sub> = 1{'}'}) ≥ ∏<sub>t</sub> P(Y<sub>t</sub> = 0) = (1−p³)<sup>C(n,3)</sup> ≥ e<sup>−p³n³</sup></div>
          <br />
          <div className="comment">// (c) Better of the two; crossover at p = 1/√n; matches Janson's upper bound at p = c/n</div>
          <div>P(X = 0) ≥ max(e<sup>−pn²</sup>, e<sup>−p³n³</sup>);  Janson: P(X=0) ≤ e<sup>−c³/6+o(1)</sup>   □</div>
        </div>
      </Box>

      <Box label="WHY THIS MATTERS" labelColor="#d4a574">
        <p><strong>1. Independence ≠ positive correlation, but FKG handles both.</strong>{' '}
        The triangle indicators Y<sub>t</sub> are NOT independent — different triangles share edges. The naive product (1 − p³)<sup>C(n,3)</sup> would be wrong without justification. FKG/Harris is what justifies it: the right kind of monotonicity gives positive correlation, which gives the product lower bound.</p>

        <p><strong>2. Sandwich → threshold.</strong>{' '}
        Combining a lower bound (here, FKG) with an upper bound (Janson) sandwiches P(X = 0) between matching exponentials at p = c/n. This <em>locates the threshold</em> for triangle-freeness: below p = 1/n it's near 1, above it's near 0. Threshold theorems in random graph theory follow this template.</p>

        <p><strong>3. The lemma is a workhorse.</strong>{' '}
        The (1 − x)<sup>N</sup> ≥ e<sup>−2xN</sup> bound is used everywhere in concentration arguments (Chernoff, balls-into-bins, coupon collector). Worth memorizing as a reflex.</p>

        <p><strong>4. From per-event to global probability.</strong>{' '}
        Each Y<sub>t</sub> is a "small" event (probability p³). The hard part is going from per-triangle probabilities to a probability over the joint configuration of C(n,3) overlapping events. Two routes: (a) ignore structure (loose), (b) use correlation structure (tight). The exam wants you to demonstrate both.</p>
      </Box>

      <Box label="CONNECTIONS" labelColor="#a8d4a0">
        <p>
          <strong>← Unit 6 Problem 4.</strong> The FKG/Harris inequality is proved there in three flavors. (b) of this problem is the most natural application of the C(n,3)-fold "product of decreasing functions" form.
        </p>
        <p>
          <strong>↑ Janson's inequality (class).</strong> The matching upper bound. The pair (FKG-lower, Janson-upper) is the canonical "small subgraph counting" duo.
        </p>
        <p>
          <strong>→ Erdős threshold theorems.</strong> For any subgraph H, there is a "threshold function" p<sub>H</sub>(n) such that G(n,p) contains H whp iff p ≫ p<sub>H</sub>(n). For triangles, p<sub>triangle</sub>(n) = 1/n. The bounds in this problem locate that threshold.
        </p>
        <p>
          <strong>→ Stein–Chen / Poisson approximation.</strong> At p = c/n, X is approximately Poisson(c³/6), so P(X = 0) ≈ e<sup>−c³/6</sup>. Janson's bound and our FKG bound are both quantitative versions of this Poisson heuristic.
        </p>
      </Box>

      <Footer />
      </>)}
    </div>
  )
}
