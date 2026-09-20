"use client";

import { useState } from "react";
import type { ShirtYear } from "@/data/shirts";
import { RealisticShirt } from "./RealisticShirt";

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
      <div className="relative overflow-x-auto overflow-y-visible rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent px-6 pb-6 pt-24">
        <div className="pointer-events-none absolute inset-x-6 top-16 h-px bg-white/15" />
        <div className="flex items-end gap-5 sm:gap-7">
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
                  isSelected
                    ? "z-10 -translate-y-6"
                    : "translate-y-0 opacity-55 hover:-translate-y-1 hover:opacity-90"
                }`}
                style={{ width: isSelected ? 132 : 68 }}
              >
                <svg
                  viewBox="0 0 28 20"
                  className={`transition-all duration-500 ${isSelected ? "h-7 w-9 text-white/70" : "h-[17px] w-[24px] text-white/30"}`}
                >
                  <path
                    d="M14 2c-2 0-3 1.6-3 3.4 0 1 .4 1.7 1.1 2.3L2 14.6C1 15.2 1.6 17 3 17h22c1.4 0 2-1.8 1-2.4L16.9 7.7c.7-.6 1.1-1.3 1.1-2.3C18 3.6 16 2 14 2z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                <div
                  className={`relative -mt-0.5 transition-all duration-500 ${
                    isSelected
                      ? "h-[154px] w-[132px] animate-shirt-sway drop-shadow-[0_18px_34px_rgba(0,0,0,0.65)]"
                      : "h-[92px] w-[68px]"
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
                <span className={`mt-2 text-xs font-semibold tabular-nums ${isSelected ? "text-white" : "text-white/50"}`}>
                  {shirt.year}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div key={selected.year} className="animate-fade-in-up rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl font-bold">{selected.year}</h2>
          {selected.sponsor && (
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs uppercase tracking-wide text-white/50">
              {selected.sponsor}
            </span>
          )}
        </div>

        {selected.design ? (
          <p className="mt-3 text-white/80">{selected.design}</p>
        ) : (
          <p className="mt-3 italic text-white/40">
            Diseño sin documentar todavía — sube tu foto de {selected.year} como{" "}
            <code className="text-white/60">public/camisetas/{selected.year}.jpg</code> y cuéntanos cómo era.
          </p>
        )}

        <div className="mt-4 grid gap-1.5 text-sm text-white/70 sm:grid-cols-2">
          {selected.menWinner && (
            <p>
              🥇 Masculina: <span className="text-white">{selected.menWinner.name}</span> ({selected.menWinner.country}
              {selected.menWinner.time ? ` · ${selected.menWinner.time}` : ""})
            </p>
          )}
          {selected.womenWinner && (
            <p>
              🥇 Femenina: <span className="text-white">{selected.womenWinner.name}</span> ({selected.womenWinner.country}
              {selected.womenWinner.time ? ` · ${selected.womenWinner.time}` : ""})
            </p>
          )}
        </div>

        {selected.notes && <p className="mt-3 text-sm text-white/50">{selected.notes}</p>}
      </div>
    </div>
  );
}
