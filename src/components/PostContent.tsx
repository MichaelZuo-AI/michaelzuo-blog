"use client";

import { useCallback, useSyncExternalStore } from "react";
import LanguageToggle from "./LanguageToggle";

const LANGUAGE_CHANGE_EVENT = "mz-language-change";

function getLanguageSnapshot(): "en" | "zh" {
  if (typeof window === "undefined") {
    return "en";
  }

  return localStorage.getItem("lang") === "zh" ? "zh" : "en";
}

function subscribeToLanguageChange(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(LANGUAGE_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, callback);
  };
}

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
  const lang = useSyncExternalStore<"en" | "zh">(
    subscribeToLanguageChange,
    getLanguageSnapshot,
    () => "en"
  );

  const handleChange = useCallback((newLang: "en" | "zh") => {
    localStorage.setItem("lang", newLang);
    window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
  }, []);

  const html = lang === "zh" && contentHtmlZh ? contentHtmlZh : contentHtml;
  const displayTitle = lang === "zh" && titleZh ? titleZh : title;

  return (
    <>
      {hasTranslation && (
        <div className="mz-post-tools">
          <LanguageToggle lang={lang} onChange={handleChange} />
        </div>
      )}
      <h1
        className="mz-post-title"
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
