import type { Metadata } from 'next';
import Navbar from '@/components/navbar';
import { ChildElement } from '@/types/child-element';

export const metadata: Metadata = {
  title: 'your profile',
  description: 'profile page.',
};

export default async function UserLayout({ children }: ChildElement) {
  return (
    <html lang="en">
      <body>
        <Navbar
          paths={[
            { path: '/todo', title: 'todo' },
            { path: '/logout', title: 'logout' },
          ]}
        />
        {children}
      </body>
    </html>
  );
}
