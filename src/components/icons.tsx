import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="100" height="28" viewBox="0 0 100 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="26" fontWeight="600" fill="hsl(var(--foreground))" letterSpacing="0.1em">
        SHAMS
      </text>
    </svg>
  );
}
