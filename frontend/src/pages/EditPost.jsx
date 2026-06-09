import { useState } from "react";

function EditPost() {

  const [title, setTitle] = useState("");

  const [content, setContent] =
    useState("");

  const submit = (e) => {
    e.preventDefault();

    console.log({
      title,
      content,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-5">
        Edit Blog
      </h1>

      <form onSubmit={submit}>

        <input
          type="text"
          className="border p-3 w-full mb-4"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          rows="10"
          className="border p-3 w-full mb-4"
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
        />

        <button className="bg-blue-600 text-white px-5 py-3 rounded">
          Update Post
        </button>

      </form>

    </div>
  );
}

export default EditPost;