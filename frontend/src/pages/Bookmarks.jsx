import Navbar from "../components/navbar/Navbar";

function Bookmarks() {
  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-10">

        <h1 className="text-4xl font-bold mb-8">
          Saved Blogs
        </h1>

        <div className="grid md:grid-cols-3 gap-5">

          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="font-bold">
              React Tutorial
            </h2>

            <p className="text-gray-500">
              Learn React Step By Step
            </p>
          </div>

        </div>

      </div>
    </>
  );
}

export default Bookmarks;