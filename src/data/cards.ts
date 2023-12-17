export type GameCard = {
    title: string;
    description: string;
    energyCost: number;
    damage: number;
    effectApplied?: string;
}

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