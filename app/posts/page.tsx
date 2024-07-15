import { BlogPosts } from "app/components/posts";

export const metadata = {
  title: "Posts",
  description: "See all the posts I've written.",
};

export default function Page() {
  return (
    <section>
      <h1>Blog posts</h1>
      <hr />
      <BlogPosts />
    </section>
  );
}
