import Link from "next/link";
import type { CSSProperties } from "react";
import { getPublishedPosts } from "@/lib/posts";

type Post = Awaited<ReturnType<typeof getPublishedPosts>>[number];


const SOCIALS = [
    { label: "GitHub", href: "https://github.com/highstar11", icon: GithubIcon },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ks-kim-5392893b4", icon: LinkedinIcon },
    { label: "Velog", href: "https://velog.io/@kando", icon: VelogIcon },
    { label: "Email", href: "mailto:iamgosung@gamil.com", icon: MailIcon },
];

const STEPS = [
    { title: "노션에서 작성", desc: "평소 쓰던 스터디 페이지에 공부 기록을 남겨요." },
    { title: "상태를 공개로", desc: "올리고 싶은 글만 상태를 ‘공개’로 바꿔요." },
    { title: "사이트에 반영", desc: "복사 · 붙여넣기 없이 블로그에 글이 올라와요." },
];

const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600";

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

const iconProps = {
    viewBox: "0 0 24 24",
    className: "size-6",
    "aria-hidden": true,
} as const;

function GithubIcon() {
    return (
        <svg {...iconProps} fill="currentColor">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
        </svg>
    );
}

function LinkedinIcon() {
    return (
        <svg {...iconProps} fill="currentColor">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
        </svg>
    );
}

function VelogIcon() {
    return (
        <svg {...iconProps}>
            <rect x="1" y="1" width="22" height="22" rx="5" fill="currentColor" />
            <path
                d="M6.5 7.5l3.2 9 3.2-9M14.5 12h3.5a1.75 1.75 0 0 1 0 3.5h-.5"
                fill="none"
                className="stroke-white dark:stroke-zinc-950"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function MailIcon() {
    return (
        <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
            <path d="m3.5 7 8.5 6 8.5-6" />
        </svg>
    );
}

function SocialButton({ label, href, icon: Icon }: (typeof SOCIALS)[number]) {
    const external = href.startsWith("http");
    return (
        <a
            href={href}
            aria-label={label}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={`group flex size-16 items-center justify-center rounded-3xl border border-zinc-200 bg-white text-zinc-700 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:text-blue-600 sm:size-20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-blue-400 dark:hover:text-blue-400 ${focus}`}
        >
            <Icon />
        </a>
    );
}

function Arrow() {
    return (
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
    );
}

function CtaButton() {
    return (
        <Link
            href="/posts"
            className={`group inline-flex h-14 items-center gap-4 rounded-full bg-black pl-8 pr-2 text-base font-semibold text-white transition-transform duration-300 hover:scale-105 active:scale-95 ${focus}`}
        >
            글 보러 가기
            <span aria-hidden className="grid size-10 -rotate-45 place-items-center rounded-full bg-white text-black transition-transform duration-300 group-hover:rotate-0">
                <Arrow />
            </span>
        </Link>
    );
}

function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
    const base = "relative flex flex-col justify-between transition-all duration-300";
    const style = featured
        ? "group min-h-72 rounded-[2rem] bg-zinc-950 p-7 text-white hover:bg-zinc-800 sm:p-10 md:col-span-2 md:row-span-2 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
        : "min-h-48 rounded-3xl border border-zinc-200 bg-zinc-50 p-6 hover:-translate-y-1 hover:border-blue-500 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-400";

    return (
        <Link href={`/posts/${post.slug}`} className={`${base} ${style} ${focus}`}>
            <div className="flex items-center justify-between gap-4 text-sm opacity-70">
                {post.tag ? <span className="rounded-full border border-current/25 px-3 py-1">{post.tag}</span> : <span />}
                <time className="tabular-nums">{post.date}</time>
            </div>

            <h2 className={featured ? "pr-16 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl" : "mt-8 text-xl font-semibold leading-snug"}>
                {post.title}
            </h2>

            {featured && (
                <span aria-hidden className="absolute bottom-7 right-7 grid size-12 -rotate-45 place-items-center rounded-full border border-current/25 transition-all duration-300 group-hover:rotate-0 group-hover:bg-white group-hover:text-zinc-950 sm:bottom-10 sm:right-10 dark:group-hover:bg-zinc-950 dark:group-hover:text-white">
                    <Arrow />
                </span>
            )}
        </Link>
    );
}

export default async function Home() {
    const posts = (await getPublishedPosts()).filter((p) => p.slug).slice(0, 3);
    const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

    return (
        <main className="w-full flex-1 overflow-x-clip bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
            <style>{MOTION_CSS}</style>

            <div className="mx-auto w-full max-w-7xl px-6 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-20">
                {/* 히어로 */}
                <section>
                    <h1 className="rise text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
                        배운 것을 쌓고,
                        <br />
                        공개할 것만 올립니다.
                    </h1>
                    <p className="rise mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400" style={delay(150)}>
                        노션에 정리한 공부 기록이 그대로 블로그가 돼요. 한 곳에서 쓰고, 필요한 글만 공개해요.
                    </p>
                    <div className="rise mt-10 flex" style={delay(300)}>
                        <CtaButton />
                    </div>
                </section>

                {/* 최근 기록 (최대 3개) */}
                {posts.length > 0 && (
                    <section aria-label="최근 기록" className="reveal mt-20 sm:mt-28">
                        <div className="grid gap-4 md:grid-cols-3">
                            {posts.map((post, i) => (
                                <PostCard key={post.slug} post={post} featured={i === 0} />
                            ))}
                        </div>
                    </section>
                )}

                <section aria-labelledby="flow" className="reveal mt-20 sm:mt-28">
                    <h2 id="flow" className="text-2xl font-bold tracking-tight sm:text-3xl">
                        쓰는 방법은 간단해요
                    </h2>
                    <ol className="mt-8 grid gap-4 sm:grid-cols-3">
                        {STEPS.map((s, i) => (
                            <li key={s.title} className="rounded-3xl border border-zinc-200 p-6 dark:border-zinc-800">
                                <span className="grid size-9 place-items-center rounded-full bg-black text-sm font-semibold text-white">{i + 1}</span>
                                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                                <p className="mt-2 leading-7 text-zinc-600 dark:text-zinc-400">{s.desc}</p>
                            </li>
                        ))}
                    </ol>
                </section>

                <section aria-labelledby="contact" className="reveal mt-20 flex flex-col items-center gap-8 rounded-[2rem] bg-zinc-100 p-8 text-center sm:mt-28 sm:p-12 dark:bg-zinc-900">
                    <h2 id="contact" className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        다른 곳에서도 만나요
                    </h2>
                    <ul className="flex flex-wrap justify-center gap-4">
                        {SOCIALS.map((s) => (
                            <li key={s.label}>
                                <SocialButton {...s} />
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </main>
    );
}