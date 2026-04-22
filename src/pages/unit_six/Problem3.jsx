import { useEffect } from 'react'
import DifficultyDial from '../../components/DifficultyDial'
import Toggle from '../../components/Toggle'
import Term from '../../components/Term'
import Callout from '../../components/Callout'
import Step from '../../components/Step'
import MathBlock from '../../components/MathBlock'
import Box from '../../components/Box'
import Footer from '../../components/Footer'

export default function Problem3() {
  useEffect(() => {
    document.title = 'PS6 Problem 3 — Discrepancy via the Lovász Local Lemma'
  }, [])

  return (
    <div className="container container-narrow">

      {/* Header */}
      <div className="label">PROBLEM SET 6 · PROBLEM 3</div>
      <h1>Discrepancy of Bounded-Degree Set Systems via the Lovász Local Lemma</h1>
      <p className="subtitle">
        Prove that if 𝒜 is a family of m-element sets in [N] and every point appears in at most t
        of them, then there is a ±1 coloring of [N] whose imbalance over every A ∈ 𝒜 is at most
        O(√(m log(mt))). The union bound is too weak; the Lovász Local Lemma is the right tool.
      </p>

      <DifficultyDial />

      {/* ============= ORIENT ============= */}
      <Step
        badge="STEP 0"
        title="Orientation — what's a set system, what's discrepancy, and why LLL?"
        hint="Parse the objects: set system 𝒜, m-uniform, degree t, the quantity disc(𝒜). Strategy: random ±1 coloring + LLL."
        decision="Four new things to define — the set system, uniformity, degree, and discrepancy — before any proof starts. Then the roadmap: why the union bound fails and why LLL is the right hammer for this problem's dependency structure."
      >
        <p><strong>The set system.</strong> A{' '}
          <Term wide tooltip="A set system (or hypergraph) on ground set [N] = {1, 2, ..., N} is just a collection 𝒜 = {A_1, A_2, ...} of subsets of [N]. Each A_i is called a 'hyperedge' or simply a 'set.' The same element can appear in multiple hyperedges. Different from a graph: hyperedges can have any size, not just 2.">set system</Term>
          {' '}𝒜 on the ground set [N] = {'{'}1, 2, ..., N{'}'} is a collection of subsets of [N]. We're given two structural assumptions:</p>
        <ul>
          <li><strong>m-uniform:</strong> every A ∈ 𝒜 has exactly m elements. |A| = m for every A.</li>
          <li><strong>Degree ≤ t:</strong> every element i ∈ [N] appears in at most t of the sets in 𝒜. In symbols, |{'{'}A ∈ 𝒜 : i ∈ A{'}'}| ≤ t for every i.</li>
        </ul>
        <p>We also assume t ≤ |𝒜| — i.e., the family is large enough that the degree bound is actually binding (otherwise the problem is trivial).</p>

        <p><strong>Discrepancy.</strong> Assign each element i ∈ [N] a sign χ(i) ∈ {'{'}−1, +1{'}'}. For a set A, the <em>imbalance</em> over A is</p>
        <MathBlock>Σ<sub>i ∈ A</sub> χ(i) = (# of +1's in A) − (# of −1's in A).</MathBlock>
        <p>The{' '}
          <Term wide tooltip="The discrepancy of a set system 𝒜 is disc(𝒜) = min_{χ : [N] → {−1,+1}} max_{A ∈ 𝒜} |Σ_{i ∈ A} χ(i)|. It measures how evenly you can two-color [N] so that every A ∈ 𝒜 is balanced. Low discrepancy = nicely balanced colorings exist; high discrepancy = some set is always badly skewed. Discrepancy theory is a major field; Spencer's 6σ√n theorem is its most famous result.">discrepancy</Term>
          {' '}is the worst-case imbalance, minimized over all colorings:</p>
        <MathBlock>disc(𝒜) = min<sub>χ : [N] → {'{'}−1, +1{'}'}</sub> max<sub>A ∈ 𝒜</sub> |Σ<sub>i ∈ A</sub> χ(i)|.</MathBlock>

        <p>Our goal: show disc(𝒜) = O(√(m log(mt))). That is, there exists at least one coloring χ whose worst-case imbalance is at most C √(m log(mt)) for some universal constant C.</p>

        <Callout type="intuition">
          <p>Think of [N] as a collection of students and 𝒜 as the class rosters for m-student classes. Each student takes at most t classes. You want to split students into two teams (±1) so that every class is close to evenly split. Discrepancy measures how unfair the worst class is in the best possible split. The claim: <em>you can always split so that no class's imbalance exceeds O(√(m log(mt)))</em> — a bound that grows only like the square root of class size (up to a log factor), independent of how many classes there are (apart from the log term).</p>
        </Callout>

        <p><strong>Why the union bound fails.</strong> The natural approach — pick χ uniformly at random and union-bound over all sets — breaks because |𝒜| can be much larger than t. For a random χ, a single set A has imbalance concentrated on scale √m (standard central-limit reasoning). The probability |Σ<sub>i∈A</sub> χ(i)| {'>'} λ is roughly e<sup>−λ²/(2m)</sup>. The union bound gives |𝒜| · e<sup>−λ²/(2m)</sup>, which requires λ = Ω(√(m log |𝒜|)) — potentially much worse than √(m log(mt)) if |𝒜| is huge.</p>

        <p>The{' '}
          <Term wide tooltip="The Lovász Local Lemma (1975, László Lovász). Informal version: when rare bad events are each independent of all but a few other bad events, they can all be simultaneously avoided with positive probability — even when their union-bound total exceeds 1. Formally (symmetric version): if each event B_i has P(B_i) ≤ p and is mutually independent of all but ≤ d other B_j, then e · p · (d+1) ≤ 1 implies P(none of the B_i occurs) > 0. The magic: you trade global dependence (too many events) for local dependence (each event only 'sees' a few others).">Lovász Local Lemma</Term>
          {' '}fixes this: if the bad events are <em>locally</em> dependent — i.e., each A interacts with only a few other A' — the effective "number of competitors" is the local dependency degree, not the global |𝒜|. For our problem the local degree is ≤ mt (as we'll see), so the LLL bound ends up at √(m log(mt)).</p>

        <p><strong>Strategy overview.</strong></p>
        <ol>
          <li>Randomize: χ(i) iid uniform in {'{'}−1, +1{'}'}.</li>
          <li>Define bad events B<sub>A</sub> = {'{'}|Σ<sub>i∈A</sub> χ(i)| {'>'} λ{'}'}, one per set A ∈ 𝒜. Bound P(B<sub>A</sub>) via Hoeffding.</li>
          <li>Identify the dependency structure: B<sub>A</sub> and B<sub>A'</sub> are independent when A ∩ A' = ∅. Count: each B<sub>A</sub> depends on ≤ mt others.</li>
          <li>State the symmetric LLL. Choose λ so the LLL hypothesis e·p·(d+1) ≤ 1 holds.</li>
          <li>Conclude: with positive probability, no B<sub>A</sub> occurs — i.e., some χ achieves max imbalance ≤ λ. Hence disc(𝒜) ≤ λ = O(√(m log(mt))).</li>
        </ol>
      </Step>


      {/* ============= STEP 1: RANDOMIZE ============= */}
      <Step
        badge="STEP 1"
        title="Randomize the coloring"
        hint="Let χ(1), ..., χ(N) be independent uniform ±1."
        decision="Discrepancy is a min over colorings; we don't have to name the good coloring. Probabilistic method: show a random coloring has the desired property with positive probability."
      >
        <p>Let χ(1), χ(2), ..., χ(N) be independent random variables, each uniformly distributed on {'{'}−1, +1{'}'}:</p>
        <MathBlock>P(χ(i) = +1) = P(χ(i) = −1) = 1/2,      independent across i.</MathBlock>

        <p>This is the{' '}
          <Term wide tooltip="A proof technique pioneered by Paul Erdős: to show an object with a desired property exists, show that a random object has that property with positive probability. You never find the object explicitly — you just prove the haystack contains a needle. Used in nearly every existence proof in combinatorics that doesn't come with a construction.">probabilistic method</Term>
          {' '}in its standard opening move. We never name the good coloring; we just show one must exist.</p>

        <p>For any set A ∈ 𝒜 of size m, define the <em>signed sum</em></p>
        <MathBlock>Z<sub>A</sub> = Σ<sub>i ∈ A</sub> χ(i).</MathBlock>
        <p>This is a sum of m independent ±1 random variables. By linearity of expectation, E[Z<sub>A</sub>] = 0, and because the χ(i) are independent, Var(Z<sub>A</sub>) = m. We'll need sharp control of its tail — Hoeffding gives it.</p>
      </Step>


      {/* ============= STEP 2: HOEFFDING ============= */}
      <Step
        badge="STEP 2"
        title="Bound P(|Z_A| > λ) by Hoeffding's inequality"
        hint="For m iid ±1 variables: P(|Z_A| > λ) ≤ 2 exp(−λ² / (2m))."
        decision="Z_A is a sum of bounded independent zero-mean variables — exactly the setting for Hoeffding (or equivalently, Chernoff for symmetric Bernoullis). This gives Gaussian-tailed concentration of Z_A around 0."
      >
        <p>By{' '}
          <Term wide tooltip="Hoeffding's inequality (1963). For independent random variables X_1, ..., X_m with a_i ≤ X_i ≤ b_i almost surely: P(|Σ (X_i − E[X_i])| ≥ λ) ≤ 2 exp(−2λ² / Σ(b_i − a_i)²). For ±1 variables (a_i = −1, b_i = +1, mean 0) this gives the ≤ 2 exp(−λ²/(2m)) form used here. Hoeffding is the standard concentration bound for bounded-range sums.">Hoeffding's inequality</Term>
          {' '}applied to the independent ±1 variables χ(i) for i ∈ A (m of them, each bounded in [−1, +1], each mean 0):</p>
        <MathBlock>P(|Z<sub>A</sub>| {'>'} λ) ≤ 2 exp(−λ² / (2m))      for all λ {'>'} 0.</MathBlock>

        <Toggle label="Quick derivation (Chernoff/MGF route)">
          <p>For s {'>'} 0, by Markov applied to e<sup>sZ<sub>A</sub></sup>:</p>
          <MathBlock>P(Z<sub>A</sub> {'>'} λ) ≤ e<sup>−sλ</sup> E[e<sup>sZ<sub>A</sub></sup>] = e<sup>−sλ</sup> ∏<sub>i ∈ A</sub> E[e<sup>s χ(i)</sup>] = e<sup>−sλ</sup> (cosh s)<sup>m</sup>.</MathBlock>
          <p>(The product factors because the χ(i) are independent; E[e<sup>s χ</sup>] = (e<sup>s</sup> + e<sup>−s</sup>)/2 = cosh s for a symmetric Bernoulli.)</p>
          <p>Now use cosh s ≤ e<sup>s²/2</sup> (by comparing Taylor series term by term):</p>
          <MathBlock>P(Z<sub>A</sub> {'>'} λ) ≤ e<sup>−sλ + ms²/2</sup>.</MathBlock>
          <p>Optimize the exponent over s: −sλ + ms²/2 is minimized at s = λ/m, giving exponent −λ²/(2m). So P(Z<sub>A</sub> {'>'} λ) ≤ e<sup>−λ²/(2m)</sup>. The two-sided bound doubles this: P(|Z<sub>A</sub>| {'>'} λ) ≤ 2 e<sup>−λ²/(2m)</sup>.</p>
        </Toggle>

        <p>Set</p>
        <MathBlock>p := 2 exp(−λ² / (2m)).</MathBlock>
        <p>Then for every A ∈ 𝒜, the "bad event" B<sub>A</sub> = {'{'}|Z<sub>A</sub>| {'>'} λ{'}'} has probability ≤ p. This p is the first of the two quantities the LLL hypothesis needs; the second is the dependency degree d.</p>
      </Step>


      {/* ============= STEP 3: DEPENDENCY ============= */}
      <Step
        badge="STEP 3"
        title="Identify the dependency structure — each B_A depends on ≤ mt others"
        hint="B_A depends only on χ(i) for i ∈ A. If A ∩ A' = ∅, then B_A and B_{A'} are independent. Count sets that share at least one point with A: at most m(t−1) ≤ mt."
        decision="LLL's power comes from 'events depend on few others.' The hypothesis 'every element in at most t sets' is exactly what makes this dependency degree polynomial in m and t — rather than growing with |𝒜|."
      >
        <p>The event B<sub>A</sub> is determined by the values of χ(i) for i ∈ A — nothing else. If A' is another set with A ∩ A' = ∅, the events B<sub>A</sub> and B<sub>A'</sub> depend on disjoint blocks of the independent χ's, so they are mutually independent.</p>

        <p>The bad events B<sub>A</sub> and B<sub>A'</sub> can fail to be independent only when A ∩ A' ≠ ∅. Count: how many A' ∈ 𝒜 (with A' ≠ A) intersect A?</p>

        <p>Every A' ≠ A with A' ∩ A ≠ ∅ must contain at least one i ∈ A. For each i ∈ A, the degree bound says i lies in at most t sets total (including A itself), so i lies in at most t − 1 sets <em>other</em> than A. Summing over i ∈ A:</p>
        <MathBlock>|{'{'}A' ≠ A : A' ∩ A ≠ ∅{'}'}| ≤ Σ<sub>i ∈ A</sub> (t − 1) = m(t − 1) ≤ mt.</MathBlock>

        <p>(The inequality is an overcount because a single A' meeting A in two or more points gets counted multiple times, but that only tightens the bound in our favor.)</p>

        <p>So each B<sub>A</sub> is mutually independent of all but at most</p>
        <MathBlock>d := mt</MathBlock>
        <p>other bad events — this is the dependency degree we'll feed into LLL.</p>

        <Callout type="key">
          <p>This is the payoff for the degree-t hypothesis. Without it, every pair of sets could in principle share elements, giving d as large as |𝒜|. The degree bound forces d = O(mt) regardless of |𝒜|, which is what lets LLL beat the union bound for large |𝒜|.</p>
        </Callout>
      </Step>


      {/* ============= STEP 4: STATE LLL ============= */}
      <Step
        badge="STEP 4"
        title="State the symmetric Lovász Local Lemma"
        hint="If each B_i has P(B_i) ≤ p and is mutually independent of all but ≤ d others, then e · p · (d+1) ≤ 1 ⟹ P(no B_i occurs) > 0."
        decision="LLL is the right hammer when union bound gives > 1 but bad events are only locally dependent. State the symmetric form; plug in p and d next."
      >
        <Callout type="connection">
          <p><strong>Symmetric Lovász Local Lemma.</strong> Let B<sub>1</sub>, B<sub>2</sub>, ..., B<sub>M</sub> be events in a probability space. Suppose:</p>
          <ul>
            <li>P(B<sub>i</sub>) ≤ p for every i, and</li>
            <li>Each B<sub>i</sub> is mutually independent of all but at most d other B<sub>j</sub>.</li>
          </ul>
          <p>If</p>
          <MathBlock>e · p · (d + 1) ≤ 1,</MathBlock>
          <p>then</p>
          <MathBlock>P(⋂<sub>i=1</sub><sup>M</sup> ¬B<sub>i</sub>) {'>'} 0 ,</MathBlock>
          <p>i.e., there is a positive probability that none of the bad events occur. In particular, some outcome avoids all B<sub>i</sub>.</p>
        </Callout>

        <Toggle label="Proof sketch of the symmetric LLL">
          <p>The proof is by induction on the size of subsets S of indices. The central claim:</p>
          <MathBlock>P(B<sub>i</sub> | ⋂<sub>j ∈ S</sub> ¬B<sub>j</sub>) ≤ 1/(d+1)      for every i ∉ S and every S.</MathBlock>
          <p>Base: S = ∅, and we use e·p·(d+1) ≤ 1 ⟹ p ≤ 1/(e(d+1)) ≤ 1/(d+1). Inductive step: split S into S<sub>1</sub> (neighbors of B<sub>i</sub> in the dependency graph) and S<sub>2</sub> (non-neighbors). Bound P(B<sub>i</sub> | ⋂ ¬B) using the chain rule and the IH for S<sub>1</sub>, and use independence of B<sub>i</sub> from S<sub>2</sub>.</p>
          <p>Once the claim is proven, the chain rule gives</p>
          <MathBlock>P(⋂<sub>i</sub> ¬B<sub>i</sub>) = ∏<sub>i</sub> P(¬B<sub>i</sub> | ⋂<sub>j {'<'} i</sub> ¬B<sub>j</sub>) ≥ ∏<sub>i</sub> (1 − 1/(d+1)) {'>'} 0.</MathBlock>
          <p>See Alon &amp; Spencer, <em>The Probabilistic Method</em>, Ch. 5 for full detail.</p>
        </Toggle>

        <p>We'll apply this with the bad events B<sub>A</sub>, with p = 2 e<sup>−λ²/(2m)</sup> and d = mt.</p>
      </Step>


      {/* ============= STEP 5: CHOOSE λ ============= */}
      <Step
        badge="STEP 5"
        title="Choose λ to satisfy the LLL hypothesis"
        hint="Need e · 2 e^{−λ²/(2m)} · (mt + 1) ≤ 1. Solve for λ²: λ² ≥ 2m(1 + ln 2 + ln(mt + 1)) = O(m log(mt))."
        decision="The hypothesis e·p·(d+1) ≤ 1 is the one condition we can tune. Substitute our p and d, take logarithms, solve for λ. The answer is λ = O(√(m log(mt)))."
      >
        <p>Plug p = 2 e<sup>−λ²/(2m)</sup> and d = mt into the LLL hypothesis:</p>
        <MathBlock>e · 2 e<sup>−λ²/(2m)</sup> · (mt + 1) ≤ 1.</MathBlock>

        <p>Take logarithms (both sides positive):</p>
        <MathBlock>ln(2 e (mt + 1)) − λ²/(2m) ≤ 0</MathBlock>
        <MathBlock>⟺      λ² ≥ 2m · ln(2 e (mt + 1)).</MathBlock>

        <p>Expand ln(2 e (mt + 1)) = 1 + ln 2 + ln(mt + 1):</p>
        <MathBlock>λ² ≥ 2m · (1 + ln 2 + ln(mt + 1)).</MathBlock>

        <p>For any regime where mt grows (say mt ≥ 2), ln(mt + 1) ≥ ln(mt) − ln(1 + 1/mt) = Θ(ln(mt)), so the dominant term is 2m · ln(mt). We can write: there exists a universal constant C {'>'} 0 (depending only on the absorbed constants) such that</p>
        <MathBlock>λ = C √(m log(mt))</MathBlock>
        <p>satisfies the LLL hypothesis for all sufficiently large mt.</p>

        <Toggle label="What does 'large enough C' actually mean quantitatively?">
          <p>Set λ² = 2m · (1 + ln 2 + ln(mt + 1)) (the minimal valid choice). If mt ≥ 2, then mt + 1 ≤ (mt)² / 2 · 2 = 2 · mt for small regimes, and more generally 1 + ln 2 + ln(mt + 1) ≤ 3 ln(mt) for mt ≥ 10. So λ² ≤ 6 m ln(mt), i.e., λ ≤ √6 · √(m ln(mt)) ≈ 2.45 √(m ln(mt)). Taking C = 3 (to leave room) makes the LLL hypothesis hold for all mt ≥ some small threshold.</p>
          <p>The small-mt regime is handled by the same formula with a slightly larger C; absorbing all the slack gives a universal C valid for all m, t ≥ 2. The exact numerical value is not important for the O-notation conclusion.</p>
        </Toggle>
      </Step>


      {/* ============= STEP 6: CONCLUDE ============= */}
      <Step
        badge="STEP 6"
        title="Conclude — some coloring has discrepancy at most λ"
        hint="By LLL, P(no B_A occurs) > 0 ⟹ some χ has max_A |Z_A| ≤ λ = O(√(m log(mt)))."
        decision="The LLL hypothesis holds (Step 5), so the conclusion applies (Step 4). Some outcome — i.e., some χ — avoids every bad event. That's the coloring we wanted."
      >
        <p>By Steps 2–5, the symmetric LLL applies to the events {'{'}B<sub>A</sub>{'}'}<sub>A ∈ 𝒜</sub> with p = 2 e<sup>−λ²/(2m)</sup> and d = mt. Hence</p>
        <MathBlock>P(⋂<sub>A ∈ 𝒜</sub> ¬B<sub>A</sub>) {'>'} 0.</MathBlock>

        <p>Unpack: with positive probability, for every A ∈ 𝒜, |Z<sub>A</sub>| ≤ λ. Therefore there exists at least one concrete assignment χ : [N] → {'{'}−1, +1{'}'} with</p>
        <MathBlock>max<sub>A ∈ 𝒜</sub> |Σ<sub>i ∈ A</sub> χ(i)| ≤ λ = O(√(m log(mt))).</MathBlock>

        <p>By the definition of discrepancy as the min over all colorings:</p>
        <MathBlock>disc(𝒜) ≤ O(√(m log(mt))).    □</MathBlock>

        <Callout type="warning">
          <p>Like the probabilistic method in general, LLL is a pure <em>existence</em> proof — it doesn't tell you <em>which</em> coloring works. Finding one algorithmically is a separate, harder problem (see the Moser–Tardos algorithm mentioned in Why This Matters). For this course, existence is enough.</p>
        </Callout>

        <Toggle label="Why is this better than the union bound?">
          <p>Union bound requires λ large enough that |𝒜| · 2 e<sup>−λ²/(2m)</sup> ≤ 1, i.e., λ = Ω(√(m log |𝒜|)). LLL requires λ = Ω(√(m log(mt))). When |𝒜| is much larger than mt (e.g., 𝒜 is dense in the set of all m-subsets of [N]), LLL's bound is much smaller — potentially polynomial vs. exponential improvement. The degree-t hypothesis is what buys this.</p>
        </Toggle>
      </Step>


      {/* ============= CLOSING BOXES ============= */}
      <div className="separator"></div>

      <Box label="PROOF AT A GLANCE" labelColor="#7eb8da">
        <div className="proof-summary">
          <div className="comment">// Setup</div>
          <div>χ(i) iid uniform ±1;    Z<sub>A</sub> = Σ<sub>i∈A</sub> χ(i);    B<sub>A</sub> = {'{'}|Z<sub>A</sub>| {'>'} λ{'}'}.</div>
          <div>&nbsp;</div>
          <div className="comment">// Per-event bound (Hoeffding, m iid ±1 terms)</div>
          <div>p := P(B<sub>A</sub>) ≤ 2 exp(−λ² / (2m)).</div>
          <div>&nbsp;</div>
          <div className="comment">// Dependency degree (degree-t hypothesis)</div>
          <div>B<sub>A</sub> indep of B<sub>A'</sub> when A ∩ A' = ∅; at most m(t−1) ≤ mt other A' meet A.</div>
          <div>d := mt.</div>
          <div>&nbsp;</div>
          <div className="comment">// LLL hypothesis: e · p · (d+1) ≤ 1</div>
          <div>e · 2 e<sup>−λ²/(2m)</sup> · (mt + 1) ≤ 1  ⟺  λ² ≥ 2m(1 + ln 2 + ln(mt + 1))</div>
          <div>Choose λ = C √(m log(mt)) for large enough C.</div>
          <div>&nbsp;</div>
          <div className="comment">// Conclusion</div>
          <div>By LLL: P(⋂<sub>A</sub> ¬B<sub>A</sub>) {'>'} 0  ⟹  ∃ χ with max<sub>A</sub> |Z<sub>A</sub>| ≤ λ.</div>
          <div>⟹  disc(𝒜) ≤ O(√(m log(mt))).    □</div>
        </div>
      </Box>

      <Box label="WHY THIS MATTERS" labelColor="#d4a574">
        <p><strong>1. LLL is a sharp tool for locally-dependent bad events.</strong>
          {' '}The union bound treats every pair of bad events as if they could coincide — fine when they're few, bad when they're many but mostly mutually independent. LLL replaces "global count |𝒜|" with "local dependency degree d" in the bound. For problems with bounded-degree dependency, the savings can be dramatic — a log |𝒜| becomes a log d.</p>

        <p><strong>2. The degree-t hypothesis is load-bearing.</strong>
          {' '}Without it, any B<sub>A</sub> could depend on up to |𝒜| − 1 others, collapsing LLL to the union bound. The hypothesis "every element in at most t sets" is what bounds the dependency graph's degree by mt. This structural assumption is what makes the bound O(√(m log(mt))) rather than O(√(m log |𝒜|)).</p>

        <p><strong>3. Existence vs. construction.</strong>
          {' '}LLL gives existence, not an algorithm. The breakthrough constructive version is the{' '}
          <Term wide tooltip="Moser & Tardos (2010): a constructive version of the Lovász Local Lemma. The algorithm is stunning — repeatedly resample any bad event that's currently occurring, and the procedure terminates in expected polynomial time under the same hypothesis e·p·(d+1) ≤ 1 (in the variable-assignment setting). It was a long-open problem to find an algorithmic LLL; Moser's 2009 talk resolving it in the symmetric case was one of the most celebrated talks in theoretical CS in years. The original paper's proof (via entropy compression) is remarkably short.">Moser–Tardos algorithm</Term>
          {' '}(2010), which resamples bad events and terminates in expected polynomial time under the same e·p·(d+1) ≤ 1 hypothesis. For existence-only results, symmetric LLL is a very sharp tool.</p>

        <p><strong>4. Discrepancy theory is a whole subfield.</strong>
          {' '}Joel Spencer's "six standard deviations suffice" (1985) shows disc(𝒜) ≤ 6√n for any set system of n subsets of [n] — better than √(n log n), beating the trivial random-coloring bound. Bansal (2010) made this algorithmic. Your bound here — O(√(m log(mt))) — is the LLL-flavored result; Spencer's is tighter but requires a different tool (partial-coloring / entropy method). Combined, these give a layered picture: different structural hypotheses on 𝒜 yield different discrepancy bounds.</p>
      </Box>

      <Box label="CONNECTIONS" labelColor="#a8d4a0">
        <p><strong>→ Lovász Local Lemma across combinatorics.</strong> LLL is the go-to hammer for existence proofs in graph coloring (list coloring), Ramsey theory, combinatorial geometry (point/line configurations), and satisfiability (finding satisfying assignments when every clause conflicts with only a few others).</p>

        <p><strong>→ Hoeffding reappears everywhere.</strong> The per-event Gaussian tail bound we used here is the exact inequality that powers Unit 4's Chernoff bounds, Unit 5's anti-concentration problem (in its one-sided form), and Unit 6 Problem 2's McDiarmid (via Azuma). It's the workhorse of bounded-range concentration.</p>

        <p><strong>→ The dependency graph is a recurring object.</strong> Whenever you analyze a family of bad events, the "who depends on whom" graph is the structural object governing which concentration tool applies. Union bound: ignore the graph. LLL: use local degree. Martingale / Azuma: walk the graph topologically. Different tools for different structures.</p>

        <p><strong>→ This is the 'probabilistic method, level 2.'</strong> Unit 5 Problem 1 was the level-1 version (random construction + union bound + Erdős-style existence). Here, the local dependency structure makes the union bound too weak; LLL is what you reach for when you need <em>locally-aware</em> probabilistic existence.</p>
      </Box>

      <Footer />

    </div>
  )
}
