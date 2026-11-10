import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/NavBar";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetails from "@/pages/ProductDetails";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistProvider";
import Wishlist from "@/pages/Wishlist";
import Checkout from "@/pages/Checkout";
import OrderSuccess from "@/pages/OrderSuccess";
import Cart from "@/pages/Cart";
import { AuthProvider } from "@/context/AuthProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

export default function App() {
  return (
    <BrowserRouter>
     <CartProvider>
      <WishlistProvider>
        <AuthProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={
            <ProtectedRoute>
            <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
      </AuthProvider>
      </WishlistProvider>
    </CartProvider>
    </BrowserRouter>
  );
}
