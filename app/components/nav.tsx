import Link from "next/link";

const navItems = {
  "/": {
    name: "home",
  },
  "/posts": {
    name: "posts",
  },
  "/about": {
    name: "about",
  },
};

export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative text-neutral-600 dark:text-neutral-300"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="hover:underline transition-all hover:text-neutral-800 dark:hover:text-neutral-100 flex align-middle relative py-1 px-2 m-1 font-mono"
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
