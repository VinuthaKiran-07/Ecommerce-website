
import { motion } from "motion/react";

export default function AnimatedText({ text }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 35, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-5xl font-black leading-tight tracking-tight md:text-7xl lg:text-8xl"
    >
      {text}
    </motion.h1>
  );
}
