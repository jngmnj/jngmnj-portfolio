'use client';

import ErrorState from '@/components/common/ErrorState';

export default function ErrorPage({
  reset,
  retry,
}: {
  reset: () => void;
  retry?: () => void;
}) {
  // Next.js retry refreshes server data as well as resetting the boundary.
  return <ErrorState reset={retry ?? reset} />;
}
