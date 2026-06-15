const tools = [
  {
    title: 'Reagent Lot Verification Calculator',
    type: 'Interactive tool',
    status: 'Available now',
    description:
      'Run 5 repeats across 3 QC levels, check bias against RCPAQAP APS limits, detect outliers with the Grubbs test, and generate a printable verification report.',
    href: '/tools/rgtlotverifierv1-2.html',
    action: 'Launch Tool',
  },
  {
    title: 'Westgard Rules QC Checker',
    type: 'QC',
    status: 'Coming soon',
    description:
      'Enter QC data and get a Westgard multi-rule analysis with a Levey-Jennings chart and rule violation commentary.',
    href: '/#waitlist',
    action: 'Notify me',
  },
  {
    title: 'AMR Validator',
    type: 'Method verification',
    status: 'Coming soon',
    description:
      'Document linearity verification, calculate recovery, and generate an AMR report ready for accreditation review.',
    href: '/#waitlist',
    action: 'Notify me',
  },
  {
    title: 'Biological Variation Goals Reference',
    type: 'Reference',
    status: 'Coming soon',
    description:
      'Look up Ricos desirable imprecision, bias, and total error goals alongside RCPAQAP APS limits.',
    href: '/#waitlist',
    action: 'Notify me',
  },
];

export const metadata = {
  title: 'Free Tools | LabSight',
  description:
    'Free laboratory QC tools and clinical laboratory resources from LabSight.',
};

export default function DownloadsPage() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-nav">
          <a className="brand" href="/">
            <img className="brand-logo" src="/labsight_logo.svg" alt="LabSight logo" />
            <span>LabSight</span>
          </a>
          <nav className="nav-links" aria-label="Downloads navigation">
            <a href="/#free-tools">Free Tools</a>
            <a href="/#guides">Guides</a>
            <a href="/#labops">LabOps</a>
          </nav>
          <a className="btn btn-small" href="/#waitlist">Join Waitlist</a>
        </div>
      </header>

      <main>
        <section className="download-hero">
          <div>
            <p className="eyebrow">Free LabSight resources</p>
            <h1>Practical tools for QC, verification, and lab operations.</h1>
            <p>
              Start with the Reagent Lot Verification Calculator today. More
              tools are being prepared around Westgard rules, AMR validation,
              and biological variation goals.
            </p>
            <div className="hero-actions">
              <a className="btn" href="/tools/rgtlotverifierv1-2.html">Launch Reagent Lot Tool</a>
              <a className="btn secondary" href="/">Back to LabSight</a>
            </div>
          </div>
          <div className="hero-panel">
            <div className="panel-label">Available now</div>
            <h2>Reagent Lot Verification Calculator</h2>
            <p>
              Built around RCPAQAP APS limits, Grubbs outlier detection, and
              audit-ready report generation.
            </p>
          </div>
        </section>

        <section className="section">
          <p className="section-label">Free Tools</p>
          <div className="tool-grid">
            {tools.map((tool) => (
              <article className={`resource-card ${tool.status === 'Available now' ? 'featured-card' : 'muted-card'}`} key={tool.title}>
                <span className="status-pill">{tool.status}</span>
                <h3>{tool.title}</h3>
                <p>{tool.description}</p>
                <div className="tag-list">
                  <span>{tool.type}</span>
                </div>
                <a className={tool.status === 'Available now' ? 'btn card-btn' : 'text-link'} href={tool.href}>
                  {tool.action} →
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
