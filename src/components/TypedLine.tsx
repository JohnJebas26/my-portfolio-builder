import { useEffect, useState } from "react";

export function TypedLine({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = phrases[index % phrases.length];
    const done = !deleting && text === full;
    const cleared = deleting && text === "";

    const timeout = setTimeout(
      () => {
        if (done) return setDeleting(true);
        if (cleared) {
          setDeleting(false);
          setIndex((i) => i + 1);
          return;
        }
        setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
      },
      done ? 1600 : deleting ? 30 : 55,
    );

    return () => clearTimeout(timeout);
  }, [text, deleting, index, phrases]);

  return (
    <span className="font-mono text-primary">
      {text}
      <span className="caret-blink ml-0.5 inline-block h-[1em] w-[0.5ch] translate-y-[0.12em] bg-primary" />
    </span>
  );
}
