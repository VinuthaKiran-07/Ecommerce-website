import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F7F4EE] text-[#1C1C1A]">
      <div className="mx-auto grid min-h-[690px] max-w-[1440px] items-center gap-10 px-5 pb-16 pt-14 md:px-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:px-16 lg:pb-24 lg:pt-20">
        {/* Editorial content */}
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.13 }}
          className="relative z-10"
        >
          <motion.div
            variants={reveal}
            transition={{ duration: 0.7 }}
            className="mb-8 flex items-center gap-3"
          >
            <span className="h-px w-9 bg-[#B65C3A]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A35639]">
              The art of everyday living
            </span>
          </motion.div>

          <motion.h1
            variants={reveal}
            transition={{ duration: 0.8 }}
            className="max-w-[720px] font-serif text-[clamp(4.3rem,7vw,7.8rem)] leading-[0.91] tracking-[-0.075em]"
          >
            A little
            <br />
            <span className="italic font-normal text-[#B65C3A]">
              extraordinary.
            </span>
            <br />
            Every day.
          </motion.h1>

          <motion.p
            variants={reveal}
            transition={{ duration: 0.7 }}
            className="mt-9 max-w-[430px] text-[15px] leading-8 text-[#6F6A62] md:text-base"
          >
            Thoughtfully selected objects for the way you
            live. Discover beautiful essentials, unexpected
            favorites, and everything in between.
          </motion.p>

          <motion.div
            variants={reveal}
            transition={{ duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-6"
          >
            <Link
              to="/products"
              className="group inline-flex items-center gap-8 rounded-full bg-[#1C1C1A] px-7 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-white transition-colors duration-300 hover:bg-[#B65C3A]"
            >
              Explore the collection
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>

            <a
              href="#collections"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.13em] text-[#292722] transition hover:text-[#B65C3A]"
            >
              Discover more
              <ArrowDown size={16} />
            </a>
          </motion.div>

          <motion.div
            variants={reveal}
            transition={{ duration: 0.7 }}
            className="mt-16 flex items-center gap-5 border-t border-[#DDD5CA] pt-6"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D8CFC3]">
              <Sparkles size={19} strokeWidth={1.4} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em]">
                Curated with intention
              </p>
              <p className="mt-1 text-xs text-[#827B71]">
                Discover something worth keeping.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Image composition */}
        <div className="relative mx-auto w-full max-w-[620px] pb-8 pl-5 pt-5 sm:pl-12 lg:pb-12">
          <motion.div
            initial={{ opacity: 0, scale: 1.06, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="relative aspect-[4/5] overflow-hidden rounded-t-[180px] rounded-b-[12px] bg-[#DCD2C5] sm:rounded-t-[260px]"
          >
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&auto=format&fit=crop&q=85"
              alt="Warm modern interior with curated furniture"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>

          {/* Secondary overlapping image */}
          <motion.div
            initial={{ opacity: 0, x: -45, rotate: -6 }}
            animate={{ opacity: 1, x: 0, rotate: -6 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="absolute -left-1 bottom-5 w-[39%] overflow-hidden rounded-[12px] border-[6px] border-[#F7F4EE] bg-[#E8DED1] shadow-[0_20px_50px_rgba(30,25,20,0.16)] sm:-left-6"
          >
            <img
              src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=700&auto=format&fit=crop&q=85"
              alt="Curated fragrance collection"
              className="aspect-[3/4] w-full object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Floating label */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="absolute -right-1 top-[16%] max-w-[180px] rounded-sm bg-[#F7F4EE] px-4 py-4 shadow-[0_12px_40px_rgba(30,25,20,0.12)] sm:right-0 sm:px-6 sm:py-5"
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#B65C3A]">
              The new edit
            </p>
            <p className="mt-2 font-serif text-xl leading-tight sm:text-2xl">
              Objects of
              <br />
              desire.
            </p>
            <ArrowUpRight
              size={17}
              className="mt-3 text-[#B65C3A]"
            />
          </motion.div>

          {/* Decorative detail */}
          <div className="absolute right-3 top-0 text-[10px] uppercase tracking-[0.3em] text-[#9B9185]">
            Est. 2026 / ShopSphere
          </div>
        </div>
      </div>

      {/* Bottom editorial strip */}
      <div className="border-t border-[#E1D9CD]">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-5 py-5 md:px-10 lg:px-16">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#827B71]">
            A different kind of discovery
          </span>
          <span className="font-serif text-sm italic text-[#827B71]">
            Beautiful things, thoughtfully found.
          </span>
        </div>
      </div>
    </section>
  );
}
