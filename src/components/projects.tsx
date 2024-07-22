import { getProjects } from "@utils/mdx";
import Link from "next/link";

export function Projects() {
  const projects = getProjects();

  return (
    <div className="mb-8">
      {projects
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
            href={`/projects/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-4">
              <p className="blog-link-date">{post.metadata.publishedAt}</p>
              <p className="blog-link-title">
                <span>{post.metadata.title}</span>
              </p>
              <p className="blog-link-subtitle">{post.metadata.type}</p>
            </div>
          </Link>
        ))}
    </div>
  );
}
