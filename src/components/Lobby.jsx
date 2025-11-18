import React, { useState } from 'react';
import { Copy, ArrowRight, Loader2 } from 'lucide-react';

export function Lobby({ peerId, onHost, onJoin, status }) {
    const [joinId, setJoinId] = useState('');
    const [copied, setCopied] = useState(false);

    const copyId = () => {
        navigator.clipboard.writeText(peerId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-md p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-xl">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Tic-Tac-Toe P2P
            </h1>

            {status === 'connecting' && (
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
                    <p className="text-gray-400">Connecting to opponent...</p>
                </div>
            )}

            {status === 'waiting' && (
                <div className="flex flex-col items-center gap-4 w-full">
                    <div className="flex items-center gap-2 text-yellow-400">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Waiting for opponent to join...</span>
                    </div>

                    <div className="w-full bg-gray-900 p-4 rounded-lg border border-gray-700">
                        <p className="text-sm text-gray-400 mb-2">Share this Game ID:</p>
                        <div className="flex gap-2">
                            <code className="flex-1 bg-black/50 p-3 rounded font-mono text-sm truncate">
                                {peerId}
                            </code>
                            <button
                                onClick={copyId}
                                className="p-3 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                                title="Copy ID"
                            >
                                {copied ? "Copied!" : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {status === 'idle' && (
                <div className="flex flex-col gap-6 w-full">
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-center">Start a New Game</h2>
                        <button
                            onClick={onHost}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-900/20"
                        >
                            Host Game
                        </button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-800 text-gray-400">OR</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-center">Join a Game</h2>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={joinId}
                                onChange={(e) => setJoinId(e.target.value)}
                                placeholder="Enter Host ID"
                                className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                            <button
                                onClick={() => onJoin(joinId)}
                                disabled={!joinId}
                                className="px-6 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-bold transition-colors"
                            >
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
