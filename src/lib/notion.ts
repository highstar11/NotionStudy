// lib/notion.ts
import { Client, isFullPage } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { notionProps } from "@/type/type";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const PUBLISHED_VALUE = "공개";

export type PostSummary = {
  id: string;
  title: string;
  slug: string;
  date: string | undefined;
  tag: string;
};

/* ---------- Markdown 변환 설정 ---------- */

const n2m = new NotionToMarkdown({ notionClient: notion });

// rich_text → 마크다운 (굵게/기울임/코드/취소선/링크 유지)
function richText(items: any[] = []): string {
  return items
      .map((t) => {
        let s: string = t.plain_text ?? "";
        if (!s.trim()) return s;
        const a = t.annotations ?? {};
        if (a.code) s = `\`${s}\``;
        if (a.bold) s = `**${s}**`;
        if (a.italic) s = `*${s}*`;
        if (a.strikethrough) s = `~~${s}~~`;
        if (t.href) s = `[${s}](${t.href})`;
        return s;
      })
      .join("");
}

function quote(text: string) {
  return text
      .split("\n")
      .map((line) => `> ${line}`)
      .join("\n");
}

// 콜아웃 → 인용문 + 아이콘
n2m.setCustomTransformer("callout", async (block: any) => {
  const icon = block.callout.icon?.emoji ?? "💡";
  return quote(`${icon} ${richText(block.callout.rich_text)}`);
});

// 북마크 / 임베드 / 비디오 / 파일 → 링크
n2m.setCustomTransformer("bookmark", async (block: any) => {
  const url = block.bookmark.url;
  return url ? `[${url}](${url})` : "";
});

n2m.setCustomTransformer("embed", async (block: any) => {
  const url = block.embed.url;
  return url ? `[${url}](${url})` : "";
});

n2m.setCustomTransformer("link_preview", async (block: any) => {
  const url = block.link_preview.url;
  return url ? `[${url}](${url})` : "";
});

n2m.setCustomTransformer("video", async (block: any) => {
  const v = block.video;
  const url = v.type === "external" ? v.external.url : v.file?.url;
  return url ? `[영상 보기](${url})` : "";
});

/* ---------- 목록 조회 ---------- */

export async function fetchPublishedPosts(): Promise<PostSummary[]> {
  const res = await notion.dataSources.query({
    data_source_id: process.env.NOTION_DATA_SOURCE_ID!,
    filter: { property: notionProps.status, select: { equals: PUBLISHED_VALUE } },
    sorts: [{ property: notionProps.date, direction: "descending" }],
  });

  return res.results.filter(isFullPage).map((page) => {
    const title = page.properties[notionProps.title];
    const slug = page.properties[notionProps.slug];
    const date = page.properties[notionProps.date];
    const tag = page.properties[notionProps.tag];

    return {
      id: page.id,
      title:
          title?.type === "title"
              ? title.title.map((t) => t.plain_text).join("")
              : "",
      slug:
          slug?.type === "rich_text"
              ? slug.rich_text.map((t) => t.plain_text).join("")
              : "",
      date: date?.type === "date" ? date.date?.start : "",
      tag: tag?.type === "rich_text" ? tag.rich_text.map((t) => t.plain_text).join("") : "",
    };
  });
}

/* ---------- 단일 글 조회 ---------- */
export async function fetchPostBySlug(slug: string) {
  const res = await notion.dataSources.query({
    data_source_id: process.env.NOTION_DATA_SOURCE_ID!,
    filter: {
      and: [
        { property: notionProps.status, select: { equals: PUBLISHED_VALUE } },
        { property: notionProps.slug, rich_text: { equals: slug } },
      ],
    },
    page_size: 1,
  });

  const page = res.results.find(isFullPage);
  if (!page) return null;

  const titleProp = page.properties[notionProps.title];
  const title =
      titleProp?.type === "title"
          ? titleProp.title.map((t) => t.plain_text).join("")
          : "";

  const blocks = await n2m.pageToMarkdown(page.id);
  const content = n2m.toMarkdownString(blocks).parent ?? "";

  return { id: page.id, title, content };
}