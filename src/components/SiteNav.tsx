import { useEffect, useState } from "react";

const links = [
  { id: "experience", label: "01 / Experience" },
  { id: "skills", label: "02 / Skills" },
  { id: "certs", label: "03 / Credentials" },
  { id: "projects", label: "04 / Projects" },
  { id: "contact", label: "05 / Contact" },
];

export function SiteNav() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);

      let current = "";
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= 140) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-primary"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
      <nav className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-3">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="min-w-0 truncate text-left font-mono text-sm font-bold tracking-tight text-primary"
        >
          jj@soc:~$
        </button>

        <ul className="hidden shrink-0 items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className={`rounded px-3 py-1.5 font-mono text-xs transition-colors ${
                  active === l.id
                    ? "bg-secondary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          className="shrink-0 rounded border border-border px-3 py-1.5 font-mono text-xs md:hidden"
        >
          {open ? "close" : "menu"}
        </button>
      </nav>

      {open ? (
        <ul className="border-t border-border px-6 pb-4 pt-2 md:hidden">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className="w-full py-2 text-left font-mono text-xs text-muted-foreground"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
