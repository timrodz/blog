import { Projects } from "@/components/projects";
import { BlogPosts } from "@components/posts";

export default function Page() {
  return (
    <section>
      <h1>Welcome 🦥</h1>
      <hr />
      <p className="mb-4">
        {`I'm a Software Engineer with 6+ years of professional experience, primarily 
          focusing on SaaS products for small to medium-sized businesses (including startups).
          I'm currently located in Auckland, New Zealand, working at Futureverse as a Senior Software Engineer.
          My preferred tech stack is TypeScript, React, Node, AWS, and Elixir + Phoenix. I also
          have experience with leading developer small teams.`}
      </p>
      <div className="my-8">
        <h2>Blog posts</h2>
        <BlogPosts />
        <h2>Projects</h2>
        <Projects />
      </div>
    </section>
  );
}
