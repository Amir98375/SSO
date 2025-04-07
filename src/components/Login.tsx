import React from 'react';
import { useMsal } from '@azure/msal-react';
import { Button, Container, Typography, Box } from '@mui/material';
import { loginRequest } from '../config/authConfig';

export const Login: React.FC = () => {
    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginRedirect(loginRequest).catch(error => {
            console.error('Login failed:', error);
        });
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h4" gutterBottom>
                    Welcome to Dashboard
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Please sign in with your Microsoft account to continue.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    sx={{ mt: 3 }}
                >
                    Sign in with Microsoft
                </Button>
            </Box>
        </Container>
    );
}; 