import type { Metadata } from 'next';
import '../../globals.css';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign In page',
};

export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
