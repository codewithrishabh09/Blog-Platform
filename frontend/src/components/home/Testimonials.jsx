function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <h2 className="text-4xl font-bold mb-8">
        What Readers Say
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <p>
            Amazing content and beautiful design.
          </p>

          <h3 className="font-bold mt-4">
            John Doe
          </h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p>
            One of the best blogging platforms.
          </p>

          <h3 className="font-bold mt-4">
            Sarah Smith
          </h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p>
            Very clean and professional experience.
          </p>

          <h3 className="font-bold mt-4">
            David Miller
          </h3>
        </div>

      </div>

    </section>
  );
}

export default Testimonials;