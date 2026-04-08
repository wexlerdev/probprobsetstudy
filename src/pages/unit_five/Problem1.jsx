import { useEffect } from 'react'
import DifficultyDial from '../../components/DifficultyDial'
import Toggle from '../../components/Toggle'
import Term from '../../components/Term'
import Callout from '../../components/Callout'
import Step from '../../components/Step'
import MathBlock from '../../components/MathBlock'
import Box from '../../components/Box'
import Footer from '../../components/Footer'

export default function Problem1() {
  useEffect(() => {
    document.title = 'PS5 Problem 1 — Existence of a 0-1 Matrix via the Probabilistic Method'
  }, [])

  return (
    <div className="container container-narrow">

      {/* Header */}
      <div className="label">PROBLEM SET 5 · PROBLEM 1</div>
      <h1>A 0-1 Matrix That No Sign Vector Can Kill</h1>
      <p className="subtitle">
        Prove there exists an n x n matrix A with entries in {'{'}0, 1{'}'} such that
      </p>
      <MathBlock>
        min<sub>&epsilon; &isin; {'{'}&#8722;1, 1{'}'}&#8319;</sub> ||A&epsilon;||<sub>&infin;</sub> = &Omega;(&radic;n)
      </MathBlock>

      <DifficultyDial />

      {/* ============= STEP 0: ORIENTATION ============= */}
      <Step
        badge="STEP 0"
        title="Orientation -- what does this question actually say?"
        hint="Parse the objects: matrix A, sign vectors epsilon, the infinity norm, and the min over all 2^n choices."
        decision="Before doing anything, we need to understand what quantity we're controlling and what freedom we have."
      >
        <p>Let's unpack the statement piece by piece.</p>

        <p><strong>The matrix.</strong> We need to find a specific n x n matrix A whose entries are all 0 or 1. This is the object we're constructing.</p>

        <p><strong>The sign vectors.</strong> A vector <span className="math-inline">&epsilon; &isin; {'{'}&#8722;1, 1{'}'}&#8319;</span> is a choice of +1 or &#8722;1 in each coordinate. There are <span className="math-inline">2&#8319;</span> such vectors.</p>

        <p><strong>The product A&epsilon;.</strong> This is an n-dimensional vector. Its i-th entry is the{' '}
          <Term tooltip="The dot product of row i of A with the sign vector epsilon: sum_j a_{ij} * epsilon_j. Since a_{ij} is 0 or 1, this picks a subset of the epsilon_j values and sums them up.">inner product</Term>
          {' '}of row i with &epsilon;:
        </p>
        <MathBlock>(A&epsilon;)<sub>i</sub> = &lang;v<sub>i</sub>, &epsilon;&rang; = &Sigma;<sub>j=1</sub><sup>n</sup> a<sub>ij</sub>&epsilon;<sub>j</sub></MathBlock>

        <p><strong>The infinity norm.</strong>{' '}
          <Term tooltip="The infinity norm (or max norm) of a vector x is the largest absolute value among its entries: ||x||_inf = max_i |x_i|. It measures the 'worst-case' coordinate.">||A&epsilon;||<sub>&infin;</sub></Term>
          {' '}= max<sub>i</sub> |&lang;v<sub>i</sub>, &epsilon;&rang;|. It's the biggest absolute value across all n rows.
        </p>

        <p><strong>The min over &epsilon;.</strong> The adversary picks the <em>worst</em> &epsilon; -- the one that makes ||A&epsilon;||<sub>&infin;</sub> as small as possible. We need to find a matrix so robust that even the adversary's best &epsilon; still produces ||A&epsilon;||<sub>&infin;</sub> &ge; c&radic;n for some constant c {'>'} 0.</p>

        <Callout type="intuition">
          Think of this as a game. You choose A, then an adversary sees A and picks the sign vector &epsilon; to minimize the largest row-sum. The claim is that you can choose A so well that the adversary is stuck with &Omega;(&radic;n) no matter what. This is a <em>worst-case</em> guarantee over an exponentially large set of adversary moves.
        </Callout>

        <Toggle label="Why is this hard to do constructively?">
          There are 2&#8319; sign vectors the adversary can choose from. Checking all of them is infeasible.
          Even cleverly designing A row-by-row seems hopeless -- any structure you bake in might be
          exploitable by some &epsilon;. This is exactly the kind of problem where the{' '}
          <Term tooltip="A proof technique where you show a random object has a desired property with positive probability. Since the probability is positive, such an object must exist. You never actually find it -- you just prove it's out there. Introduced by Erdos in the 1940s.">probabilistic method</Term>
          {' '}shines: instead of constructing A, we show a random A works.
        </Toggle>
      </Step>

      {/* ============= STEP 1: STRATEGY ============= */}
      <Step
        badge="STEP 1"
        title="Choose the proof strategy"
        hint="Probabilistic method: random matrix + union bound."
        decision="A constructive approach is hopeless with 2^n sign vectors. The probabilistic method lets us handle all of them at once via a union bound."
      >
        <p>Valettas's hint tells us the approach: choose the matrix <strong>at random</strong> and show that with positive probability, it satisfies the property we want.</p>

        <p>Concretely, let each entry <span className="math-inline">a<sub>ij</sub></span> be an independent{' '}
          <Term tooltip="A random variable that equals 1 with probability 1/2 and 0 with probability 1/2. Equivalently, a fair coin flip. Each entry of A is determined by an independent coin flip.">Bernoulli(1/2)</Term>
          {' '}random variable. Equivalently, choose each row <span className="math-inline">v<sub>1</sub>, ..., v<sub>n</sub></span> independently and uniformly at random from <span className="math-inline">{'{'}0, 1{'}'}&#8319;</span>.
        </p>

        <p>We want to show:</p>
        <MathBlock>P(min<sub>&epsilon;</sub> ||A&epsilon;||<sub>&infin;</sub> &ge; c&radic;n) {'>'} 0</MathBlock>

        <p>If we can establish this, then a matrix with the desired property must exist.</p>

        <Callout type="key">
          The plan is a three-part argument:
          <br /><br />
          <strong>1.</strong> Fix a single &epsilon; and bound P(||A&epsilon;||<sub>&infin;</sub> {'<'} c&radic;n) from above.
          <br />
          <strong>2.</strong> Take a union bound over all 2&#8319; choices of &epsilon;.
          <br />
          <strong>3.</strong> Show the union bound total is {'<'} 1, so the complementary event has positive probability.
        </Callout>

        <Toggle label="Why random Bernoulli(1/2) and not some other distribution?">
          Two reasons. First, it matches the problem's constraint: entries must be in {'{'}0, 1{'}'}, and the uniform distribution is the most "generic" choice -- it doesn't introduce any bias an adversary could exploit. Second, it lets us apply HW2 Problem 4(c) directly, which is stated for Bernoulli(1/2) coefficients multiplied by values with |x<sub>i</sub>| &ge; 1.
        </Toggle>
      </Step>

      {/* ============= STEP 2: RECALL HW2 P4(c) ============= */}
      <Step
        badge="STEP 2"
        title="Recall HW2 Problem 4(c) -- the anti-concentration tool"
        hint="HW2 P4(c): for |x_i| >= 1 and Bernoulli delta_i, P(|sum delta_i x_i| < c*sqrt(n)) < 1/2."
        decision="We need a lower bound on P(a row's inner product with epsilon is large). HW2 P4(c) gives exactly this kind of anti-concentration statement."
      >
        <p>From HW2 Problem 4(c), we proved the following:</p>

        <Callout type="connection">
          <strong>HW2 Problem 4(c).</strong> Let x<sub>1</sub>, ..., x<sub>n</sub> be real numbers with |x<sub>i</sub>| &ge; 1, and let &delta;<sub>1</sub>, ..., &delta;<sub>n</sub> be independent Bernoulli(1/2) random variables. Then there exists a small constant c {'>'} 0 such that:
          <MathBlock>P(|&Sigma;<sub>i=1</sub><sup>n</sup> &delta;<sub>i</sub> x<sub>i</sub>| {'<'} c&radic;n) {'<'} 1/2</MathBlock>
        </Callout>

        <p>In words: a random Bernoulli-weighted sum of "big enough" numbers is{' '}
          <Term tooltip="An anti-concentration inequality says a random variable is NOT too concentrated near any single value (like 0). It gives a lower bound on P(|X| >= threshold). This is the opposite of a concentration inequality (like Chernoff), which says X IS close to its mean.">anti-concentrated</Term>
          {' '}-- it lands at distance at least c&radic;n from 0 with probability greater than 1/2.
        </p>

        <p>The key conditions are:</p>
        <ul>
          <li>The coefficients &delta;<sub>i</sub> are i.i.d. Bernoulli(1/2)</li>
          <li>The fixed values x<sub>i</sub> satisfy |x<sub>i</sub>| &ge; 1</li>
          <li>The conclusion gives a universal constant c {'>'} 0 (not depending on the x<sub>i</sub>'s)</li>
        </ul>

        <Toggle label="Why does |x_i| >= 1 matter?">
          If the x<sub>i</sub>'s were tiny (say all equal to 1/n), the sum &Sigma; &delta;<sub>i</sub> x<sub>i</sub> would be O(1) and you couldn't get &Omega;(&radic;n) spread. The condition |x<sub>i</sub>| &ge; 1 ensures each term in the sum contributes at least &Omega;(1), giving the random walk enough "step size" to spread out to scale &radic;n.
        </Toggle>
      </Step>

      {/* ============= STEP 3: FIX EPSILON, BOUND ONE ROW ============= */}
      <Step
        badge="STEP 3"
        title="Fix epsilon, bound one row's inner product"
        hint="For fixed epsilon and row i: the a_{ij} are Bernoulli(1/2), the epsilon_j have |epsilon_j|=1, so HW2 P4(c) applies directly."
        decision="The first step of any union bound argument is to analyze a single case. Fix epsilon and look at what a single row gives us."
      >
        <p>Fix any <span className="math-inline">&epsilon; &isin; {'{'}&#8722;1, 1{'}'}&#8319;</span>. Consider row i of A. The inner product with &epsilon; is:</p>
        <MathBlock>&lang;v<sub>i</sub>, &epsilon;&rang; = &Sigma;<sub>j=1</sub><sup>n</sup> a<sub>ij</sub> &epsilon;<sub>j</sub></MathBlock>

        <p>Now map this to HW2 P4(c). The random variables are <span className="math-inline">&delta;<sub>j</sub> = a<sub>ij</sub></span> -- these are i.i.d. Bernoulli(1/2) since A is random. The fixed values are <span className="math-inline">x<sub>j</sub> = &epsilon;<sub>j</sub></span>, which satisfy <span className="math-inline">|x<sub>j</sub>| = |&epsilon;<sub>j</sub>| = 1 &ge; 1</span>.</p>

        <Callout type="key">
          The conditions of HW2 P4(c) are satisfied exactly. Applying it:
          <MathBlock>P(|&lang;v<sub>i</sub>, &epsilon;&rang;| {'<'} c&radic;n) {'<'} 1/2</MathBlock>
          for the universal constant c {'>'} 0 from that problem.
        </Callout>

        <p>Equivalently, by taking complements:</p>
        <MathBlock>P(|&lang;v<sub>i</sub>, &epsilon;&rang;| &ge; c&radic;n) {'>'} 1/2</MathBlock>

        <p>So each row, individually, has at least a 50% chance of giving a "large" inner product with &epsilon;.</p>

        <Callout type="warning">
          Notice the direction carefully. We are <strong>not</strong> saying the inner product is large with high probability. We are saying the probability that it is <em>small</em> is bounded <em>away from 1</em> (it's less than 1/2). That turns out to be enough, because we have n independent rows and the probability of ALL of them being small will decay exponentially.
        </Callout>
      </Step>

      {/* ============= STEP 4: ALL ROWS SMALL ============= */}
      <Step
        badge="STEP 4"
        title="Bound the probability that ALL rows give small inner products"
        hint="Independence of rows turns the intersection into a product: (1/2)^n = 2^{-n}."
        decision="We have a per-row bound. The infinity norm is small only if EVERY row gives a small inner product. Since rows are independent, this probability is a product."
      >
        <p>Still with &epsilon; fixed. The infinity norm is small precisely when <em>every</em> row's inner product is small:</p>
        <MathBlock>||A&epsilon;||<sub>&infin;</sub> {'<'} c&radic;n &hArr; &forall;i: |&lang;v<sub>i</sub>, &epsilon;&rang;| {'<'} c&radic;n</MathBlock>

        <p>So:</p>
        <MathBlock>P(||A&epsilon;||<sub>&infin;</sub> {'<'} c&radic;n) = P(&forall;i: |&lang;v<sub>i</sub>, &epsilon;&rang;| {'<'} c&radic;n)</MathBlock>

        <p>Now the crucial structural fact: the rows <span className="math-inline">v<sub>1</sub>, ..., v<sub>n</sub></span> are chosen <strong>independently</strong>. The event <span className="math-inline">{'{'}|&lang;v<sub>i</sub>, &epsilon;&rang;| {'<'} c&radic;n{'}'}</span> depends only on row i, so these events are independent across i.</p>

        <MathBlock>
          P(&forall;i: |&lang;v<sub>i</sub>, &epsilon;&rang;| {'<'} c&radic;n) = &Pi;<sub>i=1</sub><sup>n</sup> P(|&lang;v<sub>i</sub>, &epsilon;&rang;| {'<'} c&radic;n)
        </MathBlock>

        <p>Applying the bound from Step 3 to each factor:</p>
        <MathBlock>&Pi;<sub>i=1</sub><sup>n</sup> P(|&lang;v<sub>i</sub>, &epsilon;&rang;| {'<'} c&radic;n) {'<'} &Pi;<sub>i=1</sub><sup>n</sup> (1/2) = (1/2)&#8319; = 2<sup>&#8722;n</sup></MathBlock>

        <Callout type="intuition">
          Each row independently has at least a 50/50 shot at "catching" &epsilon; (producing a large inner product). The probability that <em>all</em> n rows miss is at most (1/2)&#8319;, which is astronomically small for large n. This exponential decay is what powers the union bound in the next step.
        </Callout>

        <p>So for any fixed &epsilon;:</p>
        <MathBlock>P(||A&epsilon;||<sub>&infin;</sub> {'<'} c&radic;n) {'<'} 2<sup>&#8722;n</sup></MathBlock>
      </Step>

      {/* ============= STEP 5: UNION BOUND ============= */}
      <Step
        badge="STEP 5"
        title="Union bound over all sign vectors"
        hint="There are 2^n sign vectors, each contributing at most 2^{-n}. The union bound gives at most 1."
        decision="We've handled one epsilon. Now we need to handle all of them simultaneously. The union bound is the standard tool for 'for all' statements in the probabilistic method."
      >
        <p>We want to bound the probability of the "bad" event -- that there <em>exists</em> some &epsilon; making ||A&epsilon;||<sub>&infin;</sub> small:</p>
        <MathBlock>P(&exist;&epsilon; &isin; {'{'}&#8722;1, 1{'}'}&#8319;: ||A&epsilon;||<sub>&infin;</sub> {'<'} c&radic;n)</MathBlock>

        <p>By the{' '}
          <Term tooltip="For any countable collection of events A_1, A_2, ..., the probability that at least one occurs is at most the sum of their individual probabilities: P(union A_i) <= sum P(A_i). It's the most basic tool for controlling 'there exists' statements. Crude but often sufficient.">union bound</Term>:
        </p>

        <MathBlock>
          P(&exist;&epsilon;: ||A&epsilon;||<sub>&infin;</sub> {'<'} c&radic;n) &le; &Sigma;<sub>&epsilon; &isin; {'{'}&#8722;1,1{'}'}&#8319;</sub> P(||A&epsilon;||<sub>&infin;</sub> {'<'} c&radic;n)
        </MathBlock>

        <p>There are <span className="math-inline">|{'{'}&#8722;1, 1{'}'}&#8319;| = 2&#8319;</span> sign vectors, and each contributes at most <span className="math-inline">2<sup>&#8722;n</sup></span> by Step 4:</p>

        <MathBlock>&le; 2&#8319; &middot; 2<sup>&#8722;n</sup> = 1</MathBlock>

        <Callout type="warning">
          Wait -- this gives P(bad) &le; 1, not P(bad) {'<'} 1. That's technically not enough to conclude P(good) {'>'} 0! Let's address this.
        </Callout>

        <Toggle label="How do we get strict inequality?">
          <p>The bound <span className="math-inline">P(|&lang;v<sub>i</sub>, &epsilon;&rang;| {'<'} c&radic;n) {'<'} 1/2</span> from HW2 P4(c) is a <em>strict</em> inequality. So the product over n rows is <em>strictly</em> less than 2<sup>&#8722;n</sup>. When we sum over 2&#8319; sign vectors, we get strictly less than 1.</p>
          <p>More precisely: let q = max<sub>&epsilon;</sub> P(||A&epsilon;||<sub>&infin;</sub> {'<'} c&radic;n). Then q {'<'} 2<sup>&#8722;n</sup> (strict), so the union bound gives at most 2&#8319; &middot; q {'<'} 2&#8319; &middot; 2<sup>&#8722;n</sup> = 1. This is strictly less than 1, which is what we need.</p>
        </Toggle>
      </Step>

      {/* ============= STEP 6: CONCLUDE ============= */}
      <Step
        badge="STEP 6"
        title="Conclude -- the matrix exists"
        hint="P(bad) < 1 implies P(good) > 0, so the desired matrix exists."
        decision="The union bound gave us P(bad) < 1. The complementary event is exactly what we want."
      >
        <p>Since P(&exist;&epsilon;: ||A&epsilon;||<sub>&infin;</sub> {'<'} c&radic;n) {'<'} 1, we have:</p>

        <MathBlock>P(&forall;&epsilon; &isin; {'{'}&#8722;1, 1{'}'}&#8319;: ||A&epsilon;||<sub>&infin;</sub> &ge; c&radic;n) = 1 &#8722; P(&exist;&epsilon;: ||A&epsilon;||<sub>&infin;</sub> {'<'} c&radic;n) {'>'} 0</MathBlock>

        <p>A random matrix satisfies the desired property with positive probability. Therefore, <strong>there exists</strong> at least one n x n matrix A with 0-1 entries such that:</p>

        <MathBlock>min<sub>&epsilon; &isin; {'{'}&#8722;1, 1{'}'}&#8319;</sub> ||A&epsilon;||<sub>&infin;</sub> &ge; c&radic;n = &Omega;(&radic;n)     &#9633;</MathBlock>

        <Callout type="intuition">
          This is the{' '}
          <Term tooltip="A proof technique pioneered by Paul Erdos: to show an object with a desired property exists, show that a random object has the property with positive probability. You never find the object explicitly -- you just prove the 'haystack' contains at least one 'needle'.">probabilistic method</Term>
          {' '}in its purest form. We never actually identified which matrix works. We proved the space of all 0-1 matrices is large enough (and the bad event rare enough) that some matrix must survive. This is a pure existence proof.
        </Callout>

        <Toggle label="Can we actually find the matrix?">
          Not efficiently from this proof. A brute-force search would check all 2<sup>n&#178;</sup> matrices and all 2&#8319; sign vectors for each -- doubly exponential. There are derandomization techniques (e.g., the method of conditional expectations, or the Lovasz Local Lemma constructive version) that can sometimes convert probabilistic existence proofs into efficient algorithms, but that's beyond the scope of this problem. The point here is just existence.
        </Toggle>
      </Step>

      {/* ============= PROOF AT A GLANCE ============= */}
      <div className="separator"></div>

      <Box label="PROOF AT A GLANCE" labelColor="#7eb8da">
        <div className="proof-summary">
          <div className="comment">// Choose A randomly: each a_ij iid Bernoulli(1/2)</div>
          <br />
          <div><strong>Fix &epsilon; &isin; {'{'}&#8722;1, 1{'}'}&#8319;.</strong></div>
          <br />
          <div className="comment">// Row i: &lang;v_i, &epsilon;&rang; = &Sigma; a_ij &epsilon;_j, where a_ij ~ Bern(1/2) and |&epsilon;_j| = 1</div>
          <div>By HW2 P4(c): P(|&lang;v<sub>i</sub>, &epsilon;&rang;| {'<'} c&radic;n) {'<'} 1/2</div>
          <br />
          <div className="comment">// All rows small? Independence gives a product.</div>
          <div>P(||A&epsilon;||<sub>&infin;</sub> {'<'} c&radic;n) = &Pi;<sub>i</sub> P(|&lang;v<sub>i</sub>, &epsilon;&rang;| {'<'} c&radic;n) {'<'} (1/2)&#8319; = 2<sup>&#8722;n</sup></div>
          <br />
          <div className="comment">// Union bound over 2^n sign vectors</div>
          <div>P(&exist;&epsilon;: ||A&epsilon;||<sub>&infin;</sub> {'<'} c&radic;n) &le; 2&#8319; &middot; 2<sup>&#8722;n</sup> = 1</div>
          <br />
          <div className="comment">// Strict inequality (from the strict {'<'} 1/2 in P4(c))</div>
          <div>&rArr; P(min<sub>&epsilon;</sub> ||A&epsilon;||<sub>&infin;</sub> &ge; c&radic;n) {'>'} 0 &rArr; such A exists. &ensp; &#9633;</div>
        </div>
      </Box>

      {/* ============= WHY THIS MATTERS ============= */}
      <Box label="WHY THIS MATTERS" labelColor="#d4a574">
        <p><strong>1. The probabilistic method in action.</strong>
        {' '}This is a textbook application of the Erdos probabilistic method. The structure is always the same:
        (a) randomize the object, (b) bound the probability of each bad event, (c) union bound over all bad events,
        (d) show the total is less than 1. Master this template and you can prove existence results that seem
        impossible to approach constructively.</p>

        <p><strong>2. Anti-concentration meets combinatorics.</strong>
        {' '}The key ingredient was HW2 P4(c), an anti-concentration result. Concentration inequalities (Chernoff, Hoeffding)
        say a random variable is <em>close</em> to its mean. Anti-concentration says it's <em>not too close</em> to any
        particular value. This problem shows how anti-concentration feeds into the probabilistic method -- you need the
        "bad event" (being small) to not be too likely, and anti-concentration is exactly the tool for that.</p>

        <p><strong>3. The 2&#8319; vs 2<sup>&#8722;n</sup> miracle.</strong>
        {' '}The union bound over 2&#8319; sign vectors exactly cancels the 2<sup>&#8722;n</sup> from independence of n rows.
        This is not a coincidence -- Valettas set up the problem so the exponents match. In harder probabilistic method
        arguments (e.g., Lovasz Local Lemma), the bad events are not independent and the cancellation is more delicate.
        But the basic accounting -- "number of bad events" vs "probability of each one" -- is always the core tension.</p>

        <p><strong>4. Connections forward.</strong>
        {' '}Results like this appear in discrepancy theory (how well can sign vectors balance a set system?),
        in the study of random matrices, and in compressed sensing. The &Omega;(&radic;n) bound here is tight --
        one can show min<sub>&epsilon;</sub> ||A&epsilon;||<sub>&infin;</sub> = O(&radic;(n log n)) for any 0-1 matrix, so
        our random construction is nearly optimal.</p>
      </Box>

      <div className="footer">
        Hover dotted terms for definitions &middot; click arrows for deeper context
      <Footer />

      </div>

    </div>
  )
}
