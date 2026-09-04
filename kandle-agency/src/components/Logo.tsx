interface LogoProps {
  className?: string;
  wordmarkClassName?: string;
  showWordmark?: boolean;
}

// Recreated as SVG (rather than the source raster) so it stays crisp at any
// size and the wordmark colour can adapt to light/dark contexts via
// currentColor, matching the real Kandle mark: two offset green squares
// beside a "Kan" + "dle" wordmark.
export default function Logo({ className = "h-8 w-auto", wordmarkClassName = "", showWordmark = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${wordmarkClassName}`}>
      <svg viewBox="0 0 44 44" className={className} aria-hidden="true">
        <rect x="14" y="2" width="20" height="20" rx="2" transform="rotate(18 24 12)" fill="#39B54A" />
        <rect x="2" y="18" width="16" height="16" rx="2" transform="rotate(-6 10 26)" fill="#39B54A" />
      </svg>
      {showWordmark && (
        <span className="font-sans font-extrabold text-xl tracking-tight leading-none">
          Kan<span className="text-kandle-green">dle</span>
        </span>
      )}
    </span>
  );
}
