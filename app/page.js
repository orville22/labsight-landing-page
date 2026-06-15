const standards = [
  'RCPAQAP APS',
  'CLSI EP26-A',
  'Westgard QC Principles',
  'Biological Variation (Ricos)',
];

const tools = [
  {
    title: 'Reagent Lot Verification Calculator',
    description:
      'Run 5 repeats across 3 QC levels, check bias against RCPAQAP APS limits, detect outliers with the Grubbs test, and generate a printable verification report with auto-generated investigation comments.',
    action: 'Launch Tool',
    href: '/tools/rgtlotverifierv1-2.html',
    tags: ['QC', 'Lot Verification', 'RCPAQAP APS', 'Grubbs Test'],
  },
  {
    title: 'Westgard Rules QC Checker',
    description:
      'Enter your QC data and get an instant Westgard multi-rule analysis with a Levey-Jennings chart and rule violation commentary.',
    action: 'Notify me',
    href: '#waitlist',
    tags: ['QC', 'Westgard', 'Levey-Jennings'],
    soon: true,
  },
  {
    title: 'Analytical Measurement Range (AMR) Validator',
    description:
      'Document linearity verification, calculate recovery, and generate an AMR report ready for accreditation review.',
    action: 'Notify me',
    href: '#waitlist',
    tags: ['Method Verification', 'Linearity', 'CLSI EP06'],
    soon: true,
  },
  {
    title: 'Biological Variation Goals Reference',
    description:
      'Look up Ricos desirable imprecision, bias, and total error goals for over 300 analytes alongside RCPAQAP APS limits for direct comparison.',
    action: 'Notify me',
    href: '#waitlist',
    tags: ['Biological Variation', 'APS', 'Total Allowable Error'],
    soon: true,
  },
];

const guides = [
  {
    title: 'New Reagent Lot Verification - A Complete Walkthrough',
    description:
      'Why it matters, how to design the verification, how to interpret bias against APS limits, what to do when a lot fails, and how to document it for accreditation.',
    time: '~12 min',
    href: '/blog/new-reagent-lot-verification-walkthrough',
  },
  {
    title: 'Understanding the RCPAQAP Analytical Performance Specifications',
    description:
      'A plain-language explanation of how APS limits are structured, what the basis categories mean, and how to use them as acceptance criteria.',
    time: '~8 min',
    href: '/blog/understanding-rcpaqap-analytical-performance-specifications',
  },
  {
    title: 'Westgard Rules Explained - Which Rules, When, and Why',
    description:
      'A practical guide to the 1-2s, 1-3s, 2-2s, R-4s, 4-1s, and 10x rules and how each detects a different type of analytical error.',
    time: '~10 min',
    href: '/blog/westgard-rules-explained',
  },
  {
    title: 'QC Target Re-establishment After a Lot Change',
    description:
      "Why 5 runs isn't enough to set new targets, how to accumulate 20 data points correctly, and when to formally update your mean and SD.",
    time: '~6 min',
    href: '/blog/qc-target-re-establishment-after-lot-change',
  },
  {
    title: 'Grubbs Test for Outliers - When to Use It and When Not To',
    description:
      "How to apply the Grubbs test correctly, what the rules around exclusion are, and why you can't remove a value just because it fails.",
    time: '~7 min',
    href: '/blog/grubbs-test-for-outliers',
  },
  {
    title: "Total Allowable Error, Imprecision, and Bias - What's the Difference?",
    description:
      'A practical explanation of the analytical performance hierarchy and how it connects to everyday QC decisions.',
    time: '~9 min',
    href: '/blog/total-allowable-error-imprecision-bias',
  },
];

const labOpsFeatures = [
  ['Current Issues Board', 'Create, filter, claim, and update operational items by status, category, severity, analyser, and ownership.'],
  ['Timeline-based Operational Memory', 'Keep troubleshooting notes, handover context, status changes, and ownership history attached to the issue instead of scattered across chats and notebooks.'],
  ['Analyser-focused Dashboard', 'See database-backed summary cards and analyser operations context so the team knows what needs attention before the next handover.'],
  ['Shared Whiteboard', 'Capture short-lived bench context, reminders, and team observations in one visible place during the working day.'],
  ['Low-friction Issue Creation', 'Quick-create buttons and a simple entry form make it easy to record problems while the details are still fresh.'],
  ['Role-aware Review Flow', 'User, Senior, and Admin roles support practical accountability now, with audit logs, reminders, and deeper permissions planned for later phases.'],
];

const audiences = [
  ['Medical Scientists & Analysts', "You're the one running the verifications, writing the SOPs, and answering the auditor's questions. LabSight gives you tools and reference material to do that faster and with more confidence."],
  ['Senior Scientists & QC Leads', "You're accountable for the quality system. LabSight gives you standardised workflows, clear documentation, and visibility without chasing spreadsheets."],
  ['Laboratory Managers & Pathologists', "You need to know the lab's QC is defensible without being involved in every decision. LabSight's sign-off workflows and audit trails give you assurance without micromanagement."],
];

const pillars = [
  ['Free tools', 'Calculators and checkers scientists can use now for real bench problems, starting with reagent lot verification.'],
  ['Practical resources', 'Short, standards-aware guides that explain how to apply QC and verification concepts at work.'],
  ['LabOps in development', 'An operational memory workspace for current issues, handover, troubleshooting, and analyser context.'],
];

const approach = [
  ['Grounded in real standards', 'Every tool and guide references the actual standards laboratory scientists work to: RCPAQAP APS, CLSI guidelines, and biological variation goals.'],
  ['Built by people who understand laboratories', "LabSight isn't a generic SaaS product that found its way into diagnostics. It is designed around clinical laboratory workflow from the bench to the audit."],
  ['Free where it matters', 'The knowledge and tools that help individual scientists do their jobs better will always be free on LabSight. LabOps is where we build a business.'],
];

export default function Page() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-nav">
          <a className="brand" href="#top" aria-label="LabSight home">
            <img className="brand-logo" src="/labsight_logo.svg" alt="LabSight logo" />
            <span>LabSight</span>
          </a>
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#free-tools">Free Tools</a>
            <a href="/blog">Blog</a>
            <a href="#labops">LabOps</a>
            <a href="#audience">Audience</a>
          </nav>
          <a className="btn btn-small" href="#waitlist">Join Waitlist</a>
        </div>
      </header>

      <main id="top">
        <section className="hero resource-hero">
          <div className="hero-copy">
            <p className="eyebrow">For laboratory scientists and QC professionals</p>
            <h1>Practical tools for laboratory scientists.</h1>
            <p className="hero-subtitle">
              LabSight builds software for the real operational work of the lab:
              QC, reagent lot changes, troubleshooting, handover, and
              documentation. Our full LabOps platform is still in development,
              but you can use our free tools and resources today.
            </p>
            <div className="hero-actions">
              <a className="btn" href="#free-tools">Explore Free Resources</a>
              <a className="btn secondary" href="#waitlist">Join the LabOps Waitlist</a>
            </div>
            <p className="supporting-line">
              Built by scientists who understand what happens at the bench.
            </p>
          </div>
          <div className="hero-panel">
            <div className="panel-label">Available now</div>
            <h2>Reagent Lot Verification Calculator</h2>
            <p>
              Compare old and new reagent lots, check APS bias, detect outliers,
              and generate an audit-ready verification report.
            </p>
            <a className="btn secondary" href="/tools/rgtlotverifierv1-2.html">Launch Tool</a>
          </div>
        </section>

        <section className="trust-bar" aria-label="Standards references">
          <p>Built on</p>
          <div>
            {standards.map((item) => <span key={item}>{item}</span>)}
          </div>
        </section>

        <section className="section about-section" id="about">
          <p className="section-label">About</p>
          <div className="split">
            <h2>LabSight builds useful lab software, starting with the problems scientists face every day.</h2>
            <div className="body-copy">
              <p>
                We are a lab software company building tools for scientists who
                run QC, investigate analyser issues, manage handover, document
                lot changes, and keep quality work defensible.
              </p>
              <p>
                The larger product vision is still in development. Rather than
                wait until everything is finished, we are publishing free tools
                and practical resources that provide value now.
              </p>
              <p>
                Everything here is clinically grounded, accreditation-aware, and
                written for people who understand the bench, not generic
                administrators.
              </p>
            </div>
          </div>
          <div className="three-grid pillar-grid">
            {pillars.map(([title, copy]) => (
              <article className="resource-card" key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="free-tools">
          <p className="section-label">Free Tools</p>
          <div className="section-heading">
            <h2>Start using these today. No signup needed.</h2>
            <p>
              Free resources are not a side project. They are how we make
              LabSight useful while the larger products are still being built.
            </p>
          </div>
          <div className="tool-grid">
            {tools.map((tool) => (
              <article className={`resource-card ${tool.soon ? 'muted-card' : 'featured-card'}`} key={tool.title}>
                {tool.soon && <span className="status-pill">Coming soon</span>}
                <h3>{tool.title}</h3>
                <p>{tool.description}</p>
                <div className="tag-list">
                  {tool.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <a className={tool.soon ? 'text-link' : 'btn card-btn'} href={tool.href}>
                  {tool.action} →
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="guides">
          <p className="section-label">Guides</p>
          <div className="section-heading">
            <h2>Practical knowledge, not textbook theory.</h2>
            <p>
              Written for scientists who need to apply this at work, not pass an
              exam.
            </p>
          </div>
          <div className="guide-grid">
            {guides.map((guide) => (
              <article className="resource-card guide-card" key={guide.title}>
                <span className="reading-time">Reading time: {guide.time}</span>
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
                <a className="text-link" href={guide.href}>Read article →</a>
              </article>
            ))}
          </div>
        </section>

        <section className="section labops-section" id="labops">
          <p className="section-label">Coming Soon</p>
          <div className="section-heading">
            <h2>LabOps - the operational memory your lab keeps losing.</h2>
            <p>
              A local-first workspace for QC handover, troubleshooting,
              investigation notes, analyser issues, and reagent or calibrator
              lot context.
            </p>
          </div>
          <p className="body-copy max-copy">
            LabOps is not a replacement for your LIS, middleware, analyser
            software, Unity Realtime, or official QC system. It is the
            collaboration layer around those systems: the place where current
            issues, handover notes, troubleshooting steps, ownership changes,
            and operational context stay visible instead of disappearing into
            memory, paper, or message threads.
          </p>
          <div className="feature-grid">
            {labOpsFeatures.map(([title, copy]) => (
              <article className="feature-tile" key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <div className="waitlist-card" id="waitlist">
            <div>
              <h3>Join the LabOps Waitlist</h3>
              <p>
                Be among the first labs to test LabOps as an operational memory
                layer. Early access is free, and your feedback shapes what we
                build next.
              </p>
            </div>
            <form className="waitlist-form" action="mailto:hello@labsight.io?subject=LabOps%20Waitlist" method="post" encType="text/plain">
              <label htmlFor="work-email">Work email address</label>
              <div>
                <input id="work-email" name="work-email" type="email" placeholder="scientist@lab.org" required />
                <button className="btn" type="submit">Request Early Access</button>
              </div>
              <p>No commitment. No spam. Just a heads-up when LabOps is ready for your lab.</p>
            </form>
          </div>
        </section>

        <section className="section" id="audience">
          <p className="section-label">Audience</p>
          <div className="section-heading">
            <h2>Built for the people doing the work.</h2>
          </div>
          <div className="three-grid">
            {audiences.map(([title, copy]) => (
              <article className="resource-card" key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="approach">
          <p className="section-label">Our Approach</p>
          <div className="section-heading">
            <h2>Clinically grounded. Practically designed.</h2>
          </div>
          <div className="three-grid">
            {approach.map(([title, copy]) => (
              <article className="resource-card" key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <a className="mobile-waitlist" href="#waitlist">Join LabOps Waitlist</a>

      <footer className="footer">
        <div className="footer-grid">
          <div>
            <h3>LabSight</h3>
            <p>Practical software tools for laboratory scientists.</p>
          </div>
          <div>
            <h3>Free Tools</h3>
            <a href="/tools/rgtlotverifierv1-2.html">Reagent Lot Verification Calculator</a>
            <span>Westgard QC Checker (coming soon)</span>
            <span>AMR Validator (coming soon)</span>
            <span>Biological Variation Reference (coming soon)</span>
          </div>
          <div>
            <h3>Guides</h3>
            <a href="/blog/new-reagent-lot-verification-walkthrough">New Lot Verification Walkthrough</a>
            <a href="/blog/understanding-rcpaqap-analytical-performance-specifications">RCPAQAP APS Explained</a>
            <a href="/blog/westgard-rules-explained">Westgard Rules Guide</a>
            <a href="/blog/qc-target-re-establishment-after-lot-change">QC Target Re-establishment</a>
            <a href="/blog/grubbs-test-for-outliers">Grubbs Test Guide</a>
            <a href="/blog/total-allowable-error-imprecision-bias">Total Allowable Error Guide</a>
          </div>
          <div>
            <h3>LabOps</h3>
            <a href="#labops">About LabOps</a>
            <a href="#waitlist">Join the Waitlist</a>
            <span>Request a Demo (coming soon)</span>
          </div>
          <div>
            <h3>Legal</h3>
            <span>Privacy Policy</span>
            <span>Terms of Use</span>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 LabSight. Built for laboratory scientists, by people who care
          about diagnostic quality.
        </div>
      </footer>
    </div>
  );
}
