import { useState } from "react";
import Navbar from "../components/navbar/Navbar";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submit = (e) => {
    e.preventDefault();

    console.log({
      title,
      content,
    });
  };

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-10">
        <h1 className="text-4xl font-bold mb-5">
          Create Post
        </h1>

        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="Post Title"
            className="border p-3 w-full mb-4"
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <textarea
            rows="10"
            placeholder="Write your blog..."
            className="border p-3 w-full mb-4"
            onChange={(e) =>
              setContent(e.target.value)
            }
          />

          <button className="bg-blue-600 text-white px-6 py-3 rounded">
            Publish
          </button>
        </form>
      </div>
    </>
  );
}

export default CreatePost;