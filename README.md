Grocery POS & Inventory (Lean)
================================

This is a simple React + Vite app (frontend-only) implementing a lightweight POS and inventory manager suited for a ₹1 lakh grocery startup.

Features:
- Inventory list (add/edit/remove)
- POS cart with quantity, subtotal, GST, delivery
- Complete sale reduces stock
- Export / Import inventory as CSV
- Send invoice text to WhatsApp (uses wa.me link)
- Data persisted in browser localStorage

How to run:
1. Install Node.js (v18+ recommended)
2. In project folder, run:
   npm install
   npm run dev
3. Open the printed local URL in your browser.

If you don't want to run locally, you can open `index.html` in a static server but Vite dev features require node.

Files:
- index.html
- package.json
- src/main.jsx
- src/App.jsx
- src/styles.css

---

Running with Docker
-------------------

You can run this project using Docker for a consistent, containerized environment. The provided Dockerfile uses Node.js v22.13.1 (slim) and builds the app for production.

**Requirements:**
- Docker (latest version recommended)
- Docker Compose (v2+)

**How to build and run:**
1. In the project folder, run:
   ```sh
   docker compose up --build
   ```
2. The app will be available at [http://localhost:3000](http://localhost:3000)

**Details:**
- The frontend is served on port **3000** (exposed by the container)
- No environment variables are required by default
- No persistent volumes or external dependencies are needed (all data is stored in browser localStorage)
- The Docker image is built using the provided `Dockerfile` and `compose.yaml`

**Note:**
- If you have a `.env` file for custom environment variables, you can uncomment the `env_file` line in `compose.yaml`
- The app runs as a non-root user inside the container for better security
