import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AttackArc {
  id: string;
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  mx: number;
  my: number;
  color: string;
  label: string;
}

interface Incident {
  id: string;
  source: string;
  ip: string;
  type: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
  time: string;
  status: "ACTIVE" | "TRIAGED" | "CONTAINED";
}

const attackSources = [
  { name: "Moscow, RU", ip: "185.220.101.5", x: 295, y: 68, color: "#ef4444" },
  { name: "Beijing, CN", ip: "220.181.38.148", x: 425, y: 85, color: "#f97316" },
  { name: "N. Virginia, US", ip: "34.203.250.2", x: 115, y: 80, color: "#ef4444" },
  { name: "Frankfurt, DE", ip: "46.165.230.5", x: 248, y: 72, color: "#f59e0b" },
  { name: "Lagos, NG", ip: "41.58.76.1", x: 238, y: 148, color: "#f97316" },
  { name: "Guangzhou, CN", ip: "119.29.29.29", x: 435, y: 110, color: "#ef4444" },
  { name: "Tehran, IR", ip: "5.160.1.1", x: 325, y: 95, color: "#f59e0b" },
];

// Chennai SOC target node
const TARGET = { x: 405, y: 140, name: "Chennai SOC" };

const attackTypes = [
  { type: "Brute-force RDP Attempt", severity: "HIGH" as const },
  { type: "SQL Injection Probe Detected", severity: "CRITICAL" as const },
  { type: "Phishing Campaign — PDF Payload", severity: "HIGH" as const },
  { type: "C2 Beacon via DNS Tunneling", severity: "CRITICAL" as const },
  { type: "EDR — Malware Execution Blocked", severity: "CRITICAL" as const },
  { type: "Impossible Travel — Azure AD", severity: "MEDIUM" as const },
  { type: "Suspicious PowerShell Encoded Cmd", severity: "HIGH" as const },
  { type: "LSASS Memory Access Attempt", severity: "CRITICAL" as const },
];

let idCounter = 1;

export function CyberMap() {
  const [arcs, setArcs] = useState<AttackArc[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [totalBlocked, setTotalBlocked] = useState(0);
  const tickRef = useRef(0);

  useEffect(() => {
    // Fire initial burst
    spawnArc();

    const interval = setInterval(() => {
      tickRef.current += 1;
      spawnArc();
      if (tickRef.current % 2 === 0) spawnArc(); // double arcs occasionally
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  function spawnArc() {
    const src = attackSources[Math.floor(Math.random() * attackSources.length)];
    const atk = attackTypes[Math.floor(Math.random() * attackTypes.length)];
    const arcId = `arc-${idCounter++}`;

    const mx = (src.x + TARGET.x) / 2 + (Math.random() - 0.5) * 60;
    const my = Math.min(src.y, TARGET.y) - 35 - Math.random() * 25;

    const newArc: AttackArc = {
      id: arcId,
      sx: src.x, sy: src.y,
      tx: TARGET.x, ty: TARGET.y,
      mx, my,
      color: src.color,
      label: src.name,
    };

    setArcs((prev) => [...prev.slice(-5), newArc]);

    const newIncident: Incident = {
      id: `INC-${String(idCounter).padStart(5, "0")}`,
      source: src.name,
      ip: src.ip,
      type: atk.type,
      severity: atk.severity,
      time: new Date().toLocaleTimeString("en-IN", { hour12: false }),
      status: Math.random() > 0.5 ? "ACTIVE" : "TRIAGED",
    };

    setIncidents((prev) => [newIncident, ...prev].slice(0, 5));
    setTotalBlocked((n) => n + 1);

    // Clean up arc after animation
    setTimeout(() => {
      setArcs((prev) => prev.filter((a) => a.id !== arcId));
    }, 3000);
  }

  const severityColor = (s: Incident["severity"]) =>
    s === "CRITICAL" ? "text-red-400 border-red-500 bg-red-500/10"
    : s === "HIGH" ? "text-amber-400 border-amber-500 bg-amber-500/10"
    : "text-blue-400 border-blue-500 bg-blue-500/10";

  const statusColor = (s: Incident["status"]) =>
    s === "ACTIVE" ? "text-red-400" : s === "TRIAGED" ? "text-amber-400" : "text-primary";

  return (
    <div className="card-panel bg-black/50 border border-primary/20 backdrop-blur-xl overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3 bg-black/40">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
          </span>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-foreground">
            TVS SOC — Live Threat Intelligence Map
          </span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[10px]">
          <span className="text-muted-foreground">NODE: <span className="text-primary">Chennai, IN [9°N 80°E]</span></span>
          <span className="text-muted-foreground">BLOCKED: <span className="text-red-400 font-bold">{totalBlocked}</span></span>
          <span className="text-muted-foreground">FEED: <span className="text-accent animate-pulse">● LIVE</span></span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-0">
        {/* SVG World Map */}
        <div className="lg:col-span-2 relative p-4 min-h-[260px] border-b lg:border-b-0 lg:border-r border-border/50">
          <svg viewBox="0 0 560 220" className="w-full h-full" style={{ maxHeight: "240px" }}>
            <defs>
              <radialGradient id="glow-green" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#4ade80" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="glow-red" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </radialGradient>
              <filter id="blur-sm">
                <feGaussianBlur stdDeviation="1.5" />
              </filter>
            </defs>

            {/* Grid lines */}
            {[0, 55, 110, 165, 220].map((y) => (
              <line key={y} x1="0" y1={y} x2="560" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            ))}
            {[0, 80, 160, 240, 320, 400, 480, 560].map((x) => (
              <line key={x} x1={x} y1="0" x2={x} y2="220" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            ))}

            {/* Stylised continent silhouettes */}
            {/* North America */}
            <path d="M60,50 Q90,40 130,55 Q150,70 145,100 Q140,120 110,130 Q80,135 60,115 Q40,90 60,50 Z" fill="rgba(100,180,100,0.08)" stroke="rgba(100,180,100,0.2)" strokeWidth="0.8" />
            {/* South America */}
            <path d="M120,145 Q140,140 155,160 Q160,185 145,205 Q125,215 110,200 Q100,178 120,145 Z" fill="rgba(100,180,100,0.08)" stroke="rgba(100,180,100,0.2)" strokeWidth="0.8" />
            {/* Europe */}
            <path d="M215,45 Q255,38 270,55 Q278,72 262,85 Q242,92 220,78 Q208,62 215,45 Z" fill="rgba(100,180,100,0.08)" stroke="rgba(100,180,100,0.2)" strokeWidth="0.8" />
            {/* Africa */}
            <path d="M220,100 Q255,92 268,115 Q272,145 258,170 Q238,188 218,175 Q200,152 205,125 Q208,108 220,100 Z" fill="rgba(100,180,100,0.08)" stroke="rgba(100,180,100,0.2)" strokeWidth="0.8" />
            {/* Russia/Central Asia */}
            <path d="M280,30 Q360,20 420,40 Q445,58 430,72 Q400,82 350,75 Q300,68 278,52 Z" fill="rgba(100,180,100,0.08)" stroke="rgba(100,180,100,0.2)" strokeWidth="0.8" />
            {/* South/SE Asia */}
            <path d="M355,90 Q410,80 445,100 Q460,120 448,140 Q425,152 395,142 Q368,130 355,108 Z" fill="rgba(100,180,100,0.08)" stroke="rgba(100,180,100,0.2)" strokeWidth="0.8" />
            {/* Australia */}
            <path d="M430,155 Q470,148 488,168 Q496,190 474,202 Q448,208 432,192 Q420,174 430,155 Z" fill="rgba(100,180,100,0.08)" stroke="rgba(100,180,100,0.2)" strokeWidth="0.8" />

            {/* Attack arcs */}
            <AnimatePresence>
              {arcs.map((arc) => (
                <g key={arc.id}>
                  {/* Glow trace */}
                  <motion.path
                    d={`M ${arc.sx} ${arc.sy} Q ${arc.mx} ${arc.my} ${arc.tx} ${arc.ty}`}
                    fill="none"
                    stroke={arc.color}
                    strokeWidth="0.8"
                    opacity={0.25}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                    filter="url(#blur-sm)"
                  />
                  {/* Sharp arc */}
                  <motion.path
                    d={`M ${arc.sx} ${arc.sy} Q ${arc.mx} ${arc.my} ${arc.tx} ${arc.ty}`}
                    fill="none"
                    stroke={arc.color}
                    strokeWidth="1.4"
                    strokeDasharray="4 3"
                    initial={{ pathLength: 0, opacity: 1 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                  />
                  {/* Travelling packet dot */}
                  <motion.circle
                    r="3"
                    fill={arc.color}
                    filter="url(#blur-sm)"
                    initial={{ offsetDistance: "0%" } as never}
                    animate={{ offsetDistance: "100%" } as never}
                    style={{ offsetPath: `path("M ${arc.sx} ${arc.sy} Q ${arc.mx} ${arc.my} ${arc.tx} ${arc.ty}")` } as never}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                  />
                </g>
              ))}
            </AnimatePresence>

            {/* Attack source nodes */}
            {attackSources.map((src) => (
              <g key={src.name}>
                <circle cx={src.x} cy={src.y} r="4" fill={src.color} opacity="0.3" />
                <circle cx={src.x} cy={src.y} r="2.5" fill={src.color} />
                <text x={src.x} y={src.y - 7} textAnchor="middle" className="font-mono" fontSize="5.5" fill="rgba(255,255,255,0.5)">
                  {src.name.split(",")[0]}
                </text>
              </g>
            ))}

            {/* Target — Chennai SOC node */}
            <circle cx={TARGET.x} cy={TARGET.y} r="14" fill="url(#glow-green)" />
            <motion.circle
              cx={TARGET.x} cy={TARGET.y} r="9"
              stroke="#4ade80" strokeWidth="1" fill="rgba(74,222,128,0.08)"
              animate={{ r: [9, 13, 9] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            />
            <circle cx={TARGET.x} cy={TARGET.y} r="4" fill="#4ade80" />
            <text x={TARGET.x + 14} y={TARGET.y + 4} fontSize="6.5" fill="#4ade80" className="font-mono font-bold">TVS SOC</text>
            <text x={TARGET.x + 14} y={TARGET.y + 12} fontSize="5" fill="rgba(74,222,128,0.6)" className="font-mono">CHENNAI, IN</text>
          </svg>

          {/* Map legend */}
          <div className="absolute bottom-4 left-6 flex items-center gap-4 font-mono text-[9px] text-muted-foreground">
            <span className="flex items-center gap-1"><span className="h-1.5 w-4 rounded bg-red-500" /> Critical</span>
            <span className="flex items-center gap-1"><span className="h-1.5 w-4 rounded bg-amber-500" /> High</span>
            <span className="flex items-center gap-1"><span className="h-1.5 w-4 rounded bg-green-400" /> SOC Node</span>
          </div>
        </div>

        {/* Live Incident Feed */}
        <div className="flex flex-col p-4 gap-3">
          <div className="flex items-center justify-between">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-red-400 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
              Active Incident Feed
            </h4>
            <span className="font-mono text-[9px] text-muted-foreground">SENTINEL SIEM</span>
          </div>

          <div className="space-y-2.5 flex-1">
            <AnimatePresence>
              {incidents.length === 0 ? (
                <div className="font-mono text-[10px] text-muted-foreground/50 italic mt-4">
                  Awaiting live telemetry feed...
                </div>
              ) : (
                incidents.map((inc) => (
                  <motion.div
                    key={inc.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35 }}
                    className="p-2.5 rounded border border-border/60 bg-background/40 text-[10px] font-mono"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-primary font-bold">{inc.id}</span>
                      <span className={`px-1.5 py-0.5 rounded border text-[8px] font-bold ${severityColor(inc.severity)}`}>
                        {inc.severity}
                      </span>
                    </div>
                    <div className="text-foreground/90 font-semibold leading-tight">{inc.type}</div>
                    <div className="flex justify-between text-muted-foreground mt-1.5 text-[9px]">
                      <span>{inc.source} · {inc.ip}</span>
                      <span className={statusColor(inc.status)}>{inc.status}</span>
                    </div>
                    <div className="text-muted-foreground/60 mt-0.5 text-[9px]">{inc.time}</div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Stats footer */}
          <div className="border-t border-border/50 pt-3 grid grid-cols-2 gap-2">
            {[
              { label: "Blocked", value: totalBlocked, color: "text-red-400" },
              { label: "Status", value: "OPERATIONAL", color: "text-primary" },
            ].map((stat) => (
              <div key={stat.label} className="font-mono text-[9px]">
                <div className="text-muted-foreground uppercase tracking-wide">{stat.label}</div>
                <div className={`font-bold text-xs mt-0.5 ${stat.color}`}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
