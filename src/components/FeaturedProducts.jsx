import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchFeatured() {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products?limit=8",
          { signal: controller.signal }
        );
        setProducts(response.data.products);
      } catch (err) {
        if (err.code !== "ERR_CANCELED") {
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchFeatured();
    return () => controller.abort();
  }, []);

  return (
    <section className="bg-[#faf9f6] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
              Handpicked for you
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Featured Products
            </h2>
          </div>

          <Button
            variant="outline"
            render={<Link to="/products" />}
          >
            View All Products
            <ArrowRight size={17} />
          </Button>
        </div>

        {loading ? (
          <p className="py-12 text-center text-neutral-500">
            Loading featured products...
          </p>
        ) : error ? (
          <p className="py-12 text-center text-red-600">
            Unable to load featured products.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
