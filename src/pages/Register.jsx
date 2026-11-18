
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Heart, ShieldCheck } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: { name: "", email: "" },
  });

  function onSubmit(data) {
    login(data.name.trim(), data.email.trim());
    navigate(location.state?.from || "/", { replace: true });
  }

  const inputClass =
    "h-14 w-full rounded-xl border border-[#DDD5CA] bg-white/70 px-5 text-sm text-[#1C1C1A] outline-none transition placeholder:text-[#A69B8E] focus:border-[#B65C3A] focus:ring-2 focus:ring-[#B65C3A]/10";

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#1C1C1A]">
      <div className="grid min-h-[calc(100vh-100px)] lg:grid-cols-2">
        {/* Editorial image panel */}
        <div className="relative hidden min-h-[650px] overflow-hidden bg-[#D8CCBE] lg:block">
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85"
            alt="Beautifully styled neutral interior"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

          <div className="absolute left-12 top-12">
            <span className="rounded-full border border-white/60 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
              Welcome To ShopSphere
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute bottom-16 left-12 right-12"
          >
            <p className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80">
              <Heart size={16} />
              Discover Something Wonderful
            </p>

            <h2 className="max-w-lg font-serif text-[clamp(3.5rem,5vw,6rem)] leading-[1.02] tracking-[-0.05em] text-white">
              Your world.
              <br />
              <span className="italic">Beautifully curated.</span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/80">
              Create your demo profile and start collecting
              pieces that feel like you.
            </p>
          </motion.div>
        </div>

        {/* Form panel */}
        <div className="flex items-center justify-center px-6 py-20 sm:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-9 bg-[#B65C3A]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B65C3A]">
                Join The Collection
              </span>
            </div>

            <h1 className="font-serif text-[clamp(3.5rem,5vw,5rem)] leading-[1.05] tracking-[-0.06em]">
              Join <span className="italic text-[#B65C3A]">us.</span>
            </h1>

            <p className="mt-5 text-sm leading-7 text-[#756E65]">
              Create your personal ShopSphere demo profile.
              A world of thoughtful discoveries awaits.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-10 space-y-6">
              <div>
                <label
                  htmlFor="register-name"
                  className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.15em]"
                >
                  Full Name
                </label>

                <input
                  id="register-name"
                  type="text"
                  autoComplete="name"
                  {...register("name", {
                    required: "Enter your name.",
                    minLength: {
                      value: 2,
                      message: "Name must contain at least 2 characters.",
                    },
                  })}
                  placeholder="Your full name"
                  aria-invalid={Boolean(errors.name)}
                  className={inputClass}
                />
                {errors.name && (
                  <p className="mt-2 text-xs text-red-700" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="register-email"
                  className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.15em]"
                >
                  Email Address
                </label>

                <input
                  id="register-email"
                  type="email"
                  autoComplete="email"
                  {...register("email", {
                    required: "Enter your email address.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address.",
                    },
                  })}
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.email)}
                  className={inputClass}
                />
                {errors.email && (
                  <p className="mt-2 text-xs text-red-700" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="group flex w-full items-center justify-between rounded-full bg-[#1C1C1A] px-7 py-5 text-white transition hover:bg-[#B65C3A]"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.15em]">
                  Create Demo Account
                </span>

                <ArrowUpRight
                  size={20}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-[#756E65]">
              Already have a profile?{" "}
              <Link
                to="/login"
                state={location.state}
                className="inline-flex items-center gap-1 font-semibold text-[#B65C3A] hover:underline"
              >
                Sign in
                <ArrowRight size={15} />
              </Link>
            </p>

            <div className="mt-12 flex items-start gap-3 border-t border-[#DDD5CA] pt-7">
              <ShieldCheck
                size={20}
                strokeWidth={1.5}
                className="shrink-0 text-[#B65C3A]"
              />

              <p className="text-xs leading-6 text-[#827A70]">
                Demo registration only. No password, real
                account creation, or secure authentication
                is involved.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
