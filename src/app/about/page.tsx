import { Reenie_Beanie } from "next/font/google";
import Image from "next/image";

export const metadata = {
  title: "About",
  description: "Read my blog.",
};

const handwrittenFont = Reenie_Beanie({ weight: "400", subsets: ["latin"] });

export default function Page() {
  return (
    <section>
      <h1>About me 👨🏽‍💻</h1>
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
      <p className="!mt-6">
        {`P.S. I'm definitely not a robot 🤖 To prove it, here are some pictures
        of me over the past few years!`}
      </p>
      <div id="polaroid-gallery" className="polaroid-gallery">
        <PolaroidPhoto
          source="/pictures/mexico.webp"
          alt="Picture of me in a Café in Méxi co City, México"
          description="México City 2023"
          className="rotate-[-2deg]"
        />
        <PolaroidPhoto
          source="/pictures/queenstown.webp"
          alt="Picture of me with a mountain bike in Queenstown, New Zealand"
          description="Queenstown, NZ 2021"
          className="rotate-[1deg]"
        />
        <PolaroidPhoto
          source="/pictures/yosemite.webp"
          alt="Picture of me around Yosemite, California"
          description="California 2019"
          className="rotate-[2deg]"
        />
      </div>
    </section>
  );
}

const PolaroidPhoto = ({
  source,
  alt,
  description,
  className,
}: {
  source: string;
  alt: string;
  description: string;
  className?: string;
}) => (
  <div className={`polaroid-container ${className ?? ""}`}>
    <div className="polaroid">
      <Image src={source} width={300} height={400} alt={alt} />
    </div>
    <p className={handwrittenFont.className}>{description}</p>
  </div>
);
