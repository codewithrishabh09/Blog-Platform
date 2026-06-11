import { useState } from "react";
import API from "../api/axios";
import Navbar from "../components/navbar/Navbar";

export default function AIStudio() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await API.post("/ai/generate", { prompt });
      setResult(response.data);
    } catch (error) {
      console.error("Error generating content:", error);
      setResult({ error: "Failed to generate content" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-10">
        <h1 className="text-3xl font-bold mb-8">AI Content Studio</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium mb-2">
              Enter a topic or idea
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'Write a blog post about the future of AI'"
              className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Content"}
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 border rounded-lg bg-gray-50">
            <h2 className="text-2xl font-bold mb-4">Generated Content</h2>

            {result.error ? (
              <p className="text-red-500">{result.error}</p>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Title</h3>
                  <p>{result.title}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Content</h3>
                  <p>{result.content}</p>
                </div>

                {result.tags && (
                  <div>
                    <h3 className="font-semibold mb-2">Tags</h3>
                    <div className="flex gap-2">
                      {result.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
