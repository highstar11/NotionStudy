import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  notionVersion: "2025-09-03",
});

async function main() {
  const ds = await notion.dataSources.retrieve({
    data_source_id: process.env.NOTION_DATA_SOURCE_ID!,
  });
  for (const [name, prop] of Object.entries(ds.properties)) {
    console.log(JSON.stringify(name), "→", prop.type);
  }
}

main();