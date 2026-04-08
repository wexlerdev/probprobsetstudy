# Unit 5: Three-Pass Proof Walkthrough

**Date:** 2026-04-08
**Status:** Ready for planning

## Problem

Unit 4 pages teach proof *understanding* but the actual test is *reproducing* the full proof from memory in a 20-minute in-class homework quiz. Understanding is necessary but not sufficient. We need a study tool that progressively builds toward exam-condition recall.

## Goal

For each problem in PS5, a student can:
1. Fully understand the proof from first principles (what everything means, why each step follows)
2. Practice reconstructing it with scaffolding
3. Test themselves under near-exam conditions

## Three Difficulty Levels (Dial at top of page)

### Learn
The full walkthrough, improved over Unit 4 in two specific ways:

- **Decision logic at every step**: Name what options exist and why we pick this one. Not just "apply Chernoff" but "we could try Markov directly, but it gives a weak bound because X; Chernoff is better because Y."
- **No algebra gaps**: When going from expression A to expression B, show every intermediate manipulation. No "it follows that..." jumps.

Otherwise follows Unit 4's proven structure: Header, Setup steps, Parts with goals, Steps with badges, Callouts (intuition/key/warning/connection), Toggles for digressions, Terms with tooltips, closing Proof at a Glance and Why This Matters boxes.

### Practice
- Step structure visible with step names and decision logic ("why this next")
- Algebra, detailed explanations, and callouts are collapsed by default
- Click to reveal — shows the full Learn-mode content for that section
- Goal: attempt each step yourself, then check

### Quiz
- Problem statement shown in full
- Skeleton outline: step names with a one-line hint per step (e.g., "apply Chernoff to the centered sum," "optimize over theta")
- No algebra, no explanations, no callouts shown by default
- Can expand to reveal full Learn content to check your work
- Simulates the index-card-cheat-sheet level of support

## UI

- **Difficulty dial**: three-option toggle at the top of each problem page (Learn / Practice / Quiz)
- Simplest implementation: shared state, defaults to Learn, persists across problems in the session
- The three modes can be three components or one component with conditional rendering — whatever is simplest
- Integrates with existing Nav bar (prev/next arrows, unit tabs, breadcrumbs)

## Unit 4 Pedagogy to Preserve

- Layered information: Steps (core) > Callouts (why) > Toggles (depth) > Tooltips (definitions)
- Honest voice: name the professor, say when a step is trivial or hard, connect problems to each other
- "Why this next" at every transition
- Proof at a Glance and Why This Matters closing boxes
- Consistent structure across all problems

## Unit 4 Pedagogy to Improve

- Add explicit decision logic: "we could do X, Y, or Z — here's why Z"
- Close all algebra gaps between steps
- Orient the student at the very start: "what does this question literally say? what are the objects? where are we going?" before any proof work begins

## Non-goals

- Interactive fill-in-the-blank or typed input
- Spaced repetition / progress tracking
- Timer or exam simulation
- Grading or self-assessment scoring
