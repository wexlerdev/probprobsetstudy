import { useEffect } from 'react'
import Toggle from '../../components/Toggle'
import Term from '../../components/Term'
import Callout from '../../components/Callout'
import Step from '../../components/Step'
import MathBlock from '../../components/MathBlock'
import Box from '../../components/Box'
import Footer from '../../components/Footer'
import BottomNav from '../../components/BottomNav'

export default function Problem4() {
  useEffect(() => {
    document.title = 'PS4 Problem 4 — Maximal Degree on Random Graphs'
  }, [])

  return (
    <div className="container">

      {/* Header */}
      <div className="label">PROBLEM SET 4 · PROBLEM 4</div>
      <h1>Maximal Degree on Random Graphs</h1>
      <p className="subtitle">
        In a sparse Erdos-Renyi graph with constant expected degree, the maximum degree
        is Theta(log n / log log n) with high probability.
        This is the "combine everything" problem: Chernoff + union bound + Stirling-type estimates.
      </p>


      {/* ============= SETUP ============= */}
      <div className="part-header">
        <h2>Setup — The Model and the Goal</h2>
        <div className="part-goal">Understanding the random graph, what "constant expected degree" means, and why Theta(log n / log log n) is the answer.</div>
      </div>

      <Step badge="SETUP" title="The random graph G(n, p)">
        <p>We work in the
          <Term tooltip={'The random graph on n labelled vertices where each of the C(n,2) possible edges is included independently with probability p. This is the most fundamental random graph model. The parameter p can depend on n \u2014 that\'s how you explore different density regimes.'} wide>Erdos-Renyi model G(n, p)</Term>.
          The key assumption is that the expected degree is constant:
        </p>
        <MathBlock>d := p(n − 1) = O(1)</MathBlock>

        <p>This means p = d/(n−1) ≈ d/n — the graph is <strong>sparse</strong>. As n → ∞,
        the edge probability shrinks so that each vertex connects to a bounded average number of neighbors.</p>

        <p>For any fixed vertex v, its degree is:</p>
        <MathBlock>deg(v) ~ Binomial(n − 1, p),     E[deg(v)] = d = O(1)</MathBlock>

        <Callout type="intuition">
          <p>With d = O(1), the "typical" vertex has degree around d — a small constant like 3 or 5.
          But with n vertices, <em>some</em> vertex is likely to get lucky and have many more edges
          than average. How lucky can the luckiest vertex get? That's what Δ(G) measures.</p>
          <p>The answer log n / log log n is much larger than d but much smaller than n. It's the
          sweet spot where "a single vertex being this lucky" is improbable but "no vertex among n
          being this lucky" is also improbable.</p>
        </Callout>
      </Step>

      <Step badge="SETUP" title="The goal: Theta means both directions">
        <p>We need to show that with probability ≥ 0.99:</p>
        <MathBlock>Δ(G) = max<sub>v∈V(G)</sub> deg(v) = Θ(log n / log log n)</MathBlock>

        <p>This requires <strong>two bounds</strong>:</p>
        <MathBlock>{'Upper bound:  P(Δ(G) ≥ C · log n / log log n) ≤ 0.01     for some large C\nLower bound:  P(Δ(G) ≤ c · log n / log log n) ≤ 0.01     for some small c'}</MathBlock>

        <p>The upper bound uses <strong>Chernoff + union bound</strong> (bounding the max by bounding each vertex).
        The lower bound uses the <strong>first moment method</strong> (showing at least one vertex likely has high degree).</p>

        <Callout type="warning">
          <p>This is <em>not</em> a second moment method problem. The second moment method proves
          "X {'>'} 0 whp" for a counting variable. Here we're bounding a maximum, which is a different
          beast. The tool is Chernoff applied to each vertex separately, then combined via union bound
          (upper) or counting argument (lower).</p>
        </Callout>
      </Step>

      <Step badge="SETUP" title="The key estimate — tail of a sparse Binomial">
        <p>Everything hinges on understanding P(Bin(n−1, p) ≥ k) when d = p(n−1) = O(1) and k is growing.
        We'll need both upper and lower bounds on this quantity.</p>

        <p><strong>Upper bound on the tail.</strong> For any k ≥ 1:</p>
        <MathBlock>P(Bin(n−1, p) ≥ k) ≤ C(n−1, k) · p<sup>k</sup></MathBlock>

        <p>This drops the (1−p)<sup>n−1−k</sup> factor (which is ≤ 1). Now use the standard
          <Term tooltip={"C(n,k) ≤ (en/k)^k. This follows from: C(n,k) = n!/(k!(n-k)!) ≤ n^k/k! ≤ n^k/(k/e)^k = (en/k)^k, where the last step uses Stirling's approximation k! ≥ (k/e)^k."} wide>binomial coefficient bound</Term>:
        </p>
        <MathBlock>C(n−1, k) · p<sup>k</sup> ≤ (e(n−1)p / k)<sup>k</sup> = (ed/k)<sup>k</sup></MathBlock>

        <p>So:</p>
        <MathBlock>P(deg(v) ≥ k) ≤ (ed/k)<sup>k</sup></MathBlock>

        <p><strong>Lower bound on the tail.</strong> We bound from below using just the single term P(deg(v) = k):</p>
        <MathBlock>P(deg(v) ≥ k) ≥ P(deg(v) = k) = C(n−1, k) · p<sup>k</sup> · (1−p)<sup>n−1−k</sup></MathBlock>

        <p>Since p = d/(n−1) and k = o(n), the last factor satisfies:</p>
        <MathBlock>(1−p)<sup>n−1−k</sup> = (1 − d/(n−1))<sup>n−1−k</sup> ≥ e<sup>−d</sup> · (1 − o(1))</MathBlock>

        <p>For the binomial coefficient, we use the lower bound <span className="math-inline">C(n−1, k) ≥ ((n−1)/k)<sup>k</sup> / e<sup>k</sup></span>
        {' '}(from Stirling). Combined:</p>
        <MathBlock>P(deg(v) = k) ≥ (d/k)<sup>k</sup> · e<sup>−d</sup> · (1 − o(1))     for k = o(n)</MathBlock>

        <Callout type="key">
          <p>Both bounds have the same shape: (const · d/k)<sup>k</sup>. The upper bound has (ed/k)<sup>k</sup>,
          the lower bound has roughly (d/k)<sup>k</sup> · e<sup>−d</sup>. Since d is a constant, these
          differ by at most a constant factor in the exponent. The dominant behavior is (d/k)<sup>k</sup> = exp(−k log(k/d)).</p>
          <p>This is a <em>super-exponential</em> decay in k (the exponent itself grows with k), which is
          faster than Gaussian tails but the key structure is k log k — and that's where log n / log log n comes from.</p>
        </Callout>

        <Toggle label="Connection to Poisson approximation">
          <p>When d = O(1), the Binomial(n−1, d/(n−1)) distribution is well-approximated by
          Poisson(d). For a Poisson with mean d:</p>
          <MathBlock>P(X = k) = e<sup>−d</sup> d<sup>k</sup> / k!</MathBlock>
          <p>By Stirling, k! ≈ (k/e)<sup>k</sup> √(2πk), so:</p>
          <MathBlock>P(X = k) ≈ e<sup>−d</sup> (ed/k)<sup>k</sup> / √(2πk)</MathBlock>
          <p>This matches our binomial estimates. The Poisson approximation makes the algebra cleaner
          and is often used in research, but for a homework proof the direct binomial bounds are more rigorous.
          The Poisson approximation is the subject of Week 11 — you'll see it formalized there.</p>
        </Toggle>
      </Step>


      {/* ============= UPPER BOUND ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>Upper Bound: Δ(G) ≤ C log n / log log n</h2>
        <div className="part-goal">Show that with probability ≥ 0.99, no vertex has degree exceeding C log n / log log n.</div>
      </div>

      <Step badge="U.1" badgeClass="step-badge-upper" title="Union bound over all vertices">
        <p>The maximum degree exceeds k only if <em>some</em> vertex has degree ≥ k:</p>
        <MathBlock>{'P(Δ(G) ≥ k) = P(∃v : deg(v) ≥ k)\n              ≤ Σ'}<sub>v</sub>{' P(deg(v) ≥ k)        (union bound)\n              = n · P(deg(v) ≥ k)            (identical distribution)'}</MathBlock>

        <p>Using our tail bound:</p>
        <MathBlock>P(Δ(G) ≥ k) ≤ n · (ed/k)<sup>k</sup></MathBlock>

        <Callout type="key">
          <p>The union bound is the fundamental tool for bounding maxima. You're trading a hard
          question ("what's the probability the maximum exceeds k?") for an easy one
          ("what's the probability a fixed vertex exceeds k?") at the cost of a factor of n.
          That factor of n is what creates the log n in the threshold.</p>
        </Callout>
      </Step>

      <Step badge="U.2" badgeClass="step-badge-upper" title="Finding the threshold — where does n · (ed/k)^k vanish?">
        <p>We need to find k such that n · (ed/k)<sup>k</sup> ≤ 0.01. Take logarithms:</p>
        <MathBlock>{'log n + k · log(ed/k) ≤ log(0.01)\n\nlog n ≤ k · log(k/(ed))  +  |log(0.01)|\n\nIgnoring the constant |log(0.01)|:\nlog n ≤ k · log(k/(ed))\nlog n ≤ k log k − k log(ed)'}</MathBlock>

        <p>Now set <span className="math-inline">k = C · log n / log log n</span> and check if this works:</p>
        <MathBlock>{'<strong>Compute k log k:</strong>\n\nk log k = (C log n / log log n) · log(C log n / log log n)\n        = (C log n / log log n) · [log C + log log n − log log log n]\n\nThe dominant term is:\n        = (C log n / log log n) · log log n · (1 − o(1))\n        = C log n · (1 − o(1))'}</MathBlock>

        <MathBlock>{'<strong>Compute k log(ed):</strong>\n\nk log(ed) = (C log n / log log n) · log(ed)\n          = O(log n / log log n)       since d = O(1)'}</MathBlock>

        <p>So:</p>
        <MathBlock>{'k log(k/(ed)) = k log k − k log(ed)\n               = C log n · (1 − o(1)) − O(log n / log log n)\n               = C log n · (1 − o(1))'}</MathBlock>

        <p>For this to exceed log n, we need C {'>'} 1 (plus the o(1) terms). Choose any C {'>'} 1:</p>
        <MathBlock>{'n · (ed/k)'}<sup>k</sup>{' ≤ exp(log n − C log n · (1 − o(1)))\n                    = exp(−(C − 1 − o(1)) · log n)\n                    = n'}<sup>−(C−1−o(1))</sup>{'\n                    → 0     as n → ∞'}</MathBlock>

        <p>So for large enough C (any C {'>'} 1 suffices asymptotically):</p>
        <MathBlock>P(Δ(G) ≥ C log n / log log n) ≤ n<sup>−(C−1−o(1))</sup> ≤ 0.01     for large n     □</MathBlock>

        <Callout type="intuition">
          <p>The key computation: k log k ≈ C log n. This is where log n / log log n comes from.
          We need k log k ≈ log n (to cancel the union bound factor of n), and the solution to
          k log k = log n is k ≈ log n / log log n. The log log n in the denominator comes from
          "dividing out" the log k factor.</p>
          <p>This is a self-referential equation: k depends on log k which depends on k. The solution
          is the log n / log log n scale — a characteristic of problems where the tail decays like
          (const/k)<sup>k</sup> (faster than exponential but slower than doubly exponential).</p>
        </Callout>

        <Toggle label="Why is the log log n appearing? A deeper look.">
          <p>The tail P(deg(v) ≥ k) ≈ (ed/k)<sup>k</sup> = exp(−k log(k/ed)). The union bound asks:
          when does n · exp(−k log(k/ed)) vanish? I.e., when does k log(k/ed) {'>'} log n?</p>
          <p>If the tail were merely exponential — like exp(−ck) — then we'd need k {'>'} (log n)/c,
          giving a threshold of Θ(log n). That's what you'd get for, say, Geometric tails.</p>
          <p>But our tail is exp(−k log k), which is <em>super-exponential</em>. The extra log k factor
          means you need less k to overwhelm log n. Specifically, k = log n / log log n gives
          k log k ≈ log n. The log log n discount comes from the super-exponential decay.</p>
          <p>Compare: Gaussian tails give exp(−ck²), leading to thresholds of Θ(√(log n)).
          Our tail is between Gaussian and exponential, so the threshold is between √(log n) and log n.</p>
        </Toggle>
      </Step>


      {/* ============= LOWER BOUND ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>Lower Bound: Δ(G) ≥ c log n / log log n</h2>
        <div className="part-goal">Show that with probability ≥ 0.99, at least one vertex has degree at least c log n / log log n.</div>
      </div>

      <Step badge="L.1" badgeClass="step-badge-lower" title="Count the expected number of high-degree vertices">
        <p>Let X = #{'{'}v ∈ V(G) : deg(v) ≥ k{'}'}. Then:</p>
        <MathBlock>E[X] = n · P(deg(v) ≥ k)</MathBlock>

        <p>Using our lower bound on the tail (from Setup), for k = c · log n / log log n:</p>
        <MathBlock>P(deg(v) ≥ k) ≥ P(deg(v) = k) ≥ (d/k)<sup>k</sup> · e<sup>−d</sup> · (1 − o(1))</MathBlock>

        <p>Taking logs, with k = c log n / log log n:</p>
        <MathBlock>{'log P(deg(v) ≥ k) ≥ k log(d/k) − d + o(1)\n                    = −k log(k/d) − d + o(1)\n                    = −k log k + k log d − d + o(1)'}</MathBlock>

        <p>Using the same computation as the upper bound (k log k = c log n · (1 − o(1))):</p>
        <MathBlock>{'log P(deg(v) ≥ k) ≥ −c log n · (1 − o(1)) + O(log n / log log n) − d\n                    = −c log n · (1 − o(1))'}</MathBlock>

        <p>Therefore:</p>
        <MathBlock>{'log E[X] = log n + log P(deg(v) ≥ k)\n           ≥ log n − c log n · (1 − o(1))\n           = (1 − c) log n · (1 + o(1))'}</MathBlock>

        <Callout type="key">
          <p>For c {'<'} 1: log E[X] ≈ (1−c) log n → ∞, so E[X] → ∞.
          The expected number of vertices with degree ≥ c log n / log log n grows polynomially in n.</p>
          <p>For c {'>'} 1: log E[X] ≈ (1−c) log n → −∞, so E[X] → 0, and by
          <Term tooltip={"P(X ≥ 1) ≤ E[X]. If E[X] → 0, then P(X ≥ 1) → 0, i.e., X = 0 whp. This is the \"first moment method\" — if the expected count vanishes, the thing doesn't exist."} wide>Markov's inequality (first moment method)</Term>,
          X = 0 whp. So the threshold between "high-degree vertices exist" and "they don't" is
          at c = 1 (up to the constant depending on d).</p>
        </Callout>
      </Step>

      <Step badge="L.2" badgeClass="step-badge-lower" title="From E[X] → ∞ to P(X ≥ 1) → 1">
        <p>E[X] → ∞ tells us there are many high-degree vertices <em>in expectation</em>. But we need
        to show that at least one actually exists with high probability. There are several ways to make
        this rigorous.</p>

        <p><strong>Approach: Second moment method.</strong> We show P(X ≥ 1) ≥ E[X]²/E[X²] → 1
        by bounding E[X²].</p>
        <MathBlock>{'X = Σ'}<sub>v</sub>{' \u{1D7D9}{deg(v) ≥ k}\n\nE[X²] = Σ'}<sub>v,w</sub>{' P(deg(v) ≥ k AND deg(w) ≥ k)'}</MathBlock>

        <p>Split into diagonal and off-diagonal:</p>
        <MathBlock>{'E[X²] = Σ'}<sub>v</sub>{' P(deg(v) ≥ k) + Σ'}<sub>v≠w</sub>{' P(deg(v) ≥ k, deg(w) ≥ k)\n       = E[X] + Σ'}<sub>v≠w</sub>{' P(deg(v) ≥ k, deg(w) ≥ k)'}</MathBlock>

        <p>For distinct vertices v and w, their degrees share at most one edge (the edge {'{'}v,w{'}'}).
        Conditioning on whether this edge is present:</p>
        <MathBlock>{'P(deg(v) ≥ k, deg(w) ≥ k)\n\n= p · P(deg(v) ≥ k, deg(w) ≥ k | edge {v,w} present)\n+ (1−p) · P(deg(v) ≥ k, deg(w) ≥ k | edge {v,w} absent)'}</MathBlock>

        <p>Conditioned on the edge {'{'}v,w{'}'} status, the remaining edges incident to v and to w are
        <strong>independent</strong> (they involve disjoint edge sets). So:</p>
        <MathBlock>{"≤ p · P(deg(v) ≥ k | edge present) · P(deg(w) ≥ k | edge present)\n+ (1−p) · P(deg(v) ≥ k | edge absent) · P(deg(w) ≥ k | edge absent)\n\n≤ p · P(deg'(v) ≥ k−1) · P(deg'(w) ≥ k−1) + (1−p) · [P(deg(v) ≥ k)]²"}</MathBlock>

        <p>where deg'(v) ~ Bin(n−2, p) denotes the degree from edges <em>other than</em> {'{'}v,w{'}'}.</p>

        <Callout type="intuition">
          <p>The point: two vertex degrees are "almost independent" because they share at most one edge.
          The correlation comes entirely from whether edge {'{'}v,w{'}'} exists. Conditioning on it makes
          the remaining degrees independent.</p>
          <p>In the sparse regime (p → 0), the correction from the shared edge is negligible:
          knowing edge {'{'}v,w{'}'} exists raises each degree by 1, but we need degree ≥ k which is large,
          so the effect is tiny.</p>
        </Callout>

        <p>For the dominant (1−p) term: (1−p) · [P(deg(v) ≥ k)]² ≤ [P(deg(v) ≥ k)]² = q² where q = P(deg(v) ≥ k).</p>

        <p>For the p term: P(deg'(v) ≥ k−1) ≤ P(deg(v) ≥ k−1) ≤ (ed/(k−1))<sup>k−1</sup>.
        Since k → ∞, this is at most (1 + o(1)) · (ed/k)<sup>k</sup> · (k/ed) = O(q · k).
        So the p term contributes at most p · O(q·k)² = O(p k² q²).</p>

        <p>Summing over all pairs:</p>
        <MathBlock>{'E[X²] ≤ E[X] + n² q² · (1 + O(pk²))\n       = E[X] + E[X]² · (1 + O(pk²))'}</MathBlock>

        <p>Since p = d/(n−1) and k = O(log n / log log n):</p>
        <MathBlock>pk² = O(log²n / (n · log²log n)) → 0</MathBlock>

        <p>Therefore E[X²] ≤ E[X] + E[X]² · (1 + o(1)), and:</p>
        <MathBlock>{'E[X]² / E[X²] ≥ E[X]² / (E[X] + E[X]²(1 + o(1)))\n               = 1 / (1/E[X] + 1 + o(1))\n               → 1     since E[X] → ∞'}</MathBlock>

        <p>By Paley-Zygmund:</p>
        <MathBlock>{'P(Δ(G) ≥ k) = P(X ≥ 1) ≥ E[X]²/E[X²] → 1\n\nIn particular, P(Δ(G) ≥ c log n / log log n) ≥ 0.99 for large n.     □'}</MathBlock>

        <Toggle label="Alternative approach: Poisson approximation">
          <p>In the sparse regime d = O(1), the degree sequence of G(n,p) converges to n independent
          Poisson(d) variables (this is a theorem, proved rigorously via coupling). Under this
          approximation:</p>
          <MathBlock>P(Δ {'<'} k) ≈ (1 − q)<sup>n</sup> ≤ exp(−nq)</MathBlock>
          <p>When nq → ∞ (which happens for c {'<'} 1), this goes to 0. This avoids the second moment
          computation entirely, but relies on the Poisson approximation theorem which is Week 11 material.
          For this homework, the second moment approach is more self-contained.</p>
        </Toggle>

        <Toggle label="Wait — didn't you say this ISN'T a second moment problem?">
          <p>Good catch. In the setup, I said "this is not a second moment method problem" because
          the <em>primary</em> structure is Chernoff + union bound (for the upper bound, which is the harder
          and more instructive direction). The lower bound does use the second moment method, but in a
          supporting role — it's verifying that E[X] → ∞ actually implies X {'>'} 0, rather than being the
          main technique.</p>
          <p>The distinction: in a "second moment method problem" (like proving triangles exist in G(n,p)
          above threshold), the whole difficulty is in computing E[X²]. Here, the second moment
          computation is almost trivial because the correlations are so weak (shared single edge).
          The real work is in the Chernoff/Stirling estimates that determine the threshold.</p>
        </Toggle>
      </Step>


      {/* ============= COMBINE ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>Combining Both Bounds</h2>
        <div className="part-goal">Putting upper and lower together to get Θ.</div>
      </div>

      <Step badge="FINAL" title="Conclusion">
        <p>Choose C {'>'} 1 and c {'<'} 1 (both depending on d). For large enough n:</p>
        <MathBlock>{'P(Δ(G) > C log n / log log n)  ≤  0.005     (upper bound)\nP(Δ(G) < c log n / log log n)  ≤  0.005     (lower bound)\n\nBy union bound:\nP(c log n/log log n ≤ Δ(G) ≤ C log n/log log n) ≥ 1 − 0.01 = 0.99\n\n∴  Δ(G) = Θ(log n / log log n)  with probability ≥ 0.99     □'}</MathBlock>
      </Step>


      {/* ============= CONTEXT BOXES ============= */}
      <div className="separator"></div>

      <Box label="PROOF AT A GLANCE" labelColor="#7eb8da">
        <div className="proof-summary">
          <div className="comment">// Key tail estimate</div>
          <div>P(deg(v) ≥ k) ≈ (ed/k)<sup>k</sup>,     d = p(n−1) = O(1)</div>
          <div>&nbsp;</div>
          <div className="comment">// Upper bound: union bound</div>
          <div>P(Δ ≥ k) ≤ n · (ed/k)<sup>k</sup></div>
          <div>Set k = C log n / log log n, C {'>'} 1:</div>
          <div>  k log(k/(ed)) ≈ C log n {'>'} log n  ✓</div>
          <div>  → P(Δ ≥ k) ≤ n<sup>−(C−1)</sup> → 0</div>
          <div>&nbsp;</div>
          <div className="comment">// Lower bound: expected # high-degree vertices</div>
          <div>E[#{'{'}deg(v) ≥ k{'}'}] = n · P(deg(v) ≥ k) = n<sup>1−c+o(1)</sup></div>
          <div>Set k = c log n / log log n, c {'<'} 1:</div>
          <div>  → E → ∞, second moment → P(Δ ≥ k) → 1</div>
          <div>&nbsp;</div>
          <div className="comment">// Combine</div>
          <div>c log n/log log n ≤ Δ(G) ≤ C log n/log log n  whp     □</div>
        </div>
      </Box>

      <Box label="WHY VALETTAS ASSIGNED THIS" labelColor="#d4a574">
        <p><strong>1. It synthesizes everything.</strong> Problem 1 gave you the tail-sum formula.
        Problem 2 gave you Chernoff bounds. Problem 3 showed a direct application. Problem 4 requires
        you to combine Chernoff with a union bound and Stirling-type estimates to solve a non-trivial
        structural question about random graphs. This is the "final boss" of the problem set.</p>

        <p><strong>2. The log n / log log n threshold is a benchmark.</strong> This specific scale appears
        throughout probabilistic combinatorics — max load in balls-and-bins, height of random trees,
        longest increasing subsequence variants. Whenever you see (const/k)<sup>k</sup> tails plus a
        union bound over n objects, you get log n / log log n. Valettas wants this to become a reflex.</p>

        <p><strong>3. Upper and lower bounds teach different skills.</strong> The upper bound is a clean
        application of tools you already have (Chernoff + union bound). The lower bound forces you to
        think about existence — how do you show something <em>must</em> happen, not just that it might?
        This is the first/second moment method in action, connecting back to Week 5.</p>

        <p><strong>4. The computation is the point.</strong> Unlike Problem 3 (which was conceptually rich
        but computationally trivial), this problem forces you to get your hands dirty with logarithms
        and asymptotics. Showing k log k ≈ C log n when k = C log n / log log n is a calculation
        you need to be able to do fluently. It's messy, and that's intentional.</p>
      </Box>

      <Box label="CONNECTIONS AND CONTEXT" labelColor="#a8d4a0">
        <p><strong>→ Week 8 (Balls and Bins).</strong> The classical "birthday problem" variant:
        throw n balls into n bins. The max load is Θ(log n / log log n). This is the <em>same problem</em>
        {' '}in disguise — the number of balls in bin i is Binomial(n, 1/n) with mean 1, and the max over
        all bins follows the same analysis. When you hit Week 11, you'll see this again.</p>

        <p><strong>→ Week 10 (Chromatic number concentration).</strong> The chromatic number χ(G(n,p))
        concentrates around its mean — but proving this requires martingale methods (Azuma/McDiarmid),
        not Chernoff. The max degree Δ(G) gives a trivial upper bound χ(G) ≤ Δ(G) + 1, so this
        problem tells you χ(G) ≤ O(log n / log log n) for free. The actual chromatic number is much
        smaller (≈ n/(2 log n) for dense graphs), which shows this bound is very loose.</p>

        <p><strong>→ The threshold hierarchy.</strong> Different tail behaviors give different thresholds
        under union bounds over n events. Your intuition should be:</p>
        <MathBlock>{'Tail type         Threshold for max\n─────────────────────────────────────\nGaussian:  exp(−ck²)     →  Θ(√(log n))\nSub-exp:   (c/k)'}<sup>k</sup>{'        →  Θ(log n / log log n)   ← this problem\nExponential: exp(−ck)    →  Θ(log n)\nPolynomial:  k'}<sup>−α</sup>{'        →  Θ(n'}<sup>1/α</sup>{')'}</MathBlock>

        <p>Each row says: if P(X ≥ k) has this tail decay, and you take the max of n independent copies,
        the max lives at that threshold. The heavier the tail, the larger the max. This table is worth
        memorizing — it tells you instantly what scale to expect whenever you see "max of n things."</p>
      </Box>

      <BottomNav />
      <Footer />

    </div>
  )
}
