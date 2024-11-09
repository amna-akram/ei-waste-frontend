// src/components/SideNav.js

import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Divider, Avatar, Box } from '@mui/material';
import { menuItemsByRole } from '../constants/constants';

const drawerWidth = 240;

const SideNav = ({ userRole }) => {
    const menuItems = menuItemsByRole[userRole] || [];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: '#152B62',
                    color: '#ffffff',
                    marginTop: '2%',
                },
            }}
        >
            <Toolbar sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 4, pb: 2 }}>
                <Avatar alt="User Avatar" src="/path/to/avatar.jpg" sx={{ width: 56, height: 56, mb: 1, mt: 2 }} />
                <Typography variant="subtitle1" color="inherit">
                    Welcome, {userRole}
                </Typography>
            </Toolbar>
            <Divider sx={{ backgroundColor: '#ffffff33' }} />

            <List>
                {menuItems.map((item, index) => (
                    <ListItem
                        button
                        component={Link}
                        to={item.path}
                        key={index}
                        sx={{
                            color: '#ffffff',
                            '&:hover': { backgroundColor: '#ffffff22' },
                            paddingLeft: 3,
                        }}
                    >
                        <ListItemIcon sx={{ color: '#ffffff' }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default SideNav;
