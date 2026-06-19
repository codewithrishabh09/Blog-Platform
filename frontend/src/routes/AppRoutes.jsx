import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/protection/ProtectedRoute";

// Main Pages
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Bookmarks from "../pages/Bookmarks";
import CategoryPosts from "../pages/CategoryPosts";

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
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/post/:id" element={<PostDetails />} />
      <Route path="/category/:tag" element={<CategoryPosts />} />

      {/* Protected */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/bookmarks" element={<ProtectedRoute><Bookmarks /></ProtectedRoute>} />
      <Route path="/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
      <Route path="/edit-post/:id" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
      <Route path="/followers" element={<ProtectedRoute><Followers /></ProtectedRoute>} />
      <Route path="/ai-studio" element={<ProtectedRoute><AIStudio /></ProtectedRoute>} />
    </Routes>
  );
}

export default AppRoutes;