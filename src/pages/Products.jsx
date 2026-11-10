
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://dummyjson.com/products?limit=0",
          { signal: controller.signal }
        );
        setProducts(response.data.products);
      } catch (err) {
        if (err.code !== "ERR_CANCELED") {
          setError("Failed to load products.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadProducts();
    return () => controller.abort();
  }, []);

  const categories = [
    "all",
    ...new Set(products.map((p) => p.category)),
  ];

  const filtered = useMemo(() => {
    const result = products.filter((p) => {
      const matchesSearch = p.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "all" || p.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [products, search, category, sort]);

  const perPage = 12;
  const totalPages = Math.ceil(filtered.length / perPage);
  const visible = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
          Curated collection
        </p>
        <h1 className="mt-3 text-5xl font-black tracking-tight">
          Explore Products
        </h1>
        <p className="mt-3 text-neutral-500">
          Discover something extraordinary.
        </p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="h-10 rounded-md border border-neutral-200 bg-white px-3"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? "All Categories" : item}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          className="h-10 rounded-md border border-neutral-200 bg-white px-3"
        >
          <option value="default">Default</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p role="alert" className="text-red-600">{error}</p>
      ) : filtered.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <>
          <p className="mb-5 text-sm text-neutral-500">
            {filtered.length} products found
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>

            <span className="text-sm">
              Page {page} of {totalPages}
            </span>

            <Button
              variant="outline"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </main>
  );
}
