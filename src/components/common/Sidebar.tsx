import { LINKS } from '@/app/lib/constants';
import { cn } from '@/utils/style';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { RiMenu3Line } from 'react-icons/ri';

type SidebarProps = {
  className?: string;
};

const Sidebar = ({ className }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const navigationItems = [
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: LINKS.github_blog, label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Menu Button */}
      <div className={cn('md:block', className)}>
        <motion.button
          type="button"
          onClick={handleToggle}
          className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-gray-100"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <motion.div
            className="absolute"
            initial={false}
            animate={{
              rotate: isOpen ? 180 : 0,
              opacity: isOpen ? 0 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <RiMenu3Line className="text-xl" />
          </motion.div>
          <motion.div
            className="absolute"
            initial={false}
            animate={{
              rotate: isOpen ? 0 : -180,
              opacity: isOpen ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            <CgClose className="text-xl" />
          </motion.div>
        </motion.button>
      </div>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            onClick={handleToggle}
            className="fixed inset-0 z-100 bg-black/50 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-101 w-full max-h-[90vh] overflow-y-auto bg-white shadow-2xl"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 p-6">
              <motion.div
                className="text-xl font-bold text-gray-900"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link href="/" className="shrink-0">
                  <Image
                    src="/images/common/logo_black.svg"
                    width={100}
                    height={27}
                    alt="logo"
                    className="transition-opacity hover:opacity-80"
                  />
                </Link>
              </motion.div>
              <motion.button
                type="button"
                onClick={handleToggle}
                className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <CgClose className="text-xl text-gray-600" />
              </motion.button>
            </div>

            {/* Navigation */}
            <nav className="p-6">
              <div className="space-y-2">
                {navigationItems.map((item, index) => {
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="group text-2xl hover:text-gray-900 flex items-center gap-3 rounded-lg px-4 py-3 text-gray-400 transition-colors"
                      >
                        <span className="font-bold">{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </nav>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
