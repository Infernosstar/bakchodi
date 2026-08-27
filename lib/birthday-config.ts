// ─────────────────────────────────────────────────────────────
// Edit everything here to personalize the ride. No other file needed.
// ─────────────────────────────────────────────────────────────

export const birthday = {
  // Her name and (optional) age. Leave age as null to hide it.
  name: "Kuchu Puchu",
  age: 85 as number | null,

  // Text on the start screen
  tagline: "Bhaad m Chalte h kuchu puchu",
  startButton: "Start the ride",

  // Text on the finish screen
  finishTitle: "pahunch gaye kya kuchu puchu",
  finishMessage:
    "Congratulations! You made it to the end of the ride ab to ladki patwaa de",
  signature: "With all my love,\n— Your handsome friend",
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
    place: "Pali",
    region: "Rajasthan",
    km: 0,
    caption: "janam le liya, ab to chalte h kuchu puchu",
    src: "/photos/photo1.jpg",
  },
  {
    place: "some random function",
    region: "cutie world",
    km: 125,
    caption: "ole le le kuchu puchu",
    src: "/photos/photo2.jpg",
  },
  {
    place: "Barbie world",
    region: "south",
    km: 560,
    caption: "I am a barbie girl in my south indian baddie world",
    src: "/photos/photo3.jpg",
  },
  {
    place: "lack of heart",
    region: "somewhere in the world",
    km: 620,
    caption: "waah kya muskuraahat hai kuchu puchu",
    src: "/photos/photo4.jpg",
  },
  {
    place: "hotel",
    region: "somewhere in India",
    km: 1300,
    caption: "competition comes , but kuchu puchu is the best and worst",
    src: "/photos/photo5.jpg",
  },
  {
    place: "Chilli Snow world",
    region: "Manitoba",
    km: 1900,
    caption: "In the snow cold but hotter like chilli",
    src: "/photos/photo6.jpg",
  },
  {
    place: "Random College",
    region: "Ontario",
    km: 3200,
    caption: "College life is the best life, but kuchu puchu could not live it fully",
    src: "/photos/photo7.jpg",
  },
  {
    place: "Cameraman",
    region: "somewhere in tamilnadu",
    km: 3330,
    caption: "Baba baba black sheep",
    src: "/photos/photo8.jpg",
  },
  {
    place: "The second final stop",
    region: "Somwhere in bengaluru",
    km: 3800,
    caption: "THe current final biproduct of the journey, but the memories will last forever.",
    src: "/photos/photo9.jpg",
  },
  {
    place: "Biodata",
    region: "Muheheheheheheheheheehheeheheheheheheheheheheheheheheheheheheheheheheheheheheheheheheheheheheheheheheheh",
    km: 4000,
    caption: "Kuchu puchu tera biodata to ban gyaa h , ab mere liye ek pyaari si ladki dhoondh de",
    src: "/photos/final.jpg",
  },
]
