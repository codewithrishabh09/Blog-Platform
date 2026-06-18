# 📝 Blog Platform

A full-stack blog platform with a **FastAPI + MongoDB** backend and a **React (Vite)** frontend.

## ✨ Features

- 🔐 User authentication (register/login) with JWT
- 📄 Publish/draft blog posts
- 📋 Post listing with search/tag support
- 💬 Comments (create/delete)
- ❤️ Like/unlike posts
- 📊 Dashboard with analytics, charts, top authors, trending posts
- 🎨 Animated UI (Framer Motion) with Fraunces/Inter/JetBrains Mono typography

## 📁 Project Structure

- `backend/`: FastAPI API
- `frontend/`: React SPA (Vite)

## 🛠️ Tech Stack

- **Backend:** FastAPI, Motor (async MongoDB driver), JWT (`python-jose`), `bcrypt` (direct, not Passlib), `slowapi` (rate limiting)
- **Frontend:** React + Vite, Tailwind CSS v4, React Router, Zustand, Axios, Framer Motion, Recharts, Chart.js
- **Database:** MongoDB

## ⚙️ Backend Setup (FastAPI)

### 1) Create environment

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
```

### 2) Install dependencies

```bash
pip3 install -r requirements.txt --break-system-packages
```

### 3) Configure environment variables

The backend reads settings from `backend/app/config.py` (defaults provided):

- `MONGO_URI` (default: `mongodb://localhost:27017`)
- `DB_NAME` (default: `blog_platform`)
- `SECRET_KEY` (default: `changeme` — **must override in `.env`, see below**)
- `ACCESS_TOKEN_EXPIRE_MINUTES` (default: `1440`)

Create `backend/.env`:

```env
SECRET_KEY=your-generated-secret-key
MONGO_URI=mongodb://localhost:27017
DB_NAME=blog_platform
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

Generate a strong `SECRET_KEY`:

```bash
python3 -c "import secrets; print(secrets.token_hex(64))"
```

### 4) Run the API

⚠️ Run this from **inside** the `backend/` directory, not the project root — otherwise you'll hit `ModuleNotFoundError: No module named 'app'`.

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

🌐 API base URL: `http://localhost:8000`
📚 Interactive docs: `http://localhost:8000/docs`

## 💻 Frontend Setup (React)

### 1) Install dependencies

```bash
cd frontend
npm install
```

### 2) Run dev server

```bash
npm run dev
```

🌐 Frontend runs at: `http://localhost:5173`

Frontend expects the API at `http://localhost:8000` (see `frontend/src/api/axios.js`).

CORS on the backend is restricted to `http://localhost:5173`.

## 🚀 Running Both Together

Open two terminals:

```bash
# Terminal 1 — backend
cd backend
source venv/bin/activate
uvicorn app.main:app --reload

# Terminal 2 — frontend
cd frontend
npm run dev
```

Then open `http://localhost:5173` in your browser.

## 🔌 API Endpoints (as implemented)

- `GET /` — health check (`{"message": "Blog API running"}`)

## Auth

- `POST /auth/register` — rate limited (3/min)
- `POST /auth/login` — rate limited (5/min)
- `GET /auth/me` — current user info (JWT required)

## Posts

- `GET /posts` — list published posts (supports `page`, `limit`, `tag`, `search`)
- `GET /posts/my` — list posts for current user (JWT required)
- `GET /posts/id/{id}` — get post by MongoDB `_id`, author-only (used by edit page)
- `GET /posts/{slug}` — get published post by slug (+ increments views)
- `POST /posts/` — create post as draft (JWT required)
- `PUT /posts/{id}` — update post (JWT required, author-only)
- `DELETE /posts/{id}` — delete post (JWT required, author-only)
- `POST /posts/{id}/publish` — publish post (JWT required, author-only)
- `POST /posts/{id}/like` — toggle like (JWT required)

## Comments

- `GET /comments/{post_id}` — list comments for a post
- `POST /comments/{post_id}` — add comment (JWT required)
- `DELETE /comments/{comment_id}` — delete comment (JWT required, author-only)

## 🔒 Security

- Strong `SECRET_KEY` required via `.env` (never use the `changeme` default)
- Rate limiting on register/login endpoints
- CORS restricted to frontend origin only
- Security headers middleware (`X-Frame-Options`, `X-Content-Type-Options`, etc.)
- Request size limit middleware (1MB cap)
- Frontend `ProtectedRoute` redirects unauthenticated users away from private pages

## 📌 Notes / Assumptions

- The frontend stores the JWT in `localStorage` under the key `token`
- Ensure MongoDB is running and accessible via `MONGO_URI` before starting the backend
- Logout is frontend-only (clears `localStorage`) — there's no server-side session to invalidate since auth is stateless JWT

## 🚧 Known Gaps

- `bookmarks`, `notifications`, `messages`, `analytics`, `followers`, `session`, `likes`, `users` backend routers are currently empty placeholders
- Several frontend pages (`Profile`, `Settings`, `Bookmarks`, `Messages`, `Notifications`, `Followers`, `AIStudio`) are placeholder stubs
- Dashboard's Likes/Comments/Views and several widgets currently use mock data, not real aggregated data
- AI blog generation has no backend integration yet (needs an Anthropic/OpenAI API key + new endpoint)

## ⚡ Quick Start

1. Start MongoDB
2. Start backend: `cd backend && source venv/bin/activate && uvicorn app.main:app --reload`
3. Start frontend: `cd frontend && npm run dev`
4. Open `http://localhost:5173` 🎉
