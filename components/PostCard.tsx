import Link from "next/link";
import Image from "next/image";
import { PostFrontmatter } from "@/lib/types";

interface PostCardProps {
  slug: string;
  frontmatter: PostFrontmatter;
  reactions?: number;
  comments?: number;
}

export default function PostCard({ slug, frontmatter, reactions = 0, comments = 0 }: PostCardProps) {
  const { title, description, date, category, thumbnail } = frontmatter;

  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="flex gap-6 border-b border-border py-7 transition-colors">
        <div className="flex flex-1 flex-col justify-center gap-2.5">
          <div className="flex items-center gap-2 text-sm">
            <span className="rounded-md bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
              {category}
            </span>
            <time className="text-muted" dateTime={date}>
              {new Date(date).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <h2 className="text-xl font-bold leading-snug tracking-tight group-hover:text-accent">
            {title}
          </h2>
          <p className="line-clamp-2 text-[15px] leading-relaxed text-muted">
            {description}
          </p>
          <div className="flex items-center gap-3 pt-1 text-xs text-muted">
            <span className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
              </svg>
              {reactions}
            </span>
            <span className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
              </svg>
              {comments}
            </span>
          </div>
        </div>
        {thumbnail && (
          <div className="relative hidden h-32 w-44 shrink-0 overflow-hidden rounded-xl bg-card sm:block">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="176px"
            />
          </div>
        )}
      </article>
    </Link>
  );
}
