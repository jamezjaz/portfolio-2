// components/NavBar.tsx
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const NavBar: React.FC = () => {
  return (
    <AppBar position='fixed'>
      <Toolbar>
        <Typography variant='h6' style={{ flexGrow: 1 }}>
          My Portfolio
        </Typography>
        <Button color='inherit' component={Link} href='/'>Home</Button>
        <Button color='inherit' component={Link} href='/about'>About</Button>
        <Button color='inherit' component={Link} href='/projects'>Projects</Button>
        <Button color='inherit' component={Link} href='/blog'>Blog</Button>
        <Button color='inherit' component={Link} href='/contact'>Contact</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
