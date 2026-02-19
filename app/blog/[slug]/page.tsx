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
      {/* 헤더 */}
      <header className="flex flex-col gap-4 mt-10">
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          {title}
        </h1>
        <div className="flex flex-col gap-1 text-sm">
          <time className="text-muted" dateTime={date}>
            {new Date(date).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </header>
      <MdxContent source={post.content} />

      {/* 공유하기 */}
      <div className="pt-16">
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
