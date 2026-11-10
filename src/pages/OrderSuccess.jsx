
import { Link } from "react-router-dom";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      <main className="px-6 py-24 text-center">
        <h1 className="text-3xl font-bold">No recent order found</h1>
        <Button
          className="mt-6"
          render={<Link to="/products" />}
        >
          Explore Products
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-24 text-center">
      <CheckCircle2
        size={72}
        className="mx-auto text-green-600"
      />

      <p className="mt-7 text-sm font-semibold uppercase tracking-widest text-green-700">
        Demo order confirmed
      </p>

      <h1 className="mt-3 text-4xl font-black">
        Thank you for shopping!
      </h1>

      <p className="mt-5 text-neutral-500">
        Your simulated order has been placed successfully.
        No payment was made and no products will be shipped.
      </p>

      <div className="mt-10 rounded-2xl border bg-neutral-50 p-7 text-left">
        <div className="flex justify-between gap-4">
          <span className="text-neutral-500">Order ID</span>
          <span className="font-semibold">{order.id}</span>
        </div>

        <div className="mt-4 flex justify-between gap-4">
          <span className="text-neutral-500">Customer</span>
          <span className="font-semibold">
            {order.customer.name}
          </span>
        </div>

        <div className="mt-4 flex justify-between gap-4">
          <span className="text-neutral-500">Items</span>
          <span className="font-semibold">
            {order.items.reduce(
              (sum, item) => sum + item.quantity,
              0
            )}
          </span>
        </div>

        <div className="mt-5 flex justify-between border-t pt-5 text-xl font-bold">
          <span>Total</span>
          <span>{formatINR(order.total)}</span>
        </div>
      </div>

      <Button
        className="mt-8"
        render={<Link to="/products" />}
      >
        <ShoppingBag size={18} />
        Continue Shopping
      </Button>
    </main>
  );
}
