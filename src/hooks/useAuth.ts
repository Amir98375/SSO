import { useMsal } from "@azure/msal-react";
import { useState, useEffect } from "react";
import { authConfig } from "../config/authConfig";

interface UserProfile {
    displayName: string;
    email: string;
    role: string;
}

export const useAuth = () => {
    const { instance, accounts } = useMsal();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (accounts[0]) {
                try {
                    const response = await instance.acquireTokenSilent({
                        scopes: ["User.Read"],
                        account: accounts[0]
                    });

                    // In a real application, you would fetch from your backend
                    // For this example, we'll use the mock data
                    setUserProfile({
                        displayName: authConfig.mockUser.name,
                        email: authConfig.mockUser.email,
                        role: authConfig.mockUser.role
                    });
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                }
            }
            setLoading(false);
        };

        fetchUserProfile();
    }, [instance, accounts]);

    const signOut = () => {
        instance.logoutRedirect();
    };

    return {
        userProfile,
        loading,
        signOut,
        isAuthenticated: accounts.length > 0
    };
}; 