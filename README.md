# 📝 InkVerse — Blog Platform

A full-stack blog platform with a **FastAPI + MongoDB** backend and a **React + Vite** frontend.

---

## ✨ Features Built

### 🔐 Authentication

- Register / Login with JWT tokens
- Protected routes (redirect to `/login` if not authenticated)
- Persistent login via `localStorage` token + Zustand store rehydration
- Logout clears token and resets auth state

### 📄 Posts

- Create posts (saved as draft)
- Publish posts
- Edit posts (pre-filled form, author-only)
- Delete posts (author-only)
- View post details with view count tracking
- Like / Unlike posts (toggle)
- Full-text search on home page
- Category browsing by tag (`/category/:tag`)
- Featured post (most recent) highlighted on home page
- Trending posts (sorted by view count)

### 💬 Comments

- Add comments on posts (auth required)
- Delete own comments
- Real-time comment list with author + timestamp

### 🔖 Bookmarks

- Save / unsave posts (toggle)
- View all bookmarked posts at `/bookmarks`

### 🔔 Notifications

- Bell icon in navbar with unread count badge
- Notifications created automatically on like and comment
- Mark individual or all notifications as read
- Full notifications page at `/notifications`

### 💌 Messages

- Direct messaging between any two logged-in users
- Conversation list with last message preview
- Chat thread view per conversation
- Auto-polling every 4 seconds for new messages
- Send messages in real time

### 📊 Dashboard

- Real post count (from backend)
- Analytics overview chart (recharts, mock data)
- Views + Likes charts (Chart.js, mock data)
- Top Authors, Trending Posts, Category Stats widgets
- Recent Posts (real data from `/posts/my`)
- Activity Feed (mock data, pending notifications backend)
- Staggered entrance animations (Framer Motion)

### 👤 Profile

- View your own username, email, bio, role
- Letter-avatar generated from username initial
- Real post count
- List of your posts with publish status, links to each

### 🏠 Home Page

- Featured post card (most recent published)
- Trending section (top posts by view count, real data)
- Latest writing index list with search
- Browse by category grid (6 categories, links to filtered results)
- Popular authors (real data from backend, mock fallback)
- Stats section (mock marketing numbers, count-up animation)
- Testimonials (mock)
- Newsletter signup (client-side validation, no backend storage yet)
- Call to action → `/create-post`

---

## 🛠️ Tech Stack

## Backend

- FastAPI
- MongoDB (Motor — async driver)
- Pydantic v2 (`pydantic-settings` for config)
- JWT auth (`python-jose`)
- Password hashing (`bcrypt` direct, not passlib)
- Rate limiting (`slowapi`)

## Frontend

- React + Vite
- Tailwind CSS v4 (`@tailwindcss/vite`, no config file needed)
- React Router v6
- Zustand (auth state)
- Axios (auto-attaches Bearer token via interceptor)
- Framer Motion (animations)
- Recharts (analytics line chart)
- Chart.js + react-chartjs-2 (views/likes bar/line charts)
- lucide-react (Bell, Heart icons)
- Fonts: Fraunces (serif), Inter (body), JetBrains Mono (metadata) via Google Fonts

---

## 📁 Project Structure

Blog Platform/
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   │   ├── auth.py          # register, login, me
│   │   │   ├── posts.py         # CRUD, publish, like, trending
│   │   │   ├── comments.py      # add, delete, notifications on comment
│   │   │   ├── bookmarks.py     # toggle, list
│   │   │   ├── notifications.py # list, mark read, mark all read
│   │   │   ├── messages.py      # conversations, thread, send
│   │   │   ├── users.py         # popular authors endpoint
│   │   │   └── ...              # empty placeholders: analytics, followers, session, likes
│   │   ├── models/
│   │   │   ├── user.py          # UserCreate, UserLogin, UserOut
│   │   │   ├── post.py          # PostCreate, PostUpdate
│   │   │   └── comments.py      # CommentCreate
│   │   ├── utils/
│   │   │   └── auth.py          # JWT, bcrypt, get_current_user
│   │   ├── config.py            # Settings (.env loader)
│   │   ├── database.py          # MongoDB collections
│   │   └── main.py              # App, middleware, routers, lifespan
│   ├── .env                     # SECRET_KEY, MONGO_URI, DB_NAME (not committed)
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── api/                 # axios.js (interceptor)
│   │   ├── components/
│   │   │   ├── navbar/          # Navbar.jsx (auth state, dropdown, notifications)
│   │   │   ├── home/            # FeaturedPost, TrendingSection, CategoriesSection,
│   │   │   │                    # PopularAuthors, StatsSection, Testimonials,
│   │   │   │                    # Newsletter, CallToAction, BlogCarousel
│   │   │   ├── posts/           # PostCard, AuthorCard, LikeButton, PostEditor,
│   │   │   │                    # ReadingProgress, RelatedPosts, ShareButtons
│   │   │   ├── comments/        # CommentForm, CommentList, CommentsCard
│   │   │   ├── bookmarks/       # BookmarkButton, BookmarkCard, BookmarkList
│   │   │   ├── dashboard/       # StatCard, AnalyticsChart, ViewsChart, LikesChart,
│   │   │   │                    # TopAuthors, TrendingPosts, CategoryStats,
│   │   │   │                    # RecentPosts, ActivityFeed
│   │   │   ├── notifications/   # NotificationBell
│   │   │   ├── messaging/       # ChatWindow, ConversationList
│   │   │   ├── profile/         # ProfileHeader, ProfilePosts, ProfileStats
│   │   │   ├── search/          # SearchBar
│   │   │   └── protection/      # ProtectedRoute
│   │   ├── pages/               # Home, Login, Register, Dashboard, CreatePost,
│   │   │                        # EditPost, PostDetails, Profile, Bookmarks,
│   │   │                        # Notifications, Messages, CategoryPosts,
│   │   │                        # Analytics, Followers, AIStudio, Settings
│   │   ├── routes/              # AppRoutes.jsx
│   │   ├── store/               # authStore.js (Zustand)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html               # Google Fonts link tags
│   ├── vite.config.js           # Tailwind v4 plugin
│   └── package.json
└── README.md

## ⚙️ Backend Setup

```bash
cd backend
uvicorn app.main:app --reload
```

⚠️ Run from **inside** `backend/` — not the project root.

Create `backend/.env`:

```env
SECRET_KEY=your-generated-secret-key
MONGO_URI=mongodb://localhost:27017
DB_NAME=secret-blog-app
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

Generate a strong `SECRET_KEY`:

```bash
python3 -c "import secrets; print(secrets.token_hex(64))"
```

Install dependencies:

```bash
pip3 install -r requirements.txt --break-system-packages
```

API runs at `http://localhost:8000`
Interactive docs at `http://localhost:8000/docs`

---

## 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## 🚀 Running Both Together

Open two terminals:

```bash
# Terminal 1 — backend
cd backend && uvicorn app.main:app --reload

# Terminal 2 — frontend
cd frontend && npm run dev
```

---

## 🔌 API Endpoints

## Auth

- `POST /auth/register` — rate limited 3/min
- `POST /auth/login` — rate limited 5/min
- `GET /auth/me` — current user (JWT required)

## Posts

- `GET /posts/` — list published posts (page, limit, tag, search)
- `GET /posts/trending/top` — top posts by view count
- `GET /posts/my` — current user's posts (JWT required)
- `GET /posts/id/{id}` — get post by MongoDB `_id`, author-only (edit page)
- `GET /posts/{slug}` — get published post by slug (+ increments views)
- `POST /posts/` — create draft (JWT required)
- `PUT /posts/{id}` — update post (JWT required, author-only)
- `DELETE /posts/{id}` — delete post (JWT required, author-only)
- `POST /posts/{id}/publish` — publish post (JWT required, author-only)
- `POST /posts/{id}/like` — toggle like + creates notification (JWT required)

## Comments

- `GET /comments/{post_id}` — list comments
- `POST /comments/{post_id}` — add comment + creates notification (JWT required)
- `DELETE /comments/{comment_id}` — delete own comment (JWT required)

## Bookmarks

- `GET /bookmarks/` — list bookmarked posts (JWT required)
- `POST /bookmarks/{post_id}` — toggle bookmark (JWT required)

## Notifications

- `GET /notifications/` — list notifications (JWT required)
- `POST /notifications/read/{id}` — mark one as read (JWT required)
- `POST /notifications/read-all` — mark all as read (JWT required)

## Messages

- `GET /messages/conversations` — list conversations (JWT required)
- `GET /messages/{user_id}` — get thread with a user (JWT required)
- `POST /messages/{user_id}` — send message (JWT required)

## Users

- `GET /users/popular` — top authors by post count

---

## 🔒 Security

- Strong `SECRET_KEY` via `.env`
- Rate limiting on `/auth/register` (3/min) and `/auth/login` (5/min)
- CORS restricted to `http://localhost:5173`
- Security headers middleware (`X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`)
- Request size limit middleware (1MB cap)
- Protected frontend routes via `ProtectedRoute` component

---

## ⚡ Quick Start

1. Start MongoDB
2. `cd backend && uvicorn app.main:app --reload`
3. `cd frontend && npm run dev`
4. Open `http://localhost:5173` 🎉
