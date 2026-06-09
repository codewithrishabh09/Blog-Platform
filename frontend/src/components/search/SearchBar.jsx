import { useState } from "react";

function SearchBar({ posts, setFiltered }) {

  const [query, setQuery] = useState("");

  const search = (e) => {
    const value = e.target.value;

    setQuery(value);

    const result = posts.filter((post) =>
      post.title
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    setFiltered(result);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={search}
      placeholder="Search blogs..."
      className="border p-3 rounded-lg w-full"
    />
  );
}

export default SearchBar;