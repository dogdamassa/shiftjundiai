import Image from "next/image";
import Link from "next/link";

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="brand-logo" href="/" aria-label="Shift - página inicial">
      <Image
        src="/shift-mark.svg"
        alt=""
        width={compact ? 42 : 48}
        height={compact ? 42 : 48}
        priority
      />
      <span>
        <strong>SHIFT</strong>
        {!compact && <small>PERFORMANCE & RESULTADOS</small>}
      </span>
    </Link>
  );
}
