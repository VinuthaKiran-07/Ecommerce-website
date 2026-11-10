
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Star, ArrowUpRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatProductPrice } from "@/utils/currency";
import { useWishlist } from "@/hooks/useWishlist";

export default function ProductCard({ product }) {
  const { toggleWishlist, isWishlisted } = useWishlist();

  const saved = isWishlisted(product.id);

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white"
    >
      {/* Product image */}
      <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[#f5f4f0] p-8">

        <Link
          to={`/products/${product.id}`}
          className="flex h-full w-full items-center justify-center"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        {/* Category label */}
        <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-medium">
          {product.category}
        </span>

        {/* Wishlist heart button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={
            saved ? "Remove from wishlist" : "Add to wishlist"
          }
          className="absolute right-4 top-4 rounded-full bg-white p-3 shadow-sm transition hover:scale-110"
        >
          <Heart
            size={19}
            className={
              saved
                ? "fill-red-500 text-red-500"
                : "text-neutral-700"
            }
          />
        </button>
      </div>

      {/* Product information */}
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="line-clamp-1 font-semibold">
            {product.title}
          </h3>

          <span className="flex items-center gap-1 text-sm">
            <Star
              size={15}
              className="fill-amber-400 text-amber-400"
            />
            {product.rating}
          </span>
        </div>

        <p className="text-xl font-bold">
          {formatProductPrice(product.price)}
        </p>

        <Button
          className="w-full"
          render={<Link to={`/products/${product.id}`} />}
        >
          View Product
          <ArrowUpRight size={16} />
        </Button>
      </div>
    </motion.article>
  );
}
