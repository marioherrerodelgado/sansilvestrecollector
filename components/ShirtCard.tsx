import Image from "next/image";
import type { ShirtYear } from "@/data/shirts";

export function ShirtCard({ shirt, image }: { shirt: ShirtYear; image?: string }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="relative flex aspect-square items-center justify-center bg-white/5">
        {image ? (
          <Image
            src={image}
            alt={`Camiseta San Silvestre Vallecana ${shirt.year}`}
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-1 p-4 text-center text-white/40">
            <span className="text-3xl">📷</span>
            <span className="text-xs">
              Sin foto todavía
              <br />
              añade <code className="text-white/60">{shirt.year}.jpg</code> en{" "}
              <code className="text-white/60">public/camisetas</code>
            </span>
          </div>
        )}
        <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs font-semibold">
          {shirt.year}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        {shirt.design ? (
          <p className="text-sm text-white/80">{shirt.design}</p>
        ) : (
          <p className="text-sm text-white/40 italic">Diseño sin documentar todavía.</p>
        )}

        <div className="mt-auto space-y-1 border-t border-white/10 pt-2 text-xs text-white/70">
          {shirt.menWinner && (
            <p>
              🥇 M: <span className="text-white">{shirt.menWinner.name}</span> ({shirt.menWinner.country}
              {shirt.menWinner.time ? ` · ${shirt.menWinner.time}` : ""})
            </p>
          )}
          {shirt.womenWinner && (
            <p>
              🥇 F: <span className="text-white">{shirt.womenWinner.name}</span> ({shirt.womenWinner.country}
              {shirt.womenWinner.time ? ` · ${shirt.womenWinner.time}` : ""})
            </p>
          )}
          {shirt.sponsor && <p className="text-white/40">Patrocinador: {shirt.sponsor}</p>}
          {shirt.notes && <p className="text-white/40">{shirt.notes}</p>}
        </div>
      </div>
    </article>
  );
}
