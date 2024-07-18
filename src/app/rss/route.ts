import { baseUrl } from "@/app/sitemap";
import { getBlogPosts, getProjects } from "@utils/mdx";

export async function GET() {
  const allBlogPosts = await getBlogPosts();
  const allProjects = await getProjects();

  const itemsXml = allBlogPosts
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1;
      }
      return 1;
    })
    .map(
      (post) =>
        `<item>
          <title>${post.metadata.title}</title>
          <link>${baseUrl}/posts/${post.slug}</link>
          <description>${post.metadata.summary || ""}</description>
          <pubDate>${new Date(
            post.metadata.publishedAt
          ).toUTCString()}</pubDate>
        </item>`
    )
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>Juan Rodríguez Morais - Blog</title>
        <link>${baseUrl}</link>
        <description>This is my blog's RSS feed</description>
        ${itemsXml}
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
