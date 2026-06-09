function Newsletter() {
  return (
    <section className="max-w-5xl mx-auto px-6 mb-20">

      <div className="bg-blue-600 text-white p-10 rounded-2xl">

        <h2 className="text-4xl font-bold mb-4">
          Subscribe Newsletter
        </h2>

        <p className="mb-5">
          Get latest blogs directly in your inbox.
        </p>

        <div className="flex gap-4">

          <input
            type="email"
            placeholder="Enter email"
            className="flex-1 p-3 rounded text-black"
          />

          <button className="bg-black px-6 py-3 rounded">
            Subscribe
          </button>

        </div>

      </div>

    </section>
  );
}

export default Newsletter;