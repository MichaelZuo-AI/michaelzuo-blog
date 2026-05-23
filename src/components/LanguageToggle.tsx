"use client";

export default function LanguageToggle({
  lang,
  onChange,
}: {
  lang: "en" | "zh";
  onChange: (lang: "en" | "zh") => void;
}) {
  const toggle = () => {
    const next = lang === "en" ? "zh" : "en";
    onChange(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="mz-language-toggle"
    >
      {lang === "en" ? "中文" : "EN"}
    </button>
  );
}
