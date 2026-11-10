
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedText from "@/components/AnimatedText";

export default function Hero() {
  return (
    <section className="mx-auto grid min-h-[80vh] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2">

      {/* Left content */}
      <div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-orange-600"
        >
          <Sparkles size={18} />
          Discover the extraordinary
        </motion.p>

        <AnimatedText text="Elevate Your Everyday." />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-7 max-w-lg text-lg leading-8 text-neutral-600"
        >
          Discover carefully selected products, modern essentials,
          and everyday favorites. Your next favorite starts here.
        </motion.p>

        <Link to="/products" className="mt-9 inline-block">
          <Button size="lg" className="rounded-full px-8">
            Explore Collection <ArrowUpRight size={18} />
          </Button>
        </Link>
      </div>

      {/* Right hero image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-[2rem] bg-[#e9e3d9]"
      >
        <img
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200"
          alt="Premium wireless headphones"
          className="h-[520px] w-full object-cover"
        />

        <div className="absolute bottom-6 left-6 rounded-xl bg-white/90 p-4 shadow-lg backdrop-blur">
          <p className="text-xs uppercase tracking-widest text-neutral-500">
            Featured Collection
          </p>
          <p className="mt-1 font-semibold">Designed for your lifestyle</p>
        </div>
      </motion.div>
    </section>
  );
}
