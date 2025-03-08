import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

/**
 * Callback Page Component
 * 
 * This component handles the Auth0 authentication callback.
 * It displays a loading state while Auth0 processes the authentication result,
 * then redirects to the welcome page or displays errors if authentication failed.
 */
export const CallbackPage = () => {
  const { error, isLoading, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  /**
   * Effect to handle redirect after authentication is complete
   * This is a fallback in case the onRedirectCallback in Auth0Provider doesn't work
   */
  useEffect(() => {
    // If authentication is complete and there's no error, navigate to welcome page
    if (!isLoading && isAuthenticated && !error) {
      navigate('/welcome', { replace: true });
    }
  }, [isLoading, isAuthenticated, error, navigate]);

  // Display error message if authentication failed
  if (error) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h1>Authentication Error</h1>
          <p>{error.message}</p>
          <div style={{ marginTop: '20px' }}>
            <button 
              className={styles.loginButton}
              onClick={() => navigate('/', { replace: true })}
            >
              Return to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Display loading state while authentication is being processed
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}></div>
      <p>Processing authentication, please wait...</p>
    </div>
  );
}; 