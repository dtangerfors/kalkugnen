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
      note: "Uthyrning för vecka 3500:- Pengarna insättes på konto: 5217 160 357-7 (SEB), betalas snarast efter vistelsen, märk betalningen med dina initialer.",
    },
    updated: "2026-09-12",
  },
  {
    id: "sophamtning",
    title: "Sophämtning",
    table: {
      head: ["Kärl", "Tömning"],
      rows: [
        ["Mat och restavfall", "Varannan vecka"],
        ["Pappers- och plastförpackningar", "Varannan vecka"],
        ["Ofärgade- och färgade glasförpackningar", "Var fjärde vecka"],
        ["Metallförpackningar och tidningar/returpapper", "Var fjärde vecka"],
      ],
      // TODO: Uppdatera aktuella hämtningsdatum för innevarande år.
      note: "Vid fritidshus sker tömning enligt ovan mellan vecka 20 och vecka 37. Aktuella datum 2027: kommer senare",
    },
    updated: "2026-09-12",
  },
  {
    id: "ovrig-info",
    title: "Övrig info",
    intro: {
      heading: "ÅVC Fårösund",
      body: "Förutom vanligt avfall går det även att lämna betalsopsäckar. Övrigt avfall avgiftsfritt nu mer. Öppettider enligt nedan.",
    },
    table: {
      head: ["Måndag", "Onsdag", "Söndag"],
      rows: [["7-18", "7-18", "9-15"]],
      note: "Gäller endast veckorna 20-37. Övrig tid endast söndagar.",
    },
    updated: "2026-09-12",
  },
];
