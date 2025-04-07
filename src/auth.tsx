// Authentication configuration
export const msalConfig = {
    auth: {
        clientId: process.env.REACT_APP_AZURE_CLIENT_ID || "YOUR_CLIENT_ID",
        authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AZURE_TENANT_ID || 'common'}`,
        redirectUri: window.location.origin,
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    }
};

// Scopes for authentication
export const loginRequest = {
    scopes: ["User.Read", "profile", "email", "openid"]
};

// Helper functions for authentication
export const isAuthenticated = (): boolean => {
    
  const token = sessionStorage.getItem('msal.token');
  return !!token;
};

export const getUserInfo = () => {
  const userInfo = sessionStorage.getItem('msal.user');
  return userInfo ? JSON.parse(userInfo) : null;
};

export const getUserRole = (): string => {
  const userInfo = getUserInfo();
  return userInfo?.role || 'user';
};

export const isSuperAdmin = (): boolean => {
  return getUserRole() === 'super_admin';
};

export const handleLoginSuccess = (response: any) => {
  if (response?.account) {
    // Add role information to the account
    const userWithRole = {
      ...response.account,
      role: response.account.username.includes('admin') ? 'super_admin' : 'user'
    };
    
    sessionStorage.setItem('msal.token', response.accessToken);
    sessionStorage.setItem('msal.user', JSON.stringify(userWithRole));
    
    // Redirect to home page after successful login
    window.location.href = '/home';
  }
};

export const handleLogout = () => {
  sessionStorage.removeItem('msal.token');
  sessionStorage.removeItem('msal.user');
  window.location.href = '/';
};

// Function to generate the login URL
export const getLoginUrl = () => {
  const clientId = msalConfig.auth.clientId;
  const redirectUri = encodeURIComponent(window.location.origin);
  const scopes = loginRequest.scopes.join('%20');
  
  return `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&response_mode=query&scope=${scopes}`;
};

// Check for authorization code in URL (after redirect)
export const checkForAuthCode = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  
  if (code) {
    // In a real implementation, you would exchange this code for tokens
    // For now, we'll just simulate a successful login
    const mockResponse = {
      account: {
        name: 'Test User',
        username: 'test@example.com',
      },
      accessToken: 'mock-token',
    };
    
    handleLoginSuccess(mockResponse);
    
    // Remove the code from URL
    window.history.replaceState({}, document.title, window.location.pathname);
    
    return true;
  }
  
  return false;
}; 