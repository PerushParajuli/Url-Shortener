# 🌟 URL Shortener Frontend (Client)

> The web user interface for the URL Shortener project—built with React + Vite.

---

## 🏁 Quick Start

```sh
npm install
npm run client
# → Visit http://localhost:5173
```

---

## ✨ What Can I Do Here?

- Sign up or log in to manage your own URLs
- Paste a long URL and instantly get a short version
- Edit, delete, and view your URLs + click stats
- Manage your account settings

---

## 🛠️ Tech Used

- React 19
- Vite (fastest hot reload!)
- TailwindCSS (utility-first styling)
- React Router v7
- API requests via fetch/AJAX

---

## 🚦 Common Problems & FAQ

**Q: Client can't talk to the backend?**  
A: Make sure both are running. By default, client uses `http://localhost:5000` for API.

**Q: How do I change the backend URL?**  
A: Edit proxy/API endpoints in your code or `vite.config.js`.

**Q: Styling broken or not updating?**  
A: Restart the dev server. Tailwind sometimes needs a refresh!

---

## 📝 Customization

- **Change theme/style:** Edit Tailwind config and `/src` files.
- **Add a component:** Place new React components inside `/src/components/`.
- **Build for production:**  
  ```sh
  npm run build
  # Deploy 'dist/' folder to your host (Netlify, Vercel, etc.)
  ```

---

## 📂 Directory Structure

```
client/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   └── ...
├── package.json
```

---

## ✅ Available Scripts

- `npm run client`   — Start dev server
- `npm run build`    — Create production bundle
- `npm run lint`     — Check code with ESLint
- `npm run preview`  — Preview the production build locally

---

## 👀 Need Backend/API?

See [../server/README.md](../server/README.md).