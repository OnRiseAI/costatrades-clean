"use client";

import Link from "next/link";

export function AreasWeServe() {
  const areas = [
    "Marbella",
    "Estepona",
    "Mijas",
    "Fuengirola",
    "Malaga",
    "Sotogrande",
    "Benalmadena",
    "Torremolinos",
    "Benahavis",
    "San Pedro",
    "Calahonda",
    "Nerja",
  ];

  return (
    <section className="bg-white py-16 border-t border-slate-100">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0a1f44] mb-2">
            Areas We Cover
          </h2>
          <p className="text-slate-500">
            Serving the entire Costa del Sol region
          </p>
        </div>

        <nav aria-label="Locations">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-8 max-w-4xl mx-auto text-center md:text-left">
            {areas.map((area, index) => (
              <li key={index}>
                <Link
                  href={`/post-job?postcode=${encodeURIComponent(area)}`}
                  className="text-slate-600 hover:text-[#0a1f44] font-medium transition-colors block py-1"
                >
                  {area}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
