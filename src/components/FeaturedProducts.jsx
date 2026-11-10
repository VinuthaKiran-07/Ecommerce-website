
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowUpRight } from "lucide-react";
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

        setProducts(response.data.products ?? []);
      } catch (err) {
        if (err.code !== "ERR_CANCELED") {
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchFeatured();

    return () => controller.abort();
  }, []);

  return (
    <section className="bg-[#EEE8DE] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-16">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between md:mb-14">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B65C3A]">
              Handpicked for you
            </p>

            <h2 className="mt-4 font-serif text-5xl leading-tight tracking-[-0.05em] text-[#1C1C1A] sm:text-6xl lg:text-7xl">
              Featured <span className="italic">Finds.</span>
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-[#756E65] sm:text-base">
              A considered selection of everyday favorites
              worth discovering.
            </p>
          </div>

          <Link
            to="/products"
            className="group inline-flex w-fit items-center gap-3 border-b border-[#1C1C1A] pb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#1C1C1A] transition-colors hover:border-[#B65C3A] hover:text-[#B65C3A]"
          >
            View All Products

            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {loading ? (
          <div
            role="status"
            className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-[3/4] rounded-xl bg-[#DED7CA]" />
                <div className="mt-4 h-3 w-2/3 rounded bg-[#DED7CA]" />
                <div className="mt-3 h-3 w-1/3 rounded bg-[#DED7CA]" />
              </div>
            ))}
            <span className="sr-only">
              Loading featured products...
            </span>
          </div>
        ) : error ? (
          <p role="alert" className="py-12 text-center text-[#B65C3A]">
            Unable to load featured products. Please try
            refreshing the page.
          </p>
        ) : products.length === 0 ? (
          <p className="py-12 text-center text-[#756E65]">
            No featured products available right now.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
