import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Added Bootstrap CSS import

export const metadata: Metadata = {
  title: 'NEXTSCHOOL',
  description: 'School Management App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}