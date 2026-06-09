import { useState } from "react";

function BookmarkButton() {

  const [saved, setSaved] = useState(false);

  return (
    <button
      onClick={() => setSaved(!saved)}
      className={`px-4 py-2 rounded ${
        saved
          ? "bg-green-500 text-white"
          : "bg-gray-200"
      }`}
    >
      🔖 Save
    </button>
  );
}

export default BookmarkButton;