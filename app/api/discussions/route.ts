import { NextResponse } from "next/server";

const QUERY = `
  query {
    repository(owner: "seyun31", name: "tech-blog") {
      discussions(first: 50, orderBy: { field: UPDATED_AT, direction: DESC }) {
        nodes {
          title
          reactions {
            totalCount
          }
          comments {
            totalCount
          }
        }
      }
    }
  }
`;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token || token === "ghp_xxx") {
    return NextResponse.json({});
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY }),
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return NextResponse.json({});
    }

    const data = await res.json();
    const discussions = data?.data?.repository?.discussions?.nodes ?? [];

    const stats: Record<string, { reactions: number; comments: number }> = {};

    for (const discussion of discussions) {
      // Giscus maps pathname → discussion title (e.g. "blog/nextjs-blog-guide")
      const title: string = discussion.title ?? "";
      const slug = title.replace(/^\/?(blog\/)?/, "");
      if (!slug) continue;

      stats[slug] = {
        reactions: discussion.reactions?.totalCount ?? 0,
        comments: discussion.comments?.totalCount ?? 0,
      };
    }

    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({});
  }
}
