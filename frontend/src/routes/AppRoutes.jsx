import { Routes, Route } from "react-router-dom";

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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/bookmarks" element={<Bookmarks />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/edit-post/:id" element={<EditPost />} />
      <Route path="/post/:id" element={<PostDetails />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/followers" element={<Followers />} />
      <Route path="/ai-studio" element={<AIStudio />} />
    </Routes>
  );
}

export default AppRoutes;