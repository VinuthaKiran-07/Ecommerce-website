
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, LockKeyhole, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/useCart";
import { formatINR, convertToINR } from "@/utils/currency";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (form.name.trim().length < 2) {
      newErrors.name = "Enter your full name";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number";
    }

    if (form.address.trim().length < 10) {
      newErrors.address = "Enter your complete address";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!form.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!/^\d{6}$/.test(form.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit PIN code";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;
    if (cart.length === 0) return;

    const order = {
      id: `SS-${Date.now()}`,
      date: new Date().toISOString(),
      customer: { ...form },
      items: cart.map((item) => ({ ...item })),
      total: convertToINR(cartTotal),
      status: "Demo order placed",
    };

    sessionStorage.setItem(
      "shopsphere-last-order",
      JSON.stringify(order)
    );

    clearCart();
    navigate("/order-success", { replace: true });
  }

  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-24 text-center">
        <ShoppingBag size={50} className="mx-auto text-neutral-400" />
        <h1 className="mt-6 text-3xl font-bold">
          Your cart is empty
        </h1>
        <p className="mt-3 text-neutral-500">
          Add products before proceeding to checkout.
        </p>
        <Button
          className="mt-7"
          render={<Link to="/products" />}
        >
          Explore Products
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Link
        to="/cart"
        className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black"
      >
        <ArrowLeft size={17} />
        Back to Cart
      </Link>

      <div className="mb-10 mt-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
          Almost there
        </p>
        <h1 className="mt-3 text-4xl font-black">
          Checkout
        </h1>
        <p className="mt-3 text-neutral-500">
          Enter your delivery details to place a demo order.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <form
          id="checkout-form"
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6 rounded-2xl border p-6 md:p-8"
        >
          <h2 className="text-xl font-bold">
            Delivery Information
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            {[
              ["name", "Full Name", "Your full name"],
              ["email", "Email", "you@example.com"],
              ["phone", "Phone Number", "10-digit mobile number"],
              ["pincode", "PIN Code", "6-digit PIN code"],
              ["city", "City", "Your city"],
              ["state", "State", "Your state"],
            ].map(([name, label, placeholder]) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="mb-2 block text-sm font-medium"
                >
                  {label}
                </label>

                <Input
                  id={name}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  aria-invalid={Boolean(errors[name])}
                />

                {errors[name] && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors[name]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div>
            <label
              htmlFor="address"
              className="mb-2 block text-sm font-medium"
            >
              Complete Address
            </label>

            <textarea
              id="address"
              name="address"
              rows={4}
              value={form.address}
              onChange={handleChange}
              placeholder="House number, street, locality, landmark"
              aria-invalid={Boolean(errors.address)}
              className="w-full rounded-md border border-neutral-200 bg-white p-3 text-sm outline-none focus:border-orange-500"
            />

            {errors.address && (
              <p className="mt-1 text-xs text-red-600">
                {errors.address}
              </p>
            )}
          </div>

          <div className="rounded-xl bg-neutral-50 p-4">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <LockKeyhole size={17} />
              Demo Checkout
            </p>
            <p className="mt-2 text-sm text-neutral-500">
              No payment is collected. This checkout demonstrates
              form validation and frontend order processing.
            </p>
          </div>
        </form>

        <aside className="h-fit rounded-2xl border bg-neutral-50 p-6">
          <h2 className="text-xl font-bold">Order Summary</h2>

          <div className="mt-6 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-16 w-16 rounded-lg bg-white object-contain"
                />

                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-semibold">
                    {item.title}
                  </p>
                  <p className="text-xs text-neutral-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <span className="text-sm font-semibold">
                  {formatINR(
                    convertToINR(item.price * item.quantity)
                  )}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between border-t pt-5 text-xl font-bold">
            <span>Total</span>
            <span>
              {formatINR(convertToINR(cartTotal))}
            </span>
          </div>

          <Button
            type="submit"
            form="checkout-form"
            size="lg"
            className="mt-6 w-full rounded-full"
          >
            Place Demo Order
          </Button>
        </aside>
      </div>
    </main>
  );
}
