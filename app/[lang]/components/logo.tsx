export default function Logo({
  className = "h-10 w-10",
}: {
  className?: string;
}) {
  return (
    <svg
      className={`${className} transition-all duration-500 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Removed the <rect /> background for a pure, "floating" aesthetic.
         Refined the path to be sharper and more technical.
      */}
      <path
        d="M20 50L40 30M40 30L60 50L80 30M40 30V70M80 30V70"
        stroke="currentColor" // Uses the parent text color (white)
        strokeWidth="6" // Slightly thinner for a more premium, precise look
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Optional: A tiny blue "accent" dot to match the "SGM." branding 
         found in your Footer.
      */}
      <circle cx="80" cy="70" r="4" fill="#3B82F6" className="animate-pulse" />
    </svg>
  );
}
