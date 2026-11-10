import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Check,
  ShoppingBag,
  PackageCheck,
  MapPin,
  CalendarDays,
  ArrowLeft,
} from "lucide-react";

import { formatINR } from "@/utils/currency";

export default function OrderSuccess() {
  const order = (() => {
    try {
      return JSON.parse(
        sessionStorage.getItem("shopsphere-last-order") || "null"
      );
    } catch {
      return null;
    }
  })();

  if (!order) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#F7F4EE] px-6 py-20 text-center text-[#1C1C1A]">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md"
        >
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-[#DDD5CA] bg-[#EEE8DE]">
            <ShoppingBag
              size={42}
              strokeWidth={1.2}
              className="text-[#B65C3A]"
            />
          </div>

          <p className="mt-9 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B65C3A]">
            Your ShopSphere Journey
          </p>

          <h1 className="mt-4 font-serif text-5xl tracking-tight">
            No recent <span className="italic">order.</span>
          </h1>

          <p className="mt-5 text-sm leading-7 text-[#756E65]">
              We couldn't find a recent saved order in this
  browser session. Explore our collection to
  discover something beautiful.
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

  const itemCount = order.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const orderDate = new Date(order.date).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#1C1C1A]">
      <div className="mx-auto max-w-4xl px-5 pb-24 pt-16 md:px-10 md:pt-24">
        {/* Success introduction */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 170,
              damping: 15,
              delay: 0.1,
            }}
            className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-[#D8C9B9] bg-[#EEE8DE]"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#B65C3A] text-white">
              <Check size={33} strokeWidth={1.8} />
            </div>
          </motion.div>

          <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B65C3A]">
             Order Confirmed
          </p>

          <h1 className="mt-5 font-serif text-[clamp(3.5rem,7vw,6.5rem)] leading-[1.02] tracking-[-0.06em]">
            Thank <span className="italic text-[#B65C3A]">you.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-8 text-[#756E65]">
            {order.customer.name}, your selections have been
  saved successfully. Thank you for exploring ShopSphere.
          </p>

          <div className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full border border-[#DDD5CA] bg-white/60 px-5 py-3">
            <PackageCheck
              size={17}
              className="text-[#B65C3A]"
            />
            <span className="text-xs font-medium">
              Order {order.id}
            </span>
          </div>
        </motion.section>

        {/* Order details */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 overflow-hidden rounded-[28px] border border-[#E2D9CD] bg-white/60"
        >
          <div className="border-b border-[#E2D9CD] p-7 sm:p-10">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B65C3A]">
                  Your Confirmation
                </p>
                <h2 className="mt-3 font-serif text-3xl tracking-tight">
                  Order Details
                </h2>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#827A70]">
                <CalendarDays size={17} />
                {orderDate}
              </div>
            </div>

            <div className="mt-9 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#827A70]">
                  Order Reference
                </p>
                <p className="mt-2 text-sm font-semibold">
                  {order.id}
                </p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#827A70]">
                  Customer
                </p>
                <p className="mt-2 text-sm font-semibold">
                  {order.customer.name}
                </p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#827A70]">
                  Items
                </p>
                <p className="mt-2 text-sm font-semibold">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#827A70]">
                  Order Status
                </p>
                <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[#B65C3A]">
                  <Check size={16} />
                 Order placed
                </p>
              </div>
            </div>
          </div>

          {/* Purchased items */}
          <div className="border-b border-[#E2D9CD] p-7 sm:p-10">
            <h3 className="font-serif text-2xl">
              Your Selections
            </h3>

            <div className="mt-7 space-y-5">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4"
                >
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#EEE8DE] p-2">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-lg leading-tight">
                      {item.title}
                    </p>
                    <p className="mt-2 text-xs text-[#827A70]">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery information */}
          <div className="border-b border-[#E2D9CD] p-7 sm:p-10">
            <div className="flex items-center gap-3">
              <MapPin
                size={20}
                className="text-[#B65C3A]"
              />
              <h3 className="font-serif text-2xl">
                Delivery Details
              </h3>
            </div>

            <div className="mt-5 text-sm leading-7 text-[#756E65]">
              <p className="font-semibold text-[#1C1C1A]">
                {order.customer.name}
              </p>
              <p>{order.customer.address}</p>
              <p>
                {order.customer.city},{" "}
                {order.customer.state} -{" "}
                {order.customer.pincode}
              </p>
              <p className="mt-2">{order.customer.email}</p>
              <p>{order.customer.phone}</p>
            </div>
          </div>

          {/* Total */}
          <div className="flex flex-wrap items-center justify-between gap-5 bg-[#EEE8DE] p-7 sm:p-10">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#827A70]">
                Demo Order Total
              </p>
              <p className="mt-2 font-serif text-4xl tracking-tight">
                {formatINR(order.total)}
              </p>
            </div>

            <span className="rounded-full border border-[#D3C9BC] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#756E65]">
              No Payment Collected
            </span>
          </div>
        </motion.section>

        {/* Navigation */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
          <Link
            to="/products"
            className="group inline-flex items-center gap-4 rounded-full bg-[#1C1C1A] px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#B65C3A]"
          >
            <ShoppingBag size={18} />
            Continue Shopping
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#756E65] hover:text-[#B65C3A]"
          >
            <ArrowLeft size={17} />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
