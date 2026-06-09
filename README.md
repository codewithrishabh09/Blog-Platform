# Blog Platform

A full-stack blog platform with a **FastAPI + MongoDB** backend and a **React** frontend.

## Features

- User authentication (register/login) with JWT
- Publish/draft blog posts
- Post listing with search/tag support
- Comments (create/delete)
- Like/unlike posts

## Project Structure

- `backend/`: FastAPI API
- `frontend/`: React SPA

## Tech Stack

- Backend: FastAPI, Motor (async MongoDB driver), JWT, Passlib (bcrypt)
- Frontend: React (Vite-style structure inferred from code), Axios
- Database: MongoDB

## Backend Setup (FastAPI)

### 1) Create environment

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
```

### 2) Install dependencies

```bash
pip install -r requirements.txt
```

### 3) Configure environment variables

The backend reads settings from `backend/app/config.py` (defaults provided):

- `MONGO_URI` (default: `mongodb://localhost:27017`)
- `DB_NAME` (default: `blogdb`)
- `SECRET_KEY` (default: `changeme`)
- `ACCESS_TOKEN_EXPIRE_MINUTES` (default: `1440`)

Create `backend/.env` if you want to override defaults.

### 4) Run the API

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API base URL: `http://localhost:8000`

## Frontend Setup (React)

### 1) Install dependencies
>
> Note: there is no `frontend/package.json` in the current repo snapshot. If your React project has a `package.json` in another location, run the install command from there.

Typical flow:

```bash
cd frontend
npm install
```

### 2) Run dev server

```bash
npm run dev
```

Frontend expects the API at:

- `http://localhost:8000` (see `frontend/src/api/axios.js`)

CORS is configured on the backend for:

- `http://localhost:5173`

## API Endpoints (as implemented)

- `GET /` — health check (`{"message": "Blog API running"}`)

Auth:

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me` (placeholder message; backend expects token-based auth via `Depends(get_current_user)`) 

Posts:

- `GET /posts` — list published posts (supports `page`, `limit`, `tag`, `search`)
- `GET /posts/my` — list posts for current user (JWT required)
- `GET /posts/{slug}` — get published post by slug (+ increments views)
- `POST /posts` — create post (JWT required)
- `PUT /posts/{id}` — update post (JWT required, author-only)
- `DELETE /posts/{id}` — delete post (JWT required, author-only)
- `POST /posts/{id}/publish` — publish post (JWT required, author-only)
- `POST /posts/{id}/like` — like/unlike current user (JWT required)

Comments:

- `GET /comments/{post_id}` — list comments for a post
- `POST /comments/{post_id}` — add comment (JWT required)
- `DELETE /comments/{comment_id}` — delete comment (JWT required)

## Notes / Assumptions

- The frontend code stores the JWT in `localStorage` under the key `token`.
- Ensure MongoDB is running and accessible via `MONGO_URI`.

## Running Locally (Quick Start)

1. Start MongoDB.
2. Start backend:

   ```bash
   cd backend
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

3. Start frontend dev server on port `5173`.
4. Use the app.
