'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { navItems } from '@/utils/constants';
import { NavItemProps } from '@/utils/types';

const NavItem: React.FC<NavItemProps> = ({ href, text, onClick }) => (
  <ListItem component={Link} href={href} onClick={onClick}>
    <ListItemText primary={text} />
  </ListItem>
);

const NavBar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar position='fixed'>
      <Toolbar>
        <Typography variant='h6' style={{ flexGrow: 1 }}>
          My Portfolio
        </Typography>
        {isMobile ? (
          <>
            <IconButton edge='start' color='inherit' onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer}>
              <List>
                {navItems.map((item, index) => (
                  <NavItem key={index} href={item.href} text={item.text} onClick={toggleDrawer} />
                ))}
              </List>
            </Drawer>
          </>
        ) : (
          <div>
            {navItems.map((item, index) => (
              <Button key={index} color='inherit' component={Link} href={item.href}>
                {item.text}
              </Button>
            ))}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
