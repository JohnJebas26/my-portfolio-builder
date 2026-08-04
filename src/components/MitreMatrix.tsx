import { useState } from "react";
import { motion } from "framer-motion";

interface TacticDetails {
  tactic: string;
  id: string;
  description: string;
  techniques: { name: string; id: string; kql: string }[];
}

const mitreData: TacticDetails[] = [
  {
    tactic: "Initial Access",
    id: "TA0001",
    description: "The adversary is trying to get into your network via perimeter vectors.",
    techniques: [
      {
        name: "Phishing: Spearphishing Attachment",
        id: "T1566.001",
        kql: `OfficeAttachmentDeliveryEvents
| where FileExtension in ("exe", "lnk", "vbs", "ps1")
| where ThreatTypes has "Malware" or ThreatTypes has "Phish"
| project Timestamp, SenderAddress, RecipientAddress, FileName`,
      },
      {
        name: "Exploit Public-Facing Application",
        id: "T1190",
        kql: `W3CIISLog
| where csUriQuery has "union select" or csUriQuery has "script"
| where scStatus == 200
| summarize RequestCount = count() by cIP, csUriStem`,
      },
    ],
  },
  {
    tactic: "Execution",
    id: "TA0002",
    description: "The adversary is running malicious code on a compromised host.",
    techniques: [
      {
        name: "PowerShell Command Interpreter",
        id: "T1059.001",
        kql: `DeviceProcessEvents
| where ProcessCommandLine has "-ExecutionPolicy" or ProcessCommandLine has "-enc"
| where ProcessCommandLine has "bypass"
| project TimeGenerated, DeviceName, AccountName, ProcessCommandLine`,
      },
      {
        name: "Windows Management Instrumentation",
        id: "T1047",
        kql: `SecurityEvent
| where EventID == 4688
| where ProcessName has "wmic.exe"
| where CommandLine has "shadowcopy delete" or CommandLine has "process call create"`,
      },
    ],
  },
  {
    tactic: "Persistence",
    id: "TA0003",
    description: "Adversaries use persistence to maintain their foothold across restarts.",
    techniques: [
      {
        name: "Registry Run Keys / Startup Folder",
        id: "T1547.001",
        kql: `DeviceRegistryEvents
| where RegistryKey has @"Software\\Microsoft\\Windows\\CurrentVersion\\Run"
| where RegistryValueData has_any ("temp", "appdata", "powershell", "cmd.exe")
| project Timestamp, DeviceName, RegistryKey, RegistryValueName`,
      },
      {
        name: "Create or Modify System Process",
        id: "T1543",
        kql: `SystemEvents
| where EventID == 7045 // New service created
| extend ServiceName = tostring(EventData.ServiceName)
| where ServiceName has_any ("backdoor", "tunnel", "sysinternals")`,
      },
    ],
  },
  {
    tactic: "Credential Access",
    id: "TA0006",
    description: "Adversaries try to steal account names and active passwords.",
    techniques: [
      {
        name: "Brute Force: Credential Stuffing",
        id: "T1110.004",
        kql: `SigninLogs
| where ResultType == 50126 // Invalid username or password
| summarize FailureCount = count() by IPAddress, UserPrincipalName
| where FailureCount > 20
| project IPAddress, UserPrincipalName, FailureCount`,
      },
      {
        name: "OS Credential Dumping: LSASS",
        id: "T1003.001",
        kql: `DeviceEvents
| where ActionType == "LsassProcessAccess"
| where InitiatingProcessName != "svchost.exe"
| project Timestamp, DeviceName, InitiatingProcessName, RequestingProcessCommandLine`,
      },
    ],
  },
  {
    tactic: "Command & Control",
    id: "TA0011",
    description: "The adversary is communicating with compromised systems to direct actions.",
    techniques: [
      {
        name: "Common Application Layer Protocol: DNS",
        id: "T1071.004",
        kql: `DnsEvents
| where SubDomainCount > 6
| summarize QueryCount = count() by ClientIP, Name
| where QueryCount > 1000 // Detect high-frequency DNS tunneling beacons`,
      },
    ],
  },
];

export function MitreMatrix() {
  const [selectedTactic, setSelectedTactic] = useState<TacticDetails>(mitreData[0]);
  const [selectedTechIndex, setSelectedTechIndex] = useState(0);

  return (
    <div className="card-panel p-6 bg-black/40 border border-primary/20 backdrop-blur-md">
      <h3 className="font-mono text-xs uppercase tracking-widest text-primary flex items-center gap-2 mb-4">
        <span className="h-2 w-2 rounded-full bg-accent" />
        MITRE ATT&CK Matrix Detection Coverage Console
      </h3>

      {/* Grid of tactics */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {mitreData.map((data) => (
          <button
            key={data.id}
            onClick={() => {
              setSelectedTactic(data);
              setSelectedTechIndex(0);
            }}
            className={`p-3 rounded border text-left font-mono text-[10px] uppercase transition-all duration-300 ${
              selectedTactic.id === data.id
                ? "bg-primary/25 border-primary text-primary font-bold shadow-lg"
                : "bg-secondary/30 border-border text-muted-foreground hover:border-accent/50 hover:text-accent"
            }`}
          >
            <div className="text-[8px] text-muted-foreground">{data.id}</div>
            <div className="mt-1 leading-tight font-semibold">{data.tactic}</div>
          </button>
        ))}
      </div>

      {/* Tactic summary and techniques */}
      <div className="mt-6 grid gap-6 md:grid-cols-3 border-t border-border pt-6">
        <div className="md:col-span-1">
          <span className="rounded border border-accent/40 bg-accent/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-accent">
            {selectedTactic.id} · Tactic
          </span>
          <h4 className="font-mono text-sm font-bold text-foreground mt-3">{selectedTactic.tactic}</h4>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{selectedTactic.description}</p>
          
          <div className="mt-4 space-y-2">
            <div className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
              Applied Detections:
            </div>
            {selectedTactic.techniques.map((tech, idx) => (
              <button
                key={tech.id}
                onClick={() => setSelectedTechIndex(idx)}
                className={`w-full text-left p-2 rounded text-[10px] font-mono border transition-all duration-200 ${
                  selectedTechIndex === idx
                    ? "bg-accent/10 border-accent/60 text-accent font-bold"
                    : "bg-secondary/10 border-transparent text-muted-foreground hover:border-border"
                }`}
              >
                {tech.id} · {tech.name.split(":")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Query Console */}
        <div className="md:col-span-2 flex flex-col">
          <div className="flex items-center justify-between border-b border-border bg-black/40 px-4 py-2 rounded-t">
            <span className="font-mono text-[9px] text-muted-foreground uppercase">
              Sentinel KQL Rule · {selectedTactic.techniques[selectedTechIndex]?.id}
            </span>
            <span className="text-[8px] font-mono text-accent">STATUS: DEPLOYED</span>
          </div>
          <div className="flex-1 bg-black/60 p-4 rounded-b border border-t-0 border-border overflow-x-auto min-h-[140px] flex items-center">
            <pre className="font-mono text-[10px] text-primary/95 leading-relaxed w-full">
              <code>{selectedTactic.techniques[selectedTechIndex]?.kql}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
