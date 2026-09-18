"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";

export default function LoginPage() {
  const router = useRouter();
  const { ready, user, login, signup } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (ready && user) router.replace("/account");
  }, [ready, user, router]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      if (mode === "login") {
        await login(email, password);
        router.push("/account");
      } else {
        const result = await signup(email, password);
        if (result.needsConfirmation) {
          setMessage("Account created. Check your email if confirmation is required, then sign in.");
          setMode("login");
        } else {
          router.push("/account");
        }
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not continue.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto grid min-h-[calc(100dvh-9rem)] w-full max-w-7xl place-items-center px-4 py-12 sm:px-6">
      <section className="w-full max-w-md">
        <img src="/brand/we-mark.png" alt="" className="mb-8 h-10 w-auto" />
        <p className="text-kicker font-semibold tracking-[0.2em] text-orange uppercase">Your WE account</p>
        <h1 className="mt-3 font-display text-5xl font-bold tracking-tight">
          {mode === "login" ? "Welcome back." : "Create your account."}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Riders, fleet operators, suppliers and partners use the same account.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs font-semibold text-muted">Email</span>
            <input
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3.5 text-base text-fg outline-none transition focus:border-orange"
              placeholder="you@example.com"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold text-muted">Password</span>
            <input
              required
              minLength={8}
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3.5 text-base text-fg outline-none transition focus:border-orange"
              placeholder="8+ characters"
            />
          </label>

          {message ? (
            <p className="rounded-xl border border-border bg-elevated px-4 py-3 text-sm text-muted">{message}</p>
          ) : null}

          <button
            disabled={busy}
            className="w-full rounded-xl bg-white px-4 py-3.5 text-sm font-bold text-black transition hover:bg-white/90 disabled:opacity-50"
            type="submit"
          >
            {busy ? "Working…" : mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setMessage("");
          }}
          className="mt-5 text-sm text-muted underline-offset-4 hover:text-fg hover:underline"
        >
          {mode === "login" ? "New here? Create an account" : "Already have an account? Sign in"}
        </button>
      </section>
    </main>
  );
}
