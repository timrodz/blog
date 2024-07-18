import { Projects } from "@components/projects";

export const metadata = {
  title: "Posts",
  description: "See all the posts I've written.",
};

export default function Page() {
  return (
    <section>
      <h1>Projects</h1>
      <hr />
      <Projects />
    </section>
  );
}
