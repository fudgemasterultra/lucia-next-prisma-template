"use client";
import { useState } from "react";

interface LoginResponse {
  id: number | undefined;
  error: string | undefined;
}

export function LoginPannel({ url }: { url: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Username or password incorect");
    }
    const login: LoginResponse = await response.json();
    if (login.id) {
      // Redirect to the user page
      window.location.href = "/user";
    }
    if (login.error) {
      setError(login.error);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Login"}
      </button>
      {error && <p>{error}</p>}
      {success && <p>Success</p>}
    </form>
  );
}
