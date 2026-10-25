import Link from "next/link";
import { getPublishedPosts } from "@/lib/posts";

export default async function PostsPage() {
    const posts = await getPublishedPosts();
    const published = posts.filter((p) => p.slug);

    return (
        <main className="m-0 max-w-6xl px-6 py-12">
            <h1 className="text-4xl font-bold tracking-tight">Posts</h1>
            <p className="mt-2 text-neutral-500">
                정리한 글들을 모아두었습니다.
            </p>

            {published.length === 0 ? (
                <p className="mt-12 text-neutral-500">아직 공개된 글이 없습니다.</p>
            ) : (
                <ul className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
                    {published.map((p) => (
                        <li key={p.id}>
                            <Link
                                href={`/posts/${p.slug}`}
                                className="group flex items-center justify-between gap-4 py-5 break-keep"
                            >
                <span className="text-lg font-medium transition-colors group-hover:text-neutral-500">
                  {p.title}
                </span>
                                <span className="text-neutral-400 transition-transform group-hover:translate-x-1">
                  →
                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}