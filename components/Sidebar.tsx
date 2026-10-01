"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/types";
import { DiscussionStats } from "@/lib/discussions";
import { CommentsSkeleton } from "@/components/Skeleton";

interface Comment {
  author: string;
  avatarUrl: string;
  body: string;
  createdAt: string;
  url: string;
}

interface SidebarProps {
  posts: Post[];
  stats: DiscussionStats;
}

const POPULAR_COUNT = 3;

export default function Sidebar({ posts, stats }: SidebarProps) {
  // 좋아요 + 댓글 수가 많은 순 (동점이면 최신 글 우선, 반응이 없는 글은 제외)
  const score = (post: Post) =>
    (stats[post.slug]?.reactions ?? 0) + (stats[post.slug]?.comments ?? 0);
  const popular = posts
    .filter((post) => score(post) > 0)
    .sort((a, b) => score(b) - score(a))
    .slice(0, POPULAR_COUNT);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/comments")
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch(() => setComments([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <aside className="flex flex-col gap-6">
      {/* 인기 있는 글 */}
      <div className="rounded-2xl bg-card p-5">
        <h3 className="mb-4 text-base font-bold text-foreground">
          인기 있는 글
        </h3>
        <ol className="flex flex-col gap-4">
          {popular.map((post, index) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex items-start gap-3"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-background text-sm font-bold text-accent">
                  {index + 1}
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium leading-snug group-hover:text-accent">
                    {post.frontmatter.title}
                  </span>
                  <span className="text-xs text-muted">
                    {post.frontmatter.category}
                  </span>
                </div>
              </Link>
            </li>
          ))}
          {popular.length === 0 && (
            <li className="text-sm text-muted">아직 인기 있는 글이 없습니다.</li>
          )}
        </ol>
      </div>

      {/* 최신 댓글 */}
      <div className="rounded-2xl bg-card p-5">
        <h3 className="mb-4 text-base font-bold text-foreground">최신 댓글</h3>
        <div className="flex flex-col gap-3">
          {loading ? (
            <CommentsSkeleton />
          ) : comments.length === 0 ? (
            <p className="text-sm text-muted">아직 댓글이 없습니다.</p>
          ) : (
            comments.map((comment, index) => (
              <a
                key={index}
                href={comment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-background p-3.5 transition-colors hover:bg-muted/10"
              >
                <div className="mb-2 flex items-center gap-2">
                  <Image
                    src={comment.avatarUrl}
                    alt={comment.author}
                    width={28}
                    height={28}
                    className="shrink-0 rounded-full"
                  />
                  <span className="text-sm font-medium">{comment.author}</span>
                  <span className="ml-auto text-xs text-muted">
                    {new Date(comment.createdAt).toLocaleDateString("ko-KR")}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted">
                  {comment.body}
                </p>
              </a>
            ))
          )}
        </div>
      </div>
    </aside>
  );
}
