import BookmarkCard from "./BookmarkCard";

function BookmarkList() {

  const posts = [
    {
      title: "React Tutorial",
      author: "John"
    },
    {
      title: "FastAPI Guide",
      author: "Sarah"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-5">

      {posts.map((post, index) => (
        <BookmarkCard
          key={index}
          post={post}
        />
      ))}

    </div>
  );
}

export default BookmarkList;