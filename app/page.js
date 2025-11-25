import Image from "next/image";

const metrics = [
  "Lightweight & fast",
  "Audit-ready from day one",
  "Zero learning curve for staff"
];

const heroCards = [
  {
    tag: "LabSight QMS",
    title: "Quality meets velocity",
    description:
      "QC oversight without spreadsheets or patchwork tools. Trend, investigate, and act with ISO 15189-aligned workflows that teams actually use.",
    accent: "accent"
  },
  {
    tag: "SpeciTrak",
    title: "Send-out tracking without chaos",
    description:
      "The logistics layer between Kestral LIS and your couriers. Every referred-out sample is traceable, time-stamped, and accountable—no more email chase-ups.",
    accent: "accent-2"
  }
];

const services = [
  {
    tag: "LabSight QMS",
    title: "Quality Management System",
    description:
      "QC made simple, smart, and compliant. Monitor, investigate, and improve analytical performance without spreadsheets or patchwork tools.",
    accent: "accent",
    features: [
      {
        title: "QC grid dashboard",
        copy: "Real-time analyte overview across platforms with clear trendlines."
      },
      {
        title: "Trend analysis",
        copy: "Levey-Jennings charts, Westgard rule detection, and intelligent alerts."
      },
      {
        title: "Review & action",
        copy: "Document issues, track resolutions, and stay audit-ready with ISO 15189-aligned workflows."
      }
    ]
  },
  {
    tag: "SpeciTrak",
    title: "End-to-end send-out tracking",
    description:
      "SpeciTrak overlays the logistics layer between your Kestral LIS and the physical courier process—no LIS replacement required. Every referred-out sample is time-stamped, accountable, and visible from pickup to final report.",
    accent: "accent-2",
    features: [
      {
        title: "Sample registration & barcodes",
        copy: "End-to-end traceability, including BOR handling and batch tracking."
      },
      {
        title: "Courier mobile app",
        copy: "Status updates at each handover; “where is my sample?” answered instantly."
      },
      {
        title: "TAT analytics",
        copy: "Turnaround-time monitoring, notifications, exceptions, and full audit trail for accreditation."
      }
    ]
  },
  {
    tag: "Inventory App (name TBD)",
    title: "Smart reagent & supply management",
    description:
      "Lightweight, accurate, and fast. Eliminate stockouts, guessing, and manual tallying with a zero-learning-curve workflow.",
    accent: "accent",
    features: [
      {
        title: "Real-time stock levels",
        copy: "Scan-to-use at fridges and analyzers with future analyzer/middleware integrations."
      },
      {
        title: "Expiry & lot tracking",
        copy: "Lot numbers, expirations, and certificates tied to runs for faster QC review."
      },
      {
        title: "Usage analytics",
        copy: "Predict consumption based on actual workload with multi-lab architecture to keep facilities separate and secure."
      }
    ]
  }
];

const why = [
  {
    title: "Built by a medical scientist",
    copy: "15+ years of lab experience baked into workflows that understand QC pain points and accreditation pressure."
  },
  {
    title: "Lightweight and fast",
    copy: "No corporate-level complexity—just what small-to-medium labs need to move quickly."
  },
  {
    title: "Secure and scalable",
    copy: "Cloud-hosted, role-based controls, and audit trails that work whether you have 5 users or 500."
  },
  {
    title: "Designed for adoption",
    copy: "Minimal clicks, clear screens, and mobile-friendly layouts your staff will actually use."
  },
  {
    title: "Future-ready",
    copy: "AI-assisted QC intelligence, analyzer-linked inventory deductions, and automated compliance on the roadmap."
  },
  {
    title: "One ecosystem",
    copy: "Connected signals across QC, send-outs, and inventory so operations stay in sync."
  }
];

const vision = [
  {
    title: "One ecosystem, one login",
    copy: "A single, reliable place for all lab operations: QC, send-outs, and inventory moving in sync."
  },
  {
    title: "Practical for everyday teams",
    copy: "Designed for real laboratories to stay compliant, efficient, and confident—without enterprise bloat."
  }
];

const buttonPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-gradient-to-br from-[#7ab7ff40] to-[#6af0c930] px-4 py-3 text-[var(--text)] font-semibold shadow-[var(--glow)] transition hover:-translate-y-0.5 hover:border-white/20 hover:shadow-[0_18px_60px_rgba(0,0,0,0.25),var(--glow)]";

const buttonSecondary =
  "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-[var(--text)] font-semibold transition hover:-translate-y-0.5 hover:border-white/30";

export default function Page() {
  return (
    <div className="relative isolate">
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(122,183,255,0.22),transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute -right-16 -bottom-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(106,240,201,0.2),transparent_70%)] blur-3xl" />

      <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[rgba(8,13,28,0.85)] backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-4">
          <div className="flex items-center gap-3 text-sm font-semibold tracking-tight text-[var(--text)]">
            <Image
              src="/labsight_logo.svg"
              alt="LabSight logo"
              width={200}
              height={200}
              className="h-10 w-auto brightness-110 contrast-110"
              priority
            />
            <span className="hidden sm:inline">LabSight</span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-4 text-sm text-[var(--muted)]">
              <li>
                <a className="rounded-lg px-2.5 py-2 transition hover:bg-white/5 hover:text-[var(--text)]" href="#services">
                  Platform
                </a>
              </li>
              <li>
                <a className="rounded-lg px-2.5 py-2 transition hover:bg-white/5 hover:text-[var(--text)]" href="#why">
                  Why LabSight
                </a>
              </li>
              <li>
                <a className="rounded-lg px-2.5 py-2 transition hover:bg-white/5 hover:text-[var(--text)]" href="#cta">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <a className={buttonPrimary} href="#cta">
            Request a demo
          </a>
        </div>
      </header>

      <main className="relative mx-auto max-w-5xl px-5 pb-20 pt-12">
        <section className="grid items-center gap-8 md:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-white/5 px-4 py-2 text-sm text-[var(--muted)]">
              <span>Built by a medical scientist</span>
              <span className="flex items-center gap-2 text-[var(--text)]">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l3 3 7-7" />
                </svg>
                Designed for real laboratories
              </span>
            </div>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              LabSight Ecosystem — the modern pathology lab platform.
            </h1>
            <p className="text-[var(--muted)] leading-relaxed">
              Built by a Medical Scientist. Engineered for Every Lab. LabSight is a unified digital ecosystem designed to streamline quality management,
              sample logistics, and inventory control across laboratories of all sizes—from single-site teams to enterprise-scale, multi-department networks.
              Whether your lab processes hundreds of samples a day or hundreds of thousands, LabSight provides the clarity, tracking, and automation needed to
              ensure accuracy, compliance, and operational excellence.
            </p>
            <div className="flex flex-wrap gap-3">
              <a className={buttonPrimary} href="#cta">
                Book a walkthrough
              </a>
              <a className={buttonSecondary} href="#services">
                Explore the suite
              </a>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {metrics.map((metric) => (
                <div
                  key={metric}
                  className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-white/5 px-3.5 py-2.5 text-sm text-[var(--muted)]"
                >
                  {metric}
                </div>
              ))}
            </div>
          </div>

          <div className="glass mt-2 space-y-4 bg-[linear-gradient(180deg,var(--card),var(--panel))] p-5">
            <div className="relative z-10 grid gap-4">
              {heroCards.map((card, idx) => (
                <div
                  key={card.title}
                  className={`relative rounded-[18px] border border-[var(--border)] bg-[radial-gradient(circle_at_80%_10%,rgba(122,183,255,0.2),transparent_40%),var(--card)] p-4 transition hover:-translate-y-1 hover:border-white/20 ${
                    idx === 1 ? "bg-[radial-gradient(circle_at_20%_20%,rgba(106,240,201,0.26),transparent_50%),#0c1426]" : ""
                  }`}
                >
                  <div
                    className={`mb-2 inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${
                      card.accent === "accent-2"
                        ? "border-[rgba(122,183,255,0.35)] bg-[rgba(122,183,255,0.14)] text-[var(--accent-2)]"
                        : "border-[rgba(106,240,201,0.35)] bg-[rgba(106,240,201,0.12)] text-[var(--accent)]"
                    }`}
                  >
                    {card.tag}
                  </div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{card.description}</p>
                  <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-[var(--text)]">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ background: card.accent === "accent-2" ? "var(--accent-2)" : "var(--accent)" }}
                    />
                    {idx === 0 ? "Real-time deviation capture" : "TAT monitoring & exceptions"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="mt-16 space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-2xl font-semibold">The LabSight ecosystem</h2>
            <span className="text-sm text-[var(--muted)]">
              One suite built for small-to-medium pathology labs that want clarity without the complexity.
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="rounded-[18px] border border-[var(--border)] bg-[radial-gradient(circle_at_80%_10%,rgba(122,183,255,0.2),transparent_40%),var(--card)] p-5">
                <div
                  className={`mb-3 inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${
                    service.accent === "accent-2"
                      ? "border-[rgba(122,183,255,0.35)] bg-[rgba(122,183,255,0.14)] text-[var(--accent-2)]"
                      : "border-[rgba(106,240,201,0.35)] bg-[rgba(106,240,201,0.12)] text-[var(--accent)]"
                  }`}
                >
                  {service.tag}
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-2 text-[var(--muted)] leading-relaxed">{service.description}</p>
                <div className="mt-4 grid gap-3">
                  {service.features.map((feature) => (
                    <div key={feature.title} className="rounded-[14px] border border-[var(--border)] bg-white/5 p-3.5">
                      <h4 className="text-base font-semibold">{feature.title}</h4>
                      <p className="text-[var(--muted)] text-sm leading-relaxed">{feature.copy}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="why" className="mt-16 space-y-4">
          <h2 className="text-2xl font-semibold">Why labs choose LabSight</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {why.map((item) => (
              <div key={item.title} className="rounded-[18px] border border-[var(--border)] bg-white/5 p-4">
                <h4 className="text-lg font-semibold">{item.title}</h4>
                <p className="text-[var(--muted)] text-sm leading-relaxed">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="vision" className="mt-14 space-y-4">
          <h2 className="text-2xl font-semibold">The LabSight vision</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {vision.map((item) => (
              <div key={item.title} className="rounded-[18px] border border-[var(--border)] bg-white/5 p-4">
                <h4 className="text-lg font-semibold">{item.title}</h4>
                <p className="text-[var(--muted)] text-sm leading-relaxed">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="cta" className="mt-16 rounded-3xl border border-[rgba(122,183,255,0.35)] bg-gradient-to-br from-[#0b162b] via-[#101c33] to-[#0f1f3d] p-7 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
          <h3 className="text-2xl font-semibold">Want early access?</h3>
          <p className="mt-2 max-w-3xl text-[var(--muted)] leading-relaxed">
            LabSight is in private beta. Be the first to try the future of lab QC, sample tracking, and stock management—one ecosystem, one login, one reliable
            place for operations.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a className={buttonPrimary} href="mailto:hello@labsight.io">
              Register your interest
            </a>
            <a className={buttonSecondary} href="#services">
              Request a demo
            </a>
            <a className={buttonSecondary} href="mailto:hello@labsight.io?subject=Partner%20with%20LabSight">
              Partner with us
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border)] bg-transparent py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 text-sm text-[var(--muted)]">
          <div className="flex items-center gap-3 text-[var(--muted)]">
            <Image
              src="/labsight_logo.svg"
              alt="LabSight logo"
              width={200}
              height={200}
              className="h-10 w-auto brightness-110 contrast-110"
            />
            <span>LabSight</span>
          </div>
          <span>Built for modern diagnostic and research labs.</span>
        </div>
      </footer>
    </div>
  );
}
