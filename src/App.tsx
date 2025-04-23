import React from "react";
import { WordleGame } from "./WordleGame";

const App: React.FC = () => {
  return (
    <div style={{ padding: 20 }}>
      <h1>Wordle Clone</h1>
      <WordleGame />
    </div>
  );
};

export default App;
