import Navbar from "../components/navbar/Navbar";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfilePosts from "../components/profile/ProfilePosts";

function Profile() {
  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-10">

        <ProfileHeader />

        <div className="my-8">
          <ProfileStats />
        </div>

        <ProfilePosts />

      </div>
    </>
  );
}

export default Profile;