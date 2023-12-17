import { Route, Router } from "wouter";
import { Home } from "./pages/Home";
import { DeckView } from "./pages/DeckView";
import { Battle } from "./pages/Battle";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Router base="/react-game-sandbox">
        <Route path="/" component={Home} />
        <Route path="/deck" component={DeckView} />
        <Route path="/battle" component={Battle} />
      </Router>
    </>
  );
}

export default App;
