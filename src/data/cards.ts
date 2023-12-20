export type GameCard = {
  title: string;
  energyCost: number;
  damage: number;
  effectApplied?: string;
  type: "Attack" | "Defense" | "Utility";
};

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
