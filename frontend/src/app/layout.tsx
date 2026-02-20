import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Task Manager App',
  description: 'MERN + Next.js task management app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className="antialiased">{children}</body>
    </html>
  );
}