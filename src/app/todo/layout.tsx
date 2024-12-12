import Navbar from '@/components/navbar';
import { ChildElement } from '@/types/child-element';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'todo',
  description: 'todos page',
};

export default function TodoLayout({ children }: ChildElement) {
  return (
    <html lang="en">
      <body>
        <Navbar
          paths={[
            { path: `/self`, title: 'profile' },
            { path: '/logout', title: 'logout' },
          ]}
        />
        {children}
      </body>
    </html>
  );
}
