import { ReactNode } from 'react';
import NavBar from '../components/globalComponents/NavBar';
import Footer from '../components/globalComponents/Footer';
import ThemeProvider from '../components/ThemeProvider';
import '../styles/_mainStyle.scss';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
