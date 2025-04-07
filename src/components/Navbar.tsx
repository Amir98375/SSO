import React, { useState } from 'react';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    IconButton, 
    Menu, 
    MenuItem, 
    Box,
    Avatar
} from '@mui/material';
import { 
    Notifications as NotificationsIcon,
    AccountCircle
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const { userProfile, signOut } = useAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        handleClose();
        signOut();
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, cursor: 'pointer' }}
                    onClick={() => navigate('/home')}
                >
                    Dashboard Logo
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton
                        color="inherit"
                        onClick={() => navigate('/home')}
                    >
                        Home
                    </IconButton>

                    {userProfile?.role === 'super-admin' && (
                        <IconButton
                            color="inherit"
                            onClick={() => navigate('/db-config')}
                        >
                            DB Config
                        </IconButton>
                    )}

                    <IconButton color="inherit">
                        <NotificationsIcon />
                    </IconButton>

                    <IconButton
                        onClick={handleMenu}
                        color="inherit"
                    >
                        {userProfile?.displayName ? (
                            <Avatar sx={{ width: 32, height: 32 }}>
                                {userProfile.displayName[0]}
                            </Avatar>
                        ) : (
                            <AccountCircle />
                        )}
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem disabled>
                            <Typography variant="body2">
                                {userProfile?.displayName}
                            </Typography>
                        </MenuItem>
                        <MenuItem disabled>
                            <Typography variant="body2">
                                {userProfile?.email}
                            </Typography>
                        </MenuItem>
                        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}; 