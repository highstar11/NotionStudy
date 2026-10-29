import { Suspense } from "react";
import { notFound } from "next/navigation";
import ReactMarkdown, { type Components } from "react-markdown";
import { getPostBySlug, getPublishedPosts } from "@/lib/posts";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import LoadingComponents from "@/components/LoadingComponents";
import "highlight.js/styles/github-dark.css";

export async function generateStaticParams() {
    const posts = await getPublishedPosts();
    return posts.filter((p) => p.slug).map((p) => ({ slug: p.slug }));
}

const components: Components = {
    table: ({ children }) => (
        <div className="not-prose my-8 overflow-x-auto rounded-xl border border-neutral-200">
            <table className="w-full min-w-[32rem] border-collapse text-left text-[0.9375rem]">
                {children}
            </table>
        </div>
    ),
    thead: ({ children }) => (
        <thead className="bg-[#242424] text-white">{children}</thead>
    ),
    th: ({ children }) => (
        <th className="px-4 py-3 text-sm font-semibold">{children}</th>
    ),
    tr: ({ children }) => (
        <tr className="border-b border-neutral-200 last:border-b-0 even:bg-neutral-50">
            {children}
        </tr>
    ),
    td: ({ children }) => (
        <td className="px-4 py-3 text-neutral-700">{children}</td>
    ),
    a: ({ href, children }) => {
        const external = href?.startsWith("http");
        return (
            <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
                {children}
            </a>
        );
    },
};

async function PostContent({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(decodeURIComponent(slug));
    if (!post) notFound();

    return (
        <article>
            {/* 글 헤더 */}
            <header className="mb-10 sm:mb-14">
        <span
            aria-hidden
            className="mb-6 block h-1.5 w-12 rounded-full bg-[#242424] sm:mb-8 sm:w-16"
        />
                <h1 className="text-balance break-keep text-[1.875rem] font-extrabold leading-[1.3] tracking-tight text-[#242424] sm:text-[2.75rem] sm:leading-[1.25]">
                    {post.title}
                </h1>
                <div className="mt-8 border-b border-neutral-200 sm:mt-10" />
            </header>

            {/* 본문 */}
            <div
                className="
          prose max-w-none break-keep
          prose-base sm:prose-lg

          [--tw-prose-body:#3b3b3b]
          [--tw-prose-headings:#242424]
          [--tw-prose-lead:#3b3b3b]
          [--tw-prose-links:#242424]
          [--tw-prose-bold:#242424]
          [--tw-prose-counters:#242424]
          [--tw-prose-bullets:#242424]
          [--tw-prose-hr:#e5e5e5]
          [--tw-prose-quotes:#242424]
          [--tw-prose-quote-borders:#242424]
          [--tw-prose-captions:#737373]
          [--tw-prose-code:#242424]
          [--tw-prose-pre-code:#e6edf3]
          [--tw-prose-pre-bg:#242424]

          prose-headings:scroll-mt-24 prose-headings:text-balance prose-headings:font-bold prose-headings:tracking-tight

          prose-h2:mt-16 prose-h2:mb-5 prose-h2:border-l-[5px] prose-h2:border-[#242424]
          prose-h2:pl-4 prose-h2:text-[1.375rem] prose-h2:leading-snug sm:prose-h2:text-[1.625rem]
          prose-h3:mt-10 prose-h3:mb-3 prose-h3:text-lg sm:prose-h3:text-xl

          prose-p:leading-[1.95]
          prose-li:my-1.5 prose-li:leading-[1.85]
          prose-strong:font-bold

          prose-a:font-medium prose-a:underline prose-a:decoration-2
          prose-a:decoration-[#242424]/25 prose-a:underline-offset-4
          prose-a:transition-colors hover:prose-a:decoration-[#242424]

          prose-blockquote:rounded-r-xl prose-blockquote:border-l-4 prose-blockquote:bg-neutral-100
          prose-blockquote:px-5 prose-blockquote:py-1 prose-blockquote:font-medium prose-blockquote:not-italic
          [&_blockquote_p]:before:content-none [&_blockquote_p]:after:content-none

          prose-img:mx-auto prose-img:my-10 prose-img:h-auto prose-img:max-w-full
          prose-img:rounded-xl prose-img:border prose-img:border-neutral-200

          prose-code:rounded-md prose-code:border prose-code:border-neutral-200 prose-code:bg-neutral-100
          prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.875em] prose-code:font-medium
          prose-code:before:content-none prose-code:after:content-none

          prose-pre:my-8 prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:bg-[#242424]
          prose-pre:p-0 prose-pre:text-[0.8125rem] prose-pre:leading-7 sm:prose-pre:text-sm
          [&_pre_code]:block [&_pre_code]:border-0 [&_pre_code]:bg-transparent [&_pre_code]:p-4
          sm:[&_pre_code]:px-5 [&_pre_code]:font-normal
          [&_pre_code.hljs]:bg-transparent [&_pre_code.hljs]:p-4 sm:[&_pre_code.hljs]:px-5

          prose-hr:my-14
        "
            >
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeHighlight]}
                    components={components}
                >
                    {post.content}
                </ReactMarkdown>
            </div>
        </article>
    );
}

export default function PostPage({
                                     params,
                                 }: {
    params: Promise<{ slug: string }>;
}) {
    return (
        <div className="min-h-screen bg-white text-[#242424] antialiased selection:bg-[#242424] selection:text-white">
            <main className="mx-auto w-full max-w-[44rem] px-5 pb-24 pt-12 sm:px-8 sm:pb-32 sm:pt-20">
                <Suspense fallback={<LoadingComponents />}>
                    <PostContent params={params} />
                </Suspense>
            </main>
        </div>
    );
}