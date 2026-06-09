import { BrowserRouter, Routes, Route } from "react-router-dom";

// Main Pages
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Bookmarks from "../pages/Bookmarks";

// Auth Pages
import Login from "../pages/Login";
import Register from "../pages/Register";

// Blog Pages
import CreatePost from "../pages/CreatePost";
import EditPost from "../pages/EditPost";
import PostDetails from "../pages/PostDetails";

// Advanced Pages
import Analytics from "../pages/Analytics";
import Notifications from "../pages/Notifications";
import Messages from "../pages/Messages";
import Followers from "../pages/Followers";
import AIStudio from "../pages/AIStudio";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={<Settings />}
        />

        {/* Bookmarks */}
        <Route
          path="/bookmarks"
          element={<Bookmarks />}
        />

        {/* Blog */}
        <Route
          path="/create-post"
          element={<CreatePost />}
        />

        <Route
          path="/edit-post/:id"
          element={<EditPost />}
        />

        <Route
          path="/post/:id"
          element={<PostDetails />}
        />

        {/* Analytics */}
        <Route
          path="/analytics"
          element={<Analytics />}
        />

        {/* Notifications */}
        <Route
          path="/notifications"
          element={<Notifications />}
        />

        {/* Messages */}
        <Route
          path="/messages"
          element={<Messages />}
        />

        {/* Followers */}
        <Route
          path="/followers"
          element={<Followers />}
        />

        {/* AI Studio */}
        <Route
          path="/ai-studio"
          element={<AIStudio />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;