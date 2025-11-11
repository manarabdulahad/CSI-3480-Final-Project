'use server';

import { redirect } from 'next/navigation';

import { getSession } from '@/util/auth';

export async function auth(password: string): Promise<boolean> {
  const session = await getSession();

  // TODO: Send the password to backend to verify.
  const shouldAuthenticate = password !== '';
  session.isAuthenticated = shouldAuthenticate;

  await session.save();

  if (!shouldAuthenticate) {
    return false;
  }

  redirect('/');

  return true;
}
