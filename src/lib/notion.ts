import { Client, isFullPage } from "@notionhq/client";
import { notionProps } from "@/type/type";
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const PUBLISHED_VALUE = "공개";

export type PostSummary = {
  id: string;
  title: string;
  slug: string;
};

export async function fetchPublishedPosts(): Promise<PostSummary[]> {
  const res = await notion.dataSources.query({
    data_source_id: process.env.NOTION_DATA_SOURCE_ID!,
    filter: { property: notionProps.status, select: { equals: PUBLISHED_VALUE } },
    sorts: [{ property: notionProps.date, direction: "descending" }],
  });

  return res.results.filter(isFullPage).map((page) => {
    const title = page.properties[notionProps.title];
    const slug = page.properties[notionProps.slug];
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
    };
  });
}