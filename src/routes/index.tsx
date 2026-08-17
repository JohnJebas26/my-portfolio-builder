import { createFileRoute } from "@tanstack/react-router";
import resumeAsset from "@/assets/resume.pdf.asset.json";
import { SiteNav } from "@/components/SiteNav";
import { Reveal } from "@/components/Reveal";
import { TypedLine } from "@/components/TypedLine";
import { CyberGrid } from "@/components/CyberGrid";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";
import { RadarScan } from "@/components/RadarScan";
import { CyberMap } from "@/components/CyberMap";
import { MitreMatrix } from "@/components/MitreMatrix";
import { CyberCursor } from "@/components/CyberCursor";
import { motion } from "framer-motion";

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

const skills: {
  group: string;
  tag: string;
  level: number;
  summary: string;
  core: { name: string; level: number }[];
  applied: string[];
  items: string[];
  framework: string;
}[] = [
  {
    group: "SIEM & Threat Detection",
    tag: "SIEM",
    level: 92,
    summary:
      "Daily driver for 24x7 monitoring — building, tuning and hunting across Microsoft Sentinel log sources.",
    core: [
      { name: "Microsoft Sentinel", level: 92 },
      { name: "KQL Query Writing", level: 90 },
      { name: "Analytics Rule Tuning", level: 85 },
      { name: "Threat Hunting", level: 82 },
    ],
    applied: [
      "Authored KQL analytics rules across sign-in, endpoint and firewall tables with tuned thresholds to cut false positives.",
      "Ran hypothesis-driven hunts on anomalous authentication, lateral movement and persistence patterns.",
      "Built workbooks and scheduled queries for daily SOC shift handover and management reporting.",
    ],
    items: ["Sentinel", "KQL", "Log Analytics", "Workbooks", "Alert Triage", "Playbooks"],
    framework: "MITRE ATT&CK detection coverage mapping",
  },
  {
    group: "VAPT & Security Testing",
    tag: "VAPT",
    level: 85,
    summary:
      "Web and network assessments end-to-end — recon, exploitation validation, and developer-ready remediation reporting.",
    core: [
      { name: "Burp Suite Pro", level: 86 },
      { name: "Nessus / SanerNow", level: 84 },
      { name: "Nmap & Recon", level: 82 },
      { name: "Manual Exploitation", level: 75 },
    ],
    applied: [
      "Performed authenticated and unauthenticated web app tests covering injection, access control and session flaws.",
      "Validated scanner output manually to eliminate false positives before raising findings.",
      "Scored issues with CVSS v3.1 and delivered reproducible PoCs with fix guidance to engineering teams.",
    ],
    items: ["Burp Suite", "Nessus", "Nmap", "OWASP ZAP", "SanerNow", "CVSS v3.1"],
    framework: "OWASP Top 10 / OWASP Testing Guide",
  },
  {
    group: "EDR & Incident Response",
    tag: "IR",
    level: 88,
    summary:
      "Endpoint containment and full incident lifecycle — from first alert to root cause and closure notes.",
    core: [
      { name: "Bitdefender EDR", level: 88 },
      { name: "Malware Triage", level: 80 },
      { name: "Containment & Isolation", level: 86 },
      { name: "Forensic Timelining", level: 74 },
    ],
    applied: [
      "Investigated endpoint detections through process trees, parent-child anomalies and persistence artifacts.",
      "Isolated compromised hosts, killed malicious processes and coordinated reimaging with IT.",
      "Documented incidents with timeline, impact, root cause and preventive actions.",
    ],
    items: ["Bitdefender EDR", "IOC / IOA", "VirusTotal", "Sandboxing", "SOAR Concepts"],
    framework: "NIST SP 800-61 incident handling lifecycle",
  },
  {
    group: "Networking & Platforms",
    tag: "INFRA",
    level: 80,
    summary:
      "Protocol-level understanding that underpins traffic analysis, log interpretation and detection accuracy.",
    core: [
      { name: "TCP/IP & DNS", level: 84 },
      { name: "Windows Internals", level: 78 },
      { name: "Linux (Kali)", level: 78 },
      { name: "Firewall & Proxy Logs", level: 76 },
    ],
    applied: [
      "Analysed packet captures and firewall logs to confirm C2 beaconing and data exfiltration attempts.",
      "Correlated Windows event IDs (4624/4625/4688/7045) into detection logic.",
      "Reviewed DNS and proxy telemetry for tunnelling and newly registered domain access.",
    ],
    items: ["TCP/IP", "DNS", "HTTP/HTTPS", "Windows", "Kali Linux", "Wireshark", "Firewalls"],
    framework: "Cyber Kill Chain traffic-stage analysis",
  },
  {
    group: "Scripting & Automation",
    tag: "AUTO",
    level: 72,
    summary:
      "Query and script work to remove manual toil from triage, enrichment and reporting workflows.",
    core: [
      { name: "KQL", level: 90 },
      { name: "SQL", level: 74 },
      { name: "Python", level: 65 },
      { name: "Bash", level: 62 },
    ],
    applied: [
      "Wrote reusable KQL functions for repeated triage lookups across analysts.",
      "Used Python scripts for bulk IOC enrichment and report data formatting.",
      "Automated recurring evidence collection steps with shell one-liners.",
    ],
    items: ["KQL", "SQL", "Python", "Bash", "REST APIs", "Automation Playbooks"],
    framework: "SOC toil reduction / analyst enablement",
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
  { name: "Certified Ethical Hacker (CEH)", issuer: "EC-Council", status: "Completed" },
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
    icon: "◎",
    badge: "SIEM · KQL · MITRE",
    body: "Architect and tune analytics rules across Microsoft Sentinel with hypothesis-driven KQL hunting queries. Map detections to MITRE ATT&CK tactics, reduce alert fatigue via dynamic threshold calibration, and achieve sub-5-minute mean-time-to-detect (MTTD) across Windows, Linux, identity and network log sources.",
    metrics: ["92% alert coverage rate", "KQL rule authoring", "Sub-5min MTTD", "MITRE-mapped detections"],
  },
  {
    title: "Respond",
    icon: "⬡",
    badge: "IR · EDR · SOAR",
    body: "Drive structured incident lifecycle management from initial triage to root cause analysis and post-incident review. Execute endpoint isolation, credential resets, and phishing campaign containment using Bitdefender EDR and Logic Apps SOAR playbooks. Deliver evidence-backed closure reports with NIST SP 800-61 alignment.",
    metrics: ["Full lifecycle IR", "Endpoint containment", "SOAR playbooks", "NIST 800-61 aligned"],
  },
  {
    title: "Harden",
    icon: "◈",
    badge: "VAPT · CVE · OWASP",
    body: "Conduct authenticated OWASP Top 10 web application assessments and CVSS v3.1-scored vulnerability scanning with Burp Suite Pro and Nessus. Deliver prioritised remediation reports with reproducible PoCs, exploit validation, and developer-ready fix guidance aligned to business risk exposure.",
    metrics: ["OWASP Top 10 testing", "CVSS v3.1 scoring", "Burp Suite Pro", "Validated PoC delivery"],
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
      <CyberCursor />
      <SiteNav />
      <CyberGrid />
      <main className="min-h-screen relative z-10">
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
              Enterprise SOC Tier 1 & 2 Security Analyst with 1 year 5 months of hands-on operations experience at TVS Electronics. Specializing in Microsoft Sentinel SIEM detection architecture, KQL threat hunting heuristics, endpoint containment with Bitdefender EDR, and OWASP-aligned vulnerability assessment/penetration testing (VAPT). Splunk certified and Certified Ethical Hacker (CEH) certified.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={async () => {
                  try {
                    const response = await fetch("/John_Jebas_Resume.pdf");
                    if (!response.ok) throw new Error("Local file not found");
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "John_Jebas_Resume.pdf";
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    window.URL.revokeObjectURL(url);
                  } catch {
                    window.open(resumeAsset.url, "_blank");
                  }
                }}
                className="glow-ring inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-mono text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 cursor-pointer"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Download Résumé
              </button>
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
              <InteractiveTerminal />
            </Reveal>

            <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 80}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -4, rotateX: 5, rotateY: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="card-panel h-full px-4 py-5 transition-colors hover:border-primary cursor-default"
                  >
                    <dt className="font-mono text-xl font-bold text-primary">{s.value}</dt>
                    <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </dd>
                  </motion.div>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        {/* Live Security Map & Incidents */}
        <section className="mx-auto max-w-5xl px-6 py-8 scroll-mt-24">
          <div className="flex items-center gap-3 mb-4">
            <span className="mono-label">00</span>
            <h2 className="font-mono text-lg font-bold tracking-tight">Live Global Threat Intelligence</h2>
            <span className="h-px flex-1 bg-border" />
            <span className="font-mono text-[9px] text-primary/60 uppercase tracking-widest animate-pulse">● Real-time Feed</span>
          </div>
          <Reveal>
            <CyberMap />
          </Reveal>
        </section>

        {/* Capabilities */}
        <section className="mx-auto max-w-5xl px-6 py-8">
          <div className="grid gap-5 sm:grid-cols-3">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 90}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -5, rotateY: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="card-panel h-full p-6 hover:border-accent cursor-default group relative overflow-hidden"
                >
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-accent/10 to-transparent" />
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl text-accent">{c.icon}</span>
                    <div>
                      <h3 className="mono-label">{c.title}</h3>
                      <span className="text-[9px] font-mono tracking-widest text-primary/60 uppercase">{c.badge}</span>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                  <ul className="mt-4 space-y-1.5">
                    {c.metrics.map((m) => (
                      <li key={m} className="flex items-center gap-2 font-mono text-[10px] text-foreground/70">
                        <span className="h-1 w-1 rounded-full bg-primary shrink-0" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-16">
          <SectionHeading index="01" title="Experience" />
          <Reveal>
            <div className="card-panel overflow-hidden">
              {/* Header stripe */}
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-border px-6 py-5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="rounded border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-[10px] tracking-widest text-primary uppercase">Full-Time</span>
                    <span className="rounded border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[10px] tracking-widest text-accent uppercase">Active · 1y 5m</span>
                  </div>
                  <h3 className="font-mono text-xl font-bold mt-2 text-foreground">
                    Cyber Security Analyst — SOC Tier 1 &amp; 2
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 font-mono">TVS Electronics Ltd. · Chennai, Tamil Nadu · March 2025 – Present</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { value: "24/7", label: "SOC Coverage" },
                    { value: "92%", label: "Alert Coverage" },
                    { value: "<5 min", label: "Avg MTTD" },
                    { value: "NIST", label: "IR Framework" },
                  ].map((m) => (
                    <div key={m.label} className="text-center">
                      <div className="font-mono text-base font-bold text-primary">{m.value}</div>
                      <div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="px-6 pt-5 pb-4">
                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  Embedded within a 24×7 enterprise Security Operations Center at TVS Electronics, operating across the full defensive lifecycle — from real-time SIEM alert triage and KQL-driven threat hunting in Microsoft Sentinel to endpoint isolation via Bitdefender EDR, SOAR playbook automation, CVSS-ranked vulnerability management and OWASP-aligned web application penetration testing. Responsible for both detection engineering and incident response closure reporting.
                </p>
              </div>

              {/* Duty grid */}
              <div className="px-6 pb-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  {duties.map((d, idx) => (
                    <Reveal key={d.tag} delay={idx * 55}>
                      <motion.div
                        whileHover={{ scale: 1.015, y: -2 }}
                        transition={{ type: "spring", stiffness: 350, damping: 22 }}
                        className="relative rounded-lg border border-border bg-secondary/20 p-4 hover:border-primary/50 transition-colors overflow-hidden"
                      >
                        {/* Glow corner */}
                        <div className="absolute top-0 right-0 h-12 w-12 bg-gradient-to-bl from-primary/8 to-transparent" />
                        {/* Header row */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="rounded border border-accent/40 bg-accent/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-accent shrink-0">
                              {d.tag}
                            </span>
                            <h4 className="font-mono text-xs font-bold text-foreground leading-tight">{d.title}</h4>
                          </div>
                        </div>
                        {/* Summary */}
                        <p className="text-xs leading-relaxed text-muted-foreground mb-2.5">{d.summary}</p>
                        {/* Key points */}
                        <ul className="space-y-1 mb-3">
                          {d.points.map((p) => (
                            <li key={p} className="flex gap-2 text-[11px] leading-relaxed text-muted-foreground">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                        {/* Tools */}
                        <ul className="flex flex-wrap gap-1.5 mb-2">
                          {d.tools.map((t) => (
                            <li key={t} className="rounded border border-border bg-background/50 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground hover:border-accent/50 hover:text-accent transition-colors">
                              {t}
                            </li>
                          ))}
                        </ul>
                        {/* MITRE tag */}
                        <p className="font-mono text-[9px] uppercase tracking-wider text-primary/70">
                          ⬡ {d.mitre}
                        </p>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Skills */}
        <section id="skills" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-16">
          <SectionHeading index="02" title="Technical Skills" />
          <div className="grid gap-5">
            {skills.map((s, i) => (
              <Reveal key={s.group} delay={i * 70}>
                <div className="card-panel h-full p-6 transition-colors hover:border-primary flex flex-col md:flex-row gap-6 items-center md:items-start">
                  {/* Holographic Dial */}
                  <div className="relative h-24 w-24 shrink-0 flex items-center justify-center bg-black/10 rounded-full border border-primary/10">
                    <svg className="absolute inset-0 h-full w-full -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="38"
                        className="stroke-secondary fill-none"
                        strokeWidth="4"
                      />
                      <motion.circle
                        cx="48"
                        cy="48"
                        r="38"
                        className="stroke-primary fill-none"
                        strokeWidth="4"
                        strokeDasharray={2 * Math.PI * 38}
                        initial={{ strokeDashoffset: 2 * Math.PI * 38 }}
                        whileInView={{ strokeDashoffset: 2 * Math.PI * 38 - (s.level / 100) * (2 * Math.PI * 38) }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </svg>
                    <span className="font-mono text-base font-bold text-primary">{s.level}%</span>
                  </div>

                  <div className="flex-1 w-full">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="rounded border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-[10px] tracking-widest text-primary">
                          {s.tag}
                        </span>
                        <h3 className="mono-label">{s.group}</h3>
                      </div>
                    </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {s.core.map((c) => (
                      <div key={c.name}>
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="font-mono text-xs text-foreground">{c.name}</span>
                          <span className="font-mono text-[10px] text-muted-foreground">{c.level}%</span>
                        </div>
                        <div className="mt-1.5 h-[3px] w-full overflow-hidden rounded bg-secondary">
                          <motion.div
                            className="h-full rounded bg-accent"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${c.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <ul className="mt-5 space-y-2 border-l border-border pl-4">
                    {s.applied.map((a) => (
                      <li key={a} className="text-sm leading-relaxed text-muted-foreground">
                        <span className="mr-2 font-mono text-xs text-primary">▸</span>
                        {a}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <li
                        key={item}
                        className="rounded border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-secondary-foreground transition-colors hover:border-accent hover:text-accent"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                    <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Framework · {s.framework}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* MITRE ATT&CK Matrix */}
        <section id="mitre" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-12">
          <Reveal>
            <MitreMatrix />
          </Reveal>
        </section>

        {/* Certifications + Education */}
        <section id="certs" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-16">
          <SectionHeading index="03" title="Certifications & Education" />
          <Reveal className="mb-6">
            <RadarScan />
          </Reveal>
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
