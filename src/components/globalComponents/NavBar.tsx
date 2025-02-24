'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
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
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { navItems } from '@/utils/constants';
import { NavItemProps } from '@/utils/types';
import { handleClickAnalytics } from '@/analytics/clickAnalyticEvents';

const NavItem: React.FC<NavItemProps & { isActive: boolean }> = ({
  href,
  text,
  onClick,
  isActive
}) => (
  <ListItem
    component={Link}
    href={href}
    onClick={() => {
      handleClickAnalytics({
        buttonName: text,
        screenName: 'navbar',
      });
      if (onClick) onClick(); // ensure onClick from props is also called
    }}
    style={{
      fontWeight: isActive ? 'bold' : 'normal',
      border: isActive ? '1px solid #f0f0f0' : 'none',
    }}
  >
    <ListItemText primary={text} />
  </ListItem>
);

const NavBar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const pathname = usePathname();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
    handleClickAnalytics({
      buttonName: 'toggle_drawer',
      screenName: 'navbar',
    });
  };

  return (
    <AppBar position='fixed'>
      <Toolbar>
        <Link
          href='/'
          passHref
          style={{
            flexGrow: 1,
            cursor: 'pointer',
            color: '#FFFFFF'
          }}
        >
          <Typography
            variant='h6'
            onClick={() => {
              handleClickAnalytics({
                buttonName: 'logo',
                screenName: 'navbar',
              });
            }}
          >
            My Portfolio
          </Typography>
        </Link>
        {isMobile ? (
          <>
            <IconButton edge='start' color='inherit' onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer}>
              <List>
                {navItems.map((item, index) => (
                  <NavItem
                    key={index}
                    href={item.href}
                    text={item.text}
                    onClick={toggleDrawer}
                    isActive={pathname === item.href}
                  />
                ))}
              </List>
            </Drawer>
          </>
        ) : (
          <div>
            {navItems.map((item, index) => (
              <Button
                key={index}
                color='inherit'
                component={Link}
                href={item.href}
                style={{
                  fontWeight: pathname === item.href ? 'bold' : 'normal',
                  border: pathname === item.href ? '1px solid #f0f0f0' : 'none',
                }}
                onClick={() => {
                  handleClickAnalytics({
                    buttonName: item.text,
                    screenName: 'navbar',
                  });
                }}
              >
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
