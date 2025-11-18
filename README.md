# P2P Tic-Tac-Toe

A real-time multiplayer Tic-Tac-Toe game that runs entirely in the browser using WebRTC (via PeerJS). No backend server is required for game logic.

## Features
- **Peer-to-Peer**: Direct connection between players.
- **Instant Sync**: Real-time game state updates.
- **No Login**: Just share a link/ID to play.
- **Responsive**: Works on desktop and mobile.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1.  **Fork and Clone** the repository:
    ```bash
    git clone https://github.com/YOUR_USERNAME/tic-tac-toe-p2p.git
    cd tic-tac-toe-p2p
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Copy the example environment file:
    ```bash
    cp .env.example .env
    ```
    *Note: The default configuration uses the public PeerJS server, which is fine for testing. For production, consider hosting your own PeerServer.*

4.  **Start Development Server**:
    ```bash
    npm run dev
    ```

5.  **Open in Browser**:
    Visit `http://localhost:5173`

## How to Play
1.  **Host**: Click "Host Game" to generate a Game ID.
2.  **Join**: Share the ID with a friend. They enter it and click "Join".
3.  **Play**: The game starts immediately.

## Remote Play (Tunneling)
To play with friends over the internet without deploying, you can use a tunnel:

**Using Cloudflare Tunnel (Recommended):**
```bash
npx cloudflared tunnel --url http://localhost:5173
```
Copy the `trycloudflare.com` URL provided in the output.

**Using Localtunnel:**
```bash
npx localtunnel --port 5173
```

## Deployment
You can deploy this to any static host (Vercel, Netlify, GitHub Pages).

```bash
npm run build
```

## License
MIT
