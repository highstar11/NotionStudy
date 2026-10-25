import { Suspense } from "react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getPostBySlug, getPublishedPosts } from "@/lib/posts";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.filter((p) => p.slug).map((p) => ({ slug: p.slug }));
}

async function PostContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(decodeURIComponent(slug));
  if (!post) notFound();

    return (
        <article
            className="
      prose prose-neutral max-w-none dark:prose-invert
      break-keep
      prose-headings:font-bold prose-headings:tracking-tight
      prose-h1:mb-8 prose-h1:text-4xl
      prose-h2:mt-14 prose-h2:mb-4 prose-h2:border-b prose-h2:pb-2 prose-h2:text-2xl
      prose-h3:mt-10 prose-h3:mb-3 prose-h3:text-xl
      prose-p:leading-8
      prose-li:my-1
      prose-a:underline-offset-4
      prose-img:rounded-lg
      prose-code:rounded prose-code:bg-neutral-100 prose-code:px-1.5 prose-code:py-0.5
      prose-code:before:content-none prose-code:after:content-none
      dark:prose-code:bg-neutral-800
    "
        >
            <h1>{post.title}</h1>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeHighlight]}
            >
                {post.content}
            </ReactMarkdown>
        </article>
    );
}

export default function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <Suspense fallback={<p>불러오는 중...</p>}>
        <PostContent params={params} />
      </Suspense>
    </main>
  );
}