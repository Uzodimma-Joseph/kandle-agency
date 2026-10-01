import { Link } from "react-router-dom";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "stroke-light" | "stroke-dark" | "ghost";

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary: "bg-kandle-green text-ink hover:bg-kandle-green-deep hover:text-paper",
  "stroke-light": "border border-paper/40 text-paper hover:border-paper hover:bg-paper/10",
  "stroke-dark": "border border-ink/25 text-ink hover:border-ink hover:bg-ink/5",
  ghost: "text-ink hover:text-kandle-green-deep",
};

const base =
  "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[13px] font-semibold tracking-wide transition-colors duration-300 ease-kandle whitespace-nowrap disabled:opacity-40 disabled:pointer-events-none";

export function ButtonLink({
  to,
  variant = "primary",
  children,
  className = "",
  external = false,
}: CommonProps & { to: string; external?: boolean }) {
  if (external || to.startsWith("http") || to.startsWith("mailto") || to.startsWith("tel")) {
    return (
      <a href={to} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  children,
  className = "",
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
