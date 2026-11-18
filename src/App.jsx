import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicRoute from "@/components/PublicRoute";

const Home = lazy(() => import("@/pages/Home"));
const Products = lazy(() => import("@/pages/Products"));
const ProductDetails = lazy(() => import("@/pages/ProductDetails"));
const Cart = lazy(() => import("@/pages/Cart"));
const Wishlist = lazy(() => import("@/pages/Wishlist"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const Payment = lazy(() => import("@/pages/Payment"));
const OrderSuccess = lazy(() => import("@/pages/OrderSuccess"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));

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
                <Suspense fallback={<RouteLoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route
                      path="/products/:id"
                      element={<ProductDetails />}
                    />

                    <Route
                      path="/cart"
                      element={
                        <ProtectedRoute>
                          <Cart />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/wishlist"
                      element={
                        <ProtectedRoute>
                          <Wishlist />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/login"
                      element={
                        <PublicRoute>
                          <Login />
                        </PublicRoute>
                      }
                    />
                    <Route
                      path="/register"
                      element={
                        <PublicRoute>
                          <Register />
                        </PublicRoute>
                      }
                    />

                    <Route
                      path="/checkout"
                      element={
                        <ProtectedRoute>
                          <Checkout />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/checkout/payment"
                      element={
                        <ProtectedRoute>
                          <Payment />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/order-success"
                      element={
                        <ProtectedRoute>
                          <OrderSuccess />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </Suspense>
              </div>

              <Footer />
            </div>
          </AuthProvider>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

function RouteLoadingFallback() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-[#F7F4EE] px-6 text-center text-[#756E65]">
      <div>
        <span className="mx-auto block h-2 w-2 animate-pulse rounded-full bg-[#B65C3A]" />
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em]">
          Preparing your ShopSphere view
        </p>
      </div>
    </main>
  );
}
