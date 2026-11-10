import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Star, ArrowLeft, Truck, ShieldCheck, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatProductPrice } from "@/utils/currency";
import { useCart } from "@/hooks/useCart";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProduct() {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `https://dummyjson.com/products/${id}`,
          { signal: controller.signal }
        );

        setProduct(response.data);
        setSelectedImage(
          response.data.images?.[0] || response.data.thumbnail
        );
      } catch (err) {
        if (err.code !== "ERR_CANCELED") {
          setError("Unable to load this product.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchProduct();
    return () => controller.abort();
  }, [id]);

  if (loading) {
    return <p className="p-12 text-center">Loading product details...</p>;
  }

  if (error || !product) {
    return (
      <div className="p-12 text-center">
        <p className="mb-4 text-red-600">{error || "Product not found."}</p>
        <Link to="/products">Back to products</Link>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Link
        to="/products"
        className="mb-10 inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-black"
      >
        <ArrowLeft size={17} />
        Back to Collection
      </Link>

      <div className="grid gap-12 lg:grid-cols-2">

        {/* Product images */}
        <div>
          <div className="flex h-[460px] items-center justify-center overflow-hidden rounded-3xl bg-[#f5f4f0] p-10">
            <img
              src={selectedImage}
              alt={product.title}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            {product.images?.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`h-20 w-20 overflow-hidden rounded-xl border-2 bg-neutral-100 p-2 ${
                  selectedImage === image
                    ? "border-orange-600"
                    : "border-transparent"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.title} view ${index + 1}`}
                  className="h-full w-full object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product information */}
        <div className="flex flex-col justify-center">
          <Badge variant="secondary" className="mb-5 w-fit">
            {product.category}
          </Badge>

          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            {product.title}
          </h1>

          <div className="mt-5 flex items-center gap-3">
            <Star size={18} className="fill-amber-400 text-amber-400" />
            <span className="font-semibold">{product.rating}</span>
            <span className="text-sm text-neutral-500">
              ({product.reviews?.length ?? 0} reviews)
            </span>
          </div>

          <p className="mt-8 text-4xl font-bold">
            {formatProductPrice(product.price)}
          </p>

          <p className="mt-6 leading-8 text-neutral-600">
            {product.description}
          </p>

          <div className="mt-6">
            <span
              className={`text-sm font-semibold ${
                product.stock > 0
                  ? "text-green-700"
                  : "text-red-600"
              }`}
            >
              {product.stock > 0
                ? `${product.stock} items in stock`
                : "Out of stock"}
            </span>
          </div>

          <Button
            size="lg"
            className="mt-8 w-full rounded-full"
            disabled={product.stock === 0}
            onClick={() => addToCart(product)}
          >
            <ShoppingBag size={19} />
            Add to Cart
          </Button>

          <div className="mt-10 grid grid-cols-2 gap-4 border-t pt-8">
            <div className="flex items-center gap-3">
              <Truck size={23} />
              <span className="text-sm">Delivery information at checkout</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck size={23} />
              <span className="text-sm">Demo shopping experience</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
