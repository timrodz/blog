import { notFound } from "next/navigation";
import { CustomMDX } from "src/components/mdx";
import { formatDate, getBlogPosts } from "@utils/mdx";
import { baseUrl } from "@/app/sitemap";
import Image from "next/image";

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

type Props = {
  params: { slug: string };
};

export function generateMetadata({ params }: Props) {
  const post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  const betterTitle = `${title} - Juan Rodríguez Morais - Blog`;

  return {
    title: betterTitle,
    description,
    openGraph: {
      title: betterTitle,
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
  const post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const { metadata, content, slug } = post;

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
            description: metadata.summary,
            image: metadata.image
              ? `${baseUrl}${metadata.image}`
              : `/og?title=${encodeURIComponent(metadata.title)}`,
            url: `${baseUrl}/posts/${slug}`,
            author: {
              "@type": "Person",
              name: "Juan Rodríguez Morais",
            },
          }),
        }}
      />
      <h1 className="title font-bold text-3xl md:text-5xl">{metadata.title}</h1>
      <hr />
      <div className="flex justify-between items-center mt-2 mb-8">
        <p className="text-neutral-600 dark:text-neutral-400">
          Published on {formatDate(metadata.publishedAt)}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={content} />
      </article>
    </section>
  );
}
