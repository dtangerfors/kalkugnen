export type InfoTable = {
  head: string[];
  rows: string[][];
  /** Optional note rendered below the table, spanning all columns. */
  note?: string;
};

export type InfoPost = {
  id: string;
  title: string;
  /** Optional intro shown above the table. */
  intro?: {
    heading?: string;
    body: string;
  };
  table?: InfoTable;
  /** ISO date (YYYY-MM-DD) of the last content update. */
  updated: string;
};

/**
 * Static info posts shown on the dashboard.
 *
 * These previously came from a WordPress backend that is no longer running.
 * Edit the content here — this is the single source of truth.
 */
export const infoPosts: InfoPost[] = [
  {
    id: "hyra",
    title: "Hyra",
    table: {
      head: ["Antal veckor", "Vuxen", "Barn"],
      rows: [
        ["En vecka", "300 kr", "100 kr"],
        ["Upp till två veckor", "400 kr", "150 kr"],
        ["Två veckor", "500 kr", "200 kr"],
      ],
      note: "Uthyrning för vecka 3500:- Pengarna insättes på konto: 5217 167 0357 77 (SEB), senast samma år.",
    },
    updated: "2026-09-10",
  },
  {
    id: "sophamtning",
    title: "Sophämtning",
    table: {
      head: ["Hämtning", "Period", "Tisdag"],
      rows: [
        ["Brännbart", "14-dag", "Udda v"],
        ["Kompost", "14-dag", "Jämn v"],
      ],
      // TODO: Uppdatera aktuella hämtningsdatum för innevarande år.
      note: "Aktuella datum 2022: 28 jun, 12 jul, 26 jul, 9 aug, 23 aug och 6 sep",
    },
    updated: "2026-09-10",
  },
  {
    id: "ovrig-info",
    title: "Övrig info",
    intro: {
      heading: "ÅVC Fårösund",
      body: "Förutom vanligt avfall går det även att lämna betalsopsäckar. Grovavfall lämnas mot avgift, 50 kr (personbil) eller 100 kr (+släpvagn). Öppettider enligt nedan.",
    },
    table: {
      head: ["Måndag", "Torsdag", "Lördag"],
      rows: [["7-18", "7-15/18", "9-15"]],
    },
    updated: "2026-09-10",
  },
];
