import { getPublishedPosts } from "@/lib/posts";

export default async function PostsPage() {
  const posts = await getPublishedPosts();
  
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Posts</h1>
      <ul className="mt-4 space-y-2">
        {posts.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </main>
  );
}

