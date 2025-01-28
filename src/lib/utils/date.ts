// lib/utils/date.ts
import { format, formatDistanceToNow } from 'date-fns';

export const formatDate = (date: Date | string) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, 'MMM dd, yyyy HH:mm');
};

export const timeAgo = (date: Date | string) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
};