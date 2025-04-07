import React from 'react';
import { Container, Typography, Paper, Box, Alert } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

export const DBConfig: React.FC = () => {
    const { userProfile } = useAuth();

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Database Configuration
                    </Typography>
                    <Alert severity="info" sx={{ mb: 2 }}>
                        This page is only accessible to super-admin users.
                    </Alert>
                    <Typography variant="body1" paragraph>
                        Welcome, {userProfile?.displayName}! As a super-admin, you have access to database configuration settings.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        This is a placeholder for database configuration interface.
                        In a real application, this would contain forms and controls for managing database settings.
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
}; 