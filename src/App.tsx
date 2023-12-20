import { Route, Router } from "wouter";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import {
  DndProvider,
  TouchTransition,
  MouseTransition,
} from "react-dnd-multi-backend";
import { Home } from "./pages/Home";
import { DeckView } from "./pages/DeckView";
import { Battle } from "./pages/Battle";
import { Header } from "./components/Header";

import { Preview } from "react-dnd-preview";
import { GameStateProvider } from "./contexts/GameStateContext";
import { CardComponent } from "./components/Card";

const generatePreview = ({ itemType, item, style }: any) => {
  return (
    <div className="item-list__item" style={style}>
      <CardComponent gameCard={item.gameCard} index={item.index} />
    </div>
  );
};

export const HTML5toTouch = {
  backends: [
    {
      id: "html5",
      backend: HTML5Backend,
      transition: MouseTransition,
    },
    {
      id: "touch",
      backend: TouchBackend,
      options: {
        enableMouseEvents: true,
        scrollAngleRanges: [
          { start: 300 },
          { end: 60 },
          { start: 120, end: 240 },
        ],
      },
      preview: true,
      transition: TouchTransition,
    },
  ],
};

function App() {
  return (
    <>
      <DndProvider options={HTML5toTouch}>
        <GameStateProvider>
          <Header />
          <Preview generator={generatePreview} />
          <Router base="/react-game-sandbox">
            <Route path="/" component={Home} />
            <Route path="/deck" component={DeckView} />
            <Route path="/battle" component={Battle} />
          </Router>
        </GameStateProvider>
      </DndProvider>
    </>
  );
}

export default App;
