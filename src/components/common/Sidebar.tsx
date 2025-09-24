import { cn } from '@/utils/style';
import { User } from 'firebase/auth';
import Link from 'next/link';
import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { RiMenu3Line } from 'react-icons/ri';

type SidebarProps = {
  userData: User | null;
  className?: string;
};

const Sidebar = ({ userData, className }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={cn('md:block', className)}>
        <button
          type="button"
          onClick={handleToggle}
          className="cursor-pointer p-4"
        >
          <RiMenu3Line />
        </button>
      </div>
      <>
        <div
          className={cn(
            'fixed top-0 z-20 h-full max-h-screen w-80 border border-r-gray-200 bg-white p-4 transition-all duration-300 md:block',
            isOpen ? 'right-0' : 'right-[-80rem]'
          )}
        >
          <button
            type="button"
            onClick={handleToggle}
            className="absolute top-2 right-2 cursor-pointer rounded-2xl p-3 hover:bg-gray-50"
          >
            <CgClose className="text-2xl" />
          </button>
          <div className="mt-4">
            <Link href="/about" onClick={() => setIsOpen(false)}>
              <div className="rounded-2xl p-4 hover:bg-gray-50">About</div>
            </Link>
            <Link href="/projects" onClick={() => setIsOpen(false)}>
              <div className="p-4">Projects</div>
            </Link>
            <Link href="/blog" onClick={() => setIsOpen(false)}>
              <div className="p-4">Blog</div>
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <div className="p-4">Contact</div>
            </Link>
          </div>
          <div className="absolute bottom-0">
            {!userData ? (
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <div className="p-4">Login</div>
              </Link>
            ) : (
              <Link href="/logout" onClick={() => setIsOpen(false)}>
                <div className="p-4">Logout</div>
              </Link>
            )}
          </div>
        </div>
        <div
          onClick={handleToggle}
          className={cn(
            'fixed inset-0 z-10 bg-black/20',
            isOpen ? 'block' : 'hidden'
          )}
        />
      </>
    </>
  );
};

export default Sidebar;
