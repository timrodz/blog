import { BlogPosts } from "app/components/posts";
import Link from "next/link";

export default function Page() {
  return (
    <section>
      <h1>Welcome 🦥</h1>
      <hr />
      <p className="mb-4">
        {`I'm a a Software Engineer with 6+ years of professional experience, primarily 
          focusing on SaaS products for small to medium-sized businesses (including startups).
          I'm currently located in Auckland, New Zealand, working at Futureverse as a Senior Software Engineer.
          My preferred tech stack is TypeScript, React, Node, AWS, and Elixir + Phoenix. I also
          have experience with leading developer small teams.`}
      </p>
      <div className="my-8">
        <BlogPosts />
        <Link
          href="/posts"
          className="mt-2 inline-block cta-subtle hover:underline"
        >
          See all posts
        </Link>
      </div>
    </section>
  );
}
