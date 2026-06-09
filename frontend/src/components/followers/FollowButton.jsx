import { useState } from "react";

function FollowButton() {

  const [followed, setFollowed] =
    useState(false);

  return (
    <button
      onClick={() =>
        setFollowed(!followed)
      }
      className={`px-5 py-2 rounded ${
        followed
          ? "bg-gray-300"
          : "bg-blue-600 text-white"
      }`}
    >
      {followed
        ? "Following"
        : "Follow"}
    </button>
  );
}

export default FollowButton;