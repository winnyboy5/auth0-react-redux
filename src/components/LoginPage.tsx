import { useAuth0Redux } from '../hooks/useAuth0Redux';
import { Navigate } from 'react-router-dom';
import { useCallback } from 'react';
import styles from './LoginPage.module.css';

/**
 * Login Page Component
 * 
 * Displays the login interface and handles authentication flow.
 * Redirects to welcome page if user is already authenticated.
 */
export const LoginPage = () => {
  const { isAuthenticated, isLoading, loginWithRedirect, error } = useAuth0Redux();

  /**
   * Handle login button click
   * Initiates the Auth0 login flow with redirect
   */
  const handleLogin = useCallback(() => {
    loginWithRedirect({
      appState: {
        returnTo: '/welcome'
      }
    });
  }, [loginWithRedirect]);

  // Show loading spinner while authentication state is being determined
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect to welcome page if user is already authenticated
  if (isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }

  // Render login form
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <span>Auth0</span>
            <span className={styles.logoAccent}>React</span>
          </div>
        </div>
        
        <h1>Welcome</h1>
        <p className={styles.subtitle}>Sign in to your account to continue</p>
        
        {/* Display error message if authentication failed */}
        {error && (
          <div className={styles.errorMessage}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z"/>
            </svg>
            <span>{error.message}</span>
          </div>
        )}
        
        <button 
          className={styles.loginButton}
          onClick={handleLogin}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M10 17v-4h10v4h2V5h-2v4H10V5H8v12h2z"/>
          </svg>
          Sign In with Auth0
        </button>
        
        <div className={styles.footer}>
          <p>Secure authentication powered by Auth0</p>
        </div>
      </div>
    </div>
  );
}; 