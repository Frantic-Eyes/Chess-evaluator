type EngineMessage = {
  uciMessage: string;
  bestMove?: string;
  ponder?: string;
  positionEvaluation?: string;
  possibleMate?: string;
  pv?: string;
  depth?: number;
};

export default class Engine {
  stockfish: Worker;
  isReady: boolean = false;
  private messageCallbacks: ((messageData: EngineMessage) => void)[] = [];

  constructor() {
    // 1. Fresh worker instance allocated exclusively to this Engine instantiation
    this.stockfish = new Worker("/stockfish-18.js");

    // 2. Setup a single orchestrating event listener
    this.stockfish.addEventListener("message", (e) => {
      const parsedData = this.transformSFMessageData(e);

      // Manage internal ready state
      if (parsedData.uciMessage === "readyok") {
        this.isReady = true;
      }

      // Broadcast events out to all registered observers
      this.messageCallbacks.forEach((callback) => callback(parsedData));
    });

    this.init();
  }

  private transformSFMessageData(e: MessageEvent<string>): EngineMessage {
    const uciMessage = e?.data ?? e;
    return {
      uciMessage,
      bestMove: uciMessage.match(/bestmove\s+(\S+)/)?.[1],
      ponder: uciMessage.match(/ponder\s+(\S+)/)?.[1],
      positionEvaluation: uciMessage.match(/cp\s+(\S+)/)?.[1],
      possibleMate: uciMessage.match(/mate\s+(\S+)/)?.[1],
      pv: uciMessage.match(/ pv\s+(.*)/)?.[1],
      depth: Number(uciMessage.match(/ depth\s+(\S+)/)?.[1] ?? 0),
    };
  }

  init() {
    this.stockfish.postMessage("uci");
    this.stockfish.postMessage("isready");
  }

  // Safe subscription method that won't overwrite other core listeners
  onMessage(callback: (messageData: EngineMessage) => void) {
    this.messageCallbacks.push(callback);
  }

  evaluatePosition(fen: string, depth = 12) {
    if (depth > 24) depth = 24;
    this.stockfish.postMessage(`position fen ${fen}`);
    this.stockfish.postMessage(`go depth ${depth}`);
  }

  stop() {
    this.stockfish.postMessage("stop");
  }

  terminate() {
    this.isReady = false;
    this.messageCallbacks = [];
    this.stockfish.postMessage("quit");
    this.stockfish.terminate(); // Completely dismantle worker thread on component unmount
  }
}
