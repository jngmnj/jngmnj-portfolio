import ContactForm from '@/components/contact/ContactForm';
import { createPageMetadata } from '@/app/lib/og-metadata';
import { DEFAULT_LOCALE } from '@/constants/locales';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HiLocationMarker } from 'react-icons/hi';
import { MdEmail } from 'react-icons/md';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { getDictionary, hasLocale } from '../dictionaries';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return createPageMetadata({ lang, page: 'contact', path: '/contact' });
}

export default async function ContactPage({
  params,
}: {
  params?: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang ?? DEFAULT_LOCALE;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { contact } = dict;
  const contactItems = [
    {
      key: 'kakao',
      icon: RiKakaoTalkFill,
      title: contact.info.kakao,
      content: (
        <Link className="link-text" href="">
          {contact.info.openChat}
        </Link>
      ),
    },
    {
      key: 'email',
      icon: MdEmail,
      title: contact.info.email,
      content: (
        <Link className="link-text" href="mailTo:jngmnj4@gmail.com">
          jngmnj4@gmail.com
        </Link>
      ),
    },
    {
      key: 'location',
      icon: HiLocationMarker,
      title: contact.info.location,
      content: <p>{contact.info.locationValue}</p>,
    },
  ];

  return (
    <div className="content container flex flex-1 flex-col justify-center">
      <div className="flex flex-col items-end gap-20 lg:flex-row">
        <ContactForm />
        <div className="flex w-full flex-col gap-6 lg:w-1/2">
          {contactItems.map(({ key, icon: Icon, title, content }) => (
            <div key={key} className="flex items-center">
              <div className="mr-4 flex size-20 items-center justify-center rounded-lg border border-gray-300 bg-gray-100 p-4">
                <Icon size={40} />
              </div>
              <div>
                <h3>{title}</h3>
                {content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
