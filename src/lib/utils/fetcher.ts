// lib/utils/fetcher.ts
import { Session } from 'next-auth';

export const authenticatedFetcher = async (
  input: RequestInfo,
  init: RequestInit,
  session: Session
) => {
  const res = await fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json',
      Cookie: `next-auth.session-token=${session.accessToken}`,
    },
  });
  
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    throw error;
  }
  
  return res.json();
};

export const publicFetcher = async (input: RequestInfo, init?: RequestInit) => {
  const res = await fetch(input, init);
  return res.json();
};