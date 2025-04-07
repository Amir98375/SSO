import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

export const Home: React.FC = () => {
    const { userProfile } = useAuth();

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Welcome to the Dashboard
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Hello, {userProfile?.displayName}! You are successfully logged in.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Your email: {userProfile?.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Your role: {userProfile?.role}
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
}; 