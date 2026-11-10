import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";

import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetails from "@/pages/ProductDetails";
import Cart from "@/pages/Cart";
import Wishlist from "@/pages/Wishlist";
import Checkout from "@/pages/Checkout";
import OrderSuccess from "@/pages/OrderSuccess";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistProvider";
import { AuthProvider } from "@/context/AuthProvider";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <AuthProvider>
            <div className="flex min-h-screen flex-col bg-[#F7F4EE]">
              <Navbar />

              <div className="min-w-0 flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route
                    path="/products/:id"
                    element={<ProductDetails />}
                  />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/order-success"
                    element={<OrderSuccess />}
                  />
                </Routes>
              </div>

              <Footer />
            </div>
          </AuthProvider>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
