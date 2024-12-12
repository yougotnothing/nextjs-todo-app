import { ChildElement } from '@/types/child-element';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'logout',
  description: 'logout page',
};

export default function LogoutLayout({ children }: ChildElement) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
