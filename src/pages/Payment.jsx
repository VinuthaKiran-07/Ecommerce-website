import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  Banknote,
  Check,
  CreditCard,
  QrCode,
  ShieldCheck,
} from "lucide-react";

import { useCart } from "@/hooks/useCart";
import { formatINR, convertToINR } from "@/utils/currency";

const paymentMethods = [
  {
    value: "upi",
    label: "UPI",
    description: "Pay with a UPI ID",
    icon: QrCode,
  },
  {
    value: "card",
    label: "Card",
    description: "Credit or debit card",
    icon: CreditCard,
  },
  {
    value: "cod",
    label: "Cash on delivery",
    description: "Pay when it arrives",
    icon: Banknote,
  },
];

function loadPendingCheckout() {
  try {
    return JSON.parse(
      sessionStorage.getItem("shopsphere-pending-checkout") || "null"
    );
  } catch {
    return null;
  }
}

function createOrderMetadata() {
  return {
    id: `SS-${Date.now()}`,
    date: new Date().toISOString(),
  };
}

export default function Payment() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const [pendingCheckout] = useState(loadPendingCheckout);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: { paymentMethod: "upi" },
  });
  const paymentMethod = useWatch({ control, name: "paymentMethod" });

  useEffect(() => {
    if (!pendingCheckout || cart.length === 0) {
      navigate("/checkout", { replace: true });
    }
  }, [cart.length, navigate, pendingCheckout]);

  function onSubmit(data) {
    if (!pendingCheckout || cart.length === 0) return;

    const methodLabel = paymentMethods.find(
      (method) => method.value === data.paymentMethod
    )?.label;
    const paymentStatus =
      data.paymentMethod === "cod"
        ? "Cash on delivery selected"
        : `Demo ${methodLabel} payment authorized`;

    const order = {
      ...createOrderMetadata(),
      customer: pendingCheckout.customer,
      payment: {
        method: data.paymentMethod,
        status: paymentStatus,
      },
      items: cart.map((item) => ({ ...item })),
      total: convertToINR(cartTotal),
      status:
        data.paymentMethod === "cod"
          ? "Order placed — cash on delivery"
          : "Demo payment successful",
    };

    sessionStorage.setItem("shopsphere-last-order", JSON.stringify(order));
    sessionStorage.removeItem("shopsphere-pending-checkout");
    clearCart();
    navigate("/order-success", { replace: true });
  }

  if (!pendingCheckout || cart.length === 0) return null;

  const inputClass =
    "h-13 w-full rounded-xl border border-[#DDD5CA] bg-white/80 px-4 text-sm text-[#1C1C1A] outline-none transition placeholder:text-[#A69B8E] focus:border-[#B65C3A] focus:ring-2 focus:ring-[#B65C3A]/10";
  const errorClass = "mt-2 text-xs text-red-700";

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#1C1C1A]">
      <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-10 md:pt-16 lg:px-16">
        <Link
          to="/checkout"
          className="inline-flex items-center gap-2 text-xs font-medium text-[#827A70] transition hover:text-[#B65C3A]"
        >
          <ArrowLeft size={16} />
          Back to delivery details
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12 border-b border-[#DDD5CA] pb-10"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#B65C3A]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B65C3A]">
              Secure demo checkout
            </span>
          </div>

          <h1 className="font-serif text-[clamp(3.5rem,8vw,7rem)] leading-none tracking-[-0.06em]">
            Make it
            <span className="italic text-[#B65C3A]"> yours.</span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-[#756E65]">
            Choose how you&apos;d like to complete this demo order. No real
            payment details are sent or charged.
          </p>
        </motion.div>

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-[26px] border border-[#E2D9CD] bg-white/60 p-6 sm:p-9"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck size={22} strokeWidth={1.5} className="text-[#B65C3A]" />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B65C3A]">
                  Step 02
                </p>
                <h2 className="mt-1 font-serif text-3xl tracking-tight">
                  Payment method
                </h2>
              </div>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <label
                    key={method.value}
                    className="group flex cursor-pointer flex-col gap-4 rounded-2xl border border-[#DDD5CA] bg-white/70 p-4 transition hover:-translate-y-0.5 hover:border-[#B65C3A] has-[:checked]:border-[#B65C3A] has-[:checked]:bg-[#F8EEE8]"
                  >
                    <input
                      type="radio"
                      value={method.value}
                      {...register("paymentMethod", {
                        required: "Choose a payment method.",
                      })}
                      className="sr-only"
                    />
                    <span className="flex items-center justify-between">
                      <Icon size={23} strokeWidth={1.5} className="text-[#B65C3A]" />
                      {paymentMethod === method.value && (
                        <Check size={17} className="text-[#B65C3A]" />
                      )}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{method.label}</span>
                      <span className="mt-1 block text-xs leading-5 text-[#827A70]">
                        {method.description}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>

            {errors.paymentMethod && (
              <p className={errorClass} role="alert">
                {errors.paymentMethod.message}
              </p>
            )}

            <div className="mt-9 border-t border-[#E2D9CD] pt-9">
              {paymentMethod === "upi" && (
                <div>
                  <div className="flex items-start gap-4 rounded-2xl bg-[#EEE8DE] p-5">
                    <QrCode size={28} strokeWidth={1.4} className="shrink-0 text-[#B65C3A]" />
                    <div>
                      <h3 className="text-sm font-semibold">UPI payment</h3>
                      <p className="mt-2 text-xs leading-6 text-[#756E65]">
                        Enter a UPI ID for this demo. In a live store, this step
                        would open your UPI app or show a real payment QR.
                      </p>
                    </div>
                  </div>
                  <label htmlFor="upiId" className="mt-6 mb-3 block text-[11px] font-semibold uppercase tracking-[0.12em]">
                    UPI ID
                  </label>
                  <input
                    id="upiId"
                    type="text"
                    placeholder="yourname@upi"
                    {...register("upiId", {
                      required: "Enter a UPI ID to continue.",
                      pattern: {
                        value: /^[\w.-]+@[\w.-]+$/,
                        message: "Enter a valid UPI ID, such as name@upi.",
                      },
                    })}
                    aria-invalid={Boolean(errors.upiId)}
                    className={inputClass}
                  />
                  {errors.upiId && <p className={errorClass} role="alert">{errors.upiId.message}</p>}
                </div>
              )}

              {paymentMethod === "card" && (
                <div>
                  <div className="flex items-start gap-4 rounded-2xl bg-[#EEE8DE] p-5">
                    <CreditCard size={28} strokeWidth={1.4} className="shrink-0 text-[#B65C3A]" />
                    <div>
                      <h3 className="text-sm font-semibold">Card details</h3>
                      <p className="mt-2 text-xs leading-6 text-[#756E65]">
                        Use placeholder details only. This demo never contacts a
                        card network or stores card information.
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <label htmlFor="cardNumber" className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.12em]">Card number</label>
                    <input
                      id="cardNumber"
                      inputMode="numeric"
                      placeholder="1234 5678 9012 3456"
                      {...register("cardNumber", {
                        required: "Enter a demo card number.",
                        pattern: { value: /^[\d ]{16,19}$/, message: "Enter a 16-digit card number." },
                      })}
                      aria-invalid={Boolean(errors.cardNumber)}
                      className={inputClass}
                    />
                    {errors.cardNumber && <p className={errorClass} role="alert">{errors.cardNumber.message}</p>}
                  </div>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cardExpiry" className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.12em]">Expiry</label>
                      <input
                        id="cardExpiry"
                        inputMode="numeric"
                        placeholder="MM / YY"
                        {...register("cardExpiry", { required: "Enter an expiry date." })}
                        aria-invalid={Boolean(errors.cardExpiry)}
                        className={inputClass}
                      />
                      {errors.cardExpiry && <p className={errorClass} role="alert">{errors.cardExpiry.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="cardCvv" className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.12em]">CVV</label>
                      <input
                        id="cardCvv"
                        inputMode="numeric"
                        placeholder="123"
                        {...register("cardCvv", {
                          required: "Enter a CVV.",
                          pattern: { value: /^\d{3,4}$/, message: "Enter a 3 or 4 digit CVV." },
                        })}
                        aria-invalid={Boolean(errors.cardCvv)}
                        className={inputClass}
                      />
                      {errors.cardCvv && <p className={errorClass} role="alert">{errors.cardCvv.message}</p>}
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="flex items-start gap-4 rounded-2xl bg-[#EEE8DE] p-5">
                  <Banknote size={28} strokeWidth={1.4} className="shrink-0 text-[#B65C3A]" />
                  <div>
                    <h3 className="text-sm font-semibold">Cash on delivery</h3>
                    <p className="mt-2 text-xs leading-6 text-[#756E65]">
                      No payment details are needed. You&apos;ll pay the delivery
                      partner when your order arrives.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-9 flex items-start gap-4 rounded-2xl border border-[#E2D9CD] p-5">
              <ShieldCheck size={23} strokeWidth={1.5} className="shrink-0 text-[#B65C3A]" />
              <p className="text-xs leading-6 text-[#756E65]">
                This is a simulated payment flow for ShopSphere. No payment is
                processed and no sensitive information is retained.
              </p>
            </div>

            <button
              type="submit"
              className="group mt-9 flex w-full items-center justify-between rounded-full bg-[#1C1C1A] px-6 py-5 text-white transition hover:bg-[#B65C3A]"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.12em]">
                {paymentMethod === "cod" ? "Place order" : "Confirm demo payment"}
              </span>
              <ArrowUpRight size={20} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </button>
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:sticky lg:top-32"
          >
            <div className="rounded-[26px] border border-[#E2D9CD] bg-[#EEE8DE] p-7 sm:p-9">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#B65C3A]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B65C3A]">Order summary</span>
              </div>
              <h2 className="mt-5 font-serif text-3xl tracking-tight">Your order</h2>
              <div className="mt-8 max-h-[320px] space-y-5 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="h-17 w-17 shrink-0 overflow-hidden rounded-xl bg-[#F7F4EE] p-2">
                      <img src={item.thumbnail} alt={item.title} className="h-full w-full object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 font-serif text-base leading-tight">{item.title}</p>
                      <p className="mt-1 text-xs text-[#827A70]">Qty: {item.quantity}</p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold">{formatINR(convertToINR(item.price * item.quantity))}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-4 border-t border-[#D3C9BC] pt-7">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#756E65]">Subtotal</span>
                  <span>{formatINR(convertToINR(cartTotal))}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#756E65]">Shipping</span>
                  <span className="text-xs text-[#756E65]">Not calculated</span>
                </div>
              </div>
              <div className="mt-7 flex items-center justify-between border-t border-[#D3C9BC] pt-7">
                <span className="font-serif text-xl">Order total</span>
                <span className="font-serif text-2xl tracking-tight">{formatINR(convertToINR(cartTotal))}</span>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}
