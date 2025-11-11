import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Password Manager',
  description: 'Password manager for CSI 3480.'
};

function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body className='antialiased'>
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
