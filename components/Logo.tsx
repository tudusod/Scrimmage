import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logo/scrimmage.logo.webp"
      alt="Scrimmage"
      width={800}
      height={400}
      priority
      className={`h-14 w-auto mix-blend-screen ${className}`}
    />
  );
}