import { getBlogPosts, getProjects } from "@utils/mdx";

export const baseUrl = "https://blog.timrodz.dev";

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const projects = getProjects().map((post) => ({
    url: `${baseUrl}/projects/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const routes = ["", "/blog"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs, ...projects];
}
