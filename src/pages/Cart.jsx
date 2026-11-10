import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { useCart } from "@/hooks/useCart";
import {
  formatINR,
  formatProductPrice,
  convertToINR,
} from "@/utils/currency";

export default function Cart() {
  const {
    cart,
    cartCount,
    cartTotal,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  if (cart.length === 0) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#F7F4EE] px-6 py-20 text-[#1C1C1A]">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg text-center"
        >
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-[#DDD5CA] bg-[#EEE8DE]">
            <ShoppingBag
              size={42}
              strokeWidth={1.2}
              className="text-[#B65C3A]"
            />
          </div>

          <p className="mt-9 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B65C3A]">
            Your Shopping Bag
          </p>

          <h1 className="mt-4 font-serif text-[clamp(3rem,7vw,5rem)] leading-[1.05] tracking-[-0.05em]">
            A little <span className="italic">empty.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-[#756E65]">
            Beautiful things are waiting to be discovered.
            Explore our collection and find something worth keeping.
          </p>

          <Link
            to="/products"
            className="mt-9 inline-flex items-center gap-4 rounded-full bg-[#1C1C1A] px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#B65C3A]"
          >
            Explore the Collection
            <ArrowUpRight size={19} />
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#1C1C1A]">
      <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-10 md:pt-16 lg:px-16">
        {/* Breadcrumb */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-xs font-medium text-[#827A70] transition hover:text-[#B65C3A]"
        >
          <ArrowLeft size={16} />
          Back to Collection
        </Link>

        {/* Editorial heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12 border-b border-[#DDD5CA] pb-10"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#B65C3A]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B65C3A]">
              Almost Yours
            </span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <h1 className="font-serif text-[clamp(3.5rem,8vw,7rem)] leading-none tracking-[-0.06em]">
              Your <span className="italic text-[#B65C3A]">Bag.</span>
            </h1>

            <p className="pb-2 text-sm text-[#827A70]">
              {cartCount} {cartCount === 1 ? "item" : "items"} selected
            </p>
          </div>
        </motion.div>

        {/* Cart and order summary */}
        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_370px] lg:gap-16">
          {/* Cart items */}
          <section aria-label="Items in your bag">
            <div className="mb-7 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em]">
                Your Selections
              </h2>
              <span className="text-xs text-[#827A70]">
                {cart.length} unique products
              </span>
            </div>

            <AnimatePresence initial={false}>
              {cart.map((item) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-[110px_minmax(0,1fr)] gap-5 border-b border-[#DDD5CA] py-7 first:pt-0 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-7"
                >
                  {/* Image */}
                  <Link
                    to={`/products/${item.id}`}
                    className="block overflow-hidden rounded-[18px] bg-[#EEE8DE]"
                  >
                    <div className="aspect-[4/5] p-3 sm:p-5">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="h-full w-full object-contain transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                  </Link>

                  {/* Information */}
                  <div className="flex min-w-0 flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B65C3A]">
                        {item.category?.replaceAll("-", " ")}
                      </p>

                      <Link to={`/products/${item.id}`}>
                        <h3 className="mt-2 font-serif text-xl leading-tight tracking-tight transition-colors hover:text-[#B65C3A] sm:text-2xl">
                          {item.title}
                        </h3>
                      </Link>

                      <p className="mt-3 text-sm font-medium">
                        {formatProductPrice(item.price)}
                        <span className="ml-2 text-xs font-normal text-[#827A70]">
                          each
                        </span>
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
                      {/* Quantity controls */}
                      <div className="inline-flex items-center rounded-full border border-[#DCD5CA] bg-white/60 p-1">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          aria-label={`Decrease quantity of ${item.title}`}
                          className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-[#EEE8DE]"
                        >
                          <Minus size={15} />
                        </button>

                        <span className="w-9 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          disabled={
                            item.quantity >= (item.stock ?? Infinity)
                          }
                          aria-label={`Increase quantity of ${item.title}`}
                          className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-[#EEE8DE] disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <Plus size={15} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.title} from cart`}
                        className="inline-flex items-center gap-2 text-xs text-[#827A70] transition hover:text-[#B65C3A]"
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-[#E7E0D7] pt-4">
                      <span className="text-xs text-[#827A70]">
                        Item subtotal
                      </span>

                      <span className="font-serif text-xl">
                        {formatINR(
                          convertToINR(item.price * item.quantity)
                        )}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>

            <Link
              to="/products"
              className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#B65C3A] transition hover:gap-3"
            >
              <ArrowLeft size={17} />
              Continue Shopping
            </Link>
          </section>

          {/* Order summary */}
          <aside className="lg:sticky lg:top-32">
            <div className="rounded-[26px] border border-[#E2D9CD] bg-[#EEE8DE] p-7 sm:p-9">
              <div className="flex items-center gap-3">
                <span className="h-px w-7 bg-[#B65C3A]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B65C3A]">
                  The Details
                </span>
              </div>

              <h2 className="mt-5 font-serif text-3xl tracking-tight">
                Order Summary
              </h2>

              <div className="mt-9 space-y-5">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-[#756E65]">
                    Subtotal ({cartCount} items)
                  </span>
                  <span className="font-medium">
                    {formatINR(convertToINR(cartTotal))}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4 text-sm">
                  <span className="text-[#756E65]">
                    Shipping
                  </span>
                  <span className="text-right text-xs text-[#756E65]">
                    Calculated at checkout
                  </span>
                </div>
              </div>

              <div className="mt-8 border-t border-[#D3C9BC] pt-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-serif text-xl">
                    Subtotal
                  </span>
                  <span className="font-serif text-2xl tracking-tight">
                    {formatINR(convertToINR(cartTotal))}
                  </span>
                </div>

                <p className="mt-3 text-xs leading-5 text-[#827A70]">
                  Shipping, if applicable, will be shown
                  during checkout.
                </p>
              </div>

              <Link
                to="/checkout"
                className="group mt-9 flex w-full items-center justify-between rounded-full bg-[#1C1C1A] px-6 py-4 text-white transition hover:bg-[#B65C3A]"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.12em]">
                  Proceed to Checkout
                </span>
                <ArrowUpRight
                  size={19}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Reassurance */}
            <div className="mt-8 grid gap-5 px-2">
              <div className="flex items-start gap-3">
                <Truck
                  size={22}
                  strokeWidth={1.4}
                  className="shrink-0 text-[#B65C3A]"
                />
                <div>
                  <p className="text-sm font-medium">
                    Delivery Information
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#827A70]">
                    Provide your delivery address at checkout.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={22}
                  strokeWidth={1.4}
                  className="shrink-0 text-[#B65C3A]"
                />
                <div>
                  <p className="text-sm font-medium">
                  Checkout Information
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#827A70]">
                     Review your selections before continuing.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
