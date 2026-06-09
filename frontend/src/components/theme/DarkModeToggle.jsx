import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

function DarkModeToggle() {
  const { darkMode, toggleTheme } =
    useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-gray-800 text-white rounded"
    >
      {darkMode ? "☀ Light" : "🌙 Dark"}
    </button>
  );
}

export default DarkModeToggle;