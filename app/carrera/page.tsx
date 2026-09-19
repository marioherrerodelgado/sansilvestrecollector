import { EARLY_HISTORY, SHIRTS } from "@/data/shirts";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-3 text-xl font-bold text-white">{title}</h2>
      <div className="space-y-3 text-white/70">{children}</div>
    </section>
  );
}

export default function CarreraPage() {
  const winnersDesc = [...SHIRTS].sort((a, b) => b.year - a.year);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">La San Silvestre Vallecana</h1>
        <p className="mt-2 text-white/60">
          Historia, recorrido y récords de la carrera que cada 31 de diciembre despide el año en las calles de
          Madrid.
        </p>
      </header>

      <Section title="Origen">
        <p>
          La carrera nació en 1964, cuando Antonio Sabugueiro y un grupo de amigos organizaron la primera edición:
          apenas 57 corredores, con victoria de Jesús Hurtado (categoría masculina) y María Luisa Ares. Desde
          entonces se disputa cada Nochevieja, con una única excepción: 1969, recordado como &ldquo;el año en
          blanco&rdquo;, cuando la crisis económica obligó a cancelarla.
        </p>
        <p>
          Las mujeres no compitieron oficialmente hasta 1981, año en el que la noruega Grete Waitz se llevó la
          victoria. Desde los años 2000, con la llegada de grandes patrocinadores y de atletas de élite
          internacional, la Vallecana se convirtió en el fenómeno social y deportivo que es hoy: una cita que
          reúne a decenas de miles de corredores populares junto a algunos de los mejores fondistas del mundo.
        </p>
      </Section>

      <Section title="El recorrido">
        <p>
          Son 10 kilómetros. La salida está junto al Santiago Bernabéu, en la calle Concha Espina, desde donde el
          pelotón atraviesa algunas de las vías más reconocibles de Madrid antes de dirigirse hacia el sureste de
          la ciudad. La meta está en el Estadio de Vallecas, en el barrio que da nombre a la carrera desde su
          primera edición.
        </p>
        <p>
          El ambiente es tan de carrera como de fiesta: disfraces, cotillón y música acompañan a corredores
          populares y de élite por igual, hasta el punto de que en 2012 se alcanzó un récord de participación
          cercano a los 40.000 corredores.
        </p>
      </Section>

      <Section title="Récords y datos que la definen">
        <ul className="list-disc space-y-1 pl-5">
          <li>Récord masculino: 26:32, Berihu Aregawi (Etiopía), 2024.</li>
          <li>Récord femenino: 29:54, Brigid Kosgei (Kenia), 2018.</li>
          <li>
            Corredor con más victorias: Isaac Viciosa, con 4 triunfos (2000, 2001, 2002 y 2005), tres de ellas
            consecutivas.
          </li>
          <li>
            Últimos ganadores españoles antes de la última década: Chema Martínez (2003) en masculina y Marta
            Domínguez (2008) en femenina.
          </li>
          <li>
            El regreso del triunfo español: Mohamed Katir en 2021 y Marta García en 2024 (y de nuevo en 2025,
            con doblete y récord nacional).
          </li>
          <li>Sello IAAF Gold Label desde 2019.</li>
          <li>
            Patrocinio técnico: Nike vistió la carrera entre 1999 y 2020; desde 2021 el relevo lo tomó OYSHO
            (Grupo Inditex).
          </li>
        </ul>
      </Section>

      <Section title="Hitos anteriores a 1998">
        <ul className="list-disc space-y-1 pl-5">
          {EARLY_HISTORY.map((item) => (
            <li key={item.year}>
              <span className="font-semibold text-white">{item.year}</span> — {item.text}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Palmarés completo (1998-2025)">
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-white/60">
              <tr>
                <th className="px-3 py-2">Año</th>
                <th className="px-3 py-2">Masculina</th>
                <th className="px-3 py-2">Femenina</th>
              </tr>
            </thead>
            <tbody>
              {winnersDesc.map((s) => (
                <tr key={s.year} className="border-t border-white/10">
                  <td className="px-3 py-2 font-semibold text-white">{s.year}</td>
                  <td className="px-3 py-2">
                    {s.menWinner ? `${s.menWinner.name} (${s.menWinner.country})${s.menWinner.time ? ` · ${s.menWinner.time}` : ""}` : "—"}
                  </td>
                  <td className="px-3 py-2">
                    {s.womenWinner
                      ? `${s.womenWinner.name} (${s.womenWinner.country})${s.womenWinner.time ? ` · ${s.womenWinner.time}` : ""}`
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <p className="text-xs text-white/40">
        Fuentes: Wikipedia (San Silvestre Vallecana), sitio oficial sansilvestrevallecana.com, prensa deportiva
        española (Soy Corredor, El Español) y un repaso de Flashscore sobre el diseño de las camisetas de la
        carrera.
      </p>
    </div>
  );
}
