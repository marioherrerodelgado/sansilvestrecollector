"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { ShirtYear } from "@/data/shirts";
import { RACK_PADDING, RACK_SPACING } from "@/lib/rackLayout";
import { RoomBackground } from "./RoomBackground";

// El Canvas de WebGL necesita medidas reales de ventana; se monta solo en cliente.
const RackScene = dynamic(() => import("./RackScene").then((m) => m.RackScene), { ssr: false });

type Props = {
  shirts: ShirtYear[];
  images: Record<number, string>;
};

const HEIGHT = 420;

export function Closet({ shirts, images }: Props) {
  const sorted = [...shirts].sort((a, b) => b.year - a.year);
  const [selectedYear, setSelectedYear] = useState(sorted[0].year);
  const selected = sorted.find((s) => s.year === selectedYear) ?? sorted[0];
  const sceneWidth = sorted.length * RACK_SPACING + RACK_PADDING * 2;

  return (
    <div className="space-y-6">
      <div className="relative h-[420px] overflow-hidden rounded-2xl border border-black/10">
        <RoomBackground className="absolute inset-0 h-full w-full" />

        <div className="no-scrollbar absolute inset-0 overflow-x-auto overflow-y-hidden">
          <RackScene
            shirts={sorted}
            images={images}
            selectedYear={selectedYear}
            onSelect={setSelectedYear}
            width={sceneWidth}
            height={HEIGHT}
          />
        </div>
      </div>

      <div
        key={selected.year}
        className="animate-fade-in-up rounded-2xl border border-black/5 bg-[#f7f3ea] p-6 text-[#2b2b2b]"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl font-bold">{selected.year}</h2>
          {selected.sponsor && (
            <span className="rounded-full bg-black/10 px-2 py-0.5 text-xs uppercase tracking-wide text-black/60">
              {selected.sponsor}
            </span>
          )}
        </div>

        {selected.design ? (
          <p className="mt-3 text-black/80">{selected.design}</p>
        ) : (
          <p className="mt-3 italic text-black/40">
            Diseño sin documentar todavía — sube tu foto de {selected.year} como{" "}
            <code className="text-black/60">public/camisetas/{selected.year}.jpg</code> y cuéntanos cómo era.
          </p>
        )}

        <div className="mt-4 grid gap-1.5 text-sm text-black/70 sm:grid-cols-2">
          {selected.menWinner && (
            <p>
              🥇 Masculina: <span className="font-medium text-black">{selected.menWinner.name}</span> ({selected.menWinner.country}
              {selected.menWinner.time ? ` · ${selected.menWinner.time}` : ""})
            </p>
          )}
          {selected.womenWinner && (
            <p>
              🥇 Femenina: <span className="font-medium text-black">{selected.womenWinner.name}</span> ({selected.womenWinner.country}
              {selected.womenWinner.time ? ` · ${selected.womenWinner.time}` : ""})
            </p>
          )}
        </div>

        {selected.notes && <p className="mt-3 text-sm text-black/40">{selected.notes}</p>}
      </div>
    </div>
  );
}
