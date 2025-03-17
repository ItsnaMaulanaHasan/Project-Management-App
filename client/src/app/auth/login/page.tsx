/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useLoginMutation } from "@/state/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      localStorage.setItem("token", res.token);
      router.push("/"); // Redirect ke dashboard setelah login
    } catch (error: any) {
      alert(error.data?.message || "Login failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="mb-4 text-xl">Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2 w-full border p-2"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2 w-full border p-2"
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 px-4 py-2 text-white"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
