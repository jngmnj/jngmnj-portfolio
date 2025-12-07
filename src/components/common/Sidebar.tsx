import { LINKS } from '@/app/lib/constants';
import { useScrollLock } from '@/utils/hooks';
import { cn } from '@/utils/style';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { RiMenu3Line } from 'react-icons/ri';

type SidebarProps = {
  className?: string;
};

const Sidebar = ({ className }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // 스크롤 잠금
  useScrollLock(isOpen);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const navigationItems = useMemo(
    () => [
      { href: '/about', label: 'About' },
      { href: '/projects', label: 'Projects' },
      { href: LINKS.github_blog, label: 'Blog', external: true },
      { href: '/contact', label: 'Contact' },
    ],
    []
  );

  return (
    <>
      {/* Menu Button */}
      <div className={cn('md:block', className)}>
        <motion.button
          type="button"
          onClick={handleToggle}
          className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg transition-colors "
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          aria-label="Open menu"
          aria-expanded={isOpen}
        >
          <RiMenu3Line className="text-xl" />
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
                className="rounded-lg p-2 transition-colors cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                aria-label="Close sidebar"
              >
                <CgClose className="text-xl text-gray-600" />
              </motion.button>
            </div>

            {/* Navigation */}
            <nav className="p-6">
              <div className="space-y-2">
                {navigationItems.map((item, index) => {
                  const letters = item.label.split('');
                  const isHovered = hoveredItem === item.href;
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
                        onMouseEnter={() => setHoveredItem(item.href)}
                        onMouseLeave={() => setHoveredItem(null)}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        className="group text-2xl hover:text-gray-900 flex items-center gap-3 rounded-lg px-4 py-3 text-gray-400 transition-colors overflow-hidden"
                      >
                        <span className="font-bold inline-block relative h-[1.2em] overflow-hidden">
                          {letters.map((letter, letterIndex) => (
                            <span
                              key={letterIndex}
                              className="inline-block relative overflow-hidden"
                              style={{ 
                                display: 'inline-block',
                                height: '1.2em',
                                lineHeight: '1.2em',
                                verticalAlign: 'top',
                                willChange: isHovered ? 'transform' : 'auto',
                              }}
                            >
                              {/* 기본 텍스트 (호버 시 위로 올라가서 숨김) */}
                              <motion.span
                                className="inline-block"
                                animate={
                                  isHovered
                                    ? {
                                        y: '-100%',
                                      }
                                    : {
                                        y: 0,
                                      }
                                }
                                transition={{
                                  delay: isHovered ? letterIndex * 0.05 : 0,
                                  duration: 0.4,
                                  ease: [0.4, 0, 0.2, 1],
                                }}
                                style={{ 
                                  display: 'inline-block',
                                  willChange: isHovered ? 'transform' : 'auto',
                                }}
                              >
                                {letter === ' ' ? '\u00A0' : letter}
                              </motion.span>
                              {/* 애니메이션 텍스트 (호버 시 아래에서 올라옴) */}
                              <motion.span
                                className="inline-block absolute top-0 left-0 text-gray-900"
                                animate={
                                  isHovered
                                    ? {
                                        y: 0,
                                        opacity: 1,
                                      }
                                    : {
                                        y: '100%',
                                        opacity: 0,
                                      }
                                }
                                transition={{
                                  delay: isHovered ? letterIndex * 0.05 : 0,
                                  duration: 0.4,
                                  ease: [0.4, 0, 0.2, 1],
                                }}
                                style={{ 
                                  display: 'inline-block',
                                  willChange: isHovered ? 'transform, opacity' : 'auto',
                                }}
                              >
                                {letter === ' ' ? '\u00A0' : letter}
                              </motion.span>
                            </span>
                          ))}
                        </span>
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
