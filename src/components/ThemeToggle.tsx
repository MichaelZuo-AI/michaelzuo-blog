"use client";

import { useEffect, useSyncExternalStore } from "react";

const THEME_CHANGE_EVENT = "mz-theme-change";
const DARK_MODE_QUERY = "(prefers-color-scheme: dark)";

function getThemeSnapshot() {
  if (typeof window === "undefined") {
    return false;
  }

  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia(DARK_MODE_QUERY).matches;

  return saved === "dark" || (!saved && prefersDark);
}

function subscribeToThemeChange(callback: () => void) {
  const mediaQuery = window.matchMedia(DARK_MODE_QUERY);

  window.addEventListener("storage", callback);
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  mediaQuery.addEventListener("change", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
    mediaQuery.removeEventListener("change", callback);
  };
}

export default function ThemeToggle() {
  const dark = useSyncExternalStore(
    subscribeToThemeChange,
    getThemeSnapshot,
    () => false
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggle = () => {
    const next = !dark;
    localStorage.setItem("theme", next ? "dark" : "light");
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="mz-mode-toggle"
    >
      <span aria-hidden="true" />
      {dark ? "light" : "dark"}
    </button>
  );
}
