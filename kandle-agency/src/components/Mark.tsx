// The two-square device pulled from the Kandle logo, reused as a small
// recurring brand mark (eyebrow bullet, section marker) instead of a
// generic icon set.
export default function Mark({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden="true">
      <rect x="14" y="2" width="20" height="20" rx="2" transform="rotate(18 24 12)" fill="#39B54A" />
      <rect x="2" y="18" width="16" height="16" rx="2" transform="rotate(-6 10 26)" fill="#39B54A" />
    </svg>
  );
}
