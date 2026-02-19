"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import CategoryFilter from "@/components/CategoryFilter";
import Sidebar from "@/components/Sidebar";
import { Post } from "@/lib/types";

const CATEGORIES = ["All", "Develop", "Design", "CS", "Etc"];

type DiscussionStats = Record<string, { reactions: number; comments: number }>;

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selected, setSelected] = useState("All");
  const [activeSlide, setActiveSlide] = useState(0);
  const [stats, setStats] = useState<DiscussionStats>({});
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
    fetch("/api/discussions")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => setStats({}));
  }, []);

  const featuredPosts = posts.slice(0, 3);

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % Math.max(featuredPosts.length, 1));
    }, 2000);
  }, [featuredPosts.length]);

  useEffect(() => {
    if (featuredPosts.length <= 1) return;
    startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [featuredPosts.length, startAutoPlay]);

  const goToSlide = (index: number) => {
    setActiveSlide(index);
    startAutoPlay();
  };

  const filtered =
    selected === "All"
      ? posts
      : posts.filter((p) => p.frontmatter.category === selected);

  const current = featuredPosts[activeSlide];

  return (
    <div className="flex flex-col gap-10">
      {/* 메인 배너 부분(최신 3개 글) */}
      {featuredPosts.length > 0 && (
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {featuredPosts.map((post) => (
              <div key={post.slug} className="w-full flex-shrink-0 px-1">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <section className="relative flex min-h-[200px] flex-col justify-center gap-4 rounded-2xl bg-card p-6 transition-colors hover:bg-border/50 sm:p-8">
                    <span className="text-sm font-medium text-accent">
                      {post.frontmatter.category}
                    </span>
                    <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                      {post.frontmatter.title}
                    </h1>
                    <p className="text-[15px] leading-relaxed text-muted sm:text-base">
                      {post.frontmatter.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <time dateTime={post.frontmatter.date}>
                        {new Date(post.frontmatter.date).toLocaleDateString(
                          "ko-KR",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </time>
                      {post.frontmatter.tags?.length > 0 && (
                        <>
                          <span>·</span>
                          <span>{post.frontmatter.tags.join(", ")}</span>
                        </>
                      )}
                    </div>
                  </section>
                </Link>
              </div>
            ))}
          </div>
          {featuredPosts.length > 1 && (
            <div className="mt-3 flex justify-center gap-1.5">
              {featuredPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-1.5 rounded-full transition-all ${index === activeSlide
                    ? "w-4 bg-foreground"
                    : "w-1.5 bg-border hover:bg-muted"
                    }`}
                  aria-label={`슬라이드 ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 메인 콘텐츠 (전체 글 목록) + 사이드 바(인기 3개 글, 최신 댓글) */}
      <div className="flex gap-10">
        {/* 메인 콘텐츠 (전체 글 목록) */}
        <div className="flex min-w-0 flex-1 flex-col gap-0">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-bold tracking-tight">전체 아티클</h2>
            <span className="text-sm text-muted">
              {filtered.length}개의 글
            </span>
          </div>

          <div className="mt-3">
            <CategoryFilter
              categories={CATEGORIES}
              selected={selected}
              onSelect={setSelected}
            />
          </div>

          <div className="flex flex-col [&>*:last-child_article]:border-b-0">
            {filtered.map((post) => (
              <PostCard
                key={post.slug}
                slug={post.slug}
                frontmatter={post.frontmatter}
                reactions={stats[post.slug]?.reactions ?? 0}
                comments={stats[post.slug]?.comments ?? 0}
              />
            ))}
          </div>

          {/* 글이 없을 때 */}
          {filtered.length === 0 && (
            <p className="py-16 text-center text-muted">
              아직 작성된 글이 없습니다.
            </p>
          )}
        </div>

        {/* 사이드 바(인기 3개 글, 최신 댓글) */}
        <div className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-20">
            <Sidebar posts={posts} />
          </div>
        </div>
      </div>
    </div>
  );
}
