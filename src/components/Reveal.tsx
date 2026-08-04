import { type ReactNode } from "react";
import { motion } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}) {
  const getVariants = () => {
    const offset = 30;
    switch (direction) {
      case "up":
        return { hidden: { opacity: 0, y: offset }, visible: { opacity: 1, y: 0 } };
      case "down":
        return { hidden: { opacity: 0, y: -offset }, visible: { opacity: 1, y: 0 } };
      case "left":
        return { hidden: { opacity: 0, x: offset }, visible: { opacity: 1, y: 0 } };
      case "right":
        return { hidden: { opacity: 0, x: -offset }, visible: { opacity: 1, y: 0 } };
      case "none":
        return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.6,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier easeOutExpo
      }}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
}

