import Link from "next/link";
import { Post } from "@/lib/types";

interface SidebarProps {
  posts: Post[];
}

export default function Sidebar({ posts }: SidebarProps) {
  const popular = posts.slice(0, 5);

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
            <li className="text-sm text-muted">아직 글이 없습니다.</li>
          )}
        </ol>
      </div>

      {/* 최신 댓글 */}
      <div className="rounded-2xl bg-card p-5">
        <h3 className="mb-4 text-base font-bold text-foreground">최신 댓글</h3>
        <div className="flex flex-col gap-3">
          <div className="rounded-xl bg-background p-3.5">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-card text-xs">
                🧑‍💻
              </div>
              <span className="text-sm font-medium">익명</span>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              좋은 글 감사합니다! 많은 도움이 됐어요.
            </p>
          </div>
          <div className="rounded-xl bg-background p-3.5">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-card text-xs">
                👩‍💻
              </div>
              <span className="text-sm font-medium">개발자</span>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              코드 예제가 깔끔해서 따라하기 좋았습니다.
            </p>
          </div>
          <div className="rounded-xl bg-background p-3.5">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-card text-xs">
                🎨
              </div>
              <span className="text-sm font-medium">디자이너</span>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              다크모드 구현 부분이 특히 유용했어요!
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
