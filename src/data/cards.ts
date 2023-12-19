export type GameCard = {
    title: string;
    description: string;
    energyCost: number;
    damage: number;
    effectApplied?: string;
}

export type ZoneType = {
    title: string;
    description: string;
    isTapped: boolean;
    type: CardType;
}

export enum CardType {
 Resource,
 Creature,
 Equipment,
 Artifact,
 Graveyard
}

export const BattleField: ZoneType[] = [{
    title: "Mana",
    description: 'Area for playing mana',
    isTapped: false,
    type: CardType.Resource,
},
{
    title: "Mana",
    description: 'Area for playing mana',
    isTapped: false,
    type: CardType.Resource,
},
{
    title: "Mana",
    description: 'Area for playing mana',
    isTapped: false,
    type: CardType.Resource,
},
{
    title: "Creature Zone",
    description: 'Area for playing creatures',
    isTapped: false,
    type: CardType.Creature,
},
{
    title: "Creature Zone",
    description: 'Area for playing creatures',
    isTapped: false,
    type: CardType.Creature,
},
{
    title: "Creature Zone",
    description: 'Area for playing creatures',
    isTapped: false,
    type: CardType.Creature,
},
{
    title: "Equipment",
    description: 'Area for playing equipment',
    isTapped: false,
    type: CardType.Equipment,
},
]

export const playerDeck: GameCard[] = [{
    title: "Smash",
    description: "Smash your enemy",
    energyCost: 2,
    damage: 2,
}, {
    title: "Smoke Screen",
    description: "Hide in the smoke",
    energyCost: 2,
    damage: 0,
    effectApplied: "Hidden"
},{
    title: "Smoke Screen",
    description: "Hide in the smoke",
    energyCost: 2,
    damage: 0,
    effectApplied: "Hidden"
},{
    title: "Smoke Screen",
    description: "Hide in the smoke",
    energyCost: 2,
    damage: 0,
    effectApplied: "Hidden"
},{
    title: "Smoke Screen",
    description: "Hide in the smoke",
    energyCost: 2,
    damage: 0,
    effectApplied: "Hidden"
},{
    title: "Smoke Screen",
    description: "Hide in the smoke",
    energyCost: 2,
    damage: 0,
    effectApplied: "Hidden"
},{
    title: "Smoke Screen",
    description: "Hide in the smoke",
    energyCost: 2,
    damage: 0,
    effectApplied: "Hidden"
}]