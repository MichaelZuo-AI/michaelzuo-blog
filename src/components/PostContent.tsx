"use client";

import { useCallback, useState } from "react";
import LanguageToggle from "./LanguageToggle";

export default function PostContent({
  contentHtml,
  contentHtmlZh,
  hasTranslation,
}: {
  contentHtml: string;
  contentHtmlZh?: string;
  hasTranslation: boolean;
}) {
  const [lang, setLang] = useState<"en" | "zh">("en");

  const handleChange = useCallback((newLang: "en" | "zh") => {
    setLang(newLang);
  }, []);

  const html = lang === "zh" && contentHtmlZh ? contentHtmlZh : contentHtml;

  return (
    <>
      {hasTranslation && (
        <div className="mb-4 flex justify-end">
          <LanguageToggle onChange={handleChange} />
        </div>
      )}
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}
