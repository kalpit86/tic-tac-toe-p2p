import Peer from 'peerjs';

class PeerManager {
    constructor() {
        this.peer = null;
        this.conn = null;
        this.callbacks = {
            onData: null,
            onConnect: null,
            onClose: null,
        };
    }

    init(onOpen) {
        // Clean up previous instance if exists
        if (this.peer) {
            this.peer.destroy();
        }

        const config = {
            host: import.meta.env.VITE_PEER_HOST || undefined,
            port: import.meta.env.VITE_PEER_PORT ? parseInt(import.meta.env.VITE_PEER_PORT) : undefined,
            path: import.meta.env.VITE_PEER_PATH || undefined,
            key: import.meta.env.VITE_PEER_KEY || undefined,
            secure: import.meta.env.VITE_PEER_SECURE ? import.meta.env.VITE_PEER_SECURE === 'true' : undefined,
            debug: 2
        };

        // Filter out undefined keys to let PeerJS use defaults
        Object.keys(config).forEach(key => config[key] === undefined && delete config[key]);

        this.peer = new Peer(config);

        this.peer.on('open', (id) => {
            console.log('My peer ID is: ' + id);
            if (onOpen) onOpen(id);
        });

        this.peer.on('connection', (conn) => {
            console.log('Incoming connection from:', conn.peer);
            this.setupConnection(conn);
        });

        this.peer.on('error', (err) => {
            console.error('PeerJS error:', err);
        });
    }

    connect(peerId) {
        if (!this.peer) return;
        console.log('Connecting to:', peerId);
        const conn = this.peer.connect(peerId);
        this.setupConnection(conn);
    }

    setupConnection(conn) {
        this.conn = conn;

        this.conn.on('open', () => {
            console.log('Connection established');
            if (this.callbacks.onConnect) this.callbacks.onConnect(this.conn.peer);
        });

        this.conn.on('data', (data) => {
            console.log('Received data:', data);
            if (this.callbacks.onData) this.callbacks.onData(data);
        });

        this.conn.on('close', () => {
            console.log('Connection closed');
            this.conn = null;
            if (this.callbacks.onClose) this.callbacks.onClose();
        });

        this.conn.on('error', (err) => {
            console.error('Connection error:', err);
        });
    }

    send(data) {
        if (this.conn && this.conn.open) {
            this.conn.send(data);
        } else {
            console.warn('Cannot send data, connection not open');
        }
    }

    on(event, callback) {
        if (event in this.callbacks) {
            this.callbacks[event] = callback;
        }
    }
}

export const peerManager = new PeerManager();
