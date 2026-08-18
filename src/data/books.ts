// Language code mapping for IDs
const LANG_CODES: Record<string, string> = {
  English: "en",
  French: "fr",
};

// Generate language-coded ID (e.g., "fr1", "en2")
const generateId = (language: string, index: number) => {
  return `${LANG_CODES[language] || "en"}${index}`;
};

const MOCK_BOOKS = [
  {
    id: generateId("French", 1), // "fr1"
    title: "Le Petit Prince",
    author: "Antoine de Saint-Exupéry",
    language: "French",
    chapters: 27,
    level: "Intermediate",
    color: "from-violet-400 to-indigo-500",
    description: "A young prince travels across planets, meeting eccentric characters. A timeless tale of childhood, love, and loss.",
    featured: true,
    content: [
      "Once when I was six years old I saw a magnificent picture in a book, called True Stories from Nature, about the primeval forest. It was a picture of a boa constrictor in the act of swallowing an animal.",
      "I pondered deeply, then, over the adventures of the jungle. And after some work with a colored pencil I succeeded in making my first drawing. My Drawing Number One. It looked like this:",
      "I showed my masterpiece to the grown-ups and asked them whether the drawing frightened them. But they always answered: 'Frighten? Why should any one be frightened by a hat?'",
    ],
  },
  {
    id: generateId("English", 1), // "en1"
    title: "The Old Man and the Sea",
    author: "Ernest Hemingway",
    language: "English",
    chapters: 1,
    level: "Intermediate",
    color: "from-cyan-400 to-blue-500",
    description: "An aging fisherman struggles with a giant marlin in the Gulf Stream.",
    featured: false,
    content: [
      "He was an old man who fished alone in a skiff in the Gulf Stream and he had gone eighty-four days now without taking a fish.",
      "In the first forty days a boy had been with him. But after forty days without a fish the boy's parents had told him that the old man was now definitely and finally salao, which is the worst form of unlucky.",
      "The old man was thin and gaunt with deep wrinkles in the back of his neck. The brown blotches of the benevolent skin cancer the sun brings from its reflection on the tropic sea were on his cheeks.",
    ],
  },
  {
    id: generateId("English", 2), // "en2"
    title: "Animal Farm",
    author: "George Orwell",
    language: "English",
    chapters: 10,
    level: "Beginner",
    color: "from-emerald-400 to-teal-500",
    description: "Animals overthrow their farmer and attempt to run the farm themselves in this powerful political fable.",
    featured: false,
    content: [
      "Mr. Jones, of the Manor Farm, had locked the hen-houses for the night, but was too drunk to remember to shut the pop-holes.",
      "With the ring of light from his lantern dancing from side to side, he lurched across the yard, kicked off his boots at the back door, drew himself a last glass of beer from the barrel in the scullery, and made for bed.",
      "Already Mrs. Jones was snoring. The animals gathered in the big barn.",
    ],
  },
  {
    id: generateId("French", 2), // "fr2"
    title: "Les Misérables (Extraits)",
    author: "Victor Hugo",
    language: "French",
    chapters: 12,
    level: "Advanced",
    color: "from-rose-400 to-pink-500",
    description: "Selected chapters from Hugo's sweeping epic of justice, redemption, and revolution in 19th century France.",
    featured: false,
    content: [
      "En 1815, M. Charles-François-Bienvenu Myriel était évêque de Digne. C'était un vieillard d'environ soixante-quinze ans.",
      "Il occupait le siège de Digne depuis 1806. Quoique il eût perdu, dans le courant de cette année, son titre de baron et de pair, il n'en était pas moins resté évêque.",
      "M. Myriel était fils d'un conseiller au parlement d'Aix; rite de sa carrière, il se trouva, comme c'était l'usage, marié de bonne heure.",
    ],
  },
  {
    id: generateId("English", 3), // "en3"
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    language: "English",
    chapters: 9,
    level: "Intermediate",
    color: "from-amber-400 to-orange-500",
    description: "A mysterious millionaire, a lost love, and the decadent glamour of New York in the Roaring Twenties.",
    featured: false,
    content: [
      "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.",
      "'Whenever you feel like criticizing any one,' he told me, 'just remember that all the people in this world haven't had the advantages that you've had.'",
      "He didn't say any more, but we've always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that.",
    ],
  },
  {
    id: generateId("French", 3), // "fr3"
    title: "Candide",
    author: "Voltaire",
    language: "French",
    chapters: 30,
    level: "Intermediate",
    color: "from-purple-400 to-fuchsia-500",
    description: "A young optimist travels the world encountering war, disaster, and absurdity in this razor-sharp satirical novella.",
    featured: false,
    content: [
      "Il y avait en Westphalie, dans le château de M. le baron de Thunder-ten-tronckh, un jeune garçon à qui la nature avait donné les mœurs les plus douces.",
      "Sa physionomie annonçait son âme. Il avait le jugement assez droit, avec l'esprit le plus simple; c'est, je crois, pour cette raison qu'on le nommait Candide.",
      "Les anciens domestiques de la maison soupçonnaient qu'il était fils de la sœur de monsieur le baron et d'un bon et honnête gentilhomme du voisinage.",
    ],
  },
  {
    id: generateId("English", 4), // "en4"
    title: "The Pearl",
    author: "John Steinbeck",
    language: "English",
    chapters: 6,
    level: "Beginner",
    color: "from-lime-400 to-green-500",
    description: "A poor pearl diver finds a magnificent pearl and dreams of a better life, only to discover its dark consequences.",
    featured: false,
    content: [
      "Kino awakened in the near dark. The stars still shone and the day had drawn only a pale wash of light in the lower sky to the east.",
      "The roosters had been crowing for some time and the early pigs were already beginning their ceaseless turning of twigs and bits of wood to see whether anything eatable had been overlooked.",
      "Outside the brush house in the tuna clump, a covey of little birds chattered and flurried their wings, trying to get the dew off them before the sun dried them.",
    ],
  },
  {
    id: generateId("French", 4), // "fr4"
    title: "L'Étranger",
    author: "Albert Camus",
    language: "French",
    chapters: 11,
    level: "Intermediate",
    color: "from-sky-400 to-cyan-500",
    description: "A detached young man navigates grief, a trial, and the absurdity of modern existence in sun-drenched Algeria.",
    featured: false,
    content: [
      "Aujourd'hui, maman est morte. Ou peut-être hier, je ne sais pas.",
      "J'ai reçu un télégramme de l'asile : « Mère décédée. Enterrement demain. Sentiments distingués. »",
      "Ça ne veut rien dire. C'était peut-être hier. L'asile de vieillards est à Marengo, à quatre-vingts kilomètres d'Alger.",
    ],
  },
];

export type Book = (typeof MOCK_BOOKS)[number];
export default MOCK_BOOKS;