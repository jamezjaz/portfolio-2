'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { analytics } from '@/utils/firebase';
import { logEvent } from 'firebase/analytics';

const PageViewTracker: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (analytics) { // Ensure analytics is defined
      logEvent(analytics, 'page_view', {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
};

export default PageViewTracker;