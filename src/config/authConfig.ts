// Authentication configuration
export const authConfig = {
  // API endpoints
  loginEndpoint: '/api/auth/login',
  logoutEndpoint: '/api/auth/logout',
  refreshTokenEndpoint: '/api/auth/refresh',
  
  // Token storage keys
  tokenKey: 'auth_token',
  refreshTokenKey: 'refresh_token',
  
  // Token expiration times (in seconds)
  tokenExpiration: 3600, // 1 hour
  refreshTokenExpiration: 86400, // 24 hours
  
  // User roles
  roles: {
    ADMIN: 'admin',
    USER: 'user',
    SUPER_ADMIN: 'super_admin'
  },
  
  // Default redirect paths
  defaultRedirectPath: '/',
  loginRedirectPath: '/login',
  
  // Mock user data for development
  mockUser: {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    role: 'admin',
    permissions: ['read', 'write']
  }
}; 