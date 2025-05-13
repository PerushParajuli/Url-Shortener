# 🌐 URL Shortener

> **TL;DR:** Paste a long URL and get a short one—log in to manage your links. Modern full-stack: React + Vite frontend, Node.js/Express + MongoDB backend.  
> **Quick start:** Clone → Add `.env` → `npm install` → `npm run dev` (in `server/`).

---

## 📊 Architecture Overview

- **Client**: React app (in `/client`)
- **Server**: Node/Express API (in `/server`)
- **Database**: MongoDB via Mongoose

---

## 🚀 Quick Start

1. **Clone & install dependencies:**
   ```sh
   git clone https://github.com/yourusername/Url-Shortener.git
   cd Url-Shortener
   cd client && npm install && cd ../server && npm install
   ```

2. **Set up environment variables:**  
   Create `server/.env` (see `server/README.md` for details)

3. **Run development servers (concurrently):**
   ```sh
   cd server
   npm run dev
   ```
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:5000](http://localhost:5000)

---

## 📁 Project Structure

| Folder    | Purpose                        |
|-----------|-------------------------------|
| `client/` | React web app (frontend)      |
| `server/` | Express REST API (backend)    |
| `README.md` | This file (project overview)   |

---

## ✨ Features

- User authentication
- Shorten, view, and manage your own URLs
- Click analytics
- Account/profile management & admin tools
- Email verification (accounts)
- RESTful API—see `server/README.md`

---

## 🛠️ Tech Stack

- Frontend: React, Vite, TailwindCSS
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JWT (httpOnly cookies), express-session
- Dev Tools: ESLint, Nodemon, Concurrently

---

## 💡 FAQ

**Q: I get CORS errors / API not reachable?**  
A: Make sure both servers are running and ports match. See `vite.config.js` and `server.js` for defaults.

**Q: Where do I find API details?**  
A: See [`server/README.md`](server/README.md) for detailed endpoint info and request/response examples.

---

## 🤝 Contributing

Pull requests & issues welcome. Please follow project code style!

---

## 📄 License

MIT License
