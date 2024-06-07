import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import './Navbar.css';
import logo from '../assets/logo.png';
import menu from '../assets/menu.png';
import arrow from '../assets/arrow.png';

const theme = createTheme({
    palette: {
        primary: {
            main: '#A855F7',
        },
    },
    shape: {
        borderRadius: 20,
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    marginTop: '10px',
                    marginLeft: '20px',
                    marginRight: '20px',
                    borderRadius: '20px 20px 0 0',
                    width: 'calc(100% - 40px)',
                },
            },
        },
    },
});

function NavigationBar() {
    const location = useLocation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const isActive = (path) => location.pathname === path;

    const desktopMenuItems = [
        { to: '/customers', label: 'Müşteri' },
        { to: '/animals', label: 'Hayvan' },
        { to: '/doctors', label: 'Doktor' }
    ];

    const mobileMenuItems = [
        ...desktopMenuItems,
        { to: '/appointments', label: 'Randevu' },
        { to: '/reports', label: 'Rapor' },
        { to: '/vaccinations', label: 'Aşı' }
    ];

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" color="primary">
                <Toolbar style={{ justifyContent: 'space-between', paddingLeft: isMobile ? '9em' : '20px', paddingRight: isMobile ? '10px' : '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={logo} alt="VET" style={{ height: '30px', marginRight: '10px' }} />
                        <Typography
                            variant="h6"
                            component={Link}
                            to="/"
                            className="navbar-font"
                            style={{ textDecoration: 'none', color: 'white' }}
                        >
                            VET
                        </Typography>
                    </div>
                    {!isMobile && (
                        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                            <Link
                                to="/appointments"
                                className="navbar-font"
                                style={{
                                    backgroundColor: isActive('/appointments') ? '#F2F2F2' : 'transparent',
                                    color: isActive('/appointments') ? 'black' : 'white',
                                    textDecoration: 'none',
                                    padding: '10px 15px',
                                    borderRadius: '4px',
                                    marginRight: '10px'
                                }}
                            >
                                RANDEVU
                            </Link>
                            <Link
                                to="/reports"
                                className="navbar-font"
                                style={{
                                    backgroundColor: isActive('/reports') ? '#F2F2F2' : 'transparent',
                                    color: isActive('/reports') ? 'black' : 'white',
                                    textDecoration: 'none',
                                    padding: '10px 15px',
                                    borderRadius: '4px',
                                    marginRight: '10px'
                                }}
                            >
                                RAPOR
                            </Link>
                            <Link
                                to="/vaccinations"
                                className="navbar-font"
                                style={{
                                    backgroundColor: isActive('/vaccinations') ? '#F2F2F2' : 'transparent',
                                    color: isActive('/vaccinations') ? 'black' : 'white',
                                    textDecoration: 'none',
                                    padding: '10px 15px',
                                    borderRadius: '4px',
                                    marginRight: '10px'
                                }}
                            >
                                AŞI
                            </Link>
                        </div>
                    )}
                    <div style={{ display: isMobile ? 'none' : 'flex', alignItems: 'center' }}>
                        <IconButton color="inherit" onClick={handleMenu}>
                            <img src={menu} alt="Menu" style={{ height: '24px', width: '24px' }} />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {desktopMenuItems.map((item) => (
                                <MenuItem
                                    key={item.to}
                                    component={Link}
                                    to={item.to}
                                    onClick={handleClose}
                                    className="navbar-font"
                                    style={{
                                        color: '#A855F7',
                                        fontWeight: isActive(item.to) ? 'bold' : 'normal',
                                        position: 'relative',
                                        fontFamily: 'NimbusMonoL'
                                    }}
                                >
                                    {isActive(item.to) && (
                                        <img
                                            src={arrow}
                                            alt="Selected"
                                            style={{ position: 'absolute', left: 0, height: '20px', width: '20px' }}
                                        />
                                    )}
                                    {item.label}
                                </MenuItem>
                            ))}
                        </Menu>
                    </div>
                    {isMobile && (
                        <IconButton color="inherit" onClick={handleMenu} style={{ position: 'absolute', right: '10px' }}>
                            <img src={menu} alt="Menu" style={{ height: '24px', width: '24px' }} />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>
            <Menu
                id="menu-appbar-mobile"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {(isMobile ? mobileMenuItems : desktopMenuItems).map((item) => (
                    <MenuItem
                        key={item.to}
                        component={Link}
                        to={item.to}
                        onClick={handleClose}
                        className="navbar-font"
                        style={{
                            color: '#A855F7',
                            fontWeight: isActive(item.to) ? 'bold' : 'normal',
                            position: 'relative',
                            fontFamily: 'NimbusMonoL'
                        }}
                    >
                        {isActive(item.to) && (
                            <img
                                src={arrow}
                                alt="Selected"
                                style={{ position: 'absolute', left: 0, height: '20px', width: '20px' }}
                            />
                        )}
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </ThemeProvider>
    );
}

export default NavigationBar;
