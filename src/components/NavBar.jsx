
import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Heart, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        {/* Logo */}
        <Link to="/" className="text-2xl font-black tracking-tight">
          SHOPSPHERE<span className="text-orange-600">.</span>
        </Link>

        {/* Navigation links */}
        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className="hover:text-orange-600">
            Home
          </NavLink>

          <NavLink to="/products" className="hover:text-orange-600">
            Shop
          </NavLink>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">

          {/* Wishlist */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Wishlist"
            render={<Link to="/wishlist" />}
          >
            <Heart size={20} />
          </Button>

          {/* Cart with count */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Cart"
              render={<Link to="/cart" />}
            >
              <ShoppingBag size={20} />
            </Button>

            {cartCount > 0 && (
              <span className="pointer-events-none absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-600 px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </div>

          
{user ? (
  <div className="flex items-center gap-2">
    <span className="hidden text-sm font-medium sm:inline">
      Hi, {user.name.split(" ")[0]}
    </span>

    <Button
      variant="ghost"
      size="icon"
      aria-label="Logout"
      title="Logout"
      onClick={logout}
    >
      <LogOut size={20} />
    </Button>
  </div>
) : (
  <Button
    variant="ghost"
    size="icon"
    aria-label="Login"
    render={<Link to="/login" />}
  >
    <UserRound size={20} />
  </Button>
)}

        </div>
      </nav>
    </header>
  );
}
