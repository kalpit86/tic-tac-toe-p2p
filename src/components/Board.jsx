import React from 'react';
import { X, Circle } from 'lucide-react';
import clsx from 'clsx';

export function Board({ board, onSquareClick, isMyTurn, winningSquares }) {
    return (
        <div className="grid grid-cols-3 gap-2 w-full max-w-[300px] aspect-square bg-gray-800 p-2 rounded-xl">
            {board.map((square, i) => (
                <button
                    key={i}
                    onClick={() => onSquareClick(i)}
                    disabled={square !== null || !isMyTurn}
                    className={clsx(
                        "w-full h-full bg-gray-700 rounded-lg flex items-center justify-center text-4xl transition-all duration-200",
                        !square && isMyTurn && "hover:bg-gray-600 cursor-pointer",
                        !square && !isMyTurn && "cursor-not-allowed opacity-50",
                        winningSquares?.includes(i) && "bg-green-900 ring-2 ring-green-500"
                    )}
                >
                    {square === 'X' && <X className="w-12 h-12 text-blue-400" />}
                    {square === 'O' && <Circle className="w-10 h-10 text-red-400" />}
                </button>
            ))}
        </div>
    );
}
