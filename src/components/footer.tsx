import Link from "next/link";
import { ReactNode } from "react";
import { ArrowIcon } from "./arrow-icon";

const footerItems: {
  [x: string]: {
    name: string;
    icon?: ReactNode;
  };
} = {
  "https://timrodz.dev": {
    name: "Portfolio",
  },
  "https://github.com/timrodz": {
    name: "GitHub",
  },
  "https://www.linkedin.com/in/timrodz": {
    name: "LinkedIn",
  },
  "https://stackoverflow.com/users/4329379/juan-morais": {
    name: "StackOverflow",
  },
  "mailto:juan@timrodz.dev": {
    name: "Email",
  },
  "/rss": {
    name: "RSS Feed",
  },
};

export default function Footer() {
  return (
    <footer className="mt-16 mb-20">
      <ul className="font-sm flex flex-col gap-4 text-neutral-600 md:flex-row dark:text-neutral-300">
        {Object.entries(footerItems).map(([path, { name, icon }]) => (
          <li key={name}>
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href={path}
              className="hover:underline flex items-center gap-2 transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            >
              {icon ? icon : <ArrowIcon />}
              {name}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8 md:mt-6 text-neutral-600 dark:text-neutral-400 text-base">
        &copy; {new Date().getFullYear()} Juan Rodríguez Morais
      </p>
    </footer>
  );
}
