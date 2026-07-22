//TODO: add input for PGN and FEN ------DONE
//TODO: add chessboard display using react-chessboard ------DONE
//TODO: connect chess.js and update chessboard based on pgn and fen input ------DONE
//TODO: add stockfish engine and evaluation logic
//TODO: add UI for evaluation and best move suggestions
//TODO: add validation for PGN and FEN input

import { useState, useEffect, useRef } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import Engine from "./stockfish/engine";

const App = () => {
  const chessGameRef = useRef(new Chess());
  const chessGame = chessGameRef.current;

  const [position, setPosition] = useState(chessGame.fen());
  const [evaluation, setEvaluation] = useState(null);
  const [pgn, setPgn] = useState([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);
  const [fenHistory, setFenHistory] = useState([]);

  useEffect(() => {
    const engineRef = useRef(null);
    if (!engineRef.current) engineRef.current = new Engine();
  }, []);

  const chessboardOptions = {
    boardStyle: {
      borderRadius: "4px",
      boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
      width: "400px",
      height: "400px",
    },
    position: position,
  };
  const buildFenHistory = (history) => {
    const fenHistory = [];
    chessGame.reset();
    fenHistory.push(chessGame.fen());
    history.forEach((move) => {
      chessGame.move(move);
      fenHistory.push(chessGame.fen());
    });
    return fenHistory;
  };

  const handlePGNInput = (e) => {
    if (e.key === "Enter") {
      const inputPGN = e.target.value;
      try {
        //loading the fen
        chessGame.loadPgn(inputPGN);
        const history = chessGame.history();
        console.log("Game history:", chessGame.history());
        //need to clear the board and reset the position to the starting position
        chessGame.reset();
        setPosition(chessGame.fen());
        setCurrentMoveIndex(0);
        const fenHistory = buildFenHistory(history); //building an array with the FENs for each move
        console.log("FEN history:", fenHistory);
        setFenHistory(fenHistory);
      } catch (err) {
        console.error("Invalid PGN:", err);
        alert(
          "Invalid PGN. Example:\n" +
            '[Event "F/S Return Match"]\n' +
            '[Site "Belgrade, Serbia JUG"]\n' +
            '[Date "1992.11.04"]\n' +
            '[Round "29"]\n' +
            '[White "Fischer, Robert J."]\n' +
            '[Black "Spassky, Boris V."]\n' +
            '[Result "1/2-1/2"]\n\n' +
            "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7",
        );
      }
    }
  };

  const handleFENInput = (e) => {
    if (e.key === "Enter") {
      const inputFEN = e.target.value.trim();
      try {
        chessGame.load(inputFEN);
        setPosition(chessGame.fen());
      } catch (err) {
        console.error("Invalid FEN:", err);
        alert(
          "Invalid FEN. Example:\n" +
            "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        );
      }
    }
  };

  const handleNextMove = () => {
    const history = fenHistory;
    if (currentMoveIndex < history.length - 1) {
      const nextMove = history[currentMoveIndex + 1];
      chessGame.load(nextMove);
      setPosition(chessGame.fen());
      setCurrentMoveIndex(currentMoveIndex + 1);
    }
  };

  const handlePreviousMove = () => {
    const history = fenHistory;
    if (currentMoveIndex > 0) {
      const prevMove = history[currentMoveIndex - 1];
      chessGame.load(prevMove);
      setPosition(chessGame.fen());
      setCurrentMoveIndex(currentMoveIndex - 1);
    }
  };
  return (
    <>
      <div className="chessboard-container">
        <Chessboard options={chessboardOptions} />
      </div>
      <input
        type="text"
        id="pgn-input"
        placeholder="Enter PGN"
        onKeyPress={(e) => handlePGNInput(e)}
      />
      <input
        type="text"
        id="fen-input"
        placeholder="Enter FEN"
        onKeyPress={(e) => handleFENInput(e)}
      />
      <button onClick={handlePreviousMove}>Prev</button>
      <button onClick={handleNextMove}>Next</button>
    </>
  );
};

export default App;
