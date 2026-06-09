function StatsSection() {
  return (
    <section className="bg-blue-600 text-white py-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-8 text-center">

          <div>
            <h2 className="text-5xl font-bold">
              500+
            </h2>

            <p>Blogs</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">
              10K+
            </h2>

            <p>Readers</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">
              2K+
            </h2>

            <p>Authors</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">
              50K+
            </h2>

            <p>Views</p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default StatsSection;