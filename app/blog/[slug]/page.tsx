import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPostBySlug, getAllSlugs } from "@/lib/posts";
import MdxContent from "@/components/MdxContent";
import Giscus from "@/components/Giscus";
import ShareButton from "@/components/ShareButton";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { title, date, category, tags } = post.frontmatter;

  return (
    <article className="flex flex-col gap-6">
      <header className="flex flex-col gap-3 border-b border-border pb-6">
        <span className="text-sm font-medium text-accent">&gt; {category}</span>
        <h1 className="text-3xl font-bold leading-tight tracking-tight">
          {title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-muted">
          <time dateTime={date}>
            {new Date(date).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
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
      </header>
      <MdxContent source={post.content} />

      {/* 공유하기 */}
      <div className="pt-4">
        <ShareButton />
      </div>

      <hr className="border-border" />

      {/* 댓글 */}
      <section>
        <Giscus />
      </section>
    </article>
  );
}
