"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function Giscus() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!ref.current) return;

    const existingScript = ref.current.querySelector("script");
    if (existingScript) existingScript.remove();

    const existingWidget = ref.current.querySelector(".giscus");
    if (existingWidget) existingWidget.remove();

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "seyun31/tech-blog");
    script.setAttribute("data-repo-id", "R_kgDORTl3cg");
    script.setAttribute("data-category", "Announcements");
    script.setAttribute("data-category-id", "DIC_kwDORTl3cs4C2wb0");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute(
      "data-theme",
      resolvedTheme === "dark" ? "dark" : "light"
    );
    script.setAttribute("data-lang", "ko");
    script.setAttribute("data-loading", "lazy");
    script.crossOrigin = "anonymous";
    script.async = true;

    ref.current.appendChild(script);
  }, [resolvedTheme]);

  return <div ref={ref} />;
}
