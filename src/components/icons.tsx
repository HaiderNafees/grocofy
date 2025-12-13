export function Logo() {
  return (
    <div className="flex items-center">
      <img
        src="https://iili.io/fY3vX6J.png"
        alt="Grocofy"
        className="h-9 w-auto max-w-[160px] object-contain sm:h-10 sm:max-w-[180px] md:h-12 md:max-w-[220px]"
        fetchPriority="high"
      />
    </div>
  );
}