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
    document.title = 'PS5 Problem 3 — Impossibility and Optimality of Dimension Reduction'
  }, [])

  return (
    <div className="container container-narrow">

      {/* Header */}
      <div className="label">PROBLEM SET 5 · PROBLEM 3</div>
      <h1>Impossibility and Optimality of Dimension Reduction</h1>
      <p className="subtitle">
        Can you compress high-dimensional points into fewer dimensions without distorting distances?
        Part (a) says no, not exactly. Part (b) says the Johnson-Lindenstrauss bound is essentially tight.
      </p>

      <DifficultyDial />

      {/* ============= ORIENTATION ============= */}
      <Step
        badge="ORIENT"
        title="What is this problem about?"
        hint="Dimension reduction: when can you embed points in fewer dimensions?"
        decision="Before diving into proofs, we need to understand what dimension reduction means, what isometric means, and where the two parts are headed."
      >
        <p>
          <Term tooltip="A map P: S -> R^k that sends points from a high-dimensional space into a lower-dimensional one, ideally preserving geometric structure (distances, angles, etc.). The Johnson-Lindenstrauss lemma says approximate preservation is possible with k = O(log N).">Dimension reduction</Term>{' '}
          is one of the most important ideas in modern data science and theoretical computer science.
          You have N points in R^N (or some high-dimensional space), and you want to map them into R^k
          for some much smaller k, while preserving the distances between points.
        </p>

        <p>
          The points in question are the{' '}
          <Term tooltip="The standard basis vectors in R^N are e_1 = (1,0,...,0), e_2 = (0,1,...,0), ..., e_N = (0,0,...,1). Each has exactly one coordinate equal to 1 and all others 0. Any pair e_i, e_j with i != j satisfies ||e_i - e_j|| = sqrt(2).">standard basis vectors</Term>{' '}
          <span className="math-inline">x_1, ..., x_N</span> in <span className="math-inline">R^N</span>,
          plus the origin <span className="math-inline">0</span>.
        </p>

        <p>This problem has two parts with very different flavors:</p>
        <ul>
          <li><strong>Part (a):</strong> If the map P is{' '}
            <Term tooltip="A map P is isometric (distance-preserving) if ||P(u) - P(v)|| = ||u - v|| for all points u, v in the domain. No distortion at all — every distance is preserved exactly.">isometric</Term>{' '}
            (preserves all distances exactly), then you can't reduce dimension at all: k must be at least N.</li>
          <li><strong>Part (b):</strong> If the map P is allowed to{' '}
            <Term tooltip="Distortion is the factor by which distances can stretch or shrink. A map with distortion D satisfies ||u-v|| <= ||P(u)-P(v)|| <= D||u-v||. Here D = 2. The JL lemma achieves distortion 1+epsilon with k = O(log N / epsilon^2).">distort</Term>{' '}
            distances by a factor of 2, you still need k = Omega(log N). This shows the
            logarithmic dependence in the Johnson-Lindenstrauss lemma is optimal.</li>
        </ul>

        <Callout type="intuition">
          <p>Think of it this way: the standard basis vectors in R^N are maximally "spread out" --
          they're all the same distance from each other and from the origin. They form a very rigid
          geometric structure. Part (a) says you can't compress this structure at all without some
          distortion. Part (b) says even with distortion, you still need logarithmically many
          dimensions.</p>
        </Callout>

        <Toggle label="What is the Johnson-Lindenstrauss lemma, and why does Part (b) matter for it?">
          <p>The{' '}
            <Term tooltip="Any N points in R^d can be mapped to R^k with k = O(log(N)/epsilon^2) such that all pairwise distances are preserved up to a factor of (1+epsilon). The map can be taken to be a random linear projection. This is one of the most important results in high-dimensional geometry.">Johnson-Lindenstrauss (JL) lemma</Term>{' '}
            says: any N points in any dimension can be mapped to <span className="math-inline">R^k</span> with{' '}
            <span className="math-inline">k = O(log N / epsilon^2)</span>, preserving all pairwise
            distances up to a <span className="math-inline">(1 + epsilon)</span> factor.</p>
          <p>Part (b) proves the converse direction: even with the generous distortion factor of 2
            (corresponding to epsilon = 1 in JL), you need <span className="math-inline">k = Omega(log N)</span>.
            So JL's logarithmic dependence on N is tight -- you cannot do better.</p>
        </Toggle>

        <Callout type="connection">
          <p>Professor Valettas is building toward the Johnson-Lindenstrauss lemma. This problem
          establishes the lower bound side: dimension reduction <em>must</em> cost at least{' '}
          <span className="math-inline">Omega(log N)</span> dimensions, even with constant distortion.
          Next, the JL lemma shows this is achievable. Together they pin down the answer.</p>
        </Callout>
      </Step>

      {/* ============= PART (a) ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>Part (a) — Isometric Embedding Requires Full Dimension</h2>
        <p className="part-goal">Goal: Show that if <span className="math-inline">P: T cup {'\\{'}0{'\\}'} to R^k</span> is isometric, then <span className="math-inline">{'k >= N'}</span>.</p>
      </div>

      <Step
        badge="STEP 1"
        title="Define centered images"
        hint="Set y_i = P(x_i) - P(0) to center everything at the image of the origin."
        decision="The origin is in our point set, so we can use it as an anchor. Centering at P(0) lets us translate distance conditions into norm and inner product conditions on the y_i."
      >
        <p>Define:</p>
        <MathBlock>y_i = P(x_i) - P(0)     for i = 1, ..., N</MathBlock>

        <p>These are vectors in <span className="math-inline">R^k</span>. We've "re-centered" so that
        the image of the origin is at the origin of our coordinate system.</p>

        <Callout type="intuition">
          <p>Why center? Because isometry gives us distance equations, and distances from the origin
          become norms. Norms and inner products are easier to work with than raw distances between
          arbitrary points. This is a standard trick in metric geometry.</p>
        </Callout>
      </Step>

      <Step
        badge="STEP 2"
        title="Compute norms of the y_i"
        hint="Use isometry with the origin to get ||y_i|| = 1."
        decision="We have two types of distance information: distances from basis vectors to the origin, and distances between basis vectors. Start with the simpler one -- distances to the origin."
      >
        <p>Since P is{' '}
          <Term tooltip="||P(u) - P(v)||_2 = ||u - v||_2 for all u, v in the domain. Every distance is preserved exactly -- no stretching, no shrinking.">isometric</Term>,
          it preserves the distance from each <span className="math-inline">x_i</span> to the origin:</p>
        <MathBlock>{`||y_i||^2 = ||P(x_i) - P(0)||^2 = ||x_i - 0||^2 = ||x_i||^2 = 1`}</MathBlock>

        <p>Each standard basis vector has norm 1, so each <span className="math-inline">y_i</span> has norm 1.</p>
      </Step>

      <Step
        badge="STEP 3"
        title="Compute pairwise distances between y_i"
        hint="Use isometry between basis vectors: ||y_i - y_j|| = ||x_i - x_j|| = sqrt(2)."
        decision="Now use the other set of distance equations -- distances between distinct basis vectors -- to extract inner product information."
      >
        <p>For distinct <span className="math-inline">i != j</span>, isometry gives:</p>
        <MathBlock>{`||y_i - y_j||^2 = ||P(x_i) - P(x_j)||^2 = ||x_i - x_j||^2`}</MathBlock>

        <p>The distance between distinct standard basis vectors in <span className="math-inline">R^N</span> is:</p>
        <MathBlock>{`||x_i - x_j||^2 = ||e_i - e_j||^2 = 1 + 1 = 2`}</MathBlock>

        <p>(since <span className="math-inline">e_i</span> and <span className="math-inline">e_j</span>{' '}
          differ in exactly two coordinates, each contributing 1).</p>

        <p>So <span className="math-inline">||y_i - y_j||^2 = 2</span> for all <span className="math-inline">i != j</span>.</p>
      </Step>

      <Step
        badge="STEP 4"
        title="Extract orthogonality from the distance equations"
        hint="Expand ||y_i - y_j||^2 using norms and inner products to get <y_i, y_j> = 0."
        decision="This is the key algebraic step. We have norm information (Step 2) and distance information (Step 3). Expanding the squared distance in terms of inner products connects them."
      >
        <p>Expand the squared distance using the inner product:</p>
        <MathBlock>{`||y_i - y_j||^2 = ||y_i||^2 - 2<y_i, y_j> + ||y_j||^2`}</MathBlock>

        <p>Substitute the values we know:</p>
        <MathBlock>{`2 = 1 - 2<y_i, y_j> + 1 = 2 - 2<y_i, y_j>`}</MathBlock>

        <p>Therefore:</p>
        <MathBlock>{`<y_i, y_j> = 0     for all i != j`}</MathBlock>

        <Callout type="key">
          <p>This is the heart of the proof. The isometry constraint forced the images to be
          <em>orthogonal</em>. Combined with the fact that each has norm 1, we've shown that{' '}
          <span className="math-inline">y_1, ..., y_N</span> are{' '}
          <Term tooltip="A set of vectors is orthonormal if every vector has norm 1 and every pair of distinct vectors is orthogonal (inner product 0). An orthonormal set in R^k can have at most k vectors, since orthonormal vectors are linearly independent.">orthonormal</Term>.</p>
        </Callout>
      </Step>

      <Step
        badge="STEP 5"
        title="Conclude k >= N"
        hint="Orthonormal vectors are linearly independent. R^k can hold at most k linearly independent vectors."
        decision="We have N orthonormal vectors in R^k. This is a basic linear algebra fact -- it immediately forces k >= N."
      >
        <p><span className="math-inline">y_1, ..., y_N</span> are orthonormal vectors in{' '}
          <span className="math-inline">R^k</span>. Orthonormal vectors are linearly independent
          (if <span className="math-inline">sum c_i y_i = 0</span>, take the inner product with{' '}
          <span className="math-inline">y_j</span> to get <span className="math-inline">c_j = 0</span>).
        </p>

        <p>Since <span className="math-inline">R^k</span> has dimension k, it can contain at most k
          linearly independent vectors. Therefore:</p>
        <MathBlock>{'k >= N     QED'}</MathBlock>

        <Callout type="warning">
          <p>Don't forget that we needed the origin in the point set. Without it, we wouldn't have
          the "distance to 0" equations that gave us <span className="math-inline">||y_i|| = 1</span>.
          The problem statement includes <span className="math-inline">0</span> in the domain deliberately --
          it's what lets us pin down norms, not just pairwise distances.</p>
        </Callout>

        <Toggle label="What if we didn't have the origin in the point set?">
          <p>Without the origin, we'd only know <span className="math-inline">||y_i - y_j||^2 = 2</span>{' '}
          for all <span className="math-inline">i != j</span> (where <span className="math-inline">y_i = P(x_i)</span>).
          You could still center by picking any one point as the origin, say setting{' '}
          <span className="math-inline">z_i = y_i - y_1</span>. Then{' '}
          <span className="math-inline">z_1 = 0</span> and{' '}
          <span className="math-inline">||z_i - z_j||^2 = 2</span> for <span className="math-inline">i != j</span>,
          but you wouldn't know <span className="math-inline">||z_i||</span> for{' '}
          <span className="math-inline">{'i >= 2'}</span>. The argument would still work out (you'd get{' '}
          <span className="math-inline">{'k >= N - 1'}</span>), but it's less clean.</p>
        </Toggle>
      </Step>

      {/* ============= PART (b) ============= */}
      <div className="separator"></div>
      <div className="part-header">
        <h2>Part (b) — Even With Distortion, k = Omega(log N)</h2>
        <p className="part-goal">Goal: If <span className="math-inline">||x_i - x_j|| &lt;= ||Px_i - Px_j|| &lt;= 2||x_i - x_j||</span> for all i, j, then <span className="math-inline">k = Omega(log N)</span>.</p>
      </div>

      <Step
        badge="STEP 1"
        badgeClass="step-badge-b"
        title="Center and establish bounds on the images"
        hint="Set y_i = Px_i - Px_1. Use the distortion bounds to get ||y_i|| <= 3 and ||y_i - y_j|| > 1."
        decision="Part (a) centered at the origin's image. Here we don't have 0 in the domain, so we center at one of the points. The hint suggests x_1. Then we translate the distortion bounds into bounds on the y_i."
      >
        <p>Following the hint, define:</p>
        <MathBlock>y_i = P(x_i) - P(x_1)     for i = 2, ..., N</MathBlock>

        <p>Note <span className="math-inline">y_1</span> would be 0, so we have{' '}
          <span className="math-inline">N - 1</span> nonzero vectors in <span className="math-inline">R^k</span>.</p>

        <p><strong>Upper bound on norms.</strong> Using the upper distortion bound:</p>
        <MathBlock>{`||y_i|| = ||Px_i - Px_1|| <= 2||x_i - x_1|| = 2 sqrt(2) < 3`}</MathBlock>

        <Toggle label="Why is ||x_i - x_1|| = sqrt(2)?">
          <p>Both <span className="math-inline">x_i</span> and <span className="math-inline">x_1</span>{' '}
          are standard basis vectors in <span className="math-inline">R^N</span>. For{' '}
          <span className="math-inline">i != 1</span>, they differ in exactly two coordinates (one is 1 where
          the other is 0, and vice versa), so{' '}
          <span className="math-inline">||x_i - x_1||^2 = 1^2 + (-1)^2 = 2</span>.</p>
        </Toggle>

        <p><strong>Lower bound on pairwise separation.</strong> Using the lower distortion bound, for{' '}
          <span className="math-inline">i != j</span> (both at least 2):</p>
        <MathBlock>{`||y_i - y_j|| = ||Px_i - Px_j|| >= ||x_i - x_j|| = sqrt(2) > 1`}</MathBlock>

        <Callout type="key">
          <p>We've established two crucial facts about the <span className="math-inline">N - 1</span> points{' '}
            <span className="math-inline">y_2, ..., y_N</span> in <span className="math-inline">R^k</span>:</p>
          <ul>
            <li>Each lives in a ball of radius 3 around the origin (bounded)</li>
            <li>Any two are separated by distance more than 1 (spread out)</li>
          </ul>
          <p>Bounded but spread out -- these are competing constraints. How many such points can you
          pack into <span className="math-inline">R^k</span>? This is a packing problem, and the answer
          depends on k.</p>
        </Callout>
      </Step>

      <Step
        badge="STEP 2"
        badgeClass="step-badge-b"
        title="Set up the packing argument"
        hint="Place balls of radius 1/2 at each y_i. They're disjoint (centers > 1 apart) and fit in a ball of radius 4."
        decision="The separation > 1 means balls of radius 1/2 centered at the y_i don't overlap. The norm bound < 3 means all these balls fit inside a larger ball. Comparing volumes will give us the bound on N."
      >
        <p>Place a Euclidean ball of radius <span className="math-inline">1/2</span> around each{' '}
          <span className="math-inline">y_i</span> for <span className="math-inline">i = 2, ..., N</span>:</p>
        <MathBlock>B(y_i, 1/2)     for i = 2, ..., N</MathBlock>

        <p><strong>The balls are disjoint.</strong> If two balls overlapped, there would exist a point z with{' '}
          <span className="math-inline">||z - y_i|| &lt; 1/2</span> and{' '}
          <span className="math-inline">||z - y_j|| &lt; 1/2</span>. By the triangle inequality:</p>
        <MathBlock>{`||y_i - y_j|| <= ||y_i - z|| + ||z - y_j|| < 1/2 + 1/2 = 1`}</MathBlock>

        <p>But we showed <span className="math-inline">{'||y_i - y_j|| > 1'}</span> -- contradiction. So the balls
        are mutually disjoint.</p>

        <p><strong>All balls are contained in <span className="math-inline">B(0, 4)</span>.</strong>{' '}
          For any point <span className="math-inline">z in B(y_i, 1/2)</span>:</p>
        <MathBlock>{`||z|| <= ||z - y_i|| + ||y_i|| < 1/2 + 3 = 3.5 < 4`}</MathBlock>

        <p>So every ball <span className="math-inline">B(y_i, 1/2)</span> sits inside{' '}
          <span className="math-inline">B(0, 4)</span>.</p>

        <Callout type="intuition">
          <p>Picture this in 2D or 3D: you're packing small non-overlapping balls inside a large ball.
          How many can you fit? The answer depends on the ratio of radii and the dimension.
          In high dimensions, volumes scale as <span className="math-inline">r^k</span>, so the ratio
          of volumes grows exponentially with k. This is what makes the argument work.</p>
        </Callout>
      </Step>

      <Step
        badge="STEP 3"
        badgeClass="step-badge-b"
        title="Volume comparison"
        hint="(N-1) * Vol(B_k(1/2)) <= Vol(B_k(4)), then use Vol(B_k(r)) = r^k * Vol(B_k(1))."
        decision="Since disjoint sets inside a larger set have total volume at most the volume of the larger set, we get an inequality. The volume of a k-dimensional ball of radius r is proportional to r^k, which lets us cancel the complicated dimensional constants."
      >
        <p>Since the <span className="math-inline">N - 1</span> disjoint balls are all contained in{' '}
          <span className="math-inline">B(0, 4)</span>, their total volume is at most the volume of{' '}
          <span className="math-inline">B(0, 4)</span>:</p>
        <MathBlock>{`(N - 1) * Vol(B_k(1/2)) <= Vol(B_k(4))`}</MathBlock>

        <p>The{' '}
          <Term tooltip="The volume of a k-dimensional ball of radius r is Vol(B_k(r)) = V_k * r^k, where V_k = pi^(k/2) / Gamma(k/2 + 1) is the volume of the unit ball in R^k. The exact formula for V_k is not needed here -- only the scaling Vol(B_k(r)) = r^k * Vol(B_k(1)).">volume of a k-dimensional ball</Term>{' '}
          of radius r is:</p>
        <MathBlock>{`Vol(B_k(r)) = r^k * Vol(B_k(1))`}</MathBlock>

        <p>Substituting:</p>
        <MathBlock>{`(N - 1) * (1/2)^k * Vol(B_k(1)) <= 4^k * Vol(B_k(1))`}</MathBlock>

        <p>The <span className="math-inline">Vol(B_k(1))</span> cancels (it's positive):</p>
        <MathBlock>{`(N - 1) * (1/2)^k <= 4^k`}</MathBlock>

        <MathBlock>{`N - 1 <= 4^k / (1/2)^k = (4 / (1/2))^k = 8^k`}</MathBlock>

        <Callout type="key">
          <p>This is the punchline: the number of points you can pack is at most exponential in the
          dimension k. The base 8 comes from the ratio 4/(1/2) = 8 between the outer and inner radii.
          Different distortion factors would give a different base, but the exponential dependence on k
          is what matters.</p>
        </Callout>

        <Toggle label="Why does Vol(B_k(1)) cancel so cleanly?">
          <p>Because the volume of a ball of radius r in R^k is <em>always</em>{' '}
            <span className="math-inline">r^k</span> times the volume of the unit ball. This is just
            the scaling property of volume under dilation: stretching all coordinates by r multiplies
            k-dimensional volume by <span className="math-inline">r^k</span>. The complicated formula
            for <span className="math-inline">Vol(B_k(1))</span> involving pi and the Gamma function
            is the same on both sides, so it drops out. This is why packing arguments are so powerful --
            you never need to compute the actual volume constants.</p>
        </Toggle>
      </Step>

      <Step
        badge="STEP 4"
        badgeClass="step-badge-b"
        title="Solve for k"
        hint="Take log of N-1 <= 8^k to get k >= log(N-1)/log(8) = Omega(log N)."
        decision="We have an exponential bound on N in terms of k. Taking logarithms converts this to a logarithmic lower bound on k in terms of N."
      >
        <p>From <span className="math-inline">N - 1 &lt;= 8^k</span>, take logarithms:</p>
        <MathBlock>{`log(N - 1) <= k * log(8)`}</MathBlock>

        <MathBlock>{`k >= log(N - 1) / log(8)`}</MathBlock>

        <p>Since <span className="math-inline">log(N - 1) = Theta(log N)</span> for large N:</p>
        <MathBlock>{`k = Omega(log N)     QED`}</MathBlock>

        <Callout type="warning">
          <p>Be careful with the constant. We get <span className="math-inline">{'k >= log(N-1) / log(8) = log(N-1) / (3 log 2)'}</span>.
            The JL lemma achieves <span className="math-inline">k = O(log N / epsilon^2)</span>, and here
            our distortion is 2 (so <span className="math-inline">epsilon = 1</span>). The lower bound
            <span className="math-inline">{'k >= log(N) / 3'}</span> and the upper bound{' '}
            <span className="math-inline">k = O(log N)</span> match up to constants. The logarithmic
            dependence is tight.</p>
        </Callout>
      </Step>


      {/* ============= CLOSING BOXES ============= */}
      <div className="separator"></div>

      <Box label="PROOF AT A GLANCE" labelColor="#7eb8da">
        <div className="proof-summary">
          <div className="comment">{'// Part (a): Isometric embedding requires k >= N'}</div>
          <div>{'Set y_i = P(x_i) - P(0).  Isometry gives ||y_i|| = 1 and ||y_i - y_j|| = sqrt(2).'}</div>
          <div>{'Expand: 2 = 1 - 2<y_i,y_j> + 1  =>  <y_i,y_j> = 0.'}</div>
          <div>{'So y_1,...,y_N are orthonormal in R^k  =>  k >= N.     QED'}</div>
          <div>&nbsp;</div>
          <div className="comment">{'// Part (b): Distortion 2 still requires k = Omega(log N)'}</div>
          <div>{'Set y_i = Px_i - Px_1.  Distortion gives ||y_i|| < 3, ||y_i - y_j|| > 1.'}</div>
          <div>{'Balls B(y_i, 1/2) are disjoint, all inside B(0, 4).'}</div>
          <div>{'(N-1)(1/2)^k <= 4^k  =>  N-1 <= 8^k  =>  k >= log(N)/log(8).     QED'}</div>
        </div>
      </Box>

      <Box label="WHY THIS MATTERS" labelColor="#d4a574">
        <p><strong>1. It's the lower bound for Johnson-Lindenstrauss.</strong> The JL lemma says you
        can embed N points into <span className="math-inline">O(log N / epsilon^2)</span> dimensions with
        distortion <span className="math-inline">1 + epsilon</span>. Part (b) proves you can't do
        better than <span className="math-inline">Omega(log N)</span> -- the JL lemma is essentially optimal
        in its dependence on N.</p>

        <p><strong>2. It illustrates two proof paradigms.</strong> Part (a) is pure linear algebra:
        isometry forces orthogonality, orthogonality forces independence, independence forces dimension.
        Part (b) is a volume/packing argument: bounded but separated points can't be too numerous, and
        comparing volumes gives quantitative bounds. Both paradigms are central to high-dimensional geometry.</p>

        <p><strong>3. The volume argument is a workhorse.</strong> The technique in Part (b) -- placing
        disjoint balls inside a larger ball and comparing volumes -- appears throughout combinatorics,
        coding theory (Gilbert-Varshamov bound), and learning theory. Professor Valettas is teaching you
        a tool you'll use again and again.</p>

        <p><strong>4. Honest difficulty assessment.</strong> Part (a) is straightforward once you see
        the centering trick -- the algebra is short and the linear algebra is standard. Part (b)
        requires the geometric insight to set up the packing argument, but the hint essentially tells
        you the key steps. The hard part is understanding <em>why</em> it works, not executing the computation.</p>
      </Box>

      <Box label="CONNECTIONS" labelColor="#a8d4a0">
        <p><strong>-&gt; Johnson-Lindenstrauss Lemma.</strong> This is the context for the whole problem.
        The{' '}
          <Term tooltip="Any N points in R^d can be embedded into R^k with k = O(log(N)/epsilon^2) preserving all pairwise distances up to a (1+epsilon) factor. The embedding can be a random projection. This is one of the foundational results in dimensionality reduction.">JL lemma</Term>{' '}
          gives the upper bound (a random projection works), and Part (b) gives the matching lower bound.
          Together: for N points with constant distortion, you need exactly <span className="math-inline">Theta(log N)</span> dimensions.</p>

        <p><strong>-&gt; Random projections.</strong> The standard proof of JL uses random projections --
        multiplying by a random matrix with entries drawn from N(0, 1/k). The concentration of measure
        tools from earlier problem sets (Chernoff, Hoeffding) are exactly what you need to show the
        distances concentrate around their expected values.</p>

        <p><strong>-&gt; Coding theory.</strong> Part (b)'s packing argument is essentially the same as
        the Hamming bound / sphere-packing bound in coding theory. There, codewords must be separated
        (to allow error correction), but they live in a bounded space ({'\\{'}0,1{'}\\}'}^n).
        Comparing the number of disjoint Hamming balls to the total space gives an upper bound on
        the number of codewords.</p>

        <p><strong>-&gt; High-dimensional geometry.</strong> A recurring theme in Professor Valettas's course:
        high-dimensional spaces behave very differently from low-dimensional intuition. In particular,
        volumes grow exponentially with dimension, which is both the curse (you need exponentially many
        samples to "fill" a high-dimensional space) and the blessing (you can pack exponentially many
        well-separated points).</p>
      </Box>

      <Footer />

    </div>
  )
}
