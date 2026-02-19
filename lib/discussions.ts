export type DiscussionStats = Record<
  string,
  { reactions: number; comments: number }
>;

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

export async function getDiscussionStats(): Promise<DiscussionStats> {
  const token = process.env.GITHUB_TOKEN;

  if (!token || token === "ghp_xxx") {
    return {};
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
      return {};
    }

    const data = await res.json();
    const discussions = data?.data?.repository?.discussions?.nodes ?? [];

    const stats: DiscussionStats = {};

    for (const discussion of discussions) {
      const title: string = discussion.title ?? "";
      const slug = title.replace(/^\/?(blog\/)?/, "");
      if (!slug) continue;

      stats[slug] = {
        reactions: discussion.reactions?.totalCount ?? 0,
        comments: discussion.comments?.totalCount ?? 0,
      };
    }

    return stats;
  } catch {
    return {};
  }
}
