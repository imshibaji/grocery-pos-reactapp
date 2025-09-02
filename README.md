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

