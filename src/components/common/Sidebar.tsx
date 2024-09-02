import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="absolute left-0 top-0 z-10 h-full w-full border border-blue-600 bg-gray-100 md:block">
      <Link href="/">
        <h1 className="text-2xl font-bold">jngmnj</h1>
      </Link>
      <div className="hidden items-center justify-center lg:flex">
        <Link href="/about">
          <div className="p-4">About</div>
        </Link>
        <Link href="/projects">
          <div className="p-4">Projects</div>
        </Link>
        <Link href="/blog">
          <div className="p-4">Blog</div>
        </Link>
        <Link href="/contact">
          <div className="p-4">Contact</div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
