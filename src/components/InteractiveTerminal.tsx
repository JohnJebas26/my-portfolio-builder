import { useState, useRef, useEffect } from "react";

interface LogLine {
  text: string;
  type: "input" | "output" | "error" | "success";
}

export function InteractiveTerminal() {
  const [history, setHistory] = useState<LogLine[]>([
    { text: "Initializing JohnJebas SOC console v1.7...", type: "success" },
    { text: "Connection established with Sentinel SIEM agent.", type: "success" },
    { text: "Type 'help' to view list of available cyber commands.", type: "output" },
  ]);
  const [input, setInput] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, { text: `john-jebas@soc-hub:~$ ${cmd}`, type: "input" as const }];

    if (!trimmed) {
      setHistory(newHistory);
      return;
    }

    let response: LogLine[] = [];

    switch (trimmed) {
      case "help":
        response = [
          { text: "Available commands:", type: "output" },
          { text: "  whoami   - Display analyst profile summary", type: "output" },
          { text: "  skills   - List core competencies with rating bars", type: "output" },
          { text: "  scan     - Initiate interactive security alert & vulnerability scan", type: "success" },
          { text: "  certs    - View certifications and status", type: "output" },
          { text: "  contact  - Display secure contact channels", type: "output" },
          { text: "  clear    - Clear console screen", type: "output" },
        ];
        break;
      case "whoami":
        response = [
          { text: "PROFILE DECODE:", type: "success" },
          { text: "Name: John Jebas", type: "output" },
          { text: "Role: Cyber Security Analyst (SOC Tier 1 & 2)", type: "output" },
          { text: "Exp: 1 year 5 months at TVS Electronics", type: "output" },
          { text: "Focus: Microsoft Sentinel, KQL threat hunting, EDR incident containment, VAPT", type: "output" },
        ];
        break;
      case "skills":
        response = [
          { text: "COMPETENCIES REPORT:", type: "success" },
          { text: "SIEM & Sentinel   [██████████████████░░] 92%", type: "output" },
          { text: "EDR & Incidents   [████████████████░░░░] 88%", type: "output" },
          { text: "VAPT (OWASP/Web)  [███████████████░░░░░] 85%", type: "output" },
          { text: "Network Telemetry [██████████████░░░░░░] 80%", type: "output" },
          { text: "KQL & Python      [████████████░░░░░░░░] 72%", type: "output" },
        ];
        break;
      case "scan":
        response = [
          { text: "[*] Starting security scanning sequence...", type: "output" },
          { text: "[*] Fetching TVS Electronics active alert logs...", type: "output" },
          { text: "[*] Parsing KQL Analytics Rules query logs...", type: "output" },
          { text: "[+] NO malicious alerts active. All endpoints healthy.", type: "success" },
          { text: "[+] Vulnerability index: Clean (Burp Suite Pro verified).", type: "success" },
        ];
        break;
      case "certs":
        response = [
          { text: "VERIFIED CREDENTIALS:", type: "success" },
          { text: "• Certified Ethical Hacker (CEH) - EC-Council [In Progress]", type: "output" },
          { text: "• Security Operations & Defense Analyst - Splunk [Active]", type: "output" },
          { text: "• Understanding Threats and Attacks - Splunk [Active]", type: "output" },
          { text: "• Cybersecurity Essentials - Cisco Networking Academy [Active]", type: "output" },
          { text: "• SanerNow Cyber Hygiene Platform - SecPod [Active]", type: "output" },
        ];
        break;
      case "contact":
        response = [
          { text: "SECURE COMMS:", type: "success" },
          { text: "Email: johnjebas02@gmail.com", type: "output" },
          { text: "Phone: +91 89398 90285", type: "output" },
          { text: "LinkedIn: linkedin.com/in/john-jebas-a24659275", type: "output" },
        ];
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        response = [
          { text: `Command not found: '${trimmed}'. Type 'help' for available commands.`, type: "error" },
        ];
    }

    setHistory([...newHistory, ...response]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <div 
      className="card-panel overflow-hidden border border-primary/30 bg-black/45 shadow-lg backdrop-blur-md"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center justify-between border-b border-border bg-black/60 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
          <span className="ml-2 font-mono text-xs text-muted-foreground">jebas_soc_shell.sh</span>
        </div>
        <span className="font-mono text-[10px] text-primary/70 animate-pulse">● SECURE SHELL</span>
      </div>
      <div 
        ref={scrollContainerRef}
        className="h-64 overflow-y-auto p-4 font-mono text-xs leading-relaxed"
      >
        {history.map((line, idx) => (
          <div 
            key={idx} 
            className={
              line.type === "input" 
                ? "text-primary font-semibold" 
                : line.type === "error" 
                ? "text-red-400" 
                : line.type === "success" 
                ? "text-accent font-semibold" 
                : "text-muted-foreground"
            }
          >
            {line.text}
          </div>
        ))}
        
        <div className="mt-2 flex items-center">
          <span className="text-primary font-semibold mr-2">john-jebas@soc-hub:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-foreground outline-none border-none caret-primary p-0 font-mono text-xs"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
