function BookmarkCard({ post }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">

      <h3 className="font-bold">
        {post.title}
      </h3>

      <p className="text-gray-500">
        {post.author}
      </p>

    </div>
  );
}

export default BookmarkCard;