'use client';

import { LINKS } from '@/app/lib/constants';
import { useLocale } from '@/utils/useLocale';
import { cn } from '@/utils/style';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { GrLanguage } from 'react-icons/gr';
import Dropdown from './Dropdown';

const LANG_OPTIONS = [
  { value: 'ko', label: '한국어' },
  { value: 'en', label: 'English' },
];

const Header = ({ isTransparent = false }: { isTransparent?: boolean }) => {
  const { t, i18n } = useTranslation('common');
  const pathname = usePathname();
  const router = useRouter();
  const lang = useLocale();
  const currentLang =
    LANG_OPTIONS.find((o) => o.value === lang) ?? LANG_OPTIONS[0];

  const handleLanguageChange = (lng: string) => {
    if (lng === lang) return;
    i18n.changeLanguage(lng);
    const segments = pathname.split('/').filter(Boolean);
    const rest = segments.slice(1).join('/');
    router.push(rest ? `/${lng}/${rest}` : `/${lng}`);
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 right-0 left-0 z-50 border-b border-b-gray-200 bg-white',
          isTransparent ? 'bg-transparent' : 'bg-white'
        )}
      >
        <div className="container flex items-center justify-between py-3 lg:py-4">
          <Link href={`/${lang}`} className="shrink-0">
            <h1 className="hidden text-2xl font-bold">jngmnj</h1>
            <Image
              src="/images/common/logo.svg"
              width={100}
              height={27}
              alt="logo"
              className={cn(
                'transition-opacity hover:opacity-80',
                isTransparent ? 'brightness-0 invert' : ''
              )}
            />
          </Link>
          <nav
            className={cn(
              'hidden items-center justify-center gap-1 lg:flex',
              isTransparent ? 'font-semibold text-white' : 'text-black'
            )}
          >
            <Link href={`/${lang}/about`}>
              <div className="hover:text-seagull-500 px-4 py-2 transition-colors">
                {t('nav.about')}
              </div>
            </Link>
            <Link href={`/${lang}/projects`}>
              <div className="hover:text-seagull-500 px-4 py-2 transition-colors">
                {t('nav.projects')}
              </div>
            </Link>
            <Link href={LINKS.github_blog} target="_blank">
              <div className="hover:text-seagull-500 px-4 py-2 transition-colors">
                {t('nav.blog')}
              </div>
            </Link>
            <Link href={`/${lang}/contact`}>
              <div className="hover:text-seagull-500 px-4 py-2 transition-colors">
                {t('nav.contact')}
              </div>
            </Link>
          </nav>
          <Dropdown.Root>
            <Dropdown.Trigger
              ariaLabel={t('language.select')}
              variant="ghost"
              showArrow={false}
            >
              <GrLanguage
                className={cn(
                  'size-5',
                  isTransparent ? 'text-white' : 'text-black'
                )}
              />
            </Dropdown.Trigger>
            <Dropdown.Menu>
              {LANG_OPTIONS.map((opt) => (
                <Dropdown.Item
                  key={opt.value}
                  selected={currentLang.value === opt.value}
                  onSelect={() => handleLanguageChange(opt.value)}
                >
                  {opt.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown.Root>
        </div>
      </header>
    </>
  );
};

export default Header;
