import { cacheLife, cacheTag } from "next/cache";
import { fetchPublishedPosts } from "./notion";

export async function getPublishedPosts() {
  "use cache";
  cacheLife("hours"); // 1시간 단위로 갱신
  cacheTag("posts");  // 나중에 수동 갱신할 때 쓸 태그
  
  return fetchPublishedPosts();
}