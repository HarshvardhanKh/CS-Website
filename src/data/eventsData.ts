export interface EventItem {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  tag: string;
}

export const eventsData: EventItem[] = [
  {
    id: 1,
    title: "Fragments of Light: Impressionist Masters",
    description:
      "A sweeping survey of works from Monet, Renoir, and Pissarro that redefines how we experience the play of natural light.",
    date: "MAR 01 - MAY 18, 2025",
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&auto=format&fit=crop",
    tag: "Workshop",
  },
  {
    id: 2,
    title: "Architecture of Dreams: Brutalist Visions",
    description:
      "Concrete poetry in three dimensions - explore monumental structures that challenged the very notion of shelter and society.",
    date: "FEB 14 - APR 27, 2025",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&auto=format&fit=crop",
    tag: "Seminar",
  },
  {
    id: 3,
    title: "Colour Fields: Abstract Expressionism",
    description:
      "Rothko, de Kooning, and Pollock in dialogue - a meditation on emotion, scale, and the raw language of paint.",
    date: "JAN 09 - MAR 30, 2025",
    image:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&auto=format&fit=crop",
    tag: "Competition",
  },
];
