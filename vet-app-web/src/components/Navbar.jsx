import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" color="primary">
                <Toolbar style={{ justifyContent: 'space-between' }}>
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
                        <MenuItem
                            component={Link}
                            to="/customers"
                            onClick={handleClose}
                            className="navbar-font"
                            style={{
                                color: '#A855F7',
                                fontWeight: isActive('/customers') ? 'bold' : 'normal',
                                position: 'relative',
                                fontFamily: 'NimbusMonoL'
                            }}
                        >
                            {isActive('/customers') && (
                                <img
                                    src={arrow}
                                    alt="Selected"
                                    style={{ position: 'absolute', left: 0, height: '20px', width: '20px' }}
                                />
                            )}
                            Müşteri
                        </MenuItem>
                        <MenuItem
                            component={Link}
                            to="/animals"
                            onClick={handleClose}
                            className="navbar-font"
                            style={{
                                color: '#A855F7',
                                fontWeight: isActive('/animals') ? 'bold' : 'normal',
                                position: 'relative',
                                fontFamily: 'NimbusMonoL'
                            }}
                        >
                            {isActive('/animals') && (
                                <img
                                    src={arrow}
                                    alt="Selected"
                                    style={{ position: 'absolute', left: 0, height: '20px', width: '20px' }}
                                />
                            )}
                            Hayvan
                        </MenuItem>
                        <MenuItem
                            component={Link}
                            to="/doctors"
                            onClick={handleClose}
                            className="navbar-font"
                            style={{
                                color: '#A855F7',
                                fontWeight: isActive('/doctors') ? 'bold' : 'normal',
                                position: 'relative',
                                fontFamily: 'NimbusMonoL'
                            }}
                        >
                            {isActive('/doctors') && (
                                <img
                                    src={arrow}
                                    alt="Selected"
                                    style={{ position: 'absolute', left: 0, height: '20px', width: '20px' }}
                                />
                            )}
                            Doktor
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}

export default NavigationBar;
