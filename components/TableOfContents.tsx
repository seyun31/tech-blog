"use client";

import { useEffect, useState } from "react";
import { TocItem } from "@/lib/toc";

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  // 화면 상단에 들어온 제목을 현재 위치로 강조
  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      // sticky 헤더 아래부터 화면 상단 20% 영역
      { rootMargin: "-64px 0px -80% 0px" }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="목차"
      className="fixed top-28 hidden max-h-[calc(100vh-10rem)] w-56 overflow-y-auto min-[1400px]:block"
      style={{ left: "calc(50% + 28rem + 2rem)" }}
    >
      <p className="mb-3 text-sm font-bold text-foreground">목차</p>
      <ul className="flex flex-col gap-2.5 border-l border-border">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-7" : "pl-4"}>
            <a
              href={`#${item.id}`}
              className={`block text-sm leading-snug transition-colors ${
                activeId === item.id
                  ? "font-medium text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
