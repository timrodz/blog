import fs from "fs";
import path from "path";

type BlogPostMetadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
};

type ProjectMetadata = {
  title: string;
  publishedAt: string;
  imageUrl: string;
  imageAlt: string;

  featured?: boolean;
  releaseYear?: string;
  workingYears?: string;
  type: string;
  url: string;
  technologies?: string;
  clientName: string;
  role: string;
};

function parseFrontmatter<T>(fileContent: string): {
  metadata: T;
  content: string;
} {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match![1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: any = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    metadata[key.trim()] = value;
  });

  return { metadata: metadata as T, content };
}

function getMDXFiles<T>(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile<T>(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter<T>(rawContent);
}

function getMDXData<T>(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile<T>(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getBlogPosts() {
  return getMDXData<BlogPostMetadata>(
    path.join(process.cwd(), "src", "blog-posts")
  );
}

export function getProjects() {
  return getMDXData<ProjectMetadata>(
    path.join(process.cwd(), "src", "projects")
  );
}

export function formatDate(date: string, includeRelative = false) {
  const currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  console.log("full date", fullDate);

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
