# 🚀 URL Shortener Backend (Server)

> Node.js/Express backend serving a secure REST API for URL management, user accounts, analytics, and admin features.

---

## 🏁 TL;DR Quick Start

```sh
npm install
# Add .env with:
# PORT=5000
# CONNECTION_STRING=mongodb://...
# SECRET_KEY=your_jwt_secret
# SESSION_KEY=session_secret

npm run server
```
- Runs at `http://localhost:5000`

---

## ✨ Main Features

- Secure JWT authentication & session cookies
- Shorten/manipulate URLs per user
- Email verification (tokens auto-expire)
- Account/profile management + admin endpoints

---

## 🗂️ Project Folders

| Folder      | Highlights                        |
|-------------|-----------------------------------|
| `controller/` | API logic for URLs and users     |
| `db/`         | MongoDB connection helpers       |
| `middleware/` | Auth, session, and security code |
| `model/`      | MongoDB models (User, URL, etc.) |
| `routes/`     | Express routers (see `server.js`)|

---

## 🧪 Example API Calls

### Register a New User

```http
POST /api/user/signup
Content-Type: application/json
{
  "email": "me@email.com",
  "password": "superSecret123"
}
```

### Shorten a URL (Authenticated)

```http
POST /api/urls
Cookie: uid=JWT_TOKEN_HERE
Content-Type: application/json
{
  "originalUrl": "https://www.google.com"
}
```
_Response:_
```json
{
  "success": true,
  "data": {
    "shortenedUrl": "http://shortenUrl/abc123"
  }
}
```

### Get All My URLs (Authenticated)

```http
GET /api/urls
Cookie: uid=JWT_TOKEN_HERE
```

---

## ❓ Troubleshooting

- **DB Connection Fails**: Check your `.env` vars and MongoDB server.
- **API 401/403 errors**: Check that you're sending the `uid` cookie (set on login).
- **Nodemon not restarting**: Try `npm install` again or check `nodemon.json`.

---

## 🗒️ Developer FAQ

- **Where does the backend serve?**  
  By default at `http://localhost:5000` (configurable in `.env`).

- **How does authentication work?**  
  JWT/signature cookie (`uid`). Middleware in `/middleware/isAuthenticated.js`.

- **Where to see/modify the models?**  
  `/model/User.js`, `/model/Url.js`, etc.

- **Want to change API routes?**  
  Edit the respective router/controller or `server.js`.

---

## 📃 License

MIT License.