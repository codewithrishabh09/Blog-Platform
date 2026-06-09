function TopAuthors() {

  const authors = [
    {
      name: "Rishabh",
      posts: 25
    },
    {
      name: "John",
      posts: 18
    },
    {
      name: "Sarah",
      posts: 15
    }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-5">
        Top Authors
      </h2>

      {authors.map((author, index) => (
        <div
          key={index}
          className="flex justify-between border-b py-3"
        >
          <span>{author.name}</span>

          <span>
            {author.posts} Posts
          </span>
        </div>
      ))}

    </div>
  );
}

export default TopAuthors;