
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/useWishlist";
import ProductCard from "@/components/ProductCard";

export default function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-black tracking-tight">
        Your Wishlist
      </h1>

      <p className="mt-3 text-neutral-500">
        Your saved favorites, all in one place.
      </p>

      {wishlist.length === 0 ? (
        <div className="py-24 text-center">
          <Heart
            size={50}
            className="mx-auto text-neutral-400"
          />

          <h2 className="mt-5 text-2xl font-semibold">
            No favorites yet
          </h2>

          <p className="mt-3 text-neutral-500">
            Explore our collection and save products you love.
          </p>

          <Button
            className="mt-6"
            render={<Link to="/products" />}
          >
            Explore Products
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
