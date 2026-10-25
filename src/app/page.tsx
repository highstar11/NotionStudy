import Link from "next/link";

const FEATURES = [
  {
    icon: "✍️",
    title: "노션에서 작성",
    desc: "익숙한 노션에 공부 기록을 남기면 돼요.",
  },
  {
    icon: "🚀",
    title: "자동 발행",
    desc: "상태를 공개로 바꾸면 사이트에 올라가요.",
  },
  {
    icon: "🎮",
    title: "레벨 업 시스템 (추가 예정)",
    desc: "꾸준히 쓸수록 XP가 쌓이는 공부 기록장.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 pb-16 pt-12 sm:pt-20">
      <section className="flex flex-col items-center text-center">
        <span className="mb-6 inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
          🚧 현재 개발 중
        </span>

        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
          작성하면 쌓이고,
          <br />
          <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
            간단하게 발행되는
          </span>{" "}
          나의 공부 기록
        </h1>

        <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          노션에 정리한 공부 기록을 그대로 블로그로.
          <br />
          복붙 없이, 한 곳에서 쓰고 필요한 것만 공개해요.
        </p>

        <div className="mt-9">
          <Link
            href="/posts"
            className="inline-flex h-12 items-center rounded-full bg-zinc-900 px-7 font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-zinc-100 dark:text-zinc-900"
          >
            글 보러 가기 →
          </Link>
        </div>
      </section>

      {/* Features */}
      <section
        aria-label="주요 기능"
        className="mt-16 grid gap-4 sm:mt-20 sm:grid-cols-3"
      >
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-black/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-zinc-900"
          >
            <span className="text-3xl">{f.icon}</span>
            <h2 className="mt-3 text-base font-bold text-zinc-900 dark:text-zinc-50">
              {f.title}
            </h2>
            <p className="mt-1.5 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {f.desc}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}