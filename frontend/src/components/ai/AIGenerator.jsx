import { useState } from "react";

function AIGenerator() {

  const [topic, setTopic] =
    useState("");

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-5">
        AI Blog Generator
      </h2>

      <input
        type="text"
        value={topic}
        onChange={(e) =>
          setTopic(e.target.value)
        }
        placeholder="Enter topic"
        className="border p-3 w-full mb-4"
      />

      <button className="bg-blue-600 text-white px-6 py-3 rounded">
        Generate Blog
      </button>

    </div>
  );
}

export default AIGenerator;