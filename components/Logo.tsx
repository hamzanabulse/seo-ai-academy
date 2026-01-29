export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5 12a7 7 0 1 1 14 0"
        stroke="#58a6ff"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 5v7l4 4"
        stroke="#c9d1d9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="10" stroke="#30363d" strokeWidth="2" />
    </svg>
  );
}
