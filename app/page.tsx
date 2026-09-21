import { SHIRTS } from "@/data/shirts";
import { getShirtImageMap } from "@/lib/images";
import { Closet } from "@/components/Closet";

export default function HomePage() {
  const images = getShirtImageMap();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Mis camisetas de la San Silvestre</h1>
        <p className="mt-2 max-w-2xl text-white/60">
          Tu vestidor de la San Silvestre: elige una percha y esa camiseta se adelanta para contarte su historia.
          Sube tu foto y, en un abrir y cerrar de ojos, se convierte en parte de la colección.
        </p>
      </header>

      <Closet shirts={SHIRTS} images={images} />
    </div>
  );
}
