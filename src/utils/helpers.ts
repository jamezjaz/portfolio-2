import { Timestamp } from '@/utils/firebase';

export const formatDate = (timestamp: Timestamp): string => {
  const date = timestamp.toDate();
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};
