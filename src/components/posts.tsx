import { getBlogPosts } from "@utils/mdx";
import Link from "next/link";

export function BlogPosts() {
  const allBlogsPosts = getBlogPosts();

  return (
    <div>
      {allBlogsPosts
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="blog-link flex flex-col space-y-1 mb-4"
            href={`/posts/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-4">
              <p className="blog-link-date">{post.metadata.publishedAt}</p>
              <p className="blog-link-title">
                <span className="">{post.metadata.title}</span>
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}
