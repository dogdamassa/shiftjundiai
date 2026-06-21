import Image from "next/image";
import Link from "next/link";

// Proporções dos arquivos oficiais em public/brand/.
const WORDMARK_RATIO = 1100 / 328; // >SHIFT
const LOCKUP_RATIO = 1500 / 614; // >SHIFT + "Onde mudar, é só o começo!"

export function BrandLogo({
  compact = false,
  lockup = false,
  variant = "orange",
}: {
  compact?: boolean;
  lockup?: boolean;
  variant?: "orange" | "light";
}) {
  const height = lockup ? 58 : compact ? 24 : 30;
  const ratio = lockup ? LOCKUP_RATIO : WORDMARK_RATIO;
  const base = lockup ? "shift-logo" : "shift-wordmark";
  const src = `/brand/${base}${variant === "light" ? "-light" : ""}.png`;

  return (
    <Link className="brand-logo" href="/" aria-label="Shift — página inicial">
      <Image
        src={src}
        alt="SHIFT"
        width={Math.round(height * ratio)}
        height={height}
        priority
      />
    </Link>
  );
}
