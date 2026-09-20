"use client";

import { useState } from "react";
import type { ShirtYear } from "@/data/shirts";
import { RealisticShirt } from "./RealisticShirt";
import { RoomBackground } from "./RoomBackground";

type Props = {
  shirts: ShirtYear[];
  images: Record<number, string>;
};

export function Closet({ shirts, images }: Props) {
  const sorted = [...shirts].sort((a, b) => b.year - a.year);
  const [selectedYear, setSelectedYear] = useState(sorted[0].year);
  const selected = sorted.find((s) => s.year === selectedYear) ?? sorted[0];

  return (
    <div className="space-y-6">
      <div className="relative h-[420px] overflow-hidden rounded-2xl border border-black/10 sm:h-[480px]">
        <RoomBackground className="absolute inset-0 h-full w-full" />

        <div className="absolute inset-x-0 overflow-x-auto overflow-y-visible" style={{ top: "23%" }}>
          <div className="flex items-end gap-5 px-10 sm:gap-8">
            {sorted.map((shirt) => {
              const isSelected = shirt.year === selectedYear;
              const image = images[shirt.year];
              return (
                <button
                  key={shirt.year}
                  type="button"
                  onClick={() => setSelectedYear(shirt.year)}
                  aria-pressed={isSelected}
                  aria-label={`Camiseta de ${shirt.year}`}
                  className={`group relative flex shrink-0 flex-col items-center bg-transparent transition-all duration-500 ease-out ${
                    isSelected ? "z-10 -translate-y-6" : "translate-y-0 hover:-translate-y-2 hover:scale-105"
                  }`}
                  style={{ width: isSelected ? 132 : 68 }}
                >
                  <svg
                    viewBox="0 0 28 20"
                    className={`transition-all duration-500 text-[#2b2b2b] ${isSelected ? "h-7 w-9" : "h-[17px] w-[24px] opacity-70"}`}
                  >
                    <path
                      d="M14 2c-2 0-3 1.6-3 3.4 0 1 .4 1.7 1.1 2.3L2 14.6C1 15.2 1.6 17 3 17h22c1.4 0 2-1.8 1-2.4L16.9 7.7c.7-.6 1.1-1.3 1.1-2.3C18 3.6 16 2 14 2z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  <div
                    className={`relative -mt-0.5 transition-all duration-500 ${
                      isSelected
                        ? "h-[154px] w-[132px] animate-shirt-sway drop-shadow-[0_18px_34px_rgba(0,0,0,0.45)]"
                        : "h-[92px] w-[68px] drop-shadow-[0_6px_10px_rgba(0,0,0,0.25)]"
                    }`}
                  >
                    <RealisticShirt
                      year={shirt.year}
                      color={shirt.color}
                      sleeveColor={shirt.sleeveColor}
                      image={image}
                      rich={isSelected}
                      className="h-full w-full overflow-visible"
                    />
                  </div>
                  <span
                    className={`mt-2 rounded-full px-2 py-0.5 text-[10px] font-semibold tabular-nums text-white transition-colors ${
                      isSelected ? "bg-black/80" : "bg-black/55"
                    }`}
                  >
                    {shirt.year}
                  </span>
                </button>
              );
            })}
          </div>
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
