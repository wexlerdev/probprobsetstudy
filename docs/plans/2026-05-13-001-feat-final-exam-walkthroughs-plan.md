---
title: Final Exam Proof Walkthroughs (3 problems, "Unit 7" section)
type: feat
status: completed
date: 2026-05-13
---

# Final Exam Proof Walkthroughs

## Overview

The Spring 2026 final exam (`resources/exams/7525-S26-finalexam.pdf`, due May 14, 7:30 a.m.) has three proof problems that draw directly on Unit 5 and Unit 6 material. Build a walkthrough page for each, matching the existing Unit 5/Unit 6 pedagogy: three-pass `DifficultyDial` (Learn / Practice / Quiz) plus the `MODES.PROOF` formal-LaTeX mode (introduced in Unit 6). Surface the section as **Unit 7** in nav and Home for visual consistency with Units 4–6.

The user is **learning** these results from the ground up — not reviewing. Every concept (extraction function, FKG, anti-concentration, Janson's bound, Hoeffding, Jensen on log) needs orient-from-scratch teaching, not "recall from class."

## Problem Frame

The exam is the user's last study artifact for the course. The site already has Unit 4–6 walkthroughs in production. Each Unit 6 page combines three pedagogical surfaces (Step / Callout / Toggle / Term layered system) with a fourth "Proof" mode that renders a bare KaTeX proof for exam-day reproduction. The final exam pages should slot into that exact pattern.

The three exam problems map cleanly onto course material:

| Exam problem | Topic | Strongest course connection |
|---|---|---|
| **P1** — sign vector / 0/1 matrix discrepancy, both directions | Probabilistic method + anti-concentration | Unit 5 P1 (the Ω(√n) lower bound is essentially restated in P1(b)); HW 2 P4 referenced explicitly |
| **P2** — P(triangle-free) lower bounds in G(n,p) | Random graphs + FKG/Harris + Janson | Unit 6 P4 (Harris/FKG) referenced explicitly via "HW 6 P4"; Janson upper bound from class |
| **P3** — entropy bounds: 0 ≤ H(X) ≤ log₂\|S\| and E[\|Ext(X)\|] ≤ H(X) | Information theory / extraction | Course entropy unit; **no existing walkthrough page** — newest territory |

## Requirements Trace

- R1. Three problem pages exist at `/unit-7/problem-1`, `/unit-7/problem-2`, `/unit-7/problem-3` and render without console errors.
- R2. Each page follows Unit 5/6 structural invariants (orient step first, layered callouts/toggles/terms, Proof-at-a-Glance + Why-This-Matters boxes, Footer, narrow container).
- R3. Each page's `<DifficultyDial modes={PROOF_MODES} />` exposes Learn / Practice / Quiz / Proof.
- R4. Each page has a `<FormalProof />` component rendering a complete, self-contained, sub-30-line LaTeX proof with KaTeX (using the existing `Tex` component and `.formal-proof` CSS).
- R5. Each Step's `hint` (Quiz) and `decision` (Practice) text matches the Unit 5/6 voice and follows the Iron Rules: no algebra gaps, decision logic at every step, orientation before proof work.
- R6. Concepts the user has not seen — extraction functions, FKG/Harris (recall), Janson's inequality (recall), Hoeffding for Rademacher sums, Khintchine anti-concentration — get Term tooltips and/or Toggle derivations defined from scratch, not just named.
- R7. Home and Nav include the new "Unit 7" section listing all three problems.
- R8. The build (`npx vite build`) passes clean.

## Scope Boundaries

- **Not** building a separate "exam strategy / time allocation" overview page (user opted out).
- **Not** reusing the BottomNav prev/next on these pages (Unit 5 and Unit 6 omit it; same here).
- **Not** modifying any existing Unit 4/5/6 page, the Step/Callout/Tex components, or the dial logic.
- **Not** changing routing for older units; only **adding** the `/unit-7/*` routes.
- **Not** touching `BottomNav.jsx` or password gate — they're orthogonal.
- **Not** writing tests — the project is a static educational React site with no test suite (this is consistent with how Units 4–6 were shipped).

## Context & Research

### Relevant Code and Patterns

- `src/pages/unit_six/Problem1.jsx` — **canonical template** for a problem with `PROOF_MODES`, `<FormalProof />`, mode-conditional render. Use as the structural starting point.
- `src/pages/unit_five/Problem3.jsx` — cleanest multi-part walkthrough (Connections box, two-part `step-badge-b`).
- `src/components/Step.jsx` — the three-pass API (`hint` / `decision` / `children`), already supports `MODES.PROOF` indirectly (any non-LEARN mode collapses children).
- `src/components/DifficultyDial.jsx` — accepts `modes` prop; auto-resets to LEARN if current mode is filtered out (already correct behavior).
- `src/components/DifficultyContext.jsx` — exports `MODES.PROOF`.
- `src/components/Tex.jsx` — KaTeX wrapper. Block: `<Tex block>{String.raw`...`}</Tex>`.
- `src/styles.css` — `.formal-proof`, `.part-label`, `.tex-block`, `.qed`, container widths (already bumped to 1040px / 1000px).
- `src/App.jsx` — central routing.
- `src/pages/Home.jsx` — unit cards, follows fixed shape (`{num, label, problems: [{num, title, route, subtitle}]}`).
- `src/components/Nav.jsx` — `units` array with `{num, label, problems: [{num, title, path}]}`.

### Institutional Learnings (from auto-memory)

- **Unit 5 pedagogy invariants** (`memory/unit5_pedagogy_principles.md`) — orient-first step, no algebra gaps, decision logic at every step, layered information (Step > Callout > Toggle > Term), specific Box conventions (Proof-at-a-Glance / Why-This-Matters / Connections), monospace `proof-summary` with `.comment`.
- **User learning style** (`memory/user_learning_style.md`) — user is *learning*, not reviewing. When in doubt between "shorter and assumes background" vs "longer and teaches from scratch," pick the latter. Every technical word gets a Term tooltip that *defines* from scratch; every nontrivial inequality gets a Toggle.

### Cross-references back to existing pages

- P1 → Unit 5 Problem 1 (the lower-bound direction is essentially identical; reference it explicitly in a green Connections callout).
- P2 → Unit 6 Problem 4 (FKG/Harris is the engine; the exam hint says so verbatim — link to that page).
- P3 → no existing walkthrough; this is the entropy-theory page the site is missing. Treat extra carefully.

### External References

- KaTeX docs (already in use): `katex.renderToString` with `displayMode: true` for block.
- Janson's inequality (Alon–Spencer, *The Probabilistic Method*, Ch. 8) — referenced for P2(c) comparison; cite verbally rather than re-deriving.

## Key Technical Decisions

- **Section label is "Unit 7"** (per user). Routes use `/unit-7/problem-{1,2,3}`. File path: `src/pages/unit_seven/Problem{1,2,3}.jsx`. Component imports use `U7Problem1` etc. naming, parallel to `U5*` and `U6*` in `src/App.jsx`.
- **Proof mode included on all three** problems via `PROOF_MODES = [MODES.LEARN, MODES.PRACTICE, MODES.QUIZ, MODES.PROOF]`. Same wiring as Unit 6 (`<DifficultyDial modes={PROOF_MODES} />` + `mode === MODES.PROOF ? <FormalProof /> : (<>...</>)`).
- **Use `unit_seven` (snake_case) directory name**, matching `unit_four`, `unit_five`, `unit_six`. The route uses kebab-case `/unit-7/...`. File naming is consistent with the existing pattern.
- **Each page's Proof block stays under ~30 lines** of rendered prose+TeX, matching the Unit 6 norm. Soft-formal voice (use `E` not `\mathbb{E}`, prose paragraphs interleaved with `<Tex block>` rather than a giant aligned environment) — same posture as the Unit 6 PROOF rewrite.
- **Three-step inequality lemma `1-x ≥ e^{-2x}` for x ≤ 1/2** is shared between P2(a) and P2(b). Inline-derive it once in P2 (toggle), then reference. Don't extract a shared module — repetition once is fine, abstraction is premature.
- **No new components.** Everything reuses `Step`, `Callout`, `Toggle`, `Term`, `MathBlock`, `Box`, `Footer`, `DifficultyDial`, `Tex`. No CSS additions needed (Unit 6 already added `.formal-proof` styles).
- **Skip BottomNav** on these pages (consistent with Unit 5/6).

## Open Questions

### Resolved During Planning

- **Proof mode default?** → Yes, all 3 problems get `PROOF_MODES`.
- **Section name?** → "Unit 7."
- **Overview page?** → No.
- **What does "extraction function" mean in Problem 3?** → Resolved by reading the hint: any function `Ext: S → {0,1}*` for which `P(X=x) ≤ 2^{-|Ext(x)|}`. The hint's "you may want to show" structure tells us this is part of the proof, but the inequality is the operational content of "extraction function" — likely Valettas's class definition is "Ext is one-to-one and uniform on its image," from which the inequality follows. Treat as: state the hint inequality as a given (provable from definition); main proof uses it.
- **Which inequality does HW 2 P4 give?** → Anti-concentration / Khintchine-style lower bound on Rademacher sums: `P(|Σ ε_i a_i| ≥ c√(Σa_i²)) ≥ p₀` for constants `c, p₀ > 0`. This is the exact engine of Unit 5 P1 — reuse that page's framing.

### Deferred to Implementation

- **Exact constant in P1(a) `t = √(C n log n)`** — pick the cleanest C that makes union bound `< 1` (C=4 works; verify in proof writing).
- **Exact constant `c, p₀` in P1(b) anti-concentration** — match whatever constants Unit 5 P1's text uses, for cross-link consistency.
- **Whether to derive Janson's inequality in P2(c)** vs. cite — likely cite + 1-line scaling sketch; decide while drafting prose.
- **Term tooltip wording** — refine while writing (per Unit 5/6 norm).

## Implementation Units

- [ ] **Unit 1: Scaffold `src/pages/unit_seven/` and add routes**

**Goal:** Stub three pages so routing works end-to-end before content is filled in.

**Requirements:** R1, R7

**Dependencies:** None.

**Files:**
- Create: `src/pages/unit_seven/Problem1.jsx` (stub: header + dial + "WIP" placeholder + Footer)
- Create: `src/pages/unit_seven/Problem2.jsx` (stub)
- Create: `src/pages/unit_seven/Problem3.jsx` (stub)
- Modify: `src/App.jsx` (import `U7Problem1/2/3`, add three `<Route path="/unit-7/problem-N">` entries after the Unit 6 block)
- Modify: `src/components/Nav.jsx` (append a `{num: 7, label: 'Unit 7', problems: [...]}` entry after Unit 6)
- Modify: `src/pages/Home.jsx` (append a `{num: 7, label: 'UNIT 7', problems: [...]}` entry after Unit 6)

**Approach:**
- Stubs use the canonical container/header/dial scaffold so layout is correct from the start.
- Wire all routing/nav/home in this unit so subsequent units can focus purely on content.

**Patterns to follow:**
- Imports/structure: `src/pages/unit_six/Problem1.jsx`.
- Nav and Home entry shape: copy the Unit 6 entry verbatim and edit text.

**Verification:**
- `npm run dev` (port 3069) loads `/unit-7/problem-{1,2,3}` without console errors.
- The new "Unit 7" tab appears in `Nav` and on `Home`.
- Each stub page shows the dial and a "Coming soon" placeholder.

---

- [ ] **Unit 2: Build Problem 1 — 0/1 matrix discrepancy (both directions)**

**Goal:** Full walkthrough page for exam P1 with three-pass content, layered callouts, and a complete Proof-mode rendering.

**Requirements:** R2, R3, R4, R5, R6

**Dependencies:** Unit 1.

**Files:**
- Modify: `src/pages/unit_seven/Problem1.jsx`

**Approach (content outline — directional, not implementation):**
- **Header subtitle** — frame the two-direction symmetry: random sign vectors give O(√(n log n)) discrepancy upper bound; some matrices force Ω(√n) discrepancy lower bound.
- **Step 0 ORIENT** — define `‖Ax‖∞` literally (max over rows i of `|Σ_j a_ij x_j|`), define "discrepancy" intuitively, name the two parts, link to Unit 5 P1 and HW 2 P4.
- **Part (a) — upper bound** (`badge="A.1"…"A.4"`, default badge color):
  - **A.1** Strategy: pick x uniform in {±1}^n; reduce existence to `P(failure) < 1`.
  - **A.2** Bound a single row via Hoeffding for Rademacher sums; subtle point: `Σ a_ij² ≤ n` since entries are 0/1. (Toggle: full Hoeffding derivation for Rademacher.)
  - **A.3** Union bound over n rows: `n · 2 e^{-t²/(2n)}`.
  - **A.4** Choose `t = √(4n log n)` so the bound `< 1`. Conclude existence.
- **Part (b) — lower bound** (`badgeClass="step-badge-b"`):
  - **B.1** Strategy: pick B random with iid Ber(1/2) entries; show `P(some y has ‖By‖∞ < c√n) < 1`.
  - **B.2** Reduce to a Rademacher sum via `2b_ij - 1 ∈ {±1}` uniform; key identity `2⟨b_i, y⟩ - ⟨1, y⟩ = ⟨2b_i - 1, y⟩`. (Callout-key: this is the crucial algebraic move.)
  - **B.3** Apply HW 2 P4 anti-concentration: `P(|⟨2b_i - 1, y⟩| ≥ c√n) ≥ p₀`. Cross-link to Unit 5 P1.
  - **B.4** Independence of rows: `P(all rows fail for y) ≤ (1 - p₀)^n`.
  - **B.5** Union bound over `2^n` sign vectors: `2^n (1 - p₀)^n < 1` requires `p₀ > 1/2`; pick c small enough that the constant works. (Toggle: how to actually pick the constants.)
- **Closing boxes** — Proof-at-a-Glance (monospace 6-line summary), Why-This-Matters (probabilistic method, randomness as design tool, both-directions symmetry), Connections (→ Unit 5 P1, → Spencer's "six standard deviations" theorem).
- **`<FormalProof />`** — ~25 lines of prose+Tex covering both parts; closes with ∎.

**Patterns to follow:**
- Multi-part badge convention (`step-badge-b` for Part B): `src/pages/unit_five/Problem3.jsx`.
- Connections box and HW 2 P4 cross-references: `src/pages/unit_five/Problem1.jsx`.
- FormalProof structure: `src/pages/unit_six/Problem1.jsx`.

**Verification:**
- All four dial modes render P1 cleanly.
- Each Step has hint + decision + children populated.
- Proof mode renders end-to-end LaTeX without KaTeX errors.

---

- [ ] **Unit 3: Build Problem 2 — Triangle-free lower bounds in G(n,p)**

**Goal:** Full walkthrough page for exam P2 with three parts (trivial bound, FKG bound, combine + Janson comparison).

**Requirements:** R2, R3, R4, R5, R6

**Dependencies:** Unit 1.

**Files:**
- Modify: `src/pages/unit_seven/Problem2.jsx`

**Approach:**
- **Header subtitle** — three lower bounds for `P(X = 0)` in increasing sophistication; (c) compares them and contrasts with Janson.
- **Step 0 ORIENT** — define G(n,p) (Term tooltip), define X (Σ over C(n,3) triangle indicators), explain why "triangle-free probability" matters (extremal combinatorics, threshold for triangles), preview the three parts.
- **Helper Step** (or first body step) — derive the **`1 - x ≥ e^{-2x}` for x ≤ 1/2** lemma in a Toggle. Reused in (a) and (b). One-time derivation.
- **Part (a)** (`badge="A.1"…"A.3"`):
  - **A.1** Inclusion: `{no edges} ⊆ {X = 0}`. Hint reuses this exactly.
  - **A.2** `P(no edges) = (1-p)^C(n,2)` by edge independence.
  - **A.3** Apply lemma: `(1-p)^C(n,2) ≥ e^{-2p · n(n-1)/2} = e^{-pn(n-1)} ≥ e^{-pn²}`.
- **Part (b)** (`badgeClass="step-badge-b"`):
  - **B.1** Setup: `Y_t` = indicator triangle t in G; `X = Σ_t Y_t`; `{X=0} = ∩_t {1-Y_t = 1}`.
  - **B.2** Show `1 - Y_t` is coordinate-wise *decreasing* in the edges. (Callout-key: this is what unlocks FKG.)
  - **B.3** Apply Harris/FKG (HW 6 P4 = Unit 6 P4): independent edges + decreasing functions ⇒ positive correlation ⇒ `P(∩_t {1-Y_t = 1}) ≥ ∏_t P(Y_t = 0)`. Cross-link Unit 6 P4 prominently.
  - **B.4** `∏_t P(Y_t = 0) = (1 - p³)^C(n,3)`.
  - **B.5** Apply lemma to `p³`: `(1-p³)^C(n,3) ≥ e^{-2p³ · n(n-1)(n-2)/6} ≥ e^{-p³ n³}`.
- **Part (c)** (`badgeClass="step-badge-c"` — green):
  - **C.1** Combine: lower bound is `max(e^{-pn²}, e^{-p³n³})`. Crossover at `p = 1/√n`.
  - **C.2** Compare to **Janson's inequality** (Term tooltip + brief recall): upper bound `P(X=0) ≤ exp(-μ + Δ/2)` where `μ = E[X] ~ n³p³/6`, `Δ ~ n^4 p^5`. In sparse regime `p = c/n`, both bounds are `e^{-Θ(c³)}` — the FKG lower bound matches Janson's upper bound up to constants.
- **Closing boxes** — Proof-at-a-Glance (3-line summary per part), Why-This-Matters (sandwiching a probability between matching upper/lower bounds = sharp threshold; FKG as a positive-correlation engine), Connections (→ Unit 6 P4, → Janson, → Erdős threshold theory).
- **`<FormalProof />`** — ~25 lines covering all three parts.

**Patterns to follow:**
- FKG/Harris derivation language: `src/pages/unit_six/Problem4.jsx`.
- Three-part badge cycling: use `step-badge-b` and `step-badge-c` (CSS already supports green via `.step-badge-c`).
- Lemma toggle pattern: `src/pages/unit_five/Problem4.jsx`.

**Verification:**
- All three parts render with distinct badge colors.
- The shared `1-x ≥ e^{-2x}` toggle expands and shows the derivation.
- Proof mode is one continuous narrative across (a)/(b)/(c).

---

- [ ] **Unit 4: Build Problem 3 — Entropy bounds and extraction**

**Goal:** Full walkthrough page for exam P3, covering both the Jensen-on-log upper bound and the extraction-function inequality. **Highest pedagogical care here** — entropy/extraction is the topic without a prior page, so the orientation needs the most ground-up treatment.

**Requirements:** R2, R3, R4, R5, R6 (R6 especially)

**Dependencies:** Unit 1.

**Files:**
- Modify: `src/pages/unit_seven/Problem3.jsx`

**Approach:**
- **Header subtitle** — name the two bounds: H(X) ∈ [0, log₂|S|], and any extraction function gives at most H(X) bits in expectation.
- **Step 0 ORIENT** — *long* orient step:
  - Define **entropy** `H(X) = -Σ p(x) log₂ p(x)` from scratch with the `0 log 0 = 0` convention as a Term.
  - Build intuition: H(X) is the average "surprise"; H(X) is bits needed to describe X; H(X) = log₂|S| iff X is uniform.
  - Define **extraction function** `Ext: S → {0,1}*` as: a way of deterministically mapping each value to a binary string, with the goal of producing nearly-uniform output bits. (Term tooltip.) Defer the precise inequality `P(X=x) ≤ 2^{-|Ext(x)|}` to part (b) — it's both the *definitional* property and the *engine* of the proof.
  - Preview both parts, name the two techniques: Jensen's inequality (for (a)) and a Kraft-style inequality (for (b)).
- **Part (a)** (`badge="A.1"…"A.3"`):
  - **A.1** Lower bound. For each `p ∈ [0,1]`, `-p log₂ p ≥ 0` (with 0·log 0 = 0 by convention). Sum is ≥ 0. (Callout-intuition: each term measures positive surprise.)
  - **A.2** Upper bound — rewrite `H(X) = E[log₂(1/p(X))]`.
  - **A.3** Apply **Jensen's inequality** for concave `log₂`: `E[log₂(1/p(X))] ≤ log₂ E[1/p(X)] = log₂(Σ_x p(x) · 1/p(x)) = log₂|support| ≤ log₂|S|`. (Toggle: full Jensen's inequality statement and why log is concave.)
  - **A.4 (optional)** Equality case: H(X) = log|S| iff X uniform on S. (Callout-key.)
- **Part (b)** (`badgeClass="step-badge-b"`):
  - **B.1** State the hint inequality `P(X=x) ≤ 2^{-|Ext(x)|}` for all x. (Callout-key: this is the bridge between distribution and code length.)
  - **B.2** Why does it hold? (Toggle.) For any output string y, the preimage `Ext^{-1}(y)` has at most one element (Ext is one-to-one in the standard def) and the output is uniform on its image at each length, so `P(X = x) = P(Ext(X) = Ext(x)) ≤ 2^{-|Ext(x)|}`. Acknowledge this depends on the precise class definition; cite Valettas's setup.
  - **B.3** Take `-log₂` of both sides: `-log₂ P(X=x) ≥ |Ext(x)|`.
  - **B.4** Multiply by `P(X=x)` (still preserves ≥, since `P ≥ 0`) and sum over x: left side becomes `H(X)`, right side becomes `E[|Ext(X)|]`.
- **Closing boxes** — Proof-at-a-Glance (entropy = Jensen on log; extraction = Kraft-style + take log + sum), Why-This-Matters (entropy as upper bound on extractable randomness; symmetry to Shannon source coding which goes the *other* direction), Connections (→ Shannon source coding lower bound, → von Neumann's coin-bias extraction).
- **`<FormalProof />`** — ~25 lines covering both parts cleanly.

**Patterns to follow:**
- Heavy Term tooltips for new concepts: `src/pages/unit_five/Problem3.jsx` (Term-rich orient step).
- Toggles for "why does this auxiliary fact hold": `src/pages/unit_five/Problem4.jsx`.

**Verification:**
- Orient step actually defines entropy and extraction functions from first principles (no "recall from class").
- Both parts have hint + decision + children populated for all steps.
- Proof mode renders both parts in unified prose.

---

- [ ] **Unit 5: Build verify and final pass**

**Goal:** Confirm the build is clean, exercise each page in the dev server, and tidy any rough edges.

**Requirements:** R8

**Dependencies:** Units 1–4.

**Files:** none (verification only — may produce small follow-up edits).

**Approach:**
- Run `npx vite build` and confirm no errors and no new warnings beyond the existing `chunk size > 500 kB` warning.
- Start `npm run dev` and click through each of `/unit-7/problem-{1,2,3}` in all four dial modes.
- Check that hint, decision, and proof-mode renders all behave correctly.
- Check Home and Nav both show "Unit 7" in the right slot.
- Verify cross-links to Unit 5 P1 and Unit 6 P4 resolve.

**Verification:**
- Clean build.
- All three pages navigable from Home and Nav.
- All four dial modes work on each page.
- No console errors.

## System-Wide Impact

- **Routing:** three new routes under `/unit-7/*`. No conflicts with existing routes.
- **Nav and Home cards:** one new section appended; existing sections unchanged.
- **Dial component:** unchanged. The `modes` prop already supports filtering, and the default Unit 4/5 pages (which omit `modes`) keep their three-mode dial.
- **Components:** no edits to shared components — purely additive page work.
- **CSS:** no edits — Unit 6 already added everything needed (`.formal-proof`, `.step-badge-c`).
- **Unchanged invariants:** Unit 4/5/6 pages, the `Step`/`Tex`/`Callout`/`Toggle` APIs, and the `MODES` enum stay exactly as they are.
- **Build:** one new module per page; bundle grows modestly; the existing chunk-size warning is unchanged in nature.

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| The "extraction function" definition the course uses might differ from the inequality-based one I'm assuming. | The hint *gives* the inequality and tells the student to use it — the proof works regardless of the precise definitional source. Frame B.2 as "you may take this as the definitional property; here's the intuition for why it holds." |
| Janson's inequality in P2(c) is stated from class — if I get the constant wrong it could mislead. | Cite by name and give scaling sketch only (`exp(-μ + Δ/2)` with `μ ~ n³p³`); stop short of working out the precise constant; note "matches up to constants in the c/n regime." |
| HW 2 P4 anti-concentration constants in P1(b) need `p₀ > 1/2` for `2^n (1-p₀)^n < 1`; the actual HW 2 P4 constant may not be that strong directly. | The standard Khintchine / Paley-Zygmund anti-concentration gives `P(|S| ≥ c√n) ≥ p₀` with `p₀` close to 1 for c sufficiently small (limit theorem says it tends to a Gaussian probability). Pick c small enough; a Toggle can defer the constant-juggling. The Unit 5 P1 page does exactly this — match its handling. |
| Memory ages 21 days — current Unit 6 page structure could have drifted. | Already verified `src/pages/unit_six/Problem1.jsx` first 80 lines and `src/components/Step.jsx` head against the memory's claims; both still match. |

## Documentation / Operational Notes

- After Unit 5 of this plan completes, mark this plan `status: completed` (consistent with the Unit 6 plan).
- Push will still require the SSH key resolution from prior session (user must run `ssh-add` themselves).

## Sources & References

- Exam PDF: `resources/exams/7525-S26-finalexam.pdf`
- Unit 5 plan precedent: `docs/plans/2026-04-22-001-feat-unit-six-proof-walkthroughs-plan.md` (the closest structural analog — same kind of work, same patterns)
- Pedagogy memory: `memory/unit5_pedagogy_principles.md`, `memory/user_learning_style.md`
- Direct cross-link targets in the new pages:
  - `src/pages/unit_five/Problem1.jsx` (Unit 5 P1 — for Exam P1 Connections box)
  - `src/pages/unit_six/Problem4.jsx` (Unit 6 P4 — for Exam P2 Connections box)
- Component anchors:
  - `src/pages/unit_six/Problem1.jsx` (canonical PROOF-mode template)
  - `src/components/Step.jsx`, `src/components/DifficultyDial.jsx`, `src/components/Tex.jsx`
