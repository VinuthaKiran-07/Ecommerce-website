import Hero from "@/components/Hero";
import CategoryShowcase from "@/components/CategoryShowcase";
import FeaturedProducts from "@/components/FeaturedProducts";
import PromoBanner from "@/components/PromoBanner";

export default function Home() {
  return (
    <main>
      <Hero />
      <CategoryShowcase />
      <FeaturedProducts />
      <PromoBanner />
    </main>
  );
}
