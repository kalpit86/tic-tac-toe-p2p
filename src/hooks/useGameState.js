import { useState, useEffect, useCallback } from 'react';
import { peerManager } from '../lib/peer';

const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

export function useGameState() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [myPlayer, setMyPlayer] = useState(null); // 'X' (Host) or 'O' (Guest)
    const [status, setStatus] = useState('idle'); // idle, connecting, playing, finished
    const [winner, setWinner] = useState(null);
    const [peerId, setPeerId] = useState(null);
    const [opponentId, setOpponentId] = useState(null);

    const checkWinner = useCallback((squares) => {
        for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
            const [a, b, c] = WINNING_COMBINATIONS[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }, []);

    const resetGame = useCallback(() => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
        setStatus('playing');
    }, []);

    const handleData = useCallback((data) => {
        if (data.type === 'MOVE') {
            setBoard(prev => {
                const newBoard = [...prev];
                newBoard[data.index] = data.player;
                return newBoard;
            });
            setIsXNext(data.player === 'O'); // If O moved, X is next
        } else if (data.type === 'RESET') {
            resetGame();
        }
    }, [resetGame]);

    useEffect(() => {
        peerManager.init((id) => {
            setPeerId(id);
        });

        peerManager.on('onConnect', (connId) => {
            setOpponentId(connId);
            setStatus('playing');
            // If I am the host (I didn't initiate the connection, but wait, peerjs connection is symmetric once open)
            // Actually, we need to decide who is X and who is O.
            // Usually Host is X.
            // If I have setMyPlayer('X') already, then I am X.
        });

        peerManager.on('onData', handleData);

        peerManager.on('onClose', () => {
            setStatus('idle');
            setOpponentId(null);
            setMyPlayer(null);
            resetGame();
            alert('Opponent disconnected');
        });

        return () => {
            // Cleanup?
        };
    }, [handleData, resetGame]);

    const hostGame = () => {
        setMyPlayer('X');
        setStatus('waiting'); // Waiting for opponent
    };

    const joinGame = (hostId) => {
        setMyPlayer('O');
        setStatus('connecting');
        peerManager.connect(hostId);
    };

    const makeMove = (index) => {
        if (board[index] || winner || status !== 'playing') return;

        // Check turn
        const isMyTurn = (isXNext && myPlayer === 'X') || (!isXNext && myPlayer === 'O');
        if (!isMyTurn) return;

        const newBoard = [...board];
        newBoard[index] = myPlayer;
        setBoard(newBoard);
        setIsXNext(!isXNext);

        const gameWinner = checkWinner(newBoard);
        if (gameWinner) {
            setWinner(gameWinner);
        } else if (!newBoard.includes(null)) {
            setWinner('DRAW');
        }

        peerManager.send({ type: 'MOVE', index, player: myPlayer });
    };

    const triggerReset = () => {
        resetGame();
        peerManager.send({ type: 'RESET' });
    };

    return {
        board,
        isXNext,
        winner,
        myPlayer,
        status,
        peerId,
        opponentId,
        hostGame,
        joinGame,
        makeMove,
        resetGame: triggerReset
    };
}
