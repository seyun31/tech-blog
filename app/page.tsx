import { getAllPosts } from "@/lib/posts";
import { getDiscussionStats } from "@/lib/discussions";
import HomeContent from "@/app/HomeContent";

export default async function Home() {
  const [posts, stats] = await Promise.all([
    getAllPosts(),
    getDiscussionStats(),
  ]);

  return <HomeContent posts={posts} stats={stats} />;
}
