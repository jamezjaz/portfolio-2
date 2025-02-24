import { ReactNode } from 'react';
import Head from 'next/head';
import NavBar from '../components/globalComponents/NavBar';
import Footer from '../components/globalComponents/Footer';
import ThemeProvider from '../components/ThemeProvider';
import '../styles/_mainStyle.scss';
import PageViewTracker from '@/analytics/PageViewTracker';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <Head>
        <title>My Portfolio</title>
        <meta name='description' content='Welcome to my professional portfolio. See my work and get in touch!' />
        <meta property='og:title' content='My Portfolio' />
        <meta property='og:description' content='Welcome to my professional portfolio. See my work and get in touch!' />
        <meta property='og:image' content='https://firebasestorage.googleapis.com/v0/b/portfolio-2-5fd25.appspot.com/o/assets%2Fhomepage%2FheroImage%2Fgrowtika_unsplash.jpg?alt=media&token=25e227d5-610d-4d5d-85c2-8bb883c87e5b' />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta property='og:url' content='https://jamezjaz.tech' />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='My Portfolio' />
        <meta property='og:locale' content='en_US' />
        <meta property='og:updated_time' content={new Date().toISOString()} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <body>
        <ThemeProvider>
          <NavBar />
          <main>{children}</main>
          <Footer />
          <PageViewTracker />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
