
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      <main className="mx-auto max-w-7xl px-6 py-24 text-center">
        <ShoppingBag size={55} className="mx-auto text-neutral-400" />
        <h1 className="mt-6 text-4xl font-bold">Your cart is empty</h1>
        <p className="mt-3 text-neutral-500">
          Discover products you'll love.
        </p>
        <Button className="mt-8" render={<Link to="/products" />}>
          Continue Shopping
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-10 text-4xl font-black">
        Shopping Cart
        <span className="ml-3 text-lg font-normal text-neutral-500">
          ({cartCount} items)
        </span>
      </h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_350px]">
        <div className="space-y-5">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-5 rounded-2xl border p-5 sm:flex-row sm:items-center"
            >
              <Link to={`/products/${item.id}`}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-32 w-32 rounded-xl bg-neutral-100 object-contain"
                />
              </Link>

              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="mt-1 text-sm text-neutral-500">
                  {item.category}
                </p>
                <p className="mt-3 font-bold">
                  {formatProductPrice(item.price)}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => decreaseQuantity(item.id)}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </Button>

                  <span className="w-6 text-center font-semibold">
                    {item.quantity}
                  </span>

                  <Button
                    size="icon"
                    variant="outline"
                    disabled={item.quantity >= (item.stock ?? Infinity)}
                    onClick={() => increaseQuantity(item.id)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove product"
                    className="ml-auto text-red-600"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>

              <p className="text-lg font-bold">
                {formatINR(convertToINR(item.price * item.quantity))}
              </p>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border bg-neutral-50 p-6">
          <h2 className="text-xl font-bold">Order Summary</h2>

          <div className="mt-6 flex justify-between">
            <span>Subtotal</span>
            <span>{formatINR(convertToINR(cartTotal))}</span>
          </div>

          <div className="mt-4 flex justify-between text-sm text-neutral-500">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>

          <div className="mt-6 flex justify-between border-t pt-5 text-xl font-bold">
            <span>Total</span>
            <span>{formatINR(convertToINR(cartTotal))}</span>
          </div>

          <Button
            className="mt-6 w-full"
            size="lg"
            render={<Link to="/checkout" />}
          >
            Proceed to Checkout
          </Button>

          <Link
            to="/products"
            className="mt-5 block text-center text-sm text-neutral-500 hover:text-black"
          >
            Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}
