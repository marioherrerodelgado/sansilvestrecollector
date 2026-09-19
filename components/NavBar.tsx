import Link from "next/link";

export function NavBar() {
  return (
    <header className="sticky top-0 z-10 border-b border-white/10 bg-black/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold tracking-tight">
          🎽 Mis San Silvestres
        </Link>
        <div className="flex gap-5 text-sm text-white/80">
          <Link href="/" className="hover:text-white">
            Camisetas
          </Link>
          <Link href="/carrera" className="hover:text-white">
            La carrera
          </Link>
        </div>
      </nav>
    </header>
  );
}
