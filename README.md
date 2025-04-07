# Azure SSO Dashboard

A React dashboard application with Microsoft Azure SSO integration and role-based access control.

## Features

- Microsoft Azure SSO authentication using MSAL.js
- Role-based access control
- Responsive navigation bar
- Protected routes
- User profile management

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Microsoft Azure account with an Azure AD tenant
- Azure AD app registration

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Azure AD:
   - Go to Azure Portal > Azure Active Directory > App registrations
   - Create a new registration
   - Set the redirect URI to `http://localhost:3000`
   - Copy the Application (client) ID and Directory (tenant) ID

4. Update the configuration:
   - Open `src/config/authConfig.ts`
   - Replace `YOUR_CLIENT_ID` with your Azure AD application client ID
   - Replace `YOUR_TENANT_ID` with your Azure AD tenant ID

5. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```
src/
  ├── components/         # React components
  │   ├── Login.tsx      # Login page
  │   ├── Navbar.tsx     # Navigation bar
  │   └── ProtectedRoute.tsx  # Route protection
  ├── config/            # Configuration files
  │   └── authConfig.ts  # MSAL configuration
  ├── hooks/             # Custom hooks
  │   └── useAuth.ts     # Authentication hook
  └── App.tsx            # Main application component
```

## Authentication Flow

1. User clicks "Sign in with Microsoft"
2. MSAL redirects to Microsoft login page
3. After successful login, user is redirected back to the application
4. User profile is fetched from Microsoft Graph API
5. Role-based access is enforced for protected routes

## Role-Based Access

- `/home`: Accessible to all authenticated users
- `/db-config`: Accessible only to users with the super-admin role

## Development

To run the application in development mode:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.
