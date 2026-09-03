// Abstract "growth system" mark built from the same offset-square motif as
// the Kandle logo — an ascending path with node points, standing in for a
// literal growth chart without becoming a generic dashboard-chart cliché.
export default function HeroGraphic() {
  return (
    <svg
      viewBox="0 0 520 560"
      className="w-full h-auto max-w-[440px] mx-auto"
      aria-hidden="true"
    >
      <g opacity="0.5">
        <rect x="40" y="60" width="26" height="26" rx="3" transform="rotate(20 53 73)" fill="#39B54A" opacity="0.18" />
        <rect x="420" y="380" width="34" height="34" rx="3" transform="rotate(-12 437 397)" fill="#39B54A" opacity="0.14" />
        <rect x="90" y="440" width="18" height="18" rx="2" transform="rotate(30 99 449)" fill="#39B54A" opacity="0.22" />
      </g>

      <path
        d="M60 480 C 140 460, 160 400, 200 360 C 250 310, 260 250, 320 210 C 370 178, 400 160, 460 96"
        fill="none"
        stroke="#39B54A"
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />

      {[
        { x: 60, y: 480, r: 5 },
        { x: 200, y: 360, r: 5 },
        { x: 320, y: 210, r: 6 },
        { x: 460, y: 96, r: 8 },
      ].map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={n.r} fill="#F3F4EC" stroke="#39B54A" strokeWidth="2" />
      ))}

      <g transform="translate(432, 60)">
        <rect x="14" y="2" width="30" height="30" rx="3" transform="rotate(18 29 17)" fill="#39B54A" />
        <rect x="0" y="26" width="24" height="24" rx="3" transform="rotate(-6 12 38)" fill="#39B54A" />
      </g>

      <text x="70" y="510" fill="#F3F4EC" fillOpacity="0.35" fontSize="11" letterSpacing="2" fontFamily="Montserrat, sans-serif">
        FOUNDATION
      </text>
      <text x="330" y="240" fill="#F3F4EC" fillOpacity="0.5" fontSize="11" letterSpacing="2" fontFamily="Montserrat, sans-serif">
        GROWTH
      </text>
    </svg>
  );
}
