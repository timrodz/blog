import { getBlogPosts } from "app/posts/utils";

export const baseUrl = "https://blog.timrodz.dev";

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let routes = ["", "/blog"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
