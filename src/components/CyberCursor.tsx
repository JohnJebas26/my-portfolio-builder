import { useEffect, useRef, useState } from "react";

export function CyberCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const mouse = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Check if hovering interactive element
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, input, [role='button']");
      setHovering(!!isInteractive);
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    const animate = () => {
      const dot = dotRef.current;
      const ringEl = ringRef.current;
      const trail = trailRef.current;
      if (!dot || !ringEl || !trail) {
        raf.current = requestAnimationFrame(animate);
        return;
      }

      // Dot snaps instantly
      dot.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`;

      // Ring lags behind
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      ringEl.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px)`;

      // Trail even more lag
      trail.style.transform = `translate(${ring.current.x - 30}px, ${ring.current.y - 30}px)`;

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Hide default cursor via style injection */}
      <style>{`* { cursor: none !important; }`}</style>

      {/* Outer trailing glow ring */}
      <div
        ref={trailRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          width: 60,
          height: 60,
          background: "radial-gradient(circle, rgba(131,237,185,0.08) 0%, transparent 70%)",
          willChange: "transform",
        }}
      />

      {/* Crosshair ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: 36,
          height: 36,
          willChange: "transform",
        }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36">
          {/* Outer ring */}
          <circle
            cx="18" cy="18" r="16"
            fill="none"
            stroke={hovering ? "rgba(120,200,255,0.8)" : "rgba(131,237,185,0.55)"}
            strokeWidth={clicking ? "2" : "1"}
            strokeDasharray={hovering ? "none" : "4 3"}
            style={{ transition: "stroke 0.15s, stroke-width 0.1s" }}
          />
          {/* Corner ticks - top left */}
          <line x1="2" y1="6" x2="2" y2="2" stroke={hovering ? "rgba(120,200,255,0.9)" : "rgba(131,237,185,0.9)"} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="2" y1="2" x2="6" y2="2" stroke={hovering ? "rgba(120,200,255,0.9)" : "rgba(131,237,185,0.9)"} strokeWidth="1.5" strokeLinecap="round" />
          {/* top right */}
          <line x1="34" y1="6" x2="34" y2="2" stroke={hovering ? "rgba(120,200,255,0.9)" : "rgba(131,237,185,0.9)"} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="34" y1="2" x2="30" y2="2" stroke={hovering ? "rgba(120,200,255,0.9)" : "rgba(131,237,185,0.9)"} strokeWidth="1.5" strokeLinecap="round" />
          {/* bottom left */}
          <line x1="2" y1="30" x2="2" y2="34" stroke={hovering ? "rgba(120,200,255,0.9)" : "rgba(131,237,185,0.9)"} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="2" y1="34" x2="6" y2="34" stroke={hovering ? "rgba(120,200,255,0.9)" : "rgba(131,237,185,0.9)"} strokeWidth="1.5" strokeLinecap="round" />
          {/* bottom right */}
          <line x1="34" y1="30" x2="34" y2="34" stroke={hovering ? "rgba(120,200,255,0.9)" : "rgba(131,237,185,0.9)"} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="34" y1="34" x2="30" y2="34" stroke={hovering ? "rgba(120,200,255,0.9)" : "rgba(131,237,185,0.9)"} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Center dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          width: 8,
          height: 8,
          background: clicking
            ? "rgba(239,68,68,0.95)"
            : hovering
            ? "rgba(120,200,255,0.95)"
            : "rgba(131,237,185,0.95)",
          boxShadow: clicking
            ? "0 0 10px rgba(239,68,68,0.8)"
            : hovering
            ? "0 0 8px rgba(120,200,255,0.7)"
            : "0 0 8px rgba(131,237,185,0.6)",
          willChange: "transform",
          transition: "background 0.1s, box-shadow 0.1s",
        }}
      />
    </>
  );
}
