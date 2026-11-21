import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logo/scrimmage-logo-white.png"
      alt="Scrimmage"
      width={2324}
      height={480}
      className={`h-10 w-auto sm:h-11 ${className}`}
    />
  );
}
