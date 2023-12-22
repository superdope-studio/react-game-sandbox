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
  turnCount: number;
};

export type GlobalState = {
  currentTurn: "Human" | "AI";
  battleground: GameCard[];
  turnPhase: "Start" | "Main" | "End"
};

export type GameState = {
  humanState: PlayerState;
  aiState: PlayerState;
  globalState: GlobalState;
};

const initialState: GameState = {
  humanState: {
    health: 10,
    energy: 0,
    deck: [],
    hand: [],
    discardPile: [],
    turnCount: 0,
  },
  aiState: {
    health: 10,
    energy: 0,
    deck: [],
    hand: [],
    discardPile: [],
    turnCount: 0,
  },
  globalState: {
    currentTurn: "Human",
    battleground: [],
    turnPhase: "Start"
  }
};

let state: GameState = {
  ...initialState,
};

/**
 * Set up initial game state, shuffle decks, draw cards
 */
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
    },
  };

  startPhase("Human");
};

/**
 * Start turn: set turn phase, set active player, draw 1 card, update energy, increment turn count
 */
export const startPhase = (player: "Human" | "AI") => {
  state = {
    ...state,
    globalState: {
      ...state.globalState,
      turnPhase: "Start",
      currentTurn: player
    }
  }

  if (player === "Human") {
    const { remainingDeck: newPlayerDeck, drawnCards } = drawCards(
      state.humanState.deck,
      1
    );

    const turnCount = state.humanState.turnCount;

    state = {
      ...state,
      humanState: {
        ...state.humanState,
        hand: state.humanState.hand.concat(drawnCards),
        deck: newPlayerDeck,
        turnCount: turnCount + 1,
        energy: turnCount + 1,
      }
    }
  }

  if (player === "AI") {
    const { remainingDeck: newEnemyDeck, drawnCards } = drawCards(
      state.aiState.deck,
      1
    );

    const turnCount = state.aiState.turnCount;
    state = {
      ...state,
      aiState: {
        ...state.aiState,
        hand: state.aiState.hand.concat(drawnCards),
        deck: newEnemyDeck,
        turnCount: turnCount + 1,
        energy: turnCount + 1
      }
    }
  }
}

// Process main phase effects, wait for players to play cards and end their turn
export const mainPhase = () => {
  state = {
    ...state,
    globalState: {
      ...state.globalState,
      turnPhase: "Main",
    }
  }
}

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
      ...state.globalState, currentTurn: "AI"
    }
  };
  startPhase("AI")
  processEnemyTurn();
};

export const processEnemyTurn = (): void => {
  if (state.aiState.hand.length === 0) {
    return;
  }

  // filter out cards that are too expensive to be played
  const validCardsInHand = state.aiState.hand.filter((card) => card.energyCost <= state.aiState.energy)

  const enemyRandomIndex = Math.floor(Math.random() * validCardsInHand.length);
  const playedCard = validCardsInHand[enemyRandomIndex];

  if (!playedCard) {
    //no valid cards, end turn
    startPhase("Human");
    return;
  }

  const newPlayerHealth = state.humanState.health - playedCard.damage;
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
      currentTurn: "Human"
    }
  };

  if (state.humanState.health <= 0) {
    alert("you lose!");
  }

  startPhase("Human")
};

export const cardCanBePlayed = (card: GameCard) => {
  if (state.globalState.currentTurn === "AI") {
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
