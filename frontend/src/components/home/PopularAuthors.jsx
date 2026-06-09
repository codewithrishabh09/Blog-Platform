function PopularAuthors() {

  const authors = [
    "Rishabh",
    "John",
    "Sarah",
    "David"
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 mb-20">

      <h2 className="text-3xl font-bold mb-6">
        Popular Authors
      </h2>

      <div className="grid md:grid-cols-4 gap-5">

        {authors.map((author, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow text-center"
          >

            <img
              src={`https://i.pravatar.cc/150?img=${index + 10}`}
              alt=""
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />

            <h3>{author}</h3>

          </div>
        ))}

      </div>

    </section>
  );
}

export default PopularAuthors;