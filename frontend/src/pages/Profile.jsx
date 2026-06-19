import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from "../api/axios";
import Navbar from "../components/navbar/Navbar";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfilePosts from "../components/profile/ProfilePosts";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const [userRes, postsRes] = await Promise.all([
          API.get("/auth/me"),
          API.get("/posts/my"),
        ]);
        setUser(userRes.data);
        setPosts(postsRes.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#FAF9F6] min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#4C4A9E] border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-[#FAF9F6] min-h-screen">
        <Navbar />
        <div className="max-w-2xl mx-auto px-6 pt-24 text-center">
          <p
            className="text-2xl text-[#1A1A1A]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Couldn't load profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 md:px-0 pt-16 pb-24">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs uppercase tracking-[0.2em] text-[#7A8B6F] mb-3"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Your profile
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl text-[#1A1A1A] mb-10"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {user.username}
        </motion.h1>

        <div className="space-y-5">
          <ProfileHeader user={user} />

          <div className="grid md:grid-cols-2 gap-5">
            <ProfileStats postCount={posts.length} />
            <ProfilePosts posts={posts} />
          </div>
        </div>
      </div>
    </div>
  );
}