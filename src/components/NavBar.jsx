
import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

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

  
  useEffect(() => {
    if (!menuOpen) return;

    function handleEscape(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

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
        <span>Curated finds. Considered living.</span>
        <span className="ml-2 text-[#D89A7B]">✦</span>
      </div>

      {/* Main navigation */}
      <nav
        aria-label="Main navigation"
        className="border-b border-[#E7E0D6] bg-[#F7F4EE]/95 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-2 px-4 sm:px-6 md:h-[76px] md:px-10 lg:px-16">
          {/* Brand */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            aria-label="ShopSphere home"
            className="group flex shrink-0 items-center gap-2"
          >
            <span className="font-serif text-[26px] font-semibold tracking-[-0.06em] text-[#1C1C1A] sm:text-[29px] md:text-[31px]">
              shop
              <span className="italic font-normal">
                sphere
              </span>
            </span>

            <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[#B65C3A]" />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-8 md:flex lg:gap-10">
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
          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
            <Link
              to="/wishlist"
              aria-label="View wishlist"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#292722] transition hover:bg-[#E9E2D8]"
            >
              <Heart size={19} strokeWidth={1.6} />
            </Link>

            <Link
              to="/cart"
              aria-label={`Shopping bag with ${cartCount} items`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#292722] transition hover:bg-[#E9E2D8]"
            >
              <ShoppingBag size={19} strokeWidth={1.6} />

              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#B65C3A] px-1 text-[10px] font-semibold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* Account controls on desktop */}
            {user ? (
              <div className="hidden items-center gap-2 sm:flex">
                <span className="hidden max-w-24 truncate text-xs font-medium text-[#292722] lg:block">
                  Hi, {user.name?.split(" ")[0]}
                </span>

                <button
                  type="button"
                  onClick={handleLogout}
                  aria-label="Log out"
                  title="Log out"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-[#292722] transition hover:bg-[#E9E2D8]"
                >
                  <LogOut size={19} strokeWidth={1.6} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                aria-label="Sign in"
                className="hidden h-10 w-10 items-center justify-center rounded-full text-[#292722] transition hover:bg-[#E9E2D8] sm:flex"
              >
                <UserRound size={19} strokeWidth={1.6} />
              </Link>
            )}

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={
                menuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-[#292722] transition hover:bg-[#E9E2D8] md:hidden"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-[#E7E0D6] bg-[#F7F4EE] md:hidden"
          >
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col px-6 pb-7 pt-4"
            >
              {navigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between border-b border-[#E7E0D6] py-4 font-serif text-[27px] tracking-tight transition ${
                      isActive
                        ? "text-[#B65C3A]"
                        : "text-[#1C1C1A] hover:text-[#B65C3A]"
                    }`
                  }
                >
                  {item.label}
                  <ArrowUpRight size={19} strokeWidth={1.5} />
                </NavLink>
              ))}

              <div className="mt-5 border-t border-[#E7E0D6] pt-5">
                {user ? (
                  <>
                    <p className="mb-4 text-sm text-[#756E65]">
                      Signed in as{" "}
                      <span className="font-semibold text-[#1C1C1A]">
                        {user.name}
                      </span>
                    </p>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center gap-3 text-sm font-semibold text-[#B65C3A]"
                    >
                      <LogOut size={18} />
                      Log Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between text-sm font-semibold text-[#B65C3A]"
                  >
                    <span className="flex items-center gap-3">
                      <UserRound size={18} />
                      Sign In / Register
                    </span>

                    <ArrowUpRight size={18} />
                  </Link>
                )}
              </div>

              <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.2em] text-[#9A9084]">
                Thoughtfully Curated. Beautifully Lived.
              </p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
