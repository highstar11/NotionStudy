import { cacheLife, cacheTag } from "next/cache";
import { fetchPublishedPosts, fetchPostBySlug } from "./notion";

export async function getPublishedPosts() {
  "use cache";
  cacheLife("hours");
  cacheTag("posts");
  return fetchPublishedPosts();
}

export async function getPostBySlug(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("posts");
  return fetchPostBySlug(slug);
}