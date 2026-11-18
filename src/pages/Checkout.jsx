
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  ShoppingBag,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { useCart } from "@/hooks/useCart";
import { formatINR, convertToINR } from "@/utils/currency";

const fields = [
  {
    name: "name",
    label: "Full Name",
    placeholder: "Your full name",
    type: "text",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Email Address",
    placeholder: "you@example.com",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "phone",
    label: "Phone Number",
    placeholder: "10-digit mobile number",
    type: "tel",
    autoComplete: "tel",
  },
  {
    name: "pincode",
    label: "PIN Code",
    placeholder: "6-digit PIN code",
    type: "text",
    autoComplete: "postal-code",
  },
  {
    name: "city",
    label: "City",
    placeholder: "Your city",
    type: "text",
    autoComplete: "address-level2",
  },
  {
    name: "state",
    label: "State",
    placeholder: "Your state",
    type: "text",
    autoComplete: "address-level1",
  },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal } = useCart();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  function onSubmit(data) {
    if (cart.length === 0) return;

    sessionStorage.setItem(
      "shopsphere-pending-checkout",
      JSON.stringify({
        customer: {
          name: data.name.trim(),
          email: data.email.trim(),
          phone: data.phone.trim(),
          address: data.address.trim(),
          city: data.city.trim(),
          state: data.state.trim(),
          pincode: data.pincode.trim(),
        },
      })
    );

    navigate("/checkout/payment");
  }

  const inputClass =
    "h-13 w-full rounded-xl border border-[#DDD5CA] bg-white/80 px-4 text-sm text-[#1C1C1A] outline-none transition placeholder:text-[#A69B8E] focus:border-[#B65C3A] focus:ring-2 focus:ring-[#B65C3A]/10";

  if (cart.length === 0) {
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
              size={43}
              strokeWidth={1.2}
              className="text-[#B65C3A]"
            />
          </div>

          <p className="mt-9 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B65C3A]">
            Nothing To Check Out
          </p>

          <h1 className="mt-4 font-serif text-5xl tracking-tight">
            Your bag is <span className="italic">empty.</span>
          </h1>

          <p className="mt-5 text-sm leading-7 text-[#756E65]">
            Add a few beautiful finds to your bag before
            continuing to checkout.
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
        {/* Back navigation */}
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-xs font-medium text-[#827A70] transition hover:text-[#B65C3A]"
        >
          <ArrowLeft size={16} />
          Back to Your Bag
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
              The Final Details
            </span>
          </div>

          <h1 className="font-serif text-[clamp(3.5rem,8vw,7rem)] leading-none tracking-[-0.06em]">
            Check
            <span className="italic text-[#B65C3A]">
              out.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-[#756E65]">
            Just a few more details to complete your
            shopping experience.
          </p>
        </motion.div>

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
          {/* Delivery form */}
          <motion.form
            id="checkout-form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-[26px] border border-[#E2D9CD] bg-white/60 p-6 sm:p-9"
          >
            <div className="flex items-center gap-3">
              <MapPin
                size={22}
                strokeWidth={1.5}
                className="text-[#B65C3A]"
              />

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B65C3A]">
                  Step 01
                </p>

                <h2 className="mt-1 font-serif text-3xl tracking-tight">
                  Delivery Information
                </h2>
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-[#827A70]">
              Enter your contact and address details first. You&apos;ll choose
              a payment method on the next step.
            </p>

            <div className="mt-9 grid gap-x-5 gap-y-6 sm:grid-cols-2">
              {fields.map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.12em]"
                  >
                    {field.label}
                  </label>

                  <input
                    id={field.name}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    {...register(field.name, {
                      required: `${field.label} is required.`,
                      ...(field.name === "name"
                        ? {
                            minLength: {
                              value: 2,
                              message: "Enter your full name.",
                            },
                          }
                        : {}),
                      ...(field.name === "email"
                        ? {
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Enter a valid email address.",
                            },
                          }
                        : {}),
                      ...(field.name === "phone"
                        ? {
                            pattern: {
                              value: /^[6-9]\d{9}$/,
                              message: "Enter a valid 10-digit Indian mobile number.",
                            },
                          }
                        : {}),
                      ...(field.name === "pincode"
                        ? {
                            pattern: {
                              value: /^\d{6}$/,
                              message: "Enter a valid 6-digit PIN code.",
                            },
                          }
                        : {}),
                    })}
                    placeholder={field.placeholder}
                    aria-invalid={Boolean(errors[field.name])}
                    aria-describedby={
                      errors[field.name]
                        ? `${field.name}-error`
                        : undefined
                    }
                    className={inputClass}
                  />

                  {errors[field.name] && (
                    <p
                      id={`${field.name}-error`}
                      className="mt-2 text-xs text-red-700"
                    >
                      {errors[field.name].message}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6">
              <label
                htmlFor="address"
                className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.12em]"
              >
                Complete Address
              </label>

              <textarea
                id="address"
                rows={4}
                {...register("address", {
                  required: "Enter your complete address.",
                  minLength: {
                    value: 10,
                    message: "Enter your complete address.",
                  },
                })}
                placeholder="House number, street, locality, landmark"
                aria-invalid={Boolean(errors.address)}
                aria-describedby={
                  errors.address ? "address-error" : undefined
                }
                className="w-full resize-y rounded-xl border border-[#DDD5CA] bg-white/80 p-4 text-sm outline-none transition placeholder:text-[#A69B8E] focus:border-[#B65C3A] focus:ring-2 focus:ring-[#B65C3A]/10"
              />

              {errors.address && (
                <p
                  id="address-error"
                  className="mt-2 text-xs text-red-700"
                >
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="mt-9 flex items-start gap-4 rounded-2xl bg-[#EEE8DE] p-5">
              <ShieldCheck
                size={23}
                strokeWidth={1.5}
                className="shrink-0 text-[#B65C3A]"
              />

              <div>
                <h3 className="text-sm font-semibold">
                  Order Information
                </h3>

                <p className="mt-2 text-xs leading-6 text-[#756E65]">
                  Review your details before choosing a payment method.
                  Order information is stored in this browser session and is
                  not submitted to a retailer.
                </p>
              </div>
            </div>
          </motion.form>

          {/* Order summary */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:sticky lg:top-32"
          >
            <div className="rounded-[26px] border border-[#E2D9CD] bg-[#EEE8DE] p-7 sm:p-9">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#B65C3A]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B65C3A]">
                  Step 02
                </span>
              </div>

              <h2 className="mt-5 font-serif text-3xl tracking-tight">
                Your Order
              </h2>

              <div className="mt-8 max-h-[320px] space-y-5 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4"
                  >
                    <div className="h-17 w-17 shrink-0 overflow-hidden rounded-xl bg-[#F7F4EE] p-2">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 font-serif text-base leading-tight">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs text-[#827A70]">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <span className="shrink-0 text-sm font-semibold">
                      {formatINR(
                        convertToINR(
                          item.price * item.quantity
                        )
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-4 border-t border-[#D3C9BC] pt-7">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#756E65]">
                    Subtotal
                  </span>
                  <span>
                    {formatINR(convertToINR(cartTotal))}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-[#756E65]">
                    Shipping
                  </span>
                  <span className="text-xs text-[#756E65]">
                    Not calculated
                  </span>
                </div>
              </div>

              <div className="mt-7 flex items-center justify-between border-t border-[#D3C9BC] pt-7">
                <span className="font-serif text-xl">
                  Order Total
                </span>

                <span className="font-serif text-2xl tracking-tight">
                  {formatINR(convertToINR(cartTotal))}
                </span>
              </div>

              <button
                type="submit"
                form="checkout-form"
                className="group mt-9 flex w-full items-center justify-between rounded-full bg-[#1C1C1A] px-6 py-5 text-white transition hover:bg-[#B65C3A]"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.12em]">
                  Continue to Payment
                </span>

                <ArrowUpRight
                  size={20}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </button>
            </div>

            <div className="mt-8 grid gap-5 px-2">
              <div className="flex items-start gap-3">
                <Truck
                  size={22}
                  strokeWidth={1.4}
                  className="shrink-0 text-[#B65C3A]"
                />

                <div>
                  <p className="text-sm font-medium">
                    Delivery Details
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#827A70]">
                    Your address is included in your saved
                    order information.
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
                    Order Summary
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#827A70]">
                    Review your selected items and order total.
                  </p>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}
