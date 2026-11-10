
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Mail,
  Heart,
  ShoppingBag,
  ArrowUp,
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#1C1C1A] text-[#F7F4EE]">
      {/* Editorial statement */}
      <div className="border-b border-white/15 px-6 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.25em] text-[#C58B73]">
            Thoughtfully Curated. Beautifully Lived.
          </p>

          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <h2 className="max-w-4xl font-serif text-[clamp(3.5rem,7vw,7.5rem)] leading-[0.98] tracking-[-0.06em]">
              Find your next
              <br />
              <span className="italic text-[#C58B73]">
                favorite thing.
              </span>
            </h2>

            <Link
              to="/products"
              className="group inline-flex items-center gap-5 rounded-full border border-white/30 px-7 py-4 text-xs font-semibold uppercase tracking-[0.13em] transition hover:border-[#C58B73] hover:bg-[#B65C3A]"
            >
              Explore Collection
              <ArrowUpRight
                size={20}
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 md:px-12 lg:grid-cols-4 lg:gap-16 lg:px-8">
        {/* Brand */}
        <div className="lg:col-span-2">
          <Link
            to="/"
            className="inline-block font-serif text-4xl tracking-[-0.06em]"
          >
            shop<span className="italic text-[#C58B73]">sphere.</span>
          </Link>

          <p className="mt-6 max-w-sm text-sm leading-8 text-white/55">
            An editorial-inspired shopping experience
            celebrating beautiful design, considered
            details, and everyday discoveries.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <Link
              to="/wishlist"
              aria-label="View wishlist"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition hover:border-[#C58B73] hover:text-[#C58B73]"
            >
              <Heart size={18} />
            </Link>

            <Link
              to="/cart"
              aria-label="View shopping bag"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition hover:border-[#C58B73] hover:text-[#C58B73]"
            >
              <ShoppingBag size={18} />
            </Link>

            <a
              href="mailto:hello@example.com"
              aria-label="Email demo contact"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition hover:border-[#C58B73] hover:text-[#C58B73]"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C58B73]">
            Explore
          </h3>

          <nav
            aria-label="Footer shopping navigation"
            className="mt-7 flex flex-col items-start gap-4"
          >
            {[
              { label: "Home", to: "/" },
              { label: "The Collection", to: "/products" },
              { label: "Wishlist", to: "/wishlist" },
              { label: "Your Bag", to: "/cart" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm text-white/60 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C58B73]">
            Your Account
          </h3>

          <nav
            aria-label="Footer account navigation"
            className="mt-7 flex flex-col items-start gap-4"
          >
            <Link
              to="/login"
              className="text-sm text-white/60 transition hover:text-white"
            >
              Sign In
            </Link>

            <Link
              to="/register"
              className="text-sm text-white/60 transition hover:text-white"
            >
              Create Demo Account
            </Link>

            <Link
              to="/wishlist"
              className="text-sm text-white/60 transition hover:text-white"
            >
              Saved Favorites
            </Link>

            <Link
              to="/cart"
              className="text-sm text-white/60 transition hover:text-white"
            >
              Shopping Bag
            </Link>
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-7 md:flex-row md:items-center md:justify-between md:px-12 lg:px-8">
          <p className="text-xs text-white/45">
            © {year} ShopSphere.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-[0.12em] text-[#C58B73] transition hover:text-white"
          >
            Back to Top
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
