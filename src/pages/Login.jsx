
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function handleSubmit(e) {
    e.preventDefault();

    if (name.trim().length < 2) {
      setError("Enter at least 2 characters for your name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    login(name.trim(), email.trim());
    navigate(location.state?.from || "/", { replace: true });
  }

  return (
    <main className="mx-auto max-w-md px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
        Welcome back
      </p>

      <h1 className="mt-3 text-4xl font-black">
        Sign in to ShopSphere
      </h1>

      <p className="mt-3 text-neutral-500">
        Demo sign-in for exploring the shopping experience.
      </p>

      <form onSubmit={handleSubmit} className="mt-9 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Your Name
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Email Address
          </label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-500">
        New to ShopSphere?{" "}
        <Link to="/register" className="font-semibold text-orange-600">
          Create an account
        </Link>
      </p>
    </main>
  );
}
