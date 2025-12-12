import { useEffect, useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <label className="swap swap-rotate cursor-pointer">
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />

      {/* Light Mode Icon */}
      <MdLightMode className="swap-off w-6 h-6 text-black" />

      {/* Dark Mode Icon */}
      <MdDarkMode className="swap-on w-6 h-6 text-white" />
    </label>
  );
};

export default ThemeToggle;
