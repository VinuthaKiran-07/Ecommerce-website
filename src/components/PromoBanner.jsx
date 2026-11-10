
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PromoBanner() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="relative overflow-hidden rounded-[2rem] bg-[#171717] px-8 py-20 text-white md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-400">
            The ShopSphere Edit
          </p>

          <h2 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
            Good things.
            <br />
            Great discoveries.
          </h2>

          <p className="mt-6 max-w-lg text-lg leading-8 text-neutral-300">
            Discover products that make your everyday
            a little more extraordinary.
          </p>

          <Button
            className="mt-8 rounded-full bg-white px-7 text-black hover:bg-neutral-200"
            render={<Link to="/products" />}
          >
            Start Exploring
            <ArrowUpRight size={18} />
          </Button>
        </motion.div>

        <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
      </div>
    </section>
  );
}
