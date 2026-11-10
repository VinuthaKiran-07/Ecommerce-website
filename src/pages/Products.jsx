import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  SlidersHorizontal,
  X,
  PackageSearch,
} from "lucide-react";

import ProductCard from "@/components/ProductCard";

const PER_PAGE = 12;

function formatCategory(value) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const category = searchParams.get("category") || "all";

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "https://dummyjson.com/products?limit=0",
          { signal: controller.signal }
        );

        setProducts(response.data.products);
      } catch (err) {
        if (err.code !== "ERR_CANCELED") {
          setError("We couldn't load the collection. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => controller.abort();
  }, []);

  const categories = useMemo(
    () => [
      "all",
      ...new Set(products.map((product) => product.category)),
    ],
    [products]
  );

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(term);

      const matchesCategory =
        category === "all" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, search, category, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const currentPage = Math.min(page, Math.max(totalPages, 1));

  const visible = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const hasFilters =
    search.trim() !== "" ||
    category !== "all" ||
    sort !== "default";

  function changeCategory(value) {
    setSearchParams(
      value === "all" ? {} : { category: value }
    );
    setPage(1);
  }

  function clearFilters() {
    setSearch("");
    setSort("default");
    setSearchParams({});
    setPage(1);
  }

  function changePage(nextPage) {
    setPage(nextPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const controlClass =
    "h-12 w-full rounded-full border border-[#DCD5CA] bg-white/80 px-5 text-sm text-[#292722] outline-none transition focus:border-[#B65C3A] focus:ring-2 focus:ring-[#B65C3A]/10";

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#1C1C1A]">
      {/* Editorial heading */}
      <section className="relative overflow-hidden border-b border-[#E4DDD2]">
        <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-[#E8D7C9]/50 blur-3xl" />

        <div className="relative mx-auto max-w-[1440px] px-5 pb-14 pt-16 md:px-10 md:pb-20 md:pt-24 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-[#B65C3A]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B65C3A]">
              The ShopSphere Edit
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-4xl font-serif text-[clamp(3.8rem,8vw,8rem)] leading-[0.95] tracking-[-0.07em]"
          >
            The <span className="italic text-[#B65C3A]">Collection.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-end justify-between gap-6"
          >
            <p className="max-w-xl text-base leading-8 text-[#756E65]">
              A considered selection of beautiful things.
              Explore everyday essentials, timeless pieces,
              and unexpected discoveries.
            </p>

            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9A9084]">
              Curated for everyday living / 2026
            </span>
          </motion.div>
        </div>
      </section>

      {/* Collection controls */}
      <section className="mx-auto max-w-[1440px] px-5 py-10 md:px-10 lg:px-16">
        <div className="mb-8 flex items-center gap-3">
          <SlidersHorizontal
            size={18}
            strokeWidth={1.6}
            className="text-[#B65C3A]"
          />
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em]">
            Discover your favorites
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Search */}
          <div className="relative">
            <Search
              size={18}
              strokeWidth={1.6}
              className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#92897E]"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search something wonderful..."
              aria-label="Search products"
              className={`${controlClass} pl-13 pr-10`}
            />

            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setPage(1);
                }}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#92897E] hover:text-[#1C1C1A]"
              >
                <X size={17} />
              </button>
            )}
          </div>

          {/* Category */}
          <select
            value={category}
            onChange={(event) => changeCategory(event.target.value)}
            aria-label="Filter by category"
            className={controlClass}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "all"
                  ? "All Categories"
                  : formatCategory(item)}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(event) => {
              setSort(event.target.value);
              setPage(1);
            }}
            aria-label="Sort products"
            className={controlClass}
          >
            <option value="default">Sort: Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Results */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#E4DDD2] pb-5">
          <div>
            <p className="font-serif text-2xl">
              {category === "all"
                ? "All discoveries"
                : formatCategory(category)}
            </p>

            <p className="mt-1 text-xs text-[#827A70]">
              {loading
                ? "Finding beautiful things..."
                : `${filtered.length} products found`}
            </p>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#B65C3A] hover:text-[#1C1C1A]"
            >
              <X size={15} />
              Clear filters
            </button>
          )}
        </div>

        {/* Product grid */}
        {loading ? (
          <div className="mt-9 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }, (_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-[4/5] rounded-[18px] bg-[#E8E2D8]" />
                <div className="mt-5 h-3 w-20 rounded bg-[#E8E2D8]" />
                <div className="mt-3 h-5 w-3/4 rounded bg-[#E8E2D8]" />
                <div className="mt-3 h-4 w-1/3 rounded bg-[#E8E2D8]" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div
            role="alert"
            className="py-24 text-center"
          >
            <PackageSearch
              size={42}
              strokeWidth={1.3}
              className="mx-auto text-[#B65C3A]"
            />
            <h3 className="mt-5 font-serif text-3xl">
              Something went wrong.
            </h3>
            <p className="mt-3 text-[#756E65]">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-full bg-[#1C1C1A] px-7 py-3 text-sm text-white"
            >
              Try again
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center">
            <PackageSearch
              size={42}
              strokeWidth={1.3}
              className="mx-auto text-[#B65C3A]"
            />
            <h3 className="mt-5 font-serif text-3xl">
              Nothing quite like that.
            </h3>
            <p className="mt-3 text-[#756E65]">
              Try another search or explore the full collection.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-full bg-[#1C1C1A] px-7 py-3 text-sm text-white"
            >
              Explore all products
            </button>
          </div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${category}-${sort}-${search}-${currentPage}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-9 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {visible.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex flex-wrap items-center justify-center gap-5 border-t border-[#E4DDD2] pt-9">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => changePage(currentPage - 1)}
                  className="inline-flex items-center gap-2 rounded-full border border-[#DCD5CA] px-5 py-3 text-xs font-semibold uppercase tracking-[0.1em] transition hover:bg-[#1C1C1A] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ArrowLeft size={16} />
                  Previous
                </button>

                <span className="min-w-20 text-center text-sm text-[#756E65]">
                  {currentPage} / {totalPages}
                </span>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => changePage(currentPage + 1)}
                  className="inline-flex items-center gap-2 rounded-full border border-[#DCD5CA] px-5 py-3 text-xs font-semibold uppercase tracking-[0.1em] transition hover:bg-[#1C1C1A] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Next
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
