---
title: "feat: Unit 6 proof walkthroughs (PS6 — martingales, bin packing, LLL, FKG)"
type: feat
status: completed
date: 2026-04-22
origin: docs/brainstorms/unit5-three-pass-requirements.md
---

# Unit 6 Proof Walkthroughs (PS6)

## Overview

Add four new React pages — one per PS6 problem — under `src/pages/unit_six/`, applying the exact same three-pass (Learn / Practice / Quiz) pedagogy used in Unit 5. Wire them into the existing routing, top nav, and home page. No new components, no new design patterns, no engine-level changes.

The PS6 content is: (1) martingale increment identities, (2) bin packing bounds and concentration via bounded differences, (3) discrepancy bound for bounded-degree set systems via the Lovász Local Lemma, (4) the Harris / FKG correlation inequality in three escalating forms.

## Problem Frame

The user is studying for Quiz 6 (Monday, May 4 — in-class, 20 minutes, reproduce-from-memory). PS6 is harder than PS5 in two directions:

- **More vocabulary** — martingales, filtrations, conditional expectations, discrepancy, set systems, Lovász Local Lemma, coordinatewise-monotone functions — most of which the user is encountering for the first time.
- **More induction / structural arguments** — P4's two-independent-copies trick, P4(b)/(c) induction, P3's dependency-graph analysis for LLL.

The user is *learning these concepts from scratch* (see memory: `user_learning_style.md`). Ground-up teaching is load-bearing, not stylistic. Every new term needs a `<Term>` tooltip that *defines* from scratch (not reminds). Every clever step needs reverse-engineering ("where did this come from?"). Every standard lemma the proof invokes (LLL symmetric form, tower property, bounded differences, Chernoff/Hoeffding on sign sums) needs either a derivation or a `<Toggle>` with a derivation.

## Requirements Trace

- **R1.** For each of the four PS6 problems, produce a walkthrough page at `src/pages/unit_six/Problem{N}.jsx` that matches the Unit 5 structural template (header → DifficultyDial → ORIENT step → numbered/parted steps → Proof at a Glance → Why This Matters → Footer).
- **R2.** Every `<Step>` populates all three content surfaces: `hint` (one-sentence QUIZ operational cue), `decision` (1-2 sentence PRACTICE strategic rationale), `children` (full LEARN exposition with MathBlocks, Callouts, Toggles, Terms).
- **R3.** No algebra gaps — every A→B transition shows every intermediate substitution. No "it follows that" jumps.
- **R4.** Decision logic at every step — name the options, justify the pick ("we could try X, but Y gives the direction we need").
- **R5.** Every non-trivial concept the student might not know gets a `<Term>` tooltip that teaches the concept from scratch (not reminds). Every non-trivial inequality or identity used in the proof is derived in a `<Toggle>`.
- **R6.** Pages are reachable via `/unit-6/problem-{1..4}` routes, linked from the home page, and show a UNIT 6 tab with prev/next arrows in the top `Nav`.
- **R7.** The three difficulty modes behave identically to Unit 5 (LEARN full, PRACTICE collapses content to `decision`, QUIZ collapses content to `hint`, `reveal`/`collapse` buttons work per step).

## Scope Boundaries

- **Not in scope:** new components, CSS changes, layout changes, refactors of Unit 4 or Unit 5 pages, fixing the P1/P4 `<div class="footer">...<Footer /></div>` duplicate-footer bug (unless trivially avoided by using Problem3 as template), changes to the password gate, adding test infrastructure, adding `BottomNav` support (it's dead code — not imported in `src/App.jsx`).
- **Not in scope:** Unit 7 content or a final-exam review page.
- **Not in scope:** retro-adding the DifficultyDial to Unit 4 pages.
- **Not in scope:** an explicit `docs/brainstorms/unit6-three-pass-requirements.md` — Unit 5's brainstorm already serves as the pedagogy contract; duplicating it would rot faster than it helps. `CONTENT-SOURCE-OF-TRUTH.md`-type extraction is not warranted for a 4-page content drop.

## Context & Research

### Relevant Code and Patterns

- **Structural template:** `src/pages/unit_five/Problem3.jsx` — cleanest multi-part example; uses `<Footer />` directly; uses `<div class="separator">` + `.part-header` for Part (a) / Part (b) seams; `badgeClass="step-badge-b"` on Part (b) steps; includes a "Connections" box alongside the two required boxes.
- **Single-part template:** `src/pages/unit_five/Problem1.jsx` — clean STEP 0 orientation + STEP 1..6 structure; `<Box>` "PROOF AT A GLANCE" in `.proof-summary` monospace with `// comment` inner divs; `<Box>` "WHY THIS MATTERS" with 3-4 bolded numbered points.
- **Three-pass API:** `src/components/Step.jsx` — consumes `badge`, `badgeClass`, `title`, `hint`, `decision`, `children`. No changes needed.
- **Other components (no changes needed):** `src/components/{Callout,Term,Toggle,MathBlock,Box,Footer,DifficultyDial}.jsx`.
- **Visual vocabulary:** `src/styles.css` — `.step-badge`, `.step-badge-b`, `.callout-{intuition,key,warning,connection}`, `.part-header`, `.proof-summary`, `.box-label`. All existing classes cover what Unit 6 needs.
- **Routing:** `src/App.jsx` — imports per-problem components, maps them to `/unit-{4,5}/problem-{1..4}` routes inside `<DifficultyProvider>` + `<Nav>`.
- **Home cards:** `src/pages/Home.jsx` — `units` array at top; each entry has `{num, label, problems: [{num, title, route, subtitle}]}`. Home renders `.unit-heading` + `.home-cards` per unit.
- **Top nav tabs / breadcrumbs / arrows:** `src/components/Nav.jsx` — `units` array near top (duplicated from Home, shorter titles). Unit tabs + prev/next arrows auto-derive from this array.
- **`BottomNav` is dead** — file exists (`src/components/BottomNav.jsx`) but is NOT imported in `src/App.jsx`. Ignore it; do not update.

### Institutional Learnings

- `docs/solutions/` does not exist in this repo — no institutional learnings to apply.
- Existing Unit 5 pages encode the institutional learning directly (see memories at `~/.claude/projects/-Users-wex-Desktop--SCHOOL-prob-and-comp-probandcompproblemsetsite/memory/`).

### External References

None consulted. Local grounding is strong (4 direct Unit 5 examples recently merged as commit `13a43ad`). All four PS6 topics are textbook graduate probability (Durrett Ch.4/5, Alon-Spencer *The Probabilistic Method* Ch.5 for LLL, Ch.6 for FKG) — standard proofs exist; implementation will use the proofs sketched in this plan (see per-unit Approach sections) unless the user directs otherwise.

## Key Technical Decisions

- **Reuse Problem3 as the structural template**, not Problem1/Problem4. Reason: Problem1 and Problem4 have a `<div class="footer">...<Footer /></div>` wrapping bug that doubles the footer hint. Problem3 uses `<Footer />` directly — cleaner and avoids propagating the bug.
- **Each new problem page is an atomic commit alongside its own scaffolding additions** (one route line in App.jsx, one card in Home.jsx, one nav entry in Nav.jsx). Reason: keeps each commit runnable; no phase where a route points at a non-existent component.
- **Problem 1 page introduces the `UNIT 6` entries in App/Home/Nav arrays** (first page in the batch). Subsequent pages only append to those arrays.
- **Badge convention for multi-part problems: `A.1`, `A.2`, ...` for Part (a) (default orange badge) and `B.1`, `B.2`, ...` with `badgeClass="step-badge-b"` for Part (b).** Follows Unit 5. Problem 2 and Problem 4 (three parts each: a, b, c) will use `A.*`, `B.*`, `C.*` with `badgeClass="step-badge-c"` for Part (c) (green — already in `styles.css`). Problem 1 has three parts too — same convention.
- **Problem 3 (single-statement) uses `STEP 0, STEP 1, ...` with default badge.** No part headers needed.
- **Orientation step (`STEP 0` or `ORIENT`) opens every page** — parses every symbol in the problem statement before any proof. This is the Unit 5 → Unit 6 non-negotiable.
- **Box label colors:** alternate `#7eb8da` (blue) and `#d4a574` (orange) between PROOF AT A GLANCE and WHY THIS MATTERS. No rigid rule; match Unit 5's soft pattern (P1 blue/orange; P2 orange/blue; P3 blue/orange; P4 blue/orange).
- **Test expectation:** manual browser verification (project has no test runner; Unit 4 and Unit 5 pages are similarly untested). Each unit carries a concrete manual-verification checklist.

## Open Questions

### Resolved During Planning

- **Q: Should Unit 6 get its own `docs/brainstorms/unit6-three-pass-requirements.md`?**
  **Resolution:** No. The Unit 5 brainstorm is generic-by-topic ("preserve Unit 4 pedagogy + add these Unit 5 improvements") and applies verbatim. Duplicating it creates drift risk.
- **Q: Do we update `src/components/BottomNav.jsx`?**
  **Resolution:** No. Verified it is not imported in `src/App.jsx` (dead code).
- **Q: Does Unit 6 get the DifficultyDial too?**
  **Resolution:** Yes, same as Unit 5. Every Unit 6 page includes `<DifficultyDial />` right after the header. (Unit 4 still won't — out of scope.)
- **Q: What's the badge color for Part (c) in three-part problems?**
  **Resolution:** `step-badge-c` (green) — already defined in `src/styles.css:81` as `background: #a8d4a0`.

### Deferred to Implementation

- **Problem 2(a) bin-packing computations** — `B(1/2, 1/3, 2/3, 2/3, 3/4)` looks to equal **4** (the three items 2/3, 2/3, 3/4 pairwise-exceed 1, so each needs its own bin; 1/2 + 1/3 = 5/6 shares a bin with at most one of them only if that one is small enough, which none is — but 2/3 + 1/3 = 1 saves a bin ⇒ bins {3/4}, {2/3 + 1/3}, {2/3}, {1/2} = 4). And `B(1/2, 1/4, ..., 1/2^m) = 1` since the sum is `1 - 1/2^m < 1`. Implementer should re-derive both carefully and include the optimality argument for the first (any packing must use at least 4 bins because the three largest items pairwise conflict). Defer because handwritten bin-packing case analysis is error-prone and easier to nail when actually writing the step.
- **Problem 3 (LLL) choice of form** — symmetric LLL suffices for `disc(A) = O(√(m log(mt)))`. State it in the walkthrough as a boxed theorem with a `<Toggle>` that either proves it (short induction) or cites Alon-Spencer for the proof. Constructive/Moser-Tardos version is out of scope — mention in WHY THIS MATTERS as forward connection. Decision on "prove LLL in-line" vs. "state and cite" is content-depth choice; defer to implementation but prefer the in-line proof in a `<Toggle>` since the user learns from first principles.
- **Problem 2(b) upper bound — which algorithm to analyze** — First-Fit (FF) is simplest and gives `B ≤ 1 + 2 Σ x_i` via "at most one bin is ≤ 1/2 full at end." First-Fit Decreasing (FFD) gives a tighter `11/9` approximation but is overkill. Go with plain FF. Defer exact phrasing.
- **Problem 1 vocabulary depth** — user may have never seen a filtration `F_k` or the statement `E[M_k | F_{k-1}] = M_{k-1}`. The ORIENT step must either: (A) define filtration from scratch, or (B) avoid `F_k` and write `E[Δ_ℓ | M_0, ..., M_{ℓ-1}] = 0` directly. Prefer (B) for simplicity, with a `<Toggle>` explaining the filtration formulation for those who've seen it. Defer final phrasing.
- **Problem 4(a) two-copies trick motivation** — the proof relies on the slick identity `(f(ξ)-f(ξ'))(g(ξ)-g(ξ')) ≥ 0` for *both* pointwise (same-side monotonicity) and in expectation. User has not seen this construction. The Step for it must explicitly reverse-engineer: "why introduce `ξ'`? because we want a product-of-differences that's always non-negative, and `ξ - ξ'` is the natural antisymmetric object." Defer phrasing.

## Implementation Units

- [ ] **Unit 1: Scaffolding + Unit 6 Problem 1 — Martingale Increments**

**Goal:** Introduce the Unit 6 route family, home-page section, and top-nav tab by shipping Problem 1 as the first page. Produce a complete LEARN/PRACTICE/QUIZ walkthrough for PS6 Problem 1 (martingale increment identities).

**Requirements:** R1, R2, R3, R4, R5, R6, R7.

**Dependencies:** None.

**Files:**
- Create: `src/pages/unit_six/Problem1.jsx`
- Modify: `src/App.jsx` (add `import U6Problem1`; add `<Route path="/unit-6/problem-1" />`)
- Modify: `src/pages/Home.jsx` (add `{num: 6, label: 'UNIT 6', problems: [...]}` entry with the Problem 1 card; subsequent units will append to `problems`)
- Modify: `src/components/Nav.jsx` (add `{num: 6, label: 'Unit 6', problems: [{num: 1, title: 'Martingale Increments', path: '/unit-6/problem-1'}]}` entry; subsequent units will append)

**Approach:**
- **Structure the page after `src/pages/unit_five/Problem3.jsx`** — three parts (a), (b), (c) using `<div class="separator">` + `.part-header` separators.
- **ORIENT step** parses: what a martingale is (sequence where `E[M_k | M_0..M_{k-1}] = M_{k-1}`), what martingale differences `Δ_k = M_k - M_{k-1}` are, the defining property in difference form (`E[Δ_k | M_0..M_{k-1}] = 0`), and why `E[M_k²] < ∞` is assumed (ensures Cauchy-Schwarz / Fubini applies to products). `<Term>` tooltips for *martingale*, *martingale difference*, *tower property*, *conditional expectation*, *square-integrable*. Intuition callout framing M_k as a "fair game" where the expected next value equals the current value.
- **Part (a) — `E[Δ_k Δ_ℓ] = 0` for `k < ℓ`.** Steps:
  - A.1 — Strategy (`decision`: "we want to eliminate `Δ_ℓ` via the martingale property, but it only vanishes in expectation *given the past*. Use the tower property to expose that past.")
  - A.2 — Apply tower: `E[Δ_k Δ_ℓ] = E[E[Δ_k Δ_ℓ | M_0..M_{ℓ-1}]]`. `<Toggle>` stating tower property from scratch.
  - A.3 — Pull `Δ_k` out of the inner expectation (it's measurable w.r.t. `M_0..M_{ℓ-1}` since `k < ℓ`). `<Callout type="warning">` on this measurability subtlety — it's the move the user is most likely to miss.
  - A.4 — Apply martingale property to get `E[Δ_ℓ | M_0..M_{ℓ-1}] = 0`, conclude `E[Δ_k Δ_ℓ] = E[Δ_k · 0] = 0`.
- **Part (b) — `V = Σ E[Δ_s²]`.** Steps:
  - B.1 — Telescope: `M_n - M_0 = Σ_{s=1}^n Δ_s`. `<Toggle>` spelling out the telescoping sum.
  - B.2 — Expand the square: `(Σ Δ_s)² = Σ Δ_s² + 2 Σ_{k<ℓ} Δ_k Δ_ℓ`. Show every index.
  - B.3 — Take expectation; cross terms vanish by (a). Done.
  - `<Callout type="key">` naming this as the martingale analogue of "variance of a sum of independent vars = sum of variances" — same conclusion, weaker hypothesis.
- **Part (c) — `∃ k: P(|Δ_k| > t) ≤ V/(n t²)`.** Steps:
  - C.1 — Strategy (`decision`: "the per-k variance `E[Δ_k²]` varies with k, but they sum to V. Pigeonhole / averaging: the smallest one is ≤ V/n.")
  - C.2 — Averaging: `∃ k with E[Δ_k²] ≤ V/n`. `<Toggle>` proving the averaging lemma.
  - C.3 — Apply Markov to `Δ_k²`: `P(|Δ_k| > t) = P(Δ_k² > t²) ≤ E[Δ_k²]/t² ≤ V/(n t²)`. `<Term>` on Markov's inequality.
- **Closing boxes:**
  - PROOF AT A GLANCE (label `#7eb8da`) — 3-part monospace summary, one per part.
  - WHY THIS MATTERS (label `#d4a574`) — 4 bolded points: (1) martingale variance decomposition, (2) uncorrelated-but-dependent increments preview Azuma/McDiarmid, (3) the V/n averaging trick reappears in Doob's maximal inequality, (4) this is the setup for martingale concentration in Unit 6 P2 and the discrepancy-bound tools of P3.

**Patterns to follow:** `src/pages/unit_five/Problem3.jsx` for multi-part structure; `src/pages/unit_five/Problem4.jsx` for the "reverse-engineering the clever definition" paragraph template (will reuse that pattern for A.3's measurability argument).

**Test scenarios:**
- *Happy path:* Route `/unit-6/problem-1` renders; LEARN mode shows all steps with full content; every `<MathBlock>` renders without raw JSX entities (no stray `&lt;`, `{'<'}` leakage); all `<Term>` hovers show tooltips; all `<Toggle>` buttons expand/collapse.
- *Happy path:* Home page shows a new UNIT 6 section with the Problem 1 card and subtitle.
- *Happy path:* Top Nav shows a "Unit 6" tab; clicking it navigates to `/unit-6/problem-1`; breadcrumb reads "Unit 6 · Problem 1"; prev/next arrows are both disabled (only one problem exists yet).
- *Mode switch:* Clicking PRACTICE on the dial: each Step's `decision` line appears in the gray italic style; `children` hide; `reveal` button appears per step. Clicking it exposes `children`.
- *Mode switch:* Clicking QUIZ: each Step's `hint` appears; `children` and `decision` both hide; callouts hide.
- *Edge case:* React devtools shows no console errors, warnings, or key-prop warnings on the page.
- *Correctness:* A human read-through of LEARN mode verifies the proof is complete, gap-free, and matches the PS6 problem statement literally.

**Verification:**
- `npm run dev` starts Vite and the page renders cleanly at `/unit-6/problem-1`.
- Home page and top Nav both show the new Unit 6 entry.
- Dial modes all work (manually toggled).
- No malformed math (the most common Unit 5 mistake is missing HTML-entity escapes; verify `Δ`, `ℓ`, `≤`, `²`, etc. render as symbols not as raw source).

---

- [ ] **Unit 2: Unit 6 Problem 2 — Bin Packing Bounds and Concentration**

**Goal:** Produce a complete walkthrough for PS6 Problem 2 (bin packing computations, linear two-sided bounds, bounded-differences concentration).

**Requirements:** R1, R2, R3, R4, R5, R6, R7.

**Dependencies:** Unit 1 (establishes `/unit-6/*` route family, UNIT 6 section on Home, Unit 6 tab in Nav).

**Files:**
- Create: `src/pages/unit_six/Problem2.jsx`
- Modify: `src/App.jsx` (add `import U6Problem2`; add `<Route path="/unit-6/problem-2" />`)
- Modify: `src/pages/Home.jsx` (append Problem 2 card to Unit 6 entry)
- Modify: `src/components/Nav.jsx` (append Problem 2 entry to Unit 6 entry — enables prev/next arrows from Problem 1)

**Approach:**
- **Three-part structure** with Part (a) default orange, Part (b) blue (`step-badge-b`), Part (c) green (`step-badge-c`).
- **ORIENT step** defines `B(x_1, ..., x_n)` (min number of unit-capacity bins to hold items), gives a pictorial analogy (packing objects into shoeboxes without overflow), previews the three parts as "(a) warmup computations, (b) two-sided linear bounds, (c) concentration via McDiarmid." `<Term>` tooltips for *bin packing problem*, *first-fit algorithm*, *bounded differences inequality / McDiarmid*.
- **Part (a) — compute two examples.**
  - A.1 — Compute `B(1/2, 1/3, 2/3, 2/3, 3/4)`. Step one: lower bound (three items — 2/3, 2/3, 3/4 — pairwise sum > 1, so each needs its own bin; this gives `B ≥ 3`; plus 1/2 + any of them > 1, so 1/2 needs a bin too unless shared with 1/3; 1/2 + 1/3 = 5/6 is valid). Show packing: `{3/4}, {2/3 + 1/3 = 1}, {2/3}, {1/2}` — 4 bins. Show no 3-bin packing works (case analysis). Conclude **B = 4**.
  - A.2 — Compute `B(1/2, 1/4, 1/8, ..., 1/2^m)`. Step one: sum is `1 - 1/2^m < 1`. Step two: all fit in a single bin. Conclude **B = 1**.
  - Intuition callout: "the answer depends on *adversarial geometry*, not just total mass — three 2/3-items can't share, even though their mass is 2."
- **Part (b) — two-sided linear bound `Σ x_i ≤ B ≤ 1 + 2 Σ x_i`.**
  - B.1 — Lower bound (volume): each bin holds total weight ≤ 1, B bins hold all items, so `Σ x_i ≤ B`. Trivial but stated.
  - B.2 — Upper bound strategy (`decision`: "we don't know the optimal packing, but any concrete packing gives an upper bound. First-Fit is simplest and good enough.")
  - B.3 — Define First-Fit (FF). Place items one at a time into the first bin with room; open new bins when none fits.
  - B.4 — Key lemma: at end of FF, **at most one bin is ≤ 1/2 full**. `<Toggle>` proves it by contradiction: two bins ≤ 1/2 full means the second-opened bin had an item ≤ 1/2 that could have gone in the first — contradicting FF's rule. Show this carefully; it's the non-obvious step.
  - B.5 — Conclude: if B_FF bins used, `Σ fills > (B_FF - 1) · (1/2) + 0`, so `Σ x_i > (B_FF - 1)/2`, giving `B_FF < 2Σx_i + 1`, i.e. `B_FF ≤ 1 + 2Σx_i` (integer). Since optimal `B ≤ B_FF`, done.
- **Part (c) — concentration around the mean.**
  - C.1 — `E[B_N] ≍ N` (i.e. `E[B_N] = Θ(N)`). Use part (b): `E[B_N] ≥ Σ E[X_i] ≥ 0.1 N` and `E[B_N] ≤ 1 + 2 N`. So `E[B_N] = Θ(N)`. `<Term>` tooltip on `≍` (asymptotic equivalence / Θ).
  - C.2 — Bounded differences (McDiarmid) setup (`decision`: "B_N is a function of N independent inputs; changing one input X_i by any amount changes B_N by at most 1 (in the worst case, one extra bin). Perfect setup for McDiarmid.")
  - C.3 — Verify the bounded-differences constant: if you change X_i, the best new packing uses the old packing plus one new bin for the new X_i. So `|B_N(x_1..x_i..x_N) - B_N(x_1..x'_i..x_N)| ≤ 1`. `<Callout type="warning">` — the "at most 1" is not obvious and the user should pause on this; include a two-paragraph explanation.
  - C.4 — State McDiarmid: `P(|B_N - E[B_N]| ≥ t) ≤ 2 exp(-2 t² / N)` (since each `c_i = 1`). `<Toggle>` with McDiarmid's formal statement; mention it's a direct application of Azuma to the Doob martingale of B_N (Unit 6 P1 supplied the martingale machinery).
  - C.5 — Plug in `t = 0.01 E[B_N]`. Get `2 exp(-2 · (0.01 · E[B_N])² / N) = 2 exp(-(0.0002 · E[B_N]² / N))`. Use `E[B_N] ≥ 0.1 N`: `E[B_N]²/N ≥ 0.01 N`. So probability `≤ 2 exp(-2 · 10⁻⁶ · N) = 2 e^{-c N}` with `c = 2·10⁻⁶` (keep `c` as a literal constant; the problem says "some c > 0").
  - C.6 — Conclude: `P(0.99 E[B_N] ≤ B_N ≤ 1.01 E[B_N]) ≥ 1 - 2 e^{-c N}`. Done.
- **Closing boxes:**
  - PROOF AT A GLANCE (`#d4a574`) — 3-part summary; highlight (a) as pure combinatorics, (b) as FF analysis, (c) as McDiarmid application.
  - WHY THIS MATTERS (`#7eb8da`) — 4 bolded points: (1) bin packing is NP-hard but admits clean linear bounds; (2) McDiarmid is the "concentration inequality for any Lipschitz function of independents" — first use in this course; (3) Connects forward to Azuma (martingale version); (4) Connects back to Unit 5 — yet another tool in the concentration-of-measure toolbox.

**Patterns to follow:** Three-part structure from `src/pages/unit_five/Problem3.jsx`; concentration-inequality phrasing from `src/pages/unit_four/Problem2.jsx` (Chernoff-style exposition).

**Test scenarios:**
- *Happy path:* `/unit-6/problem-2` renders; all math renders correctly; all parts and steps visible in LEARN.
- *Happy path:* Home page shows both Problem 1 and Problem 2 cards under UNIT 6.
- *Happy path:* From Problem 1's top Nav, next arrow (→) navigates to Problem 2; from Problem 2, prev arrow (←) navigates back to Problem 1.
- *Correctness:* Part (a)'s claim that `B(1/2, 1/3, 2/3, 2/3, 3/4) = 4` is verified by exhibiting a 4-bin packing AND proving no 3-bin packing exists.
- *Correctness:* Part (c)'s constant `c` is named explicitly (not left as "some c") and the chain of inequalities connecting `t = 0.01 E[B_N]` to the `e^{-cN}` bound is shown line by line.
- *Mode switch:* PRACTICE / QUIZ modes work as in Unit 1.

**Verification:**
- Page reachable and renders; prev/next navigation works bidirectionally between U6 P1 and U6 P2.
- Human re-verification of the bin-packing case analysis in (a).
- No console errors.

---

- [ ] **Unit 3: Unit 6 Problem 3 — Discrepancy of Bounded Set Systems via the Lovász Local Lemma**

**Goal:** Produce a complete walkthrough for PS6 Problem 3 (bound `disc(A) = O(√(m log(mt)))` using the symmetric LLL).

**Requirements:** R1, R2, R3, R4, R5, R6, R7.

**Dependencies:** Unit 2.

**Files:**
- Create: `src/pages/unit_six/Problem3.jsx`
- Modify: `src/App.jsx` (add route)
- Modify: `src/pages/Home.jsx` (append Problem 3 card)
- Modify: `src/components/Nav.jsx` (append Problem 3 entry)

**Approach:**
- **Single-statement structure** — `STEP 0` orientation, then `STEP 1..6`. No part headers.
- **ORIENT step** is heavier than usual because most of the vocabulary is new:
  - Define *set system* (family of subsets of `[N]`), *uniform* (all sets same size m), *degree of an element* (number of sets containing it), *discrepancy* `disc(A) = min_{χ: [N]→{±1}} max_{A∈A} |Σ_{i∈A} χ(i)|`.
  - `<Term>` tooltips for each of the above, plus *Lovász Local Lemma* (informal: "when rare bad events are locally dependent but globally sparse, they can all be simultaneously avoided").
  - Intuition callout: "you're two-coloring N elements. Each set A sees an imbalance = (reds) - (blues). Discrepancy measures the worst-case imbalance across all sets. You want to color so the worst imbalance is small."
  - Explain the hypothesis `t ≤ |A|`: the problem is trivially satisfied when there are very few sets (union bound suffices); the interesting regime is many sets where LLL beats union bound.
  - Preview the strategy: pick random ±1 colors, bound `P(bad event for set A)` with Chernoff/Hoeffding, count how many other bad events each bad event depends on, apply LLL.
- **STEP 1 — Randomize and define bad events.**
  - Let χ(i) be independent uniform ±1.
  - Define `B_A = {|Σ_{i∈A} χ(i)| > λ}` for each `A ∈ A`, where λ is a parameter to pick later.
  - Decision: "we want to show `P(no B_A happens) > 0`. LLL is the tool when the bad events are dependent but sparsely so. First: bound each `P(B_A)`."
- **STEP 2 — Bound `P(B_A)` by Hoeffding / Chernoff.**
  - State Hoeffding for ±1 sums: `P(|Σ χ_i| > λ) ≤ 2 exp(-λ²/(2m))` when there are m terms each bounded in [-1,1].
  - `<Toggle>` proving Hoeffding from MGF (brief — state Chernoff bound on MGF, apply `cosh(s) ≤ exp(s²/2)`, optimize s). This proof was likely seen in PS4; mention it.
  - Result: `p := max_A P(B_A) ≤ 2 exp(-λ²/(2m))`.
- **STEP 3 — Compute the dependency degree d.**
  - `B_A` depends only on `{χ(i) : i ∈ A}`. Two bad events `B_A, B_{A'}` are independent if `A ∩ A' = ∅`.
  - For each `A ∈ A` with |A| = m: how many other sets intersect it? At most `m · t` (each of the m elements of A is in at most t sets, including A itself). Subtract 1 for A itself: dependency `d ≤ m·t`.
  - `<Callout type="key">` — this is where the hypothesis "every element in ≤ t sets" pays off. Without it, d could be enormous.
- **STEP 4 — State the symmetric LLL.**
  - Boxed theorem: *If each bad event B_i has P(B_i) ≤ p and is mutually independent of all but ≤ d other B_j, and `e · p · (d + 1) ≤ 1`, then `P(no B_i occurs) > 0`.*
  - `<Toggle>` — proof sketch. Either (a) induction on subsets of bad events or (b) cite Alon-Spencer. Prefer (a) if concise; this is a learning site, so the proof matters. If (b), at minimum show the slick inductive setup: `P(B_i | ∩_{j ∈ S} ¬B_j) ≤ 2·P(B_i)` for small enough p, d.
- **STEP 5 — Choose λ to satisfy the LLL condition.**
  - Need `e · 2 exp(-λ²/(2m)) · (mt + 1) ≤ 1`. Take logs: `1 + log 2 + log(mt + 1) ≤ λ² / (2m)`. So `λ² ≥ 2m · (1 + log 2 + log(mt+1))`.
  - For `mt ≥ some constant`, `log(mt+1) = Θ(log(mt))`. So `λ = C √(m log(mt))` suffices for a large enough constant C.
  - Show every algebraic step. `<Toggle>` spelling out what "large enough C" means quantitatively.
- **STEP 6 — Conclude.**
  - By LLL, `P(∀A: |Σ_{i∈A} χ(i)| ≤ λ) > 0`. Hence ∃ coloring achieving max imbalance ≤ λ = O(√(m log(mt))). Done.
  - `<Callout type="warning">` — LLL is existential (like the probabilistic method); it does not produce the coloring. Moser-Tardos is the constructive version — mention as forward connection.
- **Closing boxes:**
  - PROOF AT A GLANCE (`#7eb8da`) — compressed 6-step summary.
  - WHY THIS MATTERS (`#d4a574`) — 4 points: (1) LLL is the right-hammer when union bound is off by `log(mt)` factors but dependencies are local; (2) hypothesis `element in ≤ t sets` is what makes the dependency degree polynomial; (3) construction vs existence — Moser-Tardos makes this algorithmic; (4) discrepancy theory is a whole subfield (Spencer's `6σ√n` theorem, Banaszczyk's algorithm).
  - Optional third box — CONNECTIONS (`#a8d4a0`) — arrow bullets connecting LLL to: percolation (FKG next problem), Ramsey theory, satisfiability.

**Patterns to follow:** Heavy-orientation single-part structure like `src/pages/unit_five/Problem1.jsx`. Use extensive `<Toggle>` for the standalone lemmas (Hoeffding, LLL statement+proof).

**Test scenarios:**
- *Happy path:* `/unit-6/problem-3` renders; ORIENT step is dense with definitions all visible; every Term tooltip loads on hover; LLL statement box is visually distinctive.
- *Correctness:* The chain λ² ≥ 2m(1 + log 2 + log(mt+1)) → λ = Θ(√(m log(mt))) is shown without gaps.
- *Correctness:* Hoeffding MGF proof in the Toggle is correct and finishes with the `exp(-λ²/(2m))` bound (factor of 2 out front from `P(|X| > λ) ≤ 2 P(X > λ)`).
- *Correctness:* The LLL statement in the box is correct and matches the hypotheses used in STEP 5.
- *Mode switch:* PRACTICE / QUIZ modes work; every Step has a hint and decision set.
- *Edge case:* Escape sequences for symbols like `λ`, `≤`, `≥`, `·`, `⊆`, `∩`, `∃`, `∀`, `∈` render as Unicode, not as raw source.

**Verification:**
- Page reachable and renders. Math is correctly formatted.
- Human verification of the LLL statement, the Hoeffding proof sketch, and the parameter-choice algebra.

---

- [ ] **Unit 4: Unit 6 Problem 4 — Harris / FKG Correlation Inequality**

**Goal:** Produce a complete walkthrough for PS6 Problem 4 (three escalating forms of positive-correlation inequalities for monotone functions).

**Requirements:** R1, R2, R3, R4, R5, R6, R7.

**Dependencies:** Unit 3.

**Files:**
- Create: `src/pages/unit_six/Problem4.jsx`
- Modify: `src/App.jsx` (add route)
- Modify: `src/pages/Home.jsx` (append Problem 4 card)
- Modify: `src/components/Nav.jsx` (append Problem 4 entry)

**Approach:**
- **Three-part structure** mirroring (a), (b), (c). Badges: A.1, A.2, ... for (a); B.1, B.2, ... with `step-badge-b` for (b); C.1, C.2, ... with `step-badge-c` for (c).
- **ORIENT step** covers:
  - What *correlation inequality* means in this context (not Pearson correlation — rather `E[fg] ≥ E[f]E[g]` for the right class of f, g).
  - Why independence alone doesn't give this (it would give equality, only for trivial cases).
  - Why monotonicity is the right hypothesis (intuition: f and g both "measure bigness" of ξ; when ξ is large both are large; when small, both are small → positive correlation).
  - Pictorial intuition: plot f(ξ) vs g(ξ) for ξ ranging; a monotone pair means the scatter is "non-decreasing" — a random pair is more likely both above or both below their means.
  - The three parts: (a) one variable, (b) n independent variables coordinatewise-monotone, (c) product of m monotone functions of n independent vars.
  - `<Term>` tooltips for *monotone / monotonically increasing*, *coordinatewise monotone*, *correlation inequality*, *Harris inequality*, *FKG inequality*, *independent copy*.
  - The PROFESSOR's hint for (a) is literally the proof trick — call this out. "Valettas hands us the trick: introduce ξ' independent of ξ, then `(f(ξ)-f(ξ'))(g(ξ)-g(ξ'))` is *pointwise* non-negative, and its expectation unpacks cleanly into the desired inequality."
- **Part (a) — Single-variable Harris inequality.**
  - A.1 — The pointwise lemma. Show `(f(t)-f(s))(g(t)-g(s)) ≥ 0` for all real s, t. Case analysis: if t ≥ s, both factors ≥ 0; if t < s, both ≤ 0; product ≥ 0 either way. `<Callout type="key">` — "this is the geometric fact that encodes 'f and g increase together'."
  - A.2 — Introduce ξ' independent copy of ξ. `<Callout type="key">` — reverse-engineer the trick: "why ξ'? because we want a *product of differences* that's non-negative, and the independent-copy construction turns that into something whose expectation is clean."
  - A.3 — Plug ξ, ξ' into the pointwise lemma: `(f(ξ) - f(ξ'))(g(ξ) - g(ξ')) ≥ 0` (pointwise / almost surely). Take expectations: `E[(f(ξ) - f(ξ'))(g(ξ) - g(ξ'))] ≥ 0`.
  - A.4 — Expand the product:
    ```
    E[f(ξ)g(ξ)] - E[f(ξ)g(ξ')] - E[f(ξ')g(ξ)] + E[f(ξ')g(ξ')] ≥ 0.
    ```
    Show every term.
  - A.5 — Apply independence: `E[f(ξ)g(ξ')] = E[f(ξ)]·E[g(ξ')] = E[f]·E[g]` (since ξ, ξ' are iid). Same for `E[f(ξ')g(ξ)]`. And `E[f(ξ')g(ξ')] = E[f(ξ)g(ξ)]` since ξ' has the same distribution as ξ. Substitute:
    ```
    2 E[f(ξ)g(ξ)] - 2 E[f] E[g] ≥ 0
    ```
    so `E[f(ξ)g(ξ)] ≥ E[f] E[g]`. Done.
  - `<Toggle>` — "what if f and g have opposite monotonicity?" (answer: `E[fg] ≤ E[f]E[g]` — negative correlation).
- **Part (b) — Multivariate Harris via induction on n.**
  - B.1 — Setup induction. Base `n = 1`: reduces to part (a). Show this explicitly.
  - B.2 — Inductive step. Assume for `n - 1`. Prove for `n`. Strategy (`decision`: "condition on X_1 and apply the IH to the remaining n-1 variables; then apply part (a) to the conditional expectations as functions of X_1 alone.")
  - B.3 — Define `f(x) := E[F(x, X_2, ..., X_n)]` and `g(x) := E[G(x, X_2, ..., X_n)]`. Both are monotone in x because F, G are coordinatewise monotone. `<Toggle>` proving monotonicity of `f` from coordinatewise monotonicity of F.
  - B.4 — Apply IH conditionally: for each fixed `x`, F(x, ·) and G(x, ·) are coordinatewise monotone functions on R^{n-1} of n-1 independent variables. So `E[F·G | X_1 = x] ≥ E[F | X_1=x] · E[G | X_1=x] = f(x) · g(x)`.
  - B.5 — Take expectation over X_1: `E[FG] = E[E[FG | X_1]] ≥ E[f(X_1) g(X_1)]`.
  - B.6 — Apply part (a) to the single variable X_1 with monotone f, g: `E[f(X_1) g(X_1)] ≥ E[f(X_1)] E[g(X_1)] = E[F] · E[G]`.
  - Combine: `E[FG] ≥ E[F]E[G]`. Done.
- **Part (c) — Product of m monotone nonneg functions via induction on m.**
  - C.1 — Setup. Base `m = 1`: trivial. Preview: induct on m using part (b).
  - C.2 — Inductive step: `E[∏_{j=1}^m F_j] = E[F_m · ∏_{j=1}^{m-1} F_j]`. Note both `F_m` and `∏_{j=1}^{m-1} F_j` are coordinatewise monotone and nonnegative. `<Toggle>` — why is the product of nonneg monotone functions monotone? (Because product of nonneg increasing functions is increasing: if x ≤ y then each F_j(x) ≤ F_j(y) and both sides are ≥ 0, so product on left ≤ product on right.)
  - C.3 — Apply part (b) to `F_m` and `∏_{<m} F_j`: `E[F_m · ∏_{<m} F_j] ≥ E[F_m] · E[∏_{<m} F_j]`.
  - C.4 — Apply IH: `E[∏_{<m} F_j] ≥ ∏_{j<m} E[F_j]`.
  - C.5 — Chain: `E[∏_j F_j] ≥ E[F_m] · ∏_{j<m} E[F_j] = ∏_j E[F_j]`. Done.
  - `<Callout type="warning">` — why do we need `F_j ≥ 0`? Because otherwise the product of "monotone" functions is not monotone (sign flips mess it up). Include a small counterexample (e.g., `F_1 = F_2 = -id` on R: both decreasing, product is `x²` which is not monotone).
- **Closing boxes:**
  - PROOF AT A GLANCE (`#d4a574`) — 3-part summary; emphasize the induction skeleton in (b) and (c).
  - WHY THIS MATTERS (`#7eb8da`) — 4 points: (1) the two-copies trick `(f(ξ) - f(ξ'))(g(ξ) - g(ξ')) ≥ 0` is one of the slickest arguments in probability; (2) Harris/FKG underpins percolation (Harris 1960 for Bernoulli percolation) and statistical mechanics (FKG for Ising model); (3) the induction template `(a) → (b) via conditioning → (c) via iteration` is a reusable pattern; (4) positive correlation under monotonicity is the reason random graph properties like "is connected" are positively correlated with "contains a triangle" — both monotone-increasing in edges.

**Patterns to follow:** Induction-heavy proof style; use `<Toggle>` generously to offload algebraic minutiae. Look to `src/pages/unit_five/Problem4.jsx` for the "reverse-engineering the clever definition" callout style (used here in A.2 for the two-copies trick).

**Test scenarios:**
- *Happy path:* `/unit-6/problem-4` renders; all three parts visible in LEARN; Parts (a), (b), (c) use distinct badge colors (orange, blue, green).
- *Happy path:* Home page shows all four Unit 6 problem cards.
- *Correctness:* A.3 through A.5 show every expansion step — no "by independence, ..." jumps.
- *Correctness:* B.3's monotonicity claim for the conditional expectation `f(x) = E[F(x, X_2, ..., X_n)]` is proven or at least sketched, not asserted.
- *Correctness:* C.2's monotonicity-of-product-of-nonneg-monotone-functions claim has its Toggle explaining why the nonneg hypothesis is essential (with counterexample).
- *Mode switch:* PRACTICE / QUIZ modes behave correctly; hint/decision for every Step.
- *Navigation:* From Problem 3, next arrow goes to Problem 4; from Problem 4, next is disabled.
- *Edge case:* No raw JSX entities leaked; `ξ`, `ξ'`, `∏`, `ℝ^n` render correctly.

**Verification:**
- Page reachable and renders. All three parts and inductions are clean.
- Human verification of the induction base cases, conditioning argument in B.4-B.6, and the counterexample in C.2's Toggle.

## System-Wide Impact

- **Interaction graph:** Top `Nav` and home `Home` each maintain a hand-maintained `units` array. Four units of implementation each edit these arrays; drift between Nav and Home arrays is a known risk (the two arrays have slightly different shape already — Home has richer subtitles, Nav has shorter labels). Keep the two in sync by title name (not necessarily verbatim — Nav uses shorter labels) and route path (which MUST match exactly).
- **Error propagation:** None beyond normal React — these are static content pages with client-side routing. Dial state lives in `DifficultyContext`; shared session-wide.
- **State lifecycle risks:** None. No persistence, no backend, no writes.
- **API surface parity:** None — no backend, no exported types.
- **Integration coverage:** The dial's LEARN/PRACTICE/QUIZ modes must work on every new page. The reveal button per-Step is a unit-level behavior already tested (manually) by the 4 Unit 5 pages.
- **Unchanged invariants:** The `<Step>` component API (props: `badge`, `badgeClass`, `title`, `hint`, `decision`, `children`) and the three-pass Difficulty context are not modified by this plan. Unit 4 pages remain unchanged. The password gate remains unchanged. The dead `BottomNav` remains dead.

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| Mathematical errors in content (wrong bin-packing values, off-by-one in LLL algebra, wrong base case in induction) | Implementation units' test scenarios call for human re-verification of each part's key claims. Where a claim is delicate (P2(a), P3 STEP 5, P4 B.3 monotonicity), the plan already flags it. |
| Encoding errors — raw `<` or `{` bleeding into rendered math | Follow the Unit 5 idiom strictly: `{'<'}`, `{'{'}`, etc. Every test scenario calls for a visual check of math rendering. |
| Scope creep into "polish Unit 4" or "fix P1/P4 footer bug" | Out-of-scope boundary listed above; use Problem3 as template to avoid inheriting the bug rather than fixing it in place. |
| Unit 6 is harder than Unit 5, tempting omission of derivations for "obvious" lemmas (tower property, Hoeffding, LLL proof) | User memory `user_learning_style.md` is explicit — the user is learning, not reviewing. Every Step's `<Toggle>` list in the plan names the derivation(s) that must accompany it. |
| Nav/Home array drift between the four units as each unit edits both files | Each implementation unit's Files list names both files; each unit's Test scenarios verify both Home card and Nav entry appear. Keep additions strictly append-only to the Unit 6 `problems` arrays. |
| P3 LLL proof depth — including the LLL proof in a Toggle could balloon the page | Accept: Toggle proofs can be long without harming the main flow (collapsed by default). If the LLL induction is truly ugly, cite Alon-Spencer in the Toggle and give only the inductive setup (`P(B_i | ∩ ¬B_j) ≤ 2p` with the constraint). |

## Documentation / Operational Notes

- No README update needed — the repo has no README.
- No deployment changes — `vite build` produces `dist/` as today; adding pages increases bundle size by ~30-50 KB total (content-heavy but no new dependencies).
- No password-gate changes. Unit 6 is behind the same gate.
- Manual verification rubric (shared across all four units) lives in each unit's `Test scenarios` block. No central test runner exists or is being added.

## Sources & References

- **Origin document:** `docs/brainstorms/unit5-three-pass-requirements.md`
- **PS6 statement:** `resources/problem_sets/7525-S26-PS6.pdf`
- **Structural templates:** `src/pages/unit_five/Problem1.jsx`, `src/pages/unit_five/Problem3.jsx`, `src/pages/unit_five/Problem4.jsx`
- **Component API:** `src/components/Step.jsx`, `src/components/DifficultyContext.jsx`
- **Scaffolding files:** `src/App.jsx`, `src/pages/Home.jsx`, `src/components/Nav.jsx`
- **Pedagogy memories:**
  - `~/.claude/projects/-Users-wex-Desktop--SCHOOL-prob-and-comp-probandcompproblemsetsite/memory/user_learning_style.md`
  - `~/.claude/projects/-Users-wex-Desktop--SCHOOL-prob-and-comp-probandcompproblemsetsite/memory/unit5_pedagogy_principles.md`
- **External references (not consulted during planning; acceptable cross-references for implementer):**
  - Alon & Spencer, *The Probabilistic Method*, Ch. 5 (Lovász Local Lemma), Ch. 6 (FKG).
  - Durrett, *Probability: Theory and Examples*, Ch. 4 (martingales — tower property, increment uncorrelation).
  - Motwani & Raghavan, *Randomized Algorithms*, §4.5 (bin packing analysis), §5.5 (McDiarmid / bounded differences).
