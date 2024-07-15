import Link from "next/link";
import { PropsWithChildren } from "react";
import { ArrowIcon } from "./arrow-icon";

type Props = PropsWithChildren & {
  href: string;
  target?: "_blank" | "_self";
};

export function ArrowLink({ href, children, target = "_blank" }: Props) {
  return (
    <Link
      rel="noopener noreferrer"
      target={target}
      href={href}
      className="text-neutral-600 dark:text-neutral-300 hover:underline flex items-center gap-2 transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
    >
      <ArrowIcon />
      {children}
    </Link>
  );
}
