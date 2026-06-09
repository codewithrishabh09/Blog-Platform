function ProfilePosts() {

  const posts = [
    "React Tutorial",
    "FastAPI Guide",
    "MongoDB Basics"
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-5">
        My Posts
      </h2>

      {posts.map((post, index) => (
        <div
          key={index}
          className="border-b py-3"
        >
          {post}
        </div>
      ))}

    </div>
  );
}

export default ProfilePosts;