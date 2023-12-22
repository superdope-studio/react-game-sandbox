import { GameCard, enemyDeck, playerDeck } from "../data/cards";
import { shuffleDeck, drawCards } from "./helpers";


// TODO - add state for active effects from cards to both
// players and global state

export type PlayerState = {
  health: number;
  energy: number;
  deck: GameCard[];
  hand: GameCard[];
  discardPile: GameCard[];
};

export type GlobalState = {
  currentTurn: "Player" | "Opponent";
  turnCount: number;
  battleground: GameCard[];
};

export type GameState = {
  humanState: PlayerState,
  aiState: PlayerState,
  globalState: GlobalState,
};

const initialState: GameState = {
  humanState: {
    health: 10,
    energy: 10,
    deck: [],
    hand: [],
    discardPile: []
  },
  aiState: {
    health: 10,
    energy: 10,
    deck: [],
    hand: [],
    discardPile: []
  },
  globalState: {
    currentTurn: "Player",
    turnCount: 0,
    battleground: []
  }
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
    humanState: {
      ...initialState.humanState,
      deck: newPlayerDeck,
      hand: newPlayerHand,
    },
    aiState: {
      ...initialState.aiState,
      deck: newEnemyDeck,
      hand: newEnemyHand
    }

  };
};

export const playCard = (cardIndex: number): void => {
  if (cardIndex < 0 || cardIndex >= state.humanState.hand.length) {
    return;
  }

  const card = state.humanState.hand[cardIndex];
  if (!card) {
    return;
  }

  const newPlayerHand = state.humanState.hand.filter(
    (_, index) => index !== cardIndex
  );

  const newBattleground = [...state.globalState.battleground, card];

  const newEnemyHealth = state.aiState.health - card.damage;
  const newPlayerEnergy = state.humanState.energy - card.energyCost;

  const { remainingDeck: newPlayerDeck, drawnCards } = drawCards(
    state.humanState.deck,
    1
  );

  if (drawnCards) {
    newPlayerHand.push(drawnCards[0]);
  }

  // TODO - make a better way to assign changes to state object
  state = {
    ...state,
    humanState: {
      ...state.humanState,
      deck: newPlayerDeck,
      hand: newPlayerHand,
      energy: newPlayerEnergy
    },
    aiState: {
      ...state.aiState,
      health: newEnemyHealth
    },
    globalState: {
      ...state.globalState,
      battleground: newBattleground
    }
  };

  if (state.aiState.health <= 0) {
    alert("you win!");
  }
};

export const endPlayerTurn = (): void => {
  state = {
    ...state, globalState: {
      ...state.globalState, currentTurn: "Opponent"
    }
  };
  processEnemyTurn();
};

export const processEnemyTurn = (): void => {
  if (state.aiState.hand.length === 0) {
    return;
  }

  const enemyRandomIndex = Math.floor(Math.random() * state.aiState.hand.length);
  const playedCard = state.aiState.hand[enemyRandomIndex];

  const newPlayerHealth = state.humanState.health - playedCard.damage;

  // TODO - don't let enemies play cards they can't pay for, no credit card debt allowed
  const newEnemyEnergy = state.aiState.energy - playedCard.energyCost;

  const newEnemyHand = state.aiState.hand.filter(
    (_, index) => index !== enemyRandomIndex
  );

  const newBattleground = [...state.globalState.battleground, playedCard];

  const { remainingDeck: newEnemyDeck, drawnCards } = drawCards(
    state.aiState.deck,
    1
  );

  if (drawnCards.length > 0) {
    newEnemyHand.push(drawnCards[0]);
  }

  state = {
    ...state,
    aiState: {
      ...state.aiState,
      deck: newEnemyDeck,
      hand: newEnemyHand,
      energy: newEnemyEnergy
    },
    humanState: {
      ...state.humanState,
      health: newPlayerHealth
    },
    globalState: {
      ...state.globalState,
      battleground: newBattleground,
      currentTurn: "Player"
    }
  };

  if (state.humanState.health <= 0) {
    alert("you lose!");
  }
};

export const cardCanBePlayed = (card: GameCard) => {
  if (state.globalState.currentTurn === "Opponent") {
    return false;
  }

  if (state.humanState.energy < card.energyCost) {
    return false;
  }

  return true;
};

export const getState = (): GameState => {
  return state;
};
