# P2P Tic-Tac-Toe

A real-time multiplayer Tic-Tac-Toe game that runs entirely in the browser using WebRTC (via PeerJS). No backend server is required for game logic.

## Some ScreenShots from Game : 
<img width="500" height="400" alt="image" src="https://github.com/user-attachments/assets/e8d83fb0-b5e8-495e-aa5d-f27b8dda8f60" />

<img width="500" height="400" alt="image" src="https://github.com/user-attachments/assets/9cb309ca-bee7-4606-aace-e3356f435aa9" />

<img width="500" height="400" alt="image" src="https://github.com/user-attachments/assets/efa78077-1522-4300-95c2-f70ea77fe200" />

<img width="500" height="400" alt="image" src="https://github.com/user-attachments/assets/52b7a122-5612-42a0-836a-43ab5aaa608a" />

<img width="500" height="400" alt="Screenshot 2025-11-19 005736" src="https://github.com/user-attachments/assets/056a09ec-ee12-4f1b-adf1-b98d80b18669" />

<img width="500" height="400" alt="Screenshot 2025-11-19 005802" src="https://github.com/user-attachments/assets/0100c259-e5a0-4c18-9fd6-35dfedbf2b46" />

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
