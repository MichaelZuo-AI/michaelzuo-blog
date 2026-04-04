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
        className="text-4xl font-bold leading-tight tracking-tight mb-10"
        style={{ color: "var(--title)" }}
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
