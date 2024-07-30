import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import React, { PropsWithChildren, ReactNode } from "react";

const cx = (...classes: string[]) => classes.filter(Boolean).join(" ");

type TableProps = {
  data: {
    headers: string[];
    rows: ReactNode[][];
  };
};
function Table({ data }: TableProps) {
  const headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink(props: { href: string } & PropsWithChildren) {
  const href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link {...props} href={href}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props: { alt: string; src: string }) {
  return (
    <Image
      className="rounded-md shadow-xl"
      {...props}
      alt={props.alt}
      loading="lazy"
    />
  );
}

function RoundedImageColumn(props: { alt: string; src: string }) {
  return (
    <Image
      className="rounded-md shadow-xl !mb-10"
      {...props}
      alt={props.alt}
      loading="lazy"
    />
  );
}

type CodeProps = {
  children: string;
};

function Code({ children, ...props }: CodeProps) {
  const codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: string }) => {
    const slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

function Flex({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-wrap flex-col md:flex-row md:grid-cols-3 items-center md:items-start justify-between gap-8 md:gap-4">
      {children}
    </div>
  );
}

function Columns({ children }: PropsWithChildren) {
  return <div className="columns-1 sm:columns-2 gap-8">{children}</div>;
}

function Grid({ children }: PropsWithChildren) {
  return <div className="grid grid-cols-2">{children}</div>;
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  ImageColumn: RoundedImageColumn,
  a: CustomLink,
  code: Code,
  Table,
  Flex,
  Columns,
  Grid,
};

type CustomMDXProps = {
  source: string;
  components?: any;
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
