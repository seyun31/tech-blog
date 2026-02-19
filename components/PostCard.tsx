import Link from "next/link";
import Image from "next/image";
import { PostFrontmatter } from "@/lib/types";

interface PostCardProps {
  slug: string;
  frontmatter: PostFrontmatter;
}

export default function PostCard({ slug, frontmatter }: PostCardProps) {
  const { title, description, date, category, tags, thumbnail } = frontmatter;

  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="flex gap-6 border-b border-border py-7 transition-colors">
        <div className="flex flex-1 flex-col justify-center gap-2.5">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-accent">{category}</span>
            <span className="text-muted">·</span>
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
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-card px-2 py-0.5 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
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
