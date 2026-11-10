
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    name: "Beauty",
    subtitle: "Everyday essentials",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900",
    category: "beauty",
  },
  {
    name: "Furniture",
    subtitle: "Designed for living",
    image:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=900",
    category: "furniture",
  },
  {
    name: "Fragrances",
    subtitle: "Find your signature",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=900",
    category: "fragrances",
  },
];

export default function CategoryShowcase() {
  return (
    <section
      id="collections"
      className="scroll-mt-32 bg-[#F7F4EE] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-16">
        <div className="mb-10 md:mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B65C3A]">
            Explore Collections
          </p>

          <h2 className="mt-4 font-serif text-5xl leading-tight tracking-[-0.05em] text-[#1C1C1A] sm:text-6xl lg:text-7xl">
            Shop by <span className="italic">Category.</span>
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-7 text-[#756E65] sm:text-base">
            Discover thoughtfully selected pieces for every
            corner of your life.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {categories.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group relative h-[350px] overflow-hidden rounded-t-[150px] rounded-b-xl bg-[#DED7CA] sm:h-[400px] lg:h-[440px]"
            >
              <Link
                to={`/products?category=${item.category}`}
                aria-label={`Explore ${item.name} collection`}
                className="block h-full w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B65C3A]"
              >
                <img
                  src={item.image}
                  alt={`${item.name} collection`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                <div className="absolute bottom-7 left-6 right-6 flex items-end justify-between gap-3 text-white sm:left-7 sm:right-7">
                  <div>
                    <p className="text-xs tracking-wide text-white/80">
                      {item.subtitle}
                    </p>

                    <h3 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">
                      {item.name}
                    </h3>
                  </div>

                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/60 transition-colors group-hover:bg-white group-hover:text-[#1C1C1A]">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
