import type { Metadata } from 'next';
import '@/styles/globals.css';
import NextTopLoader from 'nextjs-toploader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Providers } from '@/redux/providers';
import MuiTheme from '@/_lib/MuiTheme';
import CurrentLayout from '@/layout';

export const metadata: Metadata = {
  title: 'Task Management App',
  description: 'Louis Pham',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader color="#004CCC" height={4} showSpinner={false} />
        <Providers>
          <MuiTheme>
            <ToastContainer />
            <CurrentLayout>{children}</CurrentLayout>
          </MuiTheme>
        </Providers>
      </body>
    </html>
  );
}
