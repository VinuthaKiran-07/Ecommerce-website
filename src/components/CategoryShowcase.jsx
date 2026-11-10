
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
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
          Explore Collections
        </p>
        <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
          Shop by Category
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {categories.map((item) => (
          <motion.div
            key={item.name}
            whileHover={{ y: -8 }}
            className="group relative h-[420px] overflow-hidden rounded-3xl"
          >
            <Link
              to={`/products?category=${item.category}`}
              className="block h-full w-full"
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

              <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between text-white">
                <div>
                  <p className="text-sm text-white/80">
                    {item.subtitle}
                  </p>
                  <h3 className="mt-2 text-3xl font-bold">
                    {item.name}
                  </h3>
                </div>

                <ArrowUpRight size={27} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
