import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Navigate, useNavigate } from 'react-router-dom';

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar(props) {
    const pages = ['Home', 'Contact', 'Sign Up', 'Sign In', 'LogOut'];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = (e) => {
        if (pages[e] === 'Home') {
            console.log(props.loginShown)
            navigate('/')
        }
        if (pages[e] === 'Contact') {
            navigate('/contact')
        }
        if (pages[e] === 'Sign Up') {
            navigate('/signup')
        }
        if (pages[e] === 'Sign In') {
            navigate('/signin')
        }
        if (pages[e] === 'LogOut') {
            localStorage.removeItem('userData');
            props.signinChkHandler(false);
            navigate('/signin');
        }
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Compiler
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page, i) => {
                                if (((page === "Home" || page === "Contact" || page === "Sign In" || page === "Sign Up") && !props.loginShown) || ((page === "Home" || page === "Contact" || page === "LogOut") && props.loginShown)) {
                                    return <MenuItem value={i} key={page} onClick={() => handleCloseNavMenu(i)}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                } else if (page === "Home" || page === "Contact") {
                                    return <MenuItem value={i} key={page} onClick={() => handleCloseNavMenu(i)}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                }

                            }

                            )}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Compiler
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, i) => {
                            if (((page === "Sign In" || page === "Sign Up") && !props.loginShown) || ((page === "LogOut") && props.loginShown)) {
                                console.log(page);
                                return <Button
                                    key={page}
                                    value={i}
                                    onClick={() => handleCloseNavMenu(i)}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            } else if (page === "Home" || page === "Contact") {
                                return <Button
                                    key={page}
                                    value={i}
                                    onClick={() => handleCloseNavMenu(i)}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            }
                        })}
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
