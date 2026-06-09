import { useState } from "react";

function LikeButton() {

  const [liked, setLiked] = useState(false);

  return (
    <button
      onClick={() => setLiked(!liked)}
      className={`px-4 py-2 rounded ${
        liked
          ? "bg-red-500 text-white"
          : "bg-gray-200"
      }`}
    >
      ❤️ Like
    </button>
  );
}

export default LikeButton;