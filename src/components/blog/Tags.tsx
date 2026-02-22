'use client';

import { useTags } from '@/utils/hooks';
import { useLocale } from '@/utils/useLocale';
import Link from 'next/link';

const Tags = () => {
  const lang = useLocale();
  const { data } = useTags();
  return (
    <div className="flex flex-wrap gap-6">
      {(data ?? []).map((tag) => (
        <Link href={`/${lang}/blog/tags/${tag.tag_name}`} key={tag.tag_id}>
          <span className="rounded-lg bg-gray-100 px-2 py-1 text-sm transition hover:bg-gray-200">
            # {tag.tag_name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Tags;
