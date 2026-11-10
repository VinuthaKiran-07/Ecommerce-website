import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";

import { formatProductPrice } from "@/utils/currency";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProduct() {
      try {
        setLoading(true);
        setError("");
        setQuantity(1);
        setAdded(false);

        const response = await axios.get(
          `https://dummyjson.com/products/${id}`,
          { signal: controller.signal }
        );

        setProduct(response.data);
        setSelectedImage(
          response.data.images?.[0] || response.data.thumbnail
        );
      } catch (err) {
        if (err.code !== "ERR_CANCELED") {
          setError("Unable to load this product.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchProduct();

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F4EE] px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div className="aspect-[4/5] animate-pulse rounded-3xl bg-[#E8E2D8]" />
          <div className="space-y-6 pt-10">
            <div className="h-4 w-28 animate-pulse rounded bg-[#E8E2D8]" />
            <div className="h-16 w-3/4 animate-pulse rounded bg-[#E8E2D8]" />
            <div className="h-7 w-36 animate-pulse rounded bg-[#E8E2D8]" />
            <div className="h-28 w-full animate-pulse rounded bg-[#E8E2D8]" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-[60vh] bg-[#F7F4EE] px-6 py-24 text-center">
        <h1 className="font-serif text-4xl">
          We couldn't find this piece.
        </h1>
        <p role="alert" className="mt-4 text-[#756E65]">
          {error || "Product not found."}
        </p>
        <Link
          to="/products"
          className="mt-8 inline-flex items-center gap-2 text-[#B65C3A]"
        >
          <ArrowLeft size={18} />
          Back to collection
        </Link>
      </main>
    );
  }

  const images =
    product.images?.length > 0
      ? product.images
      : [product.thumbnail];

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  const inStock = product.stock > 0;

  function handleAddToCart() {
    if (!inStock) return;

    // Use the existing reducer's ADD_TO_CART action.
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    setAdded(true);
  }

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#1C1C1A]">
      <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-10 md:px-10 lg:px-16">
        {/* Breadcrumb */}
        <div className="mb-10 flex flex-wrap items-center gap-3 text-xs text-[#827A70]">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 transition hover:text-[#B65C3A]"
          >
            <ArrowLeft size={15} />
            The Collection
          </Link>
          <span>/</span>
          <span className="capitalize">
            {product.category?.replaceAll("-", " ")}
          </span>
          <span>/</span>
          <span className="max-w-[180px] truncate text-[#292722]">
            {product.title}
          </span>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* Gallery */}
          <div>
            <div className="relative overflow-hidden rounded-[28px] bg-[#EEE8DE]">
              <div className="flex aspect-[4/4.5] items-center justify-center p-8 sm:p-14">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={selectedImage}
                    alt={product.title}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35 }}
                    className="h-full w-full object-contain"
                  />
                </AnimatePresence>
              </div>

              <span className="absolute left-6 top-6 rounded-full bg-[#F7F4EE]/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#292722]">
                ShopSphere selection
              </span>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-label={
                  isWishlisted
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-[#F7F4EE] shadow-sm transition hover:scale-110"
              >
                <Heart
                  size={20}
                  fill={isWishlisted ? "#B65C3A" : "none"}
                  color={isWishlisted ? "#B65C3A" : "#1C1C1A"}
                />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="mt-5 flex flex-wrap gap-3">
              {images.map((image, index) => (
                <button
                  type="button"
                  key={`${image}-${index}`}
                  onClick={() => setSelectedImage(image)}
                  aria-label={`View product image ${index + 1}`}
                  aria-pressed={selectedImage === image}
                  className={`h-20 w-20 overflow-hidden rounded-xl border-2 bg-[#EEE8DE] p-2 transition sm:h-24 sm:w-24 ${
                    selectedImage === image
                      ? "border-[#B65C3A]"
                      : "border-transparent hover:border-[#CFC5B8]"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} view ${index + 1}`}
                    className="h-full w-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product information */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-36"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-9 bg-[#B65C3A]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B65C3A]">
                {product.category?.replaceAll("-", " ")}
              </span>
            </div>

            <h1 className="max-w-xl font-serif text-[clamp(3rem,5vw,5.5rem)] leading-[1.02] tracking-[-0.06em]">
              {product.title}
            </h1>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star
                  size={17}
                  fill="#B65C3A"
                  color="#B65C3A"
                />
                <span className="text-sm font-semibold">
                  {product.rating?.toFixed(1) ?? "New"}
                </span>
              </div>
              <span className="h-1 w-1 rounded-full bg-[#BFB6AA]" />
              <span className="text-sm text-[#827A70]">
                {product.reviews?.length ?? 0} reviews
              </span>
            </div>

            <div className="mt-9 border-y border-[#DDD5CA] py-7">
              <p className="font-serif text-4xl tracking-tight">
                {formatProductPrice(product.price)}
              </p>
              <p className="mt-2 text-xs text-[#827A70]">
                Indicative INR price for this demo
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                The details
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-8 text-[#756E65]">
                {product.description}
              </p>
            </div>

            <div className="mt-8 flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  inStock ? "bg-emerald-600" : "bg-red-600"
                }`}
              />
              <span className="text-sm font-medium">
                {inStock
                  ? `${product.stock} available`
                  : "Currently out of stock"}
              </span>
            </div>

            {/* Quantity */}
            <div className="mt-9">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em]">
                Quantity
              </p>

              <div className="inline-flex items-center rounded-full border border-[#DCD5CA] bg-white/70 p-1">
                <button
                  type="button"
                  onClick={() => {
                    setQuantity((q) => Math.max(1, q - 1));
                    setAdded(false);
                  }}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#EEE8DE] disabled:opacity-30"
                >
                  <Minus size={17} />
                </button>

                <span className="w-12 text-center text-sm font-semibold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setQuantity((q) =>
                      Math.min(product.stock, q + 1)
                    );
                    setAdded(false);
                  }}
                  disabled={!inStock || quantity >= product.stock}
                  aria-label="Increase quantity"
                  className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#EEE8DE] disabled:opacity-30"
                >
                  <Plus size={17} />
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!inStock}
              className="group mt-8 flex w-full items-center justify-between rounded-full bg-[#1C1C1A] px-7 py-5 text-white transition-colors duration-300 hover:bg-[#B65C3A] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em]">
                {added ? (
                  <>
                    <Check size={19} />
                    Added to bag
                  </>
                ) : (
                  <>
                    <ShoppingBag size={19} />
                    Add to bag
                  </>
                )}
              </span>

              <ArrowUpRight
                size={20}
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </button>

            {added && (
              <Link
                to="/cart"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#B65C3A] hover:underline"
              >
                View your bag
                <ArrowUpRight size={16} />
              </Link>
            )}

            {/* Service information */}
            <div className="mt-12 grid gap-5 border-t border-[#DDD5CA] pt-8 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Truck
                  size={23}
                  strokeWidth={1.4}
                  className="shrink-0 text-[#B65C3A]"
                />
                <div>
                  <p className="text-xs font-semibold">
                    Delivery details
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#827A70]">
                    Enter your delivery information at checkout.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={23}
                  strokeWidth={1.4}
                  className="shrink-0 text-[#B65C3A]"
                />
                <div>
                  <p className="text-xs font-semibold">
                    Demo experience
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#827A70]">
                    No real payment or order fulfillment.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom navigation */}
        <div className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-[#DDD5CA] pt-8">
          <span className="font-serif text-xl italic text-[#827A70]">
            Thoughtfully found. Beautifully lived.
          </span>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#B65C3A]"
          >
            Continue exploring
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}
