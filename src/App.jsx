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
  const chessGameRef = useRef(chess);
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
  const [pgn, setPgn] = useState([]);

  // useEffect(() => {}, []);

  const handlePGNInput = (e) => {
    if (e.key === "Enter") {
      const inputPGN = e.target.value.split("\n");
      setPgn(inputPGN);
      chess.loadPgn(pgn.join("\n"));
      setPosition(chess.fen());
    }
  };

  const handleFENInput = (e) => {
    if (e.key === "Enter") {
      const inputFEN = e.target.value;
      chess.load(inputFEN);
      setPosition(chess.fen());
      console.log(chess.fen());
    }
  };

  return (
    <>
      <div className="chessboard-container">
        <Chessboard position={position} options={chessboardOptions} />
      </div>
      <input
        type="text"
        id="pgn-input"
        placeholder="Enter PGN"
        onKeyPress={(e) => handlePGNInput(e)}
      />
      <button onClick={() => console.log(chess.fen())}>Load PGN</button>
      <input
        type="text"
        id="fen-input"
        placeholder="Enter FEN"
        onKeyPress={(e) => handleFENInput(e)}
      />
    </>
  );
};

export default App;
