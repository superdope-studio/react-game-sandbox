import { Player } from "./Player";

export class Card {
    energyCost: number;
    damage: number;

    constructor(energyCost: number, damage: number) {
        this.energyCost = energyCost;
        this.damage = damage;
    }

    resolveEffect(source: Player, target: Player) {
        // add validation
        source.spendEnergy(this.energyCost);
        target.takeDamage(this.damage);
    }
}