
import { useCallback, useEffect, useMemo, useState } from "react";
import { WishlistContext } from "./wishlist-context";

function loadWishlist() {
  try {
    const saved = JSON.parse(
      localStorage.getItem("shopsphere-wishlist") || "[]"
    );
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(loadWishlist);

  useEffect(() => {
    localStorage.setItem(
      "shopsphere-wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  const toggleWishlist = useCallback((product) => {
    setWishlist((previous) => {
      const exists = previous.some(
        (item) => item.id === product.id
      );

      return exists
        ? previous.filter((item) => item.id !== product.id)
        : [...previous, product];
    });
  }, []);

  const isWishlisted = useCallback((id) => {
    return wishlist.some((item) => item.id === id);
  }, [wishlist]);

  const value = useMemo(
    () => ({ wishlist, toggleWishlist, isWishlisted }),
    [wishlist, toggleWishlist, isWishlisted]
  );

  return (
    <WishlistContext.Provider
      value={value}
    >
      {children}
    </WishlistContext.Provider>
  );
}
