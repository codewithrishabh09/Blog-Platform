import { useState } from "react";

function CommentForm({ onSubmit }) {
  const [comment, setComment] = useState("");

  const submit = (e) => {
    e.preventDefault();

    onSubmit(comment);

    setComment("");
  };

  return (
    <form onSubmit={submit}>
      <textarea
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
        className="border p-3 w-full"
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
      >
        Comment
      </button>
    </form>
  );
}

export default CommentForm;