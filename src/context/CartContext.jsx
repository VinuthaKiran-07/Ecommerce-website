import { useCallback, useEffect, useMemo, useReducer } from "react";
import { CartContext } from "./cart-context";


function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const product = action.payload;
      const existing = state.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return state.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + 1,
                  item.stock ?? Infinity
                ),
              }
            : item
        );
      }

      return [...state, { ...product, quantity: 1 }];
    }

    case "REMOVE_FROM_CART":
      return state.filter(
        (item) => item.id !== action.payload
      );

    case "INCREASE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              quantity: Math.min(
                item.quantity + 1,
                item.stock ?? Infinity
              ),
            }
          : item
      );

    case "DECREASE_QUANTITY":
      return state
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
}

function loadSavedCart() {
  try {
    const saved = JSON.parse(
      localStorage.getItem("shopsphere-cart") || "[]"
    );
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(
    cartReducer,
    [],
    loadSavedCart
  );

  useEffect(() => {
    localStorage.setItem(
      "shopsphere-cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  const addToCart = useCallback((product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  }, []);

  const removeFromCart = useCallback((id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  }, []);

  const increaseQuantity = useCallback((id) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: id });
  }, []);

  const decreaseQuantity = useCallback((id) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: id });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartCount,
    cartTotal,
  }), [
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartCount,
    cartTotal,
  ]);

  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
}

