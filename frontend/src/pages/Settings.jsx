import Navbar from "../components/navbar/Navbar";

function Settings() {
  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-10">

        <h1 className="text-4xl font-bold mb-10">
          Settings
        </h1>

        <div className="bg-white p-8 rounded-xl shadow">

          <input
            type="text"
            placeholder="Username"
            className="border p-3 w-full mb-4"
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-3 w-full mb-4"
          />

          <button className="bg-blue-600 text-white px-6 py-3 rounded">
            Save Changes
          </button>

        </div>

      </div>
    </>
  );
}

export default Settings;