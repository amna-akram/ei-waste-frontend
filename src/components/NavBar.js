import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Box } from '@mui/material';

const NavBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('EN');

    const handleLanguageClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLanguageClose = (language) => {
        setAnchorEl(null);
        if (language) {
            setSelectedLanguage(language);
        }
    };

    const languages = [
        { name: 'English', code: 'EN' },
        { name: 'Finnish', code: 'FI' },
        { name: 'Swedish', code: 'SV' },
        { name: 'Estonian', code: 'ET' },
    ];

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#ffffff', zIndex: (theme) => theme.zIndex.drawer + 1, color: '#333' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Left Image */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src="images/company_logo.png" alt="Left Logo" style={{ height: '40px', cursor: 'pointer' }} />
                </Box>

                {/* Center Image */}
                <Box sx={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
                    <img src="images/company_slogan.png" alt="Center Logo" style={{ height: '50px', cursor: 'pointer' }} />
                </Box>

                {/* Right - Language Selector */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        onClick={handleLanguageClick}
                        color="default"
                        aria-controls="language-menu"
                        aria-haspopup="true"
                    >
                        {/* Fixed width for selected language code */}
                        <Typography sx={{ color: '#333', fontWeight: 'bold', width: '24px', textAlign: 'center' }}>
                            {selectedLanguage}
                        </Typography>
                    </IconButton>
                    <Menu
                        id="language-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => handleLanguageClose(null)}
                        MenuListProps={{
                            sx: { backgroundColor: '#f5f5f5', color: '#333' }
                        }}
                    >
                        {languages.map((language, index) => (
                            <MenuItem
                                key={index}
                                onClick={() => handleLanguageClose(language.code)}
                                sx={{
                                    '&:hover': { backgroundColor: '#e0e0e0' },
                                }}
                            >
                                {language.name}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
