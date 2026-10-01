import { useState } from "react";
import type { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import { Button } from "../../components/Button";
import { login, demoCredentials } from "../../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: { pathname: string } } };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const res = login(email, password);
    if (res.ok) {
      navigate(location.state?.from?.pathname ?? "/admin", { replace: true });
    } else {
      setError(res.error ?? "Could not sign in.");
    }
  }

  return (
    <div className="min-h-screen bg-ink text-paper flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-10">
          <Logo className="h-8 w-auto" wordmarkClassName="text-paper" />
        </div>
        <h1 className="font-serif text-2xl text-center">Admin sign in</h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-kandle-green"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-kandle-green"
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button type="submit" variant="primary" className="w-full">
            Sign in
          </Button>
        </form>
        <div className="mt-8 text-xs text-paper/40 text-center leading-relaxed">
          Demo credentials — for this prototype only, not a production login:
          <br />
          {demoCredentials.email} / {demoCredentials.password}
        </div>
      </div>
    </div>
  );
}
