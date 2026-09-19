"use client";

import { useMemo, useState } from "react";
import type { ShirtYear } from "@/data/shirts";
import { ShirtCard } from "./ShirtCard";

type Props = {
  shirts: ShirtYear[];
  images: Record<number, string>;
};

export function GalleryClient({ shirts, images }: Props) {
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<"desc" | "asc">("desc");
  const [onlyWithPhoto, setOnlyWithPhoto] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = shirts.filter((shirt) => {
      if (onlyWithPhoto && !images[shirt.year]) return false;
      if (!q) return true;

      const haystack = [
        String(shirt.year),
        shirt.menWinner?.name,
        shirt.menWinner?.country,
        shirt.womenWinner?.name,
        shirt.womenWinner?.country,
        shirt.design,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });

    list = [...list].sort((a, b) => (order === "desc" ? b.year - a.year : a.year - b.year));
    return list;
  }, [shirts, images, query, order, onlyWithPhoto]);

  const photoCount = shirts.filter((s) => images[s.year]).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca por año, ganador/a o país…"
          className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none placeholder:text-white/40 focus:border-white/30 sm:max-w-xs"
        />

        <div className="flex items-center gap-4 text-sm text-white/70">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={onlyWithPhoto}
              onChange={(e) => setOnlyWithPhoto(e.target.checked)}
              className="accent-white"
            />
            Solo con foto ({photoCount}/{shirts.length})
          </label>

          <select
            value={order}
            onChange={(e) => setOrder(e.target.value as "desc" | "asc")}
            className="rounded-lg border border-white/10 bg-black/40 px-2 py-2"
          >
            <option value="desc">Más reciente primero</option>
            <option value="asc">Más antiguo primero</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-white/50">No hay camisetas que coincidan con esa búsqueda.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {filtered.map((shirt) => (
            <ShirtCard key={shirt.year} shirt={shirt} image={images[shirt.year]} />
          ))}
        </div>
      )}
    </div>
  );
}
