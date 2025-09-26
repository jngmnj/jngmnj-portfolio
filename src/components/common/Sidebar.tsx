import { LINKS } from '@/app/lib/constants';
import { cn } from '@/utils/style';
import { User } from 'firebase/auth';
import Link from 'next/link';
import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import {
  IoDocumentTextOutline,
  IoFolderOutline,
  IoHomeOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoMailOutline,
  IoPersonOutline,
} from 'react-icons/io5';
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

  const navigationItems = [
    { href: '/', label: 'Home', icon: IoHomeOutline },
    { href: '/about', label: 'About', icon: IoPersonOutline },
    { href: '/projects', label: 'Projects', icon: IoFolderOutline },
    { href: LINKS.github_blog, label: 'Blog', icon: IoDocumentTextOutline },
    { href: '/contact', label: 'Contact', icon: IoMailOutline },
  ];

  return (
    <>
      {/* Menu Button */}
      <div className={cn('md:block', className)}>
        <button
          type="button"
          onClick={handleToggle}
          className="cursor-pointer rounded-lg p-3 transition-colors hover:bg-gray-100"
        >
          <RiMenu3Line className="text-xl" />
        </button>
      </div>

      {/* Sidebar Overlay */}
      <div
        onClick={handleToggle}
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      />

      {/* Sidebar */}
      <div
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-80 bg-white shadow-2xl transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900">Menu</h2>
          <button
            type="button"
            onClick={handleToggle}
            className="rounded-lg p-2 transition-colors hover:bg-gray-100"
          >
            <CgClose className="text-xl text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-6">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="group hover:bg-seagull-50 hover:text-seagull-700 flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors"
                >
                  <IconComponent className="text-xl" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="absolute right-0 bottom-0 left-0 border-t border-gray-200 p-6">
          {!userData ? (
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="group hover:bg-seagull-50 hover:text-seagull-700 flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors"
            >
              <IoLogInOutline className="text-xl" />
              <span className="font-medium">Login</span>
            </Link>
          ) : (
            <Link
              href="/logout"
              onClick={() => setIsOpen(false)}
              className="group flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-red-50 hover:text-red-700"
            >
              <IoLogOutOutline className="text-xl" />
              <span className="font-medium">Logout</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
