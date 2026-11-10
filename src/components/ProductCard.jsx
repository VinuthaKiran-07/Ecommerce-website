import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Heart, ArrowUpRight, Star } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { formatProductPrice } from "@/utils/currency";

export default function ProductCard({ product }) {
  const { wishlist, toggleWishlist } = useWishlist();

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className="group min-w-0"
    >
      {/* Product image */}
      <div className="relative overflow-hidden rounded-[18px] bg-[#F0ECE5]">
        <Link
          to={`/products/${product.id}`}
          className="block"
          aria-label={`View ${product.title}`}
        >
          <div className="aspect-[4/5] overflow-hidden">
            <motion.img
              src={product.thumbnail}
              alt={product.title}
              loading="lazy"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.5 }}
              className="h-full w-full object-contain p-6"
            />
          </div>
        </Link>

        {/* Category label */}
        <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#292722] backdrop-blur">
          {product.category?.replaceAll("-", " ")}
        </span>

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={
            isWishlisted
              ? `Remove ${product.title} from wishlist`
              : `Add ${product.title} to wishlist`
          }
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#1C1C1A] shadow-sm transition hover:scale-110"
        >
          <Heart
            size={19}
            strokeWidth={1.7}
            fill={isWishlisted ? "#B65C3A" : "none"}
            color={isWishlisted ? "#B65C3A" : "#1C1C1A"}
          />
        </button>

        {/* View product */}
        <Link
          to={`/products/${product.id}`}
          className="absolute bottom-4 left-4 right-4 flex translate-y-3 items-center justify-between rounded-full bg-[#1C1C1A] px-5 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100"
        >
          View Details
          <ArrowUpRight size={17} />
        </Link>
      </div>

      {/* Product information */}
      <div className="px-1 pt-5">
        <div className="mb-2 flex items-center gap-1.5">
          <Star size={13} fill="#B65C3A" color="#B65C3A" />
          <span className="text-xs font-medium text-[#746D64]">
            {product.rating?.toFixed(1) ?? "New"}
          </span>
        </div>

        <Link to={`/products/${product.id}`}>
          <h3 className="line-clamp-2 font-serif text-[21px] leading-snug tracking-tight text-[#1C1C1A] transition-colors group-hover:text-[#B65C3A]">
            {product.title}
          </h3>
        </Link>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-base font-semibold text-[#292722]">
            {formatProductPrice(product.price)}
          </span>
          <ArrowUpRight
            size={17}
            strokeWidth={1.5}
            className="text-[#B65C3A]"
          />
        </div>
      </div>
    </motion.article>
  );
}
