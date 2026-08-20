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
    place: "Anya palace",
    region: "British Columbia",
    km: 125,
    caption: "princess of the house, queen of our hearts.",
    src: "/photos/02-toddler.jpg",
  },
  {
    place: "pinky lake",
    region: "Alberta",
    km: 560,
    caption: "pink dress, pink lake, and a pink sunset.",
    src: "/photos/03-pink-dress.jpg",
  },
  {
    place: "Palace",
    region: "Alberta",
    km: 620,
    caption: "birthday cake, candles, and a wish for the future.",
    src: "/photos/04-birthday-cake.jpg",
  },
  {
    place: "Strawberry Island",
    region: "Saskatchewan",
    km: 1300,
    caption: "eat strawberrys, make strawberry memories, and share strawberry smiles.",
    src: "/photos/strawberry.jpg",
  },
  {
    place: "vampire palace",
    region: "Manitoba",
    km: 1900,
    caption: "Spooky creatures, scary stories, and a night of frightful fun.",
    src: "/photos/vampire.jpg",
  },
  {
    place: "Aazad Hind",
    region: "Ontario",
    km: 3200,
    caption: "Aazad Hind, a place of freedom, courage, and unity.",
    src: "/photos/independent.jpg",
  },
  {
    place: "Aanya palace",
    region: "Ontario",
    km: 3330,
    caption: "I am journalist aanya with cameraman aanya jain",
    src: "/photos/cameraman.jpg",
  },
  {
    place: "The final stop",
    region: "Québec",
    km: 3800,
    caption: "THe current final biproduct of the journey, but the memories will last forever.",
    src: "/photos/final.jpg",
  },
]
