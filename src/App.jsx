//TODO: add input for PGN and FEN
//TODO: add stockfish engine and evaluation logic
//TODO: add UI for evaluation and best move suggestions
//TODO: add validation for PGN and FEN input

import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
const App = () => {
  const stockfishEngine = new Worker("/stockfish-18.js");
  const chess = new Chess();
  const chessboardOptions = {
    boardStyle: {
      borderRadius: "4px",
      boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
      width: "400px",
      height: "400px",
    },
  };

  const [position, setPosition] = useState("");
  const [evaluation, setEvaluation] = useState(null);

  useEffect(() => {}, []);

  return (
    <>
      <div className="chessboard-container">
        <Chessboard options={chessboardOptions} />
      </div>
      <input type="text" id="pgn-input" placeholder="Enter PGN" />
    </>
  );
};

export default App;
