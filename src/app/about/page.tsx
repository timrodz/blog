export const metadata = {
  title: "About",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section>
      <h1>About me</h1>
      <hr />
      <div className="flex flex-col gap-4">
        <p>
          Born in Chitré, Panamá 🇵🇦 in 1995, I’m somewhat of a cross between
          millennials and Gen Z’ers. That means I understand some of today’s
          memes. Since I was young, computers have been a part of my life, and
          I’m grateful I work with them daily—A dream scenario!
        </p>
        <p>
          Software engineering aside, you can find me outdoors, working out
          (gym/cycling), playing games (Age Of Empires IV, Forza Horizon 5,
          Magic: The Gathering), planning the next travel destination, or
          thinking about what to learn next. I’m currently learning Portuguese,
          music theory, and content creation.
        </p>
        <p>
          When it comes to tools and technologies, I believe they’re there to
          help you solve problems, nothing else. I also don’t have strong
          opinions about developer decisions when choosing a tech stack.
          Everything has a purpose; if it helps you solve a problem, that’s what
          matters.
        </p>
      </div>
    </section>
  );
}
