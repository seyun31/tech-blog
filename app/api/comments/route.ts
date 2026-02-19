import { NextResponse } from "next/server";

interface DiscussionComment {
  author: { login: string; avatarUrl: string };
  body: string;
  createdAt: string;
  url: string;
}

interface CommentResult {
  author: string;
  avatarUrl: string;
  body: string;
  createdAt: string;
  url: string;
}

const QUERY = `
  query {
    repository(owner: "seyun31", name: "tech-blog") {
      discussions(first: 10, orderBy: { field: UPDATED_AT, direction: DESC }) {
        nodes {
          title
          url
          comments(last: 5) {
            nodes {
              author {
                login
                avatarUrl
              }
              body
              createdAt
              url
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token || token === "ghp_xxx") {
    return NextResponse.json([]);
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
      return NextResponse.json([]);
    }

    const data = await res.json();
    const discussions = data?.data?.repository?.discussions?.nodes ?? [];

    const allComments: CommentResult[] = [];

    for (const discussion of discussions) {
      const comments: DiscussionComment[] = discussion.comments?.nodes ?? [];
      for (const comment of comments) {
        if (!comment.author) continue;
        allComments.push({
          author: comment.author.login,
          avatarUrl: comment.author.avatarUrl,
          body: comment.body.length > 50
            ? comment.body.slice(0, 50) + "…"
            : comment.body,
          createdAt: comment.createdAt,
          url: comment.url,
        });
      }
    }

    // Sort by createdAt descending, take 3
    allComments.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(allComments.slice(0, 3));
  } catch {
    return NextResponse.json([]);
  }
}
