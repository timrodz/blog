import { baseUrl } from "@/app/sitemap";
import { formatDate, getProjects } from "@utils/mdx";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CustomMDX } from "src/components/mdx";

export async function generateStaticParams() {
  const projects = getProjects();

  return projects.map((post) => ({
    slug: post.slug,
  }));
}

type Props = {
  params: { slug: string };
};

export function generateMetadata({ params }: Props) {
  const post = getProjects().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    type: description,
    imageUrl,
  } = post.metadata;
  const ogImage = imageUrl
    ? imageUrl
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/posts/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Blog({ params }: Props) {
  const project = getProjects().find((project) => project.slug === params.slug);

  if (!project) {
    notFound();
  }

  const { metadata, content, slug } = project;

  const techStack =
    metadata.technologies
      ?.replaceAll('"', "")
      .split(",")
      .map((s) => s.trim()) ?? [];

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: metadata.title,
            datePublished: metadata.publishedAt,
            dateModified: metadata.publishedAt,
            description: metadata.type,
            image: metadata.imageUrl
              ? `${baseUrl}${metadata.imageUrl}`
              : `/og?title=${encodeURIComponent(metadata.title)}`,
            url: `${baseUrl}/posts/${slug}`,
            author: {
              "@type": "Person",
              name: "Juan Rodríguez Morais",
            },
          }),
        }}
      />
      <h1 className="title font-bold text-3xl md:text-5xl tracking-tighter">
        {metadata.title}
      </h1>
      <hr />
      <div className="fmt-2 mb-8 flex flex-col gap-4 text-neutral-600 dark:text-neutral-400">
        <ul className="list-disc ml-6">
          <li>
            Project type: <span className="font-medium">{metadata.type}</span>
          </li>
          {metadata.releaseYear && (
            <li>
              Released in{" "}
              <span className="font-medium">{metadata.releaseYear}</span>
            </li>
          )}
          {metadata.workingYears && (
            <li>
              Worked years:{" "}
              <span className="font-medium">{metadata.workingYears}</span>
            </li>
          )}
          {metadata.clientName && (
            <li>
              Company/Client:{" "}
              <span className="font-medium">{metadata.clientName}</span>
            </li>
          )}
          {metadata.role && (
            <li>
              Role: <span className="font-medium">{metadata.role}</span>
            </li>
          )}
        </ul>
        {metadata.url && (
          <Link href={metadata.url} className="cta self-start">
            Click here to see the project in action
          </Link>
        )}
        <Image
          src={`${metadata.imageUrl}`}
          width={400}
          height={300}
          alt={metadata.imageAlt}
          className="rounded shadow-xl"
        />
      </div>
      <article className="prose">
        <CustomMDX source={content} />
      </article>
    </section>
  );
}
