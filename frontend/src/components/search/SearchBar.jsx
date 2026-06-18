import { useState } from "react";

function SearchBar({ posts, setFiltered }) {
  const [query, setQuery] = useState("");

  const search = (e) => {
    const value = e.target.value;
    setQuery(value);

    const result = (posts || []).filter((post) =>
      post.title.toLowerCase().includes(value.toLowerCase())
    );

    setFiltered(result);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={search}
      placeholder="Search posts…"
      className="w-full px-4 py-2.5 bg-white border border-[#E8E6E0] rounded-full text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/35 focus:outline-none focus:border-[#4C4A9E] transition-colors duration-150"
    />
  );
}

export default SearchBar;