import { createFileRoute } from "@tanstack/react-router";
import resumeAsset from "@/assets/resume.pdf.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "John Jebas — Cyber Security Analyst | SOC, Sentinel, VAPT" },
      {
        name: "description",
        content:
          "Portfolio of John Jebas, SOC Tier 1&2 Cyber Security Analyst in Chennai specializing in Microsoft Sentinel, KQL threat hunting, EDR incident response and VAPT.",
      },
      { property: "og:title", content: "John Jebas — Cyber Security Analyst (SOC Tier 1&2)" },
      {
        property: "og:description",
        content:
          "SIEM monitoring with Microsoft Sentinel & KQL, incident response with Bitdefender EDR, and web app VAPT with Burp Suite and Nessus.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const skills: { group: string; items: string[] }[] = [
  {
    group: "SIEM & Threat Detection",
    items: [
      "Microsoft Sentinel",
      "KQL",
      "Log Analysis",
      "Threat Hunting",
      "Alert Tuning & Triage",
      "Playbook Development",
    ],
  },
  {
    group: "VAPT & Security Testing",
    items: [
      "Burp Suite Pro",
      "Nessus",
      "Nmap",
      "OWASP ZAP",
      "SecPod SanerNow",
      "CVE / CVSS Scoring",
      "Exploit Validation",
    ],
  },
  {
    group: "EDR & Incident Response",
    items: [
      "Bitdefender EDR",
      "Malware Analysis",
      "Threat Containment",
      "IOC / IOA",
      "VirusTotal",
      "Threat Intelligence",
      "SOAR Concepts",
    ],
  },
  {
    group: "Networking & Platforms",
    items: [
      "TCP/IP",
      "DNS",
      "HTTP/HTTPS",
      "Windows",
      "Linux (Kali)",
      "Firewall Fundamentals",
      "Traffic Analysis",
    ],
  },
  {
    group: "Scripting & Tools",
    items: ["KQL", "SQL", "Python (Basic)", "Bash"],
  },
];

const duties = [
  "Monitored and investigated security alerts in Microsoft Sentinel using KQL — alert triage, log analysis and threat hunting across enterprise environments.",
  "Created and tuned Sentinel analytics rules, automation playbooks and incident workflows to improve detection quality and SOC efficiency.",
  "Investigated phishing, brute-force, malware and suspicious authentication incidents, documenting findings and driving containment and remediation.",
  "Conducted VAPT on web applications and internal systems with Burp Suite Pro, Nessus and OWASP ZAP — SQLi, XSS, auth flaws and misconfigurations.",
  "Ran vulnerability assessments across endpoints with SecPod SanerNow and Nessus, prioritising remediation by CVE/CVSS severity.",
  "Managed endpoint security with Bitdefender EDR across Windows and Linux — malware investigation, containment and endpoint analysis.",
  "Validated malicious IPs, domains and hashes via VirusTotal and threat intel sources, and prepared incident and VAPT reports with remediation guidance.",
];

const certifications = [
  { name: "Certified Ethical Hacker (CEH)", issuer: "EC-Council", status: "In Progress" },
  { name: "Security Operations and Defense Analyst", issuer: "Splunk" },
  { name: "Understanding Threats and Attacks", issuer: "Splunk" },
  { name: "Cybersecurity Essentials", issuer: "Cisco Networking Academy" },
  { name: "SanerNow Cyber Hygiene Platform Training", issuer: "SecPod" },
];

const stats = [
  { value: "1.5 yrs", label: "SOC Experience" },
  { value: "Tier 1&2", label: "Analyst Level" },
  { value: "MITRE", label: "ATT&CK Aligned" },
  { value: "OWASP", label: "Top 10 Testing" },
];

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-8 flex items-baseline gap-4">
      <span className="mono-label">{index}</span>
      <h2 className="font-mono text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

function Portfolio() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="hero-glow border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
          <p className="mono-label">$ whoami</p>
          <h1 className="mt-4 font-mono text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            John Jebas
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Cyber Security Analyst (SOC Tier 1&amp;2) — Microsoft Sentinel · KQL threat hunting ·
            Bitdefender EDR · VAPT
          </p>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            1 year 5 months of Security Operations Center experience at TVS Electronics across
            threat detection, incident investigation and vulnerability management. Splunk certified,
            currently pursuing CEH.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={resumeAsset.url}
              download="John_Jebas_Resume.pdf"
              className="glow-ring inline-flex items-center rounded-md bg-primary px-5 py-2.5 font-mono text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Download Résumé
            </a>
            <a
              href="mailto:johnjebas02@gmail.com"
              className="inline-flex items-center rounded-md border border-border bg-card px-5 py-2.5 font-mono text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              johnjebas02@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/john-jebas-a24659275"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-md border border-border bg-card px-5 py-2.5 font-mono text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              LinkedIn
            </a>
          </div>

          <div className="mt-6 font-mono text-xs text-muted-foreground">
            Chennai, Tamil Nadu · +91 89398 90285
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="card-panel px-4 py-5">
                <dt className="font-mono text-xl font-bold text-primary">{s.value}</dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Experience */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeading index="01" title="Experience" />
        <div className="card-panel p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-mono text-lg font-semibold">
              Cyber Security Analyst — SOC Tier 1&amp;2
            </h3>
            <span className="font-mono text-xs text-primary">March 2025 – Present</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">TVS Electronics · Chennai</p>
          <ul className="mt-6 space-y-4">
            {duties.map((d) => (
              <li key={d} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Skills */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeading index="02" title="Technical Skills" />
        <div className="grid gap-5 sm:grid-cols-2">
          {skills.map((s) => (
            <div key={s.group} className="card-panel p-6">
              <h3 className="mono-label">{s.group}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.items.map((i) => (
                  <li
                    key={i}
                    className="rounded border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-secondary-foreground"
                  >
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications + Education */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeading index="03" title="Certifications & Education" />
        <div className="grid gap-5 lg:grid-cols-2">
          <ul className="space-y-3">
            {certifications.map((c) => (
              <li key={c.name} className="card-panel flex items-center justify-between gap-4 p-5">
                <div>
                  <p className="text-sm font-semibold">{c.name}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">{c.issuer}</p>
                </div>
                {c.status ? (
                  <span className="shrink-0 rounded border border-accent px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
                    {c.status}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
          <div className="card-panel h-fit p-6">
            <h3 className="mono-label">Education</h3>
            <p className="mt-4 text-sm font-semibold">
              B.Tech — Computer Science and Engineering
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Dr. M.G.R. Educational and Research Institute, Chennai
            </p>
            <p className="mt-2 font-mono text-xs text-primary">2020 – 2024 · CGPA 7.91</p>

            <h3 className="mono-label mt-8">Beyond Work</h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li>Active on TryHackMe and Hack The Box — hands-on labs and CTF challenges.</li>
              <li>
                Focused on SOC operations, threat hunting, incident response and cloud security.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeading index="04" title="Projects" />
        <div className="card-panel p-6 sm:p-8">
          <h3 className="font-mono text-lg font-semibold">
            IFLEX TRAX 1.7 — Facebook-Style User Registration System
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Collaboratively developed a Facebook-style user registration system with secure signup,
            form validation, database integration and a responsive interface.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {["Python", "Django", "MySQL", "HTML", "CSS", "JavaScript"].map((t) => (
              <li
                key={t}
                className="rounded border border-border bg-secondary px-2.5 py-1 font-mono text-xs"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <p className="mono-label">$ contact --open</p>
          <h2 className="mt-4 font-mono text-3xl font-bold tracking-tight">
            Open to SOC &amp; Security Analyst roles
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:johnjebas02@gmail.com"
              className="glow-ring inline-flex items-center rounded-md bg-primary px-5 py-2.5 font-mono text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Email me
            </a>
            <a
              href="tel:+918939890285"
              className="inline-flex items-center rounded-md border border-border bg-card px-5 py-2.5 font-mono text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              +91 89398 90285
            </a>
          </div>
          <p className="mt-12 font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} John Jebas · Chennai, India
          </p>
        </div>
      </section>
    </main>
  );
}
