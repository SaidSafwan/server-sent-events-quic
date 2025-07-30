# Server-Sent Events (SSE) with QUIC (HTTP/3)

## Overview
This project demonstrates:
- **Server-Sent Events (SSE)** for real-time data streaming from server to client.
- **QUIC (HTTP/3)** support using [Caddy Server](https://caddyserver.com/) as a reverse proxy.

---

## GitHub Repository & Cloning
To clone this repository:
```
    git clone https://github.com/<SaidSafwan>/server-sent-events-quic.git
    cd server-sent-events-quic
```
---

## Project Structure
```
    server-sent-events/
    │
    ├── public/
    │   └── index.html        # Simple SSE client
    ├── server.js             # Express SSE server
    ├── package.json
    ├── package-lock.json
    ├── .gitignore
    └── (Caddyfile)           # Optional: In C:\Caddy or project root
```

---

## Why Caddy & Separate Folder in C Drive?
We keep `Caddyfile` inside `C:\Caddy` (or inside project root):
- Easy management of **system-wide configurations**.
- Helps run Caddy separately as an HTTPS reverse proxy.
- Caddy automatically manages **TLS certificates** and enables **QUIC (HTTP/3)** by default.

---

## Quick Setup Guide (For Windows)

### Prerequisites
- [Node.js](https://nodejs.org/) (v14+ recommended)
- [Git](https://git-scm.com/)
- [Caddy Server](https://caddyserver.com/)

---

### 1. Install Caddy
1. Download Caddy executable:  
   [https://caddyserver.com/download](https://caddyserver.com/download) (Windows → amd64 → Standard)
2. Create a folder in `C:` drive:
```powershell
    mkdir C:\Caddy
```
3. Place the downloaded caddy.exe inside C:\Caddy.

4. (Optional) Add C:\Caddy to your PATH:
```
    Open Environment Variables → Edit Path → Add C:\Caddy
```

### 2. Certificate Creation (Handled Automatically by Caddy)
Caddy automatically:
- Generates a trusted local TLS certificate (root.crt)
- Stores it in:
  ```
      C:\Users\<username>\AppData\Roaming\Caddy\pki\authorities\local\
  ```
- Enables HTTP/3 (QUIC) without manual OpenSSL steps.

### 3. Install Node.js Dependencies
```
  npm install
```

## Verifying Output
### 1. Server-Sent Events (SSE)
Run only the Node.js server:

```
  node server.js
```
Open in browser:
```
http://localhost:3000
```
Note: here http!
You will see real-time Server-Sent Events updating every second.

## 2. QUIC (HTTP/3) via Caddy (in separate terminals)
locate to caddy file path and execute caddy
```powershell
    caddy run --config ./Caddyfile
```

Open in browser:
```
https://localhost
```
Note: here https

Open DevTools → Network → Reload and check Protocol column:
Some browsers may still display h2 even when QUIC is enabled (browser limitation).
To confirm h3 (QUIC) protocol:
Use Wireshark to capture traffic and verify QUIC packets.

Screenshots:

<img width="1365" height="563" alt="image" src="https://github.com/user-attachments/assets/f58e1403-deb7-4d10-8529-cadcb1d9dee4" />

<img width="1365" height="563" alt="image" src="https://github.com/user-attachments/assets/ef833f28-c9c9-45f9-88aa-7293821926ba" />


