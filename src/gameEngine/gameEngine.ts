import { GameCard, enemyDeck, playerDeck } from "../data/cards";
import { shuffleDeck, drawCards } from "./helpers";

export type GameState = {
  playerHealth: number;
  playerEnergy: number;
  enemyHealth: number;
  enemyEnergy: number;
  playerTurn: boolean;
  playerHand: GameCard[];
  playerDeck: GameCard[];
  enemyHand: GameCard[];
  enemyDeck: GameCard[];
  battleground: GameCard[];
};

const initialState: GameState = {
  playerHealth: 10,
  playerEnergy: 10,
  enemyHealth: 10,
  enemyEnergy: 10,
  playerTurn: true,
  playerHand: [],
  playerDeck,
  enemyDeck,
  enemyHand: [],
  battleground: [],
};

let state: GameState = {
  ...initialState,
};

export const startGame = (): void => {
  const startingCards = 3;

  const shuffledPlayerDeck = shuffleDeck(playerDeck);
  const shuffledEnemyDeck = shuffleDeck(enemyDeck);

  const { remainingDeck: newPlayerDeck, drawnCards: newPlayerHand } = drawCards(
    shuffledPlayerDeck,
    startingCards
  );
  const { remainingDeck: newEnemyDeck, drawnCards: newEnemyHand } = drawCards(
    shuffledEnemyDeck,
    startingCards
  );

  state = {
    ...initialState,
    playerDeck: newPlayerDeck,
    playerHand: newPlayerHand,
    enemyDeck: newEnemyDeck,
    enemyHand: newEnemyHand,
  };
};

export const playCard = (cardIndex: number): void => {
  if (cardIndex < 0 || cardIndex >= state.playerHand.length) {
    return;
  }

  const card = state.playerHand[cardIndex];
  if (!card) {
    return;
  }

  const newPlayerHand = state.playerHand.filter(
    (_, index) => index !== cardIndex
  );

  const newBattleground = [...state.battleground, card];

  const newEnemyHealth = state.enemyHealth - card.damage;
  const newPlayerEnergy = state.playerEnergy - card.energyCost;

  const { remainingDeck: newPlayerDeck, drawnCards } = drawCards(
    state.playerDeck,
    1
  );

  if (drawnCards) {
    newPlayerHand.push(drawnCards[0]);
  }

  state = {
    ...state,
    playerDeck: newPlayerDeck,
    playerHand: newPlayerHand,
    battleground: newBattleground,
    enemyHealth: newEnemyHealth,
    playerEnergy: newPlayerEnergy,
  };

  if (state.enemyHealth <= 0) {
    alert("you win!");
  }
};

export const endTurn = (): void => {
  state = { ...state, playerTurn: false };
  processEnemyTurn();
};

export const processEnemyTurn = (): void => {
  if (state.enemyHand.length === 0) {
    return;
  }

  const enemyRandomIndex = Math.floor(Math.random() * state.enemyHand.length);
  const playedCard = state.enemyHand[enemyRandomIndex];

  const newPlayerHealth = state.playerHealth - playedCard.damage;
  const newEnemyEnergy = state.enemyEnergy - playedCard.energyCost;

  const newEnemyHand = state.enemyHand.filter(
    (_, index) => index !== enemyRandomIndex
  );

  const newBattleground = [...state.battleground, playedCard];

  const { remainingDeck: newEnemyDeck, drawnCards } = drawCards(
    state.enemyDeck,
    1
  );

  if (drawnCards.length > 0) {
    newEnemyHand.push(drawnCards[0]);
  }

  state = {
    ...state,
    enemyDeck: newEnemyDeck,
    enemyHand: newEnemyHand,
    battleground: newBattleground,
    playerHealth: newPlayerHealth,
    enemyEnergy: newEnemyEnergy,
    playerTurn: true,
  };

  if (state.playerHealth <= 0) {
    alert("you lose!");
  }
};

export const cardCanBePlayed = (card: GameCard) => {
  if (!state.playerTurn) {
    return false;
  }

  if (state.playerEnergy < card.energyCost) {
    return false;
  }

  return true;
};

export const getState = (): GameState => {
  return state;
};
