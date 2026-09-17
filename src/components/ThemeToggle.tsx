"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-5 h-5" />; // placeholder
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      aria-label="Toggle Dark Mode"
    >
      {theme === "dark" ? (
        <Sun size={18} className="text-[#F3F1EE]" strokeWidth={1.5} />
      ) : (
        <Moon size={18} className="text-[#1A1A1A]" strokeWidth={1.5} />
      )}
    </button>
  );
}
