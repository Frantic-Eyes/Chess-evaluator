Todo-
✅ PGN/FEN input
✅ Chessboard display
✅ Move navigation (prev/next)
✅ Stockfish evaluation
✅ Eval bar (rough)
⬜ Move annotations (blunder, miss, excellent etc.)
⬜ Move list display
⬜ Input validation

book moves- use lichess[https://lichess.org/api#description/clients] and equine[https://github.com/devjiwonchoi/equine]
Best, Excellent, Good - stockfish multiPV to select top, second and third lines
inaccuracy - not on stockfish lines and negatively impacts eval
miss- missed checkmate, can use the possibleMate value from engine message
blunder- drop in eval because, need to define specific numbers before coding.
brilliant - A best, excellent or good move that is a sacrifice and doesnt cause a drop in eval.
[ ] need to create utility function for annotations
[ ] annotation assigning on pgnLoad
