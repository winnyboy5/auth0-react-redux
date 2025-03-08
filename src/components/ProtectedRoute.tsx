import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0Redux } from '../hooks/useAuth0Redux';
import styles from './WelcomePage.module.css';

/**
 * Props for the ProtectedRoute component
 */
interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Protected Route Component
 * 
 * This component protects routes that should only be accessible to authenticated users.
 * It checks the authentication state and redirects to the login page if the user is not authenticated.
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth0Redux();

  // Show loader while checking auth
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Kick user to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // All good, render the protected content
  return <>{children}</>;
}; 