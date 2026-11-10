
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowUpRight, Heart, Sparkles } from "lucide-react";

import { useWishlist } from "@/hooks/useWishlist";
import ProductCard from "@/components/ProductCard";

export default function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#1C1C1A]">
      <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-10 md:pt-16 lg:px-16">
        {/* Back navigation */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-xs font-medium text-[#827A70] transition hover:text-[#B65C3A]"
        >
          <ArrowLeft size={16} />
          Back to Collection
        </Link>

        {/* Editorial heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12 border-b border-[#DDD5CA] pb-10"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#B65C3A]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B65C3A]">
              The Pieces You Love
            </span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-5">
            <h1 className="font-serif text-[clamp(3.5rem,8vw,7rem)] leading-none tracking-[-0.06em]">
              Your <span className="italic text-[#B65C3A]">Wishlist.</span>
            </h1>

            <div className="flex items-center gap-2 pb-2 text-sm text-[#827A70]">
              <Heart size={17} strokeWidth={1.6} />
              <span>
                {wishlist.length} saved{" "}
                {wishlist.length === 1 ? "piece" : "pieces"}
              </span>
            </div>
          </div>

          <p className="mt-7 max-w-lg text-[15px] leading-8 text-[#756E65]">
            A personal collection of things that caught your eye.
            Keep your favorites close, and revisit them whenever
            inspiration strikes.
          </p>
        </motion.div>

        {wishlist.length === 0 ? (
          /* Empty wishlist */
          <motion.section
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex min-h-[450px] flex-col items-center justify-center py-20 text-center"
          >
            <div className="relative">
              <div className="flex h-28 w-28 items-center justify-center rounded-full border border-[#DDD5CA] bg-[#EEE8DE]">
                <Heart
                  size={43}
                  strokeWidth={1.2}
                  className="text-[#B65C3A]"
                />
              </div>

              <Sparkles
                size={23}
                strokeWidth={1.3}
                className="absolute -right-3 -top-2 text-[#B65C3A]"
              />
            </div>

            <p className="mt-9 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B65C3A]">
              Your Collection Awaits
            </p>

            <h2 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-tight tracking-[-0.05em]">
              Nothing saved. <span className="italic">Yet.</span>
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-7 text-[#756E65]">
              The best discoveries are worth keeping.
              Browse our collection and tap the heart on anything
              you love.
            </p>

            <Link
              to="/products"
              className="group mt-9 inline-flex items-center gap-4 rounded-full bg-[#1C1C1A] px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#B65C3A]"
            >
              Explore the Collection
              <ArrowUpRight
                size={19}
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </motion.section>
        ) : (
          /* Saved products */
          <section className="pt-10">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em]">
                Saved Selections
              </h2>

              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#B65C3A] transition hover:gap-3"
              >
                Discover More
                <ArrowUpRight size={17} />
              </Link>
            </div>

            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {wishlist.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.3 }}
                    className="min-w-0"
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            <div className="mt-20 flex flex-wrap items-center justify-between gap-5 border-t border-[#DDD5CA] pt-8">
              <p className="font-serif text-xl italic text-[#827A70]">
                Good taste is worth remembering.
              </p>

              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#B65C3A]"
              >
                Continue Exploring
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
