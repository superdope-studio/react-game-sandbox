export type GameCard = {
  title: string;
  energyCost: number;
  damage: number;
  effectApplied?: string;
  type: "Attack" | "Defense" | "Utility";
};

export type GameDeck = {
  id: number;
  title: string;
  cards: GameCard[];
};

export const exampleDecks: GameDeck[] = [
  {
    id: 1,
    title: 'Attack Deck',
    cards: [
      {
        title: "Flame Jet",
        damage: 4,
        energyCost: 3,
        type: "Attack",
      },
      {
        title: "Gear Strike",
        damage: 3,
        energyCost: 2,
        type: "Attack",
      },
      {
        title: "Steam Blast",
        damage: 5,
        energyCost: 4,
        type: "Attack",
      },
      {
        title: "Bolt Throw",
        damage: 2,
        energyCost: 1,
        type: "Attack",
      },
      {
        title: "Cog Barrage",
        damage: 6,
        energyCost: 5,
        type: "Attack",
      },
    ],
  },
  {
    id: 1,
    title: 'Defense Deck',
    cards: [
      {
        title: "Flame Jet",
        damage: 4,
        energyCost: 3,
        type: "Attack",
      },
      {
        title: "Gear Strike",
        damage: 3,
        energyCost: 2,
        type: "Attack",
      },
      {
        title: "Steam Blast",
        damage: 5,
        energyCost: 4,
        type: "Attack",
      },
      {
        title: "Bolt Throw",
        damage: 2,
        energyCost: 1,
        type: "Attack",
      },
      {
        title: "Cog Barrage",
        damage: 6,
        energyCost: 5,
        type: "Attack",
      },
    ],
  },
]

export const playerDeck: GameCard[] = [
  {
    title: "Flame Jet",
    damage: 4,
    energyCost: 3,
    type: "Attack",
  },
  {
    title: "Gear Strike",
    damage: 3,
    energyCost: 2,
    type: "Attack",
  },
  {
    title: "Steam Blast",
    damage: 5,
    energyCost: 4,
    type: "Attack",
  },
  {
    title: "Bolt Throw",
    damage: 2,
    energyCost: 1,
    type: "Attack",
  },
  {
    title: "Cog Barrage",
    damage: 6,
    energyCost: 5,
    type: "Attack",
  },
];

export const enemyDeck: GameCard[] = [
  {
    title: "Flame Jet",
    damage: 4,
    energyCost: 3,
    type: "Attack",
  },
  {
    title: "Gear Strike",
    damage: 3,
    energyCost: 2,
    type: "Attack",
  },
  {
    title: "Steam Blast",
    damage: 5,
    energyCost: 4,
    type: "Attack",
  },
  {
    title: "Bolt Throw",
    damage: 2,
    energyCost: 1,
    type: "Attack",
  },
  {
    title: "Cog Barrage",
    damage: 6,
    energyCost: 5,
    type: "Attack",
  },
];
