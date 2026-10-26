// TODO: Suspense 사용에 대한 글 작성하기

import Link from "next/link";
import { Suspense } from "react";
import type { CSSProperties } from "react";
import { getPublishedPosts } from "@/lib/posts";

type Post = Awaited<ReturnType<typeof getPublishedPosts>>[number];

const UNTAGGED = "기타";

const focus =
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600";

const MOTION_CSS = `
@keyframes rise { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
.rise { animation: rise .9s cubic-bezier(.2,.7,.2,1) both; animation-delay: var(--d, 0ms); }
@supports (animation-timeline: view()) {
  .reveal { animation: rise linear both; animation-timeline: view(); animation-range: entry 0% entry 35%; }
}
@media (prefers-reduced-motion: reduce) {
  .rise, .reveal { animation: none !important; }
}
`;

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function Arrow() {
    return (
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
    );
}

function Chip({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            scroll={false}
            aria-current={active ? "page" : undefined}
            className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${focus} ${
                active
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-blue-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-blue-400"
            }`}
        >
            {children}
        </Link>
    );
}

function PostRow({ post }: { post: Post }) {
    return (
        <Link
            href={`/posts/${post.slug}`}
            className={`group flex items-center justify-between gap-4 rounded-3xl border border-zinc-200 bg-zinc-50 p-5 break-keep transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-400 ${focus}`}
        >
            <div className="min-w-0">
                <time className="text-sm tabular-nums text-zinc-500 dark:text-zinc-400">{post.date}</time>
                <h3 className="mt-1 text-lg font-semibold leading-snug sm:text-xl">{post.title}</h3>
            </div>
            <span
                aria-hidden
                className="grid size-10 shrink-0 -rotate-45 place-items-center rounded-full border border-zinc-300 text-zinc-500 transition-all duration-300 group-hover:rotate-0 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white dark:border-zinc-700"
            >
                <Arrow />
            </span>
        </Link>
    );
}

function PostsFallback() {
    return (
        <div aria-busy="true" aria-label="글 목록을 불러오는 중" className="mt-10">
            <div className="flex flex-wrap gap-2">
                {[72, 88, 64, 80].map((w, i) => (
                    <div
                        key={i}
                        style={{ width: w }}
                        className="h-10 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-900"
                    />
                ))}
            </div>
            <div className="mt-14 grid gap-4 sm:mt-20 md:grid-cols-2">
                {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="h-24 animate-pulse rounded-3xl bg-zinc-100 dark:bg-zinc-900" />
                ))}
            </div>
        </div>
    );
}

export default function PostsPage({
                                      searchParams,
                                  }: {
    searchParams: Promise<{ tag?: string }>;
}) {
    return (
        <main className="w-full flex-1 overflow-x-clip bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
            <style>{MOTION_CSS}</style>

            <div className="mx-auto w-full max-w-7xl px-6 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-20">
                {/* 정적 셸: 헤더 */}
                <header>
                    <h1 className="rise text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">Posts</h1>
                    <p className="rise mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400" style={delay(150)}>
                        정리한 글들을 태그별로 모아두었어요.
                    </p>
                </header>

                {/* 동적 영역: searchParams + 글 목록 */}
                <Suspense fallback={<PostsFallback />}>
                    <PostsContent searchParams={searchParams} />
                </Suspense>
            </div>
        </main>
    );
}

async function PostsContent({
                                searchParams,
                            }: {
    searchParams: Promise<{ tag?: string }>;
}) {
    const { tag: selected } = await searchParams;
    const published = (await getPublishedPosts()).filter((p) => p.slug);

    if (published.length === 0) {
        return (
            <p className="mt-16 rounded-[2rem] bg-zinc-100 p-10 text-center text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                아직 공개된 글이 없습니다.
            </p>
        );
    }

    // 태그별 그룹핑 (등장 순서 유지, 태그 없는 글은 '기타')
    const groups = new Map<string, Post[]>();
    for (const p of published) {
        const key = p.tag || UNTAGGED;
        groups.set(key, [...(groups.get(key) ?? []), p]);
    }
    const tags = [...groups.keys()];
    const isValid = !!selected && groups.has(selected);

    const visible: [string, Post[]][] = isValid
        ? [[selected, groups.get(selected)!]]
        : [...groups];

    return (
        <>
            <nav aria-label="태그 필터" className="mt-10 flex flex-wrap gap-2">
                <Chip href="/posts" active={!isValid}>
                    전체
                    <span className="tabular-nums opacity-70">{published.length}</span>
                </Chip>
                {tags.map((t) => (
                    <Chip key={t} href={`/posts?tag=${encodeURIComponent(t)}`} active={selected === t}>
                        {t}
                        <span className="tabular-nums opacity-70">{groups.get(t)!.length}</span>
                    </Chip>
                ))}
            </nav>

            <div className="mt-14 space-y-14 sm:mt-20 sm:space-y-20">
                {visible.map(([tag, items]) => (
                    <section key={tag} aria-labelledby={`tag-${tag}`} className="reveal">
                        <div className="flex items-center gap-3">
                            <h2 id={`tag-${tag}`} className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                {tag}
                            </h2>
                            <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold tabular-nums text-white">
                                {items.length}
                            </span>
                        </div>
                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            {items.map((p) => (
                                <PostRow key={p.id} post={p} />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </>
    );
}