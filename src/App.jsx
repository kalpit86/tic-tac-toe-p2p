import React from 'react';
import { useGameState } from './hooks/useGameState';
import { Board } from './components/Board';
import { Lobby } from './components/Lobby';
import { RefreshCw, User } from 'lucide-react';

function App() {
  const {
    board,
    isXNext,
    winner,
    myPlayer,
    status,
    peerId,
    hostGame,
    joinGame,
    makeMove,
    resetGame
  } = useGameState();

  const isMyTurn = (isXNext && myPlayer === 'X') || (!isXNext && myPlayer === 'O');
  const gameStatus = winner
    ? (winner === 'DRAW' ? "It's a Draw!" : `${winner === myPlayer ? 'You' : 'Opponent'} Won!`)
    : (isMyTurn ? "Your Turn" : "Opponent's Turn");

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 font-sans">
      {status === 'playing' || (status === 'waiting' && myPlayer === 'X' && false) ? ( // Wait, 'waiting' is handled in Lobby? No, Lobby handles waiting.
        // Actually, if status is 'playing', we show the board.
        // If status is 'finished' (handled by winner state in hook, but hook keeps status 'playing' usually until reset), we show board + result.
        // Let's check hook: resetGame sets status 'playing'. 
        // We should probably have a 'finished' status or just rely on winner.
        <div className="flex flex-col items-center gap-8 w-full max-w-md animate-in fade-in zoom-in duration-300">
          <div className="flex items-center justify-between w-full px-4">
            <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
              <User className="w-4 h-4 text-blue-400" />
              <span className="font-bold">You: {myPlayer}</span>
            </div>
            <div className={`px-4 py-2 rounded-full font-bold ${isMyTurn ? 'bg-green-900 text-green-400' : 'bg-gray-800 text-gray-400'}`}>
              {gameStatus}
            </div>
          </div>

          <Board
            board={board}
            onSquareClick={makeMove}
            isMyTurn={isMyTurn && !winner}
            winningSquares={[]} // TODO: Add winning squares logic to hook if needed
          />

          {winner && (
            <div className="flex flex-col items-center gap-4 animate-in slide-in-from-bottom-4">
              <h2 className="text-3xl font-bold text-center">
                {winner === 'DRAW' ? 'Draw!' : (winner === myPlayer ? 'Victory!' : 'Defeat!')}
              </h2>
              <button
                onClick={resetGame}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-full font-bold transition-all shadow-lg shadow-blue-900/20"
              >
                <RefreshCw className="w-5 h-5" />
                Play Again
              </button>
            </div>
          )}
        </div>
      ) : (
        <Lobby
          peerId={peerId}
          onHost={hostGame}
          onJoin={joinGame}
          status={status}
        />
      )}
    </div>
  );
}

export default App;
