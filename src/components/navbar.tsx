export default function Navbar({ paths }: Paths) {
  return (
    <nav className="fixed flex items-center justify-center w-screen p-2 z-30 bg-card dark border-b">
      <div className="flex gap-4 w-[1200px]">
        {paths.map(({ path, title }) => (
          <a
            className="text-xl font-semibold text-white outline-none cursor-pointer bg-transparent"
            key={title}
            href={path}
            target="_self"
          >
            {title}
          </a>
        ))}
      </div>
    </nav>
  );
}

type Paths = { paths: { title: string; path: string }[] };
