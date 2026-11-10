import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Heart,
  Menu,
  ShoppingBag,
  UserRound,
  X,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

const navigation = [
  { label: "Home", path: "/" },
  { label: "The Collection", path: "/products" },
];

export default function Navbar() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate("/");
  }

  const navLinkClass = ({ isActive }) =>
    `relative text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
      isActive
        ? "text-[#B65C3A]"
        : "text-[#292722] hover:text-[#B65C3A]"
    }`;

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement strip */}
      <div className="flex min-h-9 items-center justify-center bg-[#1C1C1A] px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-[#F7F4EE] sm:text-[11px]">
        Curated finds. Considered living.
        <span className="ml-2 text-[#D89A7B]">✦</span>
      </div>

      <nav className="border-b border-[#E7E0D6] bg-[#F7F4EE]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 md:px-10 lg:px-16">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="group flex items-center gap-2"
          >
            <span className="font-serif text-[27px] font-semibold tracking-[-0.06em] text-[#1C1C1A] md:text-[31px]">
              shop<span className="italic font-normal">sphere</span>
            </span>
            <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[#B65C3A]" />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-10 md:flex">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={navLinkClass}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="rounded-full p-2.5 text-[#292722] transition hover:bg-[#E9E2D8]"
            >
              <Heart size={19} strokeWidth={1.6} />
            </Link>

            <Link
              to="/cart"
              aria-label={`Cart with ${cartCount} items`}
              className="relative rounded-full p-2.5 text-[#292722] transition hover:bg-[#E9E2D8]"
            >
              <ShoppingBag size={19} strokeWidth={1.6} />
              {cartCount > 0 && (
                <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#B65C3A] px-1 text-[10px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="hidden items-center gap-2 sm:flex">
                <span className="max-w-24 truncate text-xs font-medium text-[#292722]">
                  Hi, {user.name?.split(" ")[0]}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  aria-label="Log out"
                  title="Log out"
                  className="rounded-full p-2.5 transition hover:bg-[#E9E2D8]"
                >
                  <LogOut size={19} strokeWidth={1.6} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                aria-label="Sign in"
                className="hidden rounded-full p-2.5 transition hover:bg-[#E9E2D8] sm:block"
              >
                <UserRound size={19} strokeWidth={1.6} />
              </Link>
            )}

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="ml-1 rounded-full p-2.5 text-[#292722] md:hidden"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-[#E7E0D6] bg-[#F7F4EE] md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-5">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between border-b border-[#E7E0D6] py-4 font-serif text-2xl text-[#1C1C1A]"
                >
                  {item.label}
                  <ArrowUpRight size={19} />
                </Link>
              ))}

              {user ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="py-4 text-left text-sm font-medium text-[#B65C3A]"
                >
                  Log out ({user.name})
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="py-4 text-sm font-medium text-[#B65C3A]"
                >
                  Sign in / Register
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
