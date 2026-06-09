function ProfileStats() {
  return (
    <div className="grid md:grid-cols-4 gap-5">

      <div className="bg-white p-5 rounded-xl shadow text-center">
        <h2 className="text-3xl font-bold">25</h2>
        <p>Posts</p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow text-center">
        <h2 className="text-3xl font-bold">520</h2>
        <p>Likes</p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow text-center">
        <h2 className="text-3xl font-bold">120</h2>
        <p>Comments</p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow text-center">
        <h2 className="text-3xl font-bold">5K</h2>
        <p>Views</p>
      </div>

    </div>
  );
}

export default ProfileStats;