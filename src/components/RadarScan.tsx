import { useEffect, useState } from "react";

interface VerificationLog {
  cert: string;
  hash: string;
  status: "OK" | "PENDING" | "VERIFIED" | "COMPLETED";
}

const certLogs: VerificationLog[] = [
  { cert: "Certified Ethical Hacker (CEH)", hash: "ec:ceh:9421", status: "COMPLETED" },
  { cert: "Certified Cybersecurity Educator Professional (CCEP)", hash: "rtl:ccep:2184", status: "VERIFIED" },
  { cert: "Security Operations and Defense Analyst", hash: "sp:soda:1102", status: "VERIFIED" },
  { cert: "Understanding Threats and Attacks", hash: "sp:uta:7739", status: "VERIFIED" },
  { cert: "Cybersecurity Essentials", hash: "co:ess:8841", status: "VERIFIED" },
  { cert: "SanerNow Cyber Hygiene Platform", hash: "sp:sh:6624", status: "VERIFIED" },
];

export function RadarScan() {
  const [logs, setLogs] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentCert = certLogs[currentIndex];
      if (!currentCert) return;
      const timeString = new Date().toLocaleTimeString();
      let logMessage = "";

      if (currentCert.status === "COMPLETED") {
        logMessage = `[${timeString}] CERTIFICATION COMPLETE: ${currentCert.cert} -> STATUS: [COMPLETED]`;
      } else if (currentCert.status === "VERIFIED") {
        logMessage = `[${timeString}] SECURE CHECK: ${currentCert.cert} -> SHA256 MATCH [OK]`;
      } else {
        logMessage = `[${timeString}] CHECKING CERT: ${currentCert.cert} -> ENVELOPE STATUS: IN_PROGRESS`;
      }

      setLogs((prev) => [logMessage, ...prev].slice(0, 5));
      setCurrentIndex((prev) => (prev + 1) % certLogs.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="card-panel grid gap-6 p-6 md:grid-cols-3">
      {/* Radar Graphic */}
      <div className="relative flex items-center justify-center p-4">
        <div className="relative h-32 w-32 rounded-full border border-primary/20 bg-primary/5">
          {/* Radar grids */}
          <div className="absolute inset-2 rounded-full border border-primary/10" />
          <div className="absolute inset-6 rounded-full border border-primary/10" />
          <div className="absolute inset-10 rounded-full border border-primary/10" />
          
          {/* Crosshairs */}
          <div className="absolute left-1/2 top-0 h-full w-[1px] -translate-x-1/2 bg-primary/10" />
          <div className="absolute top-1/2 left-0 h-[1px] w-full -translate-y-1/2 bg-primary/10" />

          {/* Sweep Pointer */}
          <div className="absolute inset-0 origin-center animate-radar-sweep bg-[conic-gradient(from_0deg,transparent_70%,rgba(131,237,185,0.4)_100%)] rounded-full pointer-events-none" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[9px] uppercase tracking-widest text-primary/80 animate-pulse">
              SCANNING
            </span>
          </div>
        </div>
      </div>

      {/* Real-time verification logs */}
      <div className="md:col-span-2 flex flex-col justify-between">
        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-accent mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
            Vesting Credential Signatures
          </h4>
          <div className="space-y-1.5 font-mono text-[10px] text-muted-foreground leading-relaxed min-h-[90px]">
            {logs.length === 0 ? (
              <div className="text-muted-foreground/60 italic">Starting signature checks...</div>
            ) : (
              logs.map((log, idx) => (
                <div key={idx} className={log.includes("OK") ? "text-primary" : "text-muted-foreground"}>
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
        <div className="mt-4 border-t border-border pt-3 font-mono text-[9px] text-primary/80 uppercase">
          Status: TLS Signature Verification Engine Ingesting
        </div>
      </div>
    </div>
  );
}
