"use client";

import { useEffect, useState } from "react";

export default function LanguageToggle({
  onChange,
}: {
  onChange: (lang: "en" | "zh") => void;
}) {
  const [lang, setLang] = useState<"en" | "zh">("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "zh") {
      setLang("zh");
      onChange("zh");
    }
  }, [onChange]);

  const toggle = () => {
    const next = lang === "en" ? "zh" : "en";
    setLang(next);
    localStorage.setItem("lang", next);
    onChange(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="text-sm font-medium cursor-pointer px-3 py-1 rounded-md transition-colors"
      style={{ color: "var(--text-secondary)", backgroundColor: "var(--bg-card)", border: "1px solid var(--border-light)" }}
    >
      {lang === "en" ? "中文" : "EN"}
    </button>
  );
}
