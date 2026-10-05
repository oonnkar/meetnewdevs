const BrandLogo = ({ className = "size-9", markOnly = false }) => (
  <span className="inline-flex items-center gap-2.5">
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300 via-sky-400 to-indigo-500 shadow-lg shadow-cyan-500/20 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-[62%]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 7.5 12 12m5-4.5L12 12m0 0v5"
          stroke="#07111F"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="7" cy="6.5" r="2.5" fill="#07111F" />
        <circle cx="17" cy="6.5" r="2.5" fill="#07111F" />
        <circle cx="12" cy="18" r="2.5" fill="#07111F" />
      </svg>
    </span>
    {!markOnly && (
      <span className="whitespace-nowrap text-[1.15rem] font-black tracking-tight text-white">
        Meet<span className="text-cyan-300">New</span>Devs
      </span>
    )}
  </span>
);

export default BrandLogo;
