import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function FloatingHearts() {
  const hearts = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "100vh", x: `${heart.x}vw`, opacity: 0 }}
          animate={{
            y: "-20vh",
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: "easeOut",
            repeat: Infinity,
          }}
          className="absolute"
        >
          <Heart className="w-6 h-6 text-pink-400" fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
}
