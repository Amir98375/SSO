import { useMsal } from "@azure/msal-react";
import { useState, useEffect } from "react";
import { graphConfig } from "../config/authConfig";

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

                    const graphResponse = await fetch(graphConfig.graphMeEndpoint, {
                        headers: {
                            Authorization: `Bearer ${response.accessToken}`
                        }
                    });

                    const data = await graphResponse.json();
                    
                    // In a real application, you would typically get the role from your backend
                    // or from Azure AD claims. For this example, we'll hardcode it.
                    setUserProfile({
                        displayName: data.displayName,
                        email: data.userPrincipalName,
                        role: "super-admin" // This should come from your backend or Azure AD claims
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