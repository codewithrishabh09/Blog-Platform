import { useState, useEffect } from "react";
import API from "../api/axios";
import Navbar from "../components/navbar/Navbar";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get("/users/me");
        setUser(response.data);
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
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-10">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>

        {user && (
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <p className="text-gray-500">Username</p>
              <p className="text-lg font-semibold">{user.username}</p>
            </div>

            <div className="p-4 border rounded-lg">
              <p className="text-gray-500">Email</p>
              <p className="text-lg font-semibold">{user.email}</p>
            </div>

            <div className="p-4 border rounded-lg">
              <p className="text-gray-500">Role</p>
              <p className="text-lg font-semibold capitalize">{user.role}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
