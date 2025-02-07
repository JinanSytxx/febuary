import { motion } from "framer-motion";

export default function TextReveal({ text }: { text: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      {text}
    </motion.span>
  );
}
