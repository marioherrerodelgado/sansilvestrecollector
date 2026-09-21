import { SHIRTS } from "@/data/shirts";
import { getShirtImageMap } from "@/lib/images";
import { Closet } from "@/components/Closet";

export default function HomePage() {
  const photoCount = Object.keys(getShirtImageMap()).length;
  const years = SHIRTS.map((s) => s.year);
  const first = Math.min(...years);
  const last = Math.max(...years);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e8b74e]">Colección personal</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Mis camisetas de la San Silvestre</h1>
        <p className="mt-3 max-w-2xl text-white/60">
          Tu vestidor de la San Silvestre: elige una percha y esa camiseta se adelanta para contarte su historia.
          Sube tu foto y, en un abrir y cerrar de ojos, se convierte en parte de la colección.
        </p>
        <p className="mt-4 text-sm text-white/35">
          {years.length} ediciones · {first}–{last} · {photoCount} con foto propia
        </p>
      </header>

      <Closet shirts={SHIRTS} />
    </div>
  );
}
