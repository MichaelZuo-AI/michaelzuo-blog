"use client";

import { useCallback, useState } from "react";
import LanguageToggle from "./LanguageToggle";

export default function PostContent({
  title,
  titleZh,
  contentHtml,
  contentHtmlZh,
  hasTranslation,
}: {
  title: string;
  titleZh?: string;
  contentHtml: string;
  contentHtmlZh?: string;
  hasTranslation: boolean;
}) {
  const [lang, setLang] = useState<"en" | "zh">("en");

  const handleChange = useCallback((newLang: "en" | "zh") => {
    setLang(newLang);
  }, []);

  const html = lang === "zh" && contentHtmlZh ? contentHtmlZh : contentHtml;
  const displayTitle = lang === "zh" && titleZh ? titleZh : title;

  return (
    <>
      {hasTranslation && (
        <div className="mb-4 flex justify-end">
          <LanguageToggle onChange={handleChange} />
        </div>
      )}
      <h1
        className="font-bold mb-10"
        style={{
          color: "var(--title)",
          fontSize: "2.5rem",
          lineHeight: 1.15,
          letterSpacing: "-0.015em",
        }}
      >
        {displayTitle}
      </h1>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}
