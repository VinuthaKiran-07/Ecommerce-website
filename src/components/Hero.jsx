import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const initialState = reduceMotion ? false : "hidden";

  return (
    <section className="relative overflow-hidden bg-[#F7F4EE] text-[#1C1C1A]">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 pb-14 pt-12 sm:px-8 md:px-10 md:pt-16 lg:min-h-[690px] lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:px-16 lg:pb-24 lg:pt-20">
        {/* Editorial content */}
        <motion.div
          initial={initialState}
          animate="visible"
          transition={{
            staggerChildren: reduceMotion ? 0 : 0.12,
          }}
          className="relative z-10 min-w-0"
        >
          <motion.div
            variants={reveal}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
            }}
            className="mb-7 flex items-center gap-3"
          >
            <span className="h-px w-8 shrink-0 bg-[#B65C3A]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A35639] sm:tracking-[0.25em]">
              The art of everyday living
            </span>
          </motion.div>

          <motion.h1
            variants={reveal}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
            }}
            className="max-w-[720px] font-serif text-[clamp(2.65rem,10.2vw,7.8rem)] leading-[0.98] tracking-[-0.065em] sm:leading-[0.94] lg:leading-[0.91]"
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
            transition={{
              duration: reduceMotion ? 0 : 0.6,
            }}
            className="mt-7 max-w-[430px] text-sm leading-7 text-[#6F6A62] sm:mt-9 sm:text-base sm:leading-8"
          >
            Thoughtfully selected objects for the way you
            live. Discover beautiful essentials, unexpected
            favorites, and everything in between.
          </motion.p>

          <motion.div
            variants={reveal}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
            }}
            className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6"
          >
            <Link
              to="/products"
              className="group inline-flex min-h-13 items-center justify-center gap-5 rounded-full bg-[#1C1C1A] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-[#B65C3A] sm:gap-8 sm:px-7 sm:text-xs"
            >
              Explore the collection
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>

            <a
              href="#collections"
              className="inline-flex min-h-10 items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#292722] transition hover:text-[#B65C3A]"
            >
              Discover more
              <ArrowDown size={16} />
            </a>
          </motion.div>

          <motion.div
            variants={reveal}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
            }}
            className="mt-12 flex items-center gap-4 border-t border-[#DDD5CA] pt-6 sm:mt-16 sm:gap-5"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D8CFC3]">
              <Sparkles size={19} strokeWidth={1.4} />
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs">
                Curated with intention
              </p>
              <p className="mt-1 text-xs text-[#827B71]">
                Discover something worth keeping.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Image composition */}
        <div className="relative mx-auto w-full max-w-[620px] min-w-0 pb-8 pl-5 pt-5 sm:pl-12 lg:pb-12">
          <motion.div
            initial={
              reduceMotion
                ? false
                : { opacity: 0, scale: 1.04, y: 20 }
            }
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              ease: "easeOut",
            }}
            className="relative aspect-[4/5] overflow-hidden rounded-t-[160px] rounded-b-[12px] bg-[#DCD2C5] sm:rounded-t-[260px]"
          >
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&auto=format&fit=crop&q=85"
              alt="Warm modern interior with curated furniture"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>

          {/* Secondary overlapping image */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : { opacity: 0, x: -30, rotate: -5 }
            }
            animate={{
              opacity: 1,
              x: 0,
              rotate: -5,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              delay: reduceMotion ? 0 : 0.35,
            }}
            className="absolute bottom-4 left-0 w-[36%] overflow-hidden rounded-xl border-[5px] border-[#F7F4EE] bg-[#E8DED1] shadow-[0_20px_50px_rgba(30,25,20,0.16)] sm:-left-5 sm:w-[39%]"
          >
            <img
              src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=700&auto=format&fit=crop&q=85"
              alt="Curated fragrance collection"
              className="aspect-[3/4] w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </motion.div>

          {/* Floating label */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : { opacity: 0, x: 20 }
            }
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              delay: reduceMotion ? 0 : 0.5,
            }}
            className="absolute right-0 top-[17%] max-w-[130px] rounded-sm bg-[#F7F4EE] px-3 py-3 shadow-[0_12px_40px_rgba(30,25,20,0.12)] sm:max-w-[180px] sm:px-6 sm:py-5"
          >
            <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#B65C3A] sm:text-[9px]">
              The new edit
            </p>

            <p className="mt-2 font-serif text-lg leading-tight sm:text-2xl">
              Objects of
              <br />
              desire.
            </p>

            <ArrowUpRight
              size={16}
              className="mt-2 text-[#B65C3A] sm:mt-3"
            />
          </motion.div>

          {/* Decorative detail */}
          <div className="absolute right-2 top-0 text-[9px] uppercase tracking-[0.18em] text-[#9B9185] sm:text-[10px] sm:tracking-[0.3em]">
            Est. 2026 / ShopSphere
          </div>
        </div>
      </div>

      {/* Bottom editorial strip */}
      <div className="border-t border-[#E1D9CD]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 md:px-10 lg:px-16">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#827B71]">
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
