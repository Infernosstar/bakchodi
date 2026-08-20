// ─────────────────────────────────────────────────────────────
// Edit everything here to personalize the ride. No other file needed.
// ─────────────────────────────────────────────────────────────

export const birthday = {
  // Her name and (optional) age. Leave age as null to hide it.
  name: "Aanya",
  age: null as number | null,

  // Text on the start screen
  tagline: "Hop on — we're pedalling across life to celebrate you!",
  startButton: "Start the ride",

  // Text on the finish screen
  finishTitle: "You made it!",
  finishMessage:
    "One big beautiful ride, one wonderful you. Thanks for every mile we've shared — happy birthday!",
  signature: "With all my love,\n— Your friend",
}

// Each checkpoint = one Canadian stop = one photo.
// When you upload photos, set `src` to the image path (e.g. "/photos/banff.jpg").
// Leave `src` empty ("") to show a cute placeholder frame instead.
// Add or remove stops freely — the ride adjusts automatically.
export type Checkpoint = {
  place: string // town/city
  region: string // province / area
  km: number // odometer reading shown when we arrive
  caption: string // one-line memory / birthday note
  src: string // photo path, or "" for a placeholder
}

export const checkpoints: Checkpoint[] = [
  {
    place: "Start point",
    region: "Where it all began",
    km: 0,
    caption: "Where the ride begins — wheels down by the Pacific.",
    src: "/photos/01-newborn.jpg",
  },
  {
    place: "Whistler",
    region: "British Columbia",
    km: 125,
    caption: "Up through the mountains, cheeks pink from the climb.",
    src: "/photos/02-toddler.jpg",
  },
  {
    place: "Lake Louise",
    region: "Alberta",
    km: 560,
    caption: "Turquoise water and the biggest smile.",
    src: "/photos/03-pink-dress.jpg",
  },
  {
    place: "Banff",
    region: "Alberta",
    km: 620,
    caption: "Pine air, tall peaks, and a well-earned snack.",
    src: "/photos/04-birthday-cake.jpg",
  },
  {
    place: "Saskatoon",
    region: "Saskatchewan",
    km: 1300,
    caption: "Golden prairies rolling on forever.",
    src: "",
  },
  {
    place: "Winnipeg",
    region: "Manitoba",
    km: 1900,
    caption: "Halfway hugs at the heart of the country.",
    src: "",
  },
  {
    place: "Toronto",
    region: "Ontario",
    km: 3200,
    caption: "Big city lights, even bigger laughs.",
    src: "",
  },
  {
    place: "Niagara Falls",
    region: "Ontario",
    km: 3330,
    caption: "Mist on our faces, wonder in your eyes.",
    src: "",
  },
  {
    place: "Montréal",
    region: "Québec",
    km: 3800,
    caption: "Cobblestones, croissants, and the finish line kiss.",
    src: "",
  },
]
