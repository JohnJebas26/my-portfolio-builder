import { createFileRoute } from "@tanstack/react-router";
import resumeAsset from "@/assets/resume.pdf.asset.json";
import { SiteNav } from "@/components/SiteNav";
import { Reveal } from "@/components/Reveal";
import { TypedLine } from "@/components/TypedLine";

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

const skills: { group: string; items: string[]; level: number }[] = [
  {
    group: "SIEM & Threat Detection",
    level: 92,
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
    level: 85,
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
    level: 88,
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
    level: 80,
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
    level: 72,
    items: ["KQL", "SQL", "Python (Basic)", "Bash"],
  },
];

const duties: {
  tag: string;
  title: string;
  summary: string;
  points: string[];
  tools: string[];
  mitre: string;
}[] = [
  {
    tag: "SIEM",
    title: "SIEM Monitoring & Threat Hunting",
    summary:
      "Front-line monitoring of enterprise log sources in Microsoft Sentinel, turning raw telemetry into actionable incidents.",
    points: [
      "Triaged daily alert queues across Windows, Linux, firewall, identity and endpoint log sources, classifying true/false positives with documented rationale.",
      "Wrote and iterated KQL hunting queries over SecurityEvent, SigninLogs and DeviceEvents to surface anomalies that no existing rule covered.",
      "Correlated multi-source events into single incidents to remove duplicate noise and give responders one timeline per intrusion attempt.",
    ],
    tools: ["Microsoft Sentinel", "KQL", "Log Analytics", "Azure AD Logs"],
    mitre: "TA0001 Initial Access · TA0006 Credential Access",
  },
  {
    tag: "DETECTION",
    title: "Detection Engineering & Automation",
    summary:
      "Improved detection quality by tuning what fires, when it fires, and what happens automatically afterwards.",
    points: [
      "Authored and tuned Sentinel analytics rules, adjusting thresholds, entity mappings and suppression windows to cut alert fatigue without losing coverage.",
      "Built automation playbooks for repetitive triage steps — enrichment, entity lookup and analyst notification — shortening time-to-first-action.",
      "Mapped detections to MITRE ATT&CK techniques so coverage gaps were visible and prioritised rather than assumed.",
    ],
    tools: ["Analytics Rules", "Logic Apps Playbooks", "MITRE ATT&CK", "SOAR Concepts"],
    mitre: "Detection coverage mapping",
  },
  {
    tag: "IR",
    title: "Incident Response & Investigation",
    summary:
      "Owned incidents end-to-end from detection through containment, remediation and closure reporting.",
    points: [
      "Investigated phishing campaigns — header analysis, URL and attachment detonation, affected-user scoping and mailbox-level cleanup.",
      "Handled brute-force and impossible-travel sign-in incidents: validated source IP reputation, confirmed compromise, forced credential resets.",
      "Documented each incident with timeline, root cause, impact and remediation actions, and fed findings back into detection tuning.",
    ],
    tools: ["Sentinel Incidents", "VirusTotal", "AbuseIPDB", "Email Header Analysis"],
    mitre: "TA0043 Recon · TA0011 Command & Control",
  },
  {
    tag: "VAPT",
    title: "Vulnerability Assessment & Penetration Testing",
    summary:
      "Offensive-side testing of web applications and internal systems, reported with reproducible evidence.",
    points: [
      "Performed authenticated and unauthenticated web app testing against the OWASP Top 10 — SQL injection, XSS, broken access control, auth and session flaws.",
      "Validated scanner output manually to eliminate false positives before anything reached the remediation backlog.",
      "Delivered VAPT reports with reproduction steps, CVSS-scored severity, business impact and concrete developer-facing fixes.",
    ],
    tools: ["Burp Suite Pro", "OWASP ZAP", "Nmap", "Nessus", "Kali Linux"],
    mitre: "OWASP Top 10 aligned",
  },
  {
    tag: "VM",
    title: "Vulnerability & Patch Management",
    summary:
      "Continuous assessment of the endpoint and server estate with risk-ranked remediation tracking.",
    points: [
      "Ran scheduled authenticated scans across Windows and Linux endpoints, tracking newly introduced CVEs between cycles.",
      "Prioritised remediation using CVSS severity combined with asset exposure and exploit availability rather than raw score alone.",
      "Coordinated with IT teams on patch cycles and re-validated closure with follow-up scans.",
    ],
    tools: ["SecPod SanerNow", "Nessus", "CVE / CVSS", "Patch Cycles"],
    mitre: "Exposure reduction",
  },
  {
    tag: "EDR",
    title: "Endpoint Detection & Response",
    summary:
      "Day-to-day ownership of endpoint protection posture and malware investigation across the estate.",
    points: [
      "Investigated EDR detections — process trees, parent-child anomalies, persistence artefacts and suspicious script execution.",
      "Contained compromised hosts through isolation and blocked malicious hashes and processes across the fleet.",
      "Reviewed policy exclusions and endpoint health to keep coverage complete and false positives low.",
    ],
    tools: ["Bitdefender EDR", "Windows Event Logs", "Process Analysis", "Host Isolation"],
    mitre: "TA0002 Execution · TA0003 Persistence",
  },
  {
    tag: "INTEL",
    title: "Threat Intelligence & Reporting",
    summary:
      "Enriched investigations with external context and turned technical findings into readable reporting.",
    points: [
      "Validated IPs, domains, URLs and file hashes against VirusTotal and open-source threat intel before blocking or escalating.",
      "Maintained IOC context for recurring campaigns so repeat activity was recognised immediately.",
      "Produced incident and assessment reports for both technical responders and non-technical stakeholders.",
    ],
    tools: ["VirusTotal", "OSINT Feeds", "IOC / IOA", "Reporting"],
    mitre: "Enrichment & attribution",
  },
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

const capabilities = [
  {
    title: "Detect",
    body: "Sentinel analytics rules, KQL hunting queries and tuned alerting that cut noise without losing signal.",
  },
  {
    title: "Respond",
    body: "Structured triage of phishing, brute-force and malware incidents through containment and closure.",
  },
  {
    title: "Harden",
    body: "Continuous vulnerability assessment and web app pentesting mapped to CVSS-prioritised remediation.",
  },
];

const kqlSample = `SecurityEvent
| where TimeGenerated > ago(24h)
| where EventID == 4625
| summarize Failures = count() by Account, IPAddress
| where Failures > 15
| order by Failures desc`;

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
    <>
      <SiteNav />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="hero-glow scanlines border-b border-border">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
            <p className="mono-label">$ whoami</p>
            <h1 className="mt-4 font-mono text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
              John Jebas
            </h1>
            <p className="mt-4 min-h-[2em] max-w-2xl text-lg sm:text-xl">
              <TypedLine
                phrases={[
                  "SOC Tier 1&2 Analyst",
                  "Microsoft Sentinel · KQL threat hunting",
                  "Bitdefender EDR incident response",
                  "Web application VAPT",
                ]}
              />
            </p>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              1 year 5 months of Security Operations Center experience at TVS Electronics across
              threat detection, incident investigation and vulnerability management. Splunk
              certified, currently pursuing CEH.
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

            {/* Terminal card */}
            <Reveal className="mt-12">
              <div className="card-panel overflow-hidden">
                <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-primary/80" />
                  <span className="ml-2 font-mono text-[11px] text-muted-foreground">
                    sentinel — brute-force hunt.kql
                  </span>
                </div>
                <pre className="overflow-x-auto px-4 py-4 font-mono text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
                  <code>{kqlSample}</code>
                </pre>
              </div>
            </Reveal>

            <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 80}>
                  <div className="card-panel h-full px-4 py-5 transition-colors hover:border-primary">
                    <dt className="font-mono text-xl font-bold text-primary">{s.value}</dt>
                    <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        {/* Capabilities */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid gap-5 sm:grid-cols-3">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 90}>
                <div className="card-panel h-full p-6 transition-colors hover:border-accent">
                  <h3 className="mono-label">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-16">
          <SectionHeading index="01" title="Experience" />
          <Reveal>
            <div className="card-panel p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-mono text-lg font-semibold">
                  Cyber Security Analyst — SOC Tier 1&amp;2
                </h3>
                <span className="rounded border border-primary/40 px-2 py-1 font-mono text-xs text-primary">
                  March 2025 – Present
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">TVS Electronics · Chennai</p>
              <ul className="mt-6 space-y-4 border-l border-border pl-5">
                {duties.map((d) => (
                  <li key={d.tag} className="relative">
                    <span className="absolute -left-[1.44rem] top-2 h-2 w-2 rounded-full bg-primary" />
                    <span className="mr-2 font-mono text-[10px] uppercase tracking-widest text-accent">
                      {d.tag}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{d.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        {/* Skills */}
        <section id="skills" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-16">
          <SectionHeading index="02" title="Technical Skills" />
          <div className="grid gap-5 sm:grid-cols-2">
            {skills.map((s, i) => (
              <Reveal key={s.group} delay={i * 70}>
                <div className="card-panel h-full p-6 transition-colors hover:border-primary">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="mono-label">{s.group}</h3>
                    <span className="font-mono text-xs text-muted-foreground">{s.level}%</span>
                  </div>
                  <div className="mt-3 h-1 w-full overflow-hidden rounded bg-secondary">
                    <div
                      className="h-full rounded bg-primary transition-[width] duration-1000 ease-out"
                      style={{ width: `${s.level}%` }}
                    />
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <li
                        key={item}
                        className="rounded border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-secondary-foreground transition-colors hover:border-accent hover:text-accent"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Certifications + Education */}
        <section id="certs" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-16">
          <SectionHeading index="03" title="Certifications & Education" />
          <div className="grid gap-5 lg:grid-cols-2">
            <ul className="space-y-3">
              {certifications.map((c, i) => (
                <Reveal key={c.name} delay={i * 60}>
                  <li className="card-panel flex items-center justify-between gap-4 p-5 transition-colors hover:border-primary">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">{c.name}</p>
                      <p className="mt-0.5 font-mono text-xs text-muted-foreground">{c.issuer}</p>
                    </div>
                    {c.status ? (
                      <span className="shrink-0 rounded border border-accent px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
                        {c.status}
                      </span>
                    ) : null}
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={120}>
              <div className="card-panel h-fit p-6">
                <h3 className="mono-label">Education</h3>
                <p className="mt-4 text-sm font-semibold">B.Tech — Computer Science and Engineering</p>
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
            </Reveal>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-16">
          <SectionHeading index="04" title="Projects" />
          <Reveal>
            <div className="card-panel p-6 transition-colors hover:border-accent sm:p-8">
              <h3 className="font-mono text-lg font-semibold">
                IFLEX TRAX 1.7 — Facebook-Style User Registration System
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Collaboratively developed a Facebook-style user registration system with secure
                signup, form validation, database integration and a responsive interface.
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
          </Reveal>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-24 border-t border-border">
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
    </>
  );
}
