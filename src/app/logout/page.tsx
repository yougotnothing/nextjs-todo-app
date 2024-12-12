'use client';

import callServer from '@/lib/call-server';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await callServer<null>('/api/logout', { method: 'POST' })
        .then(() => {
          localStorage.removeItem('token');
          router.push('/auth/sign-in');
        })
        .catch(e => console.error(e));
    })();
  }, []);

  return <div className="flex w-screen h-screen"></div>;
}
