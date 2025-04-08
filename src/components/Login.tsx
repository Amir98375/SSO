import React, { useEffect } from 'react';
import { checkForAuthCode, getLoginUrl } from '../auth';

const Login: React.FC = () => {
  useEffect(() => {
    checkForAuthCode();
  }, []);

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome to Dashboard</h1>
        <p>Please sign in to continue</p>
        <button 
          className="login-button"
          onClick={() => window.location.href = getLoginUrl()}
        >
          Sign in with Azure AD
        </button>
      </div>
    </div>
  );
};

export default Login; 