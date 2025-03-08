import { useAuth0Redux } from '../hooks/useAuth0Redux';
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './WelcomePage.module.css';

/**
 * Welcome Page Component
 * 
 * Displays the authenticated user's profile information.
 * This page is protected and only accessible to authenticated users.
 */
export const WelcomePage = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0Redux();
  const [imgError, setImgError] = useState(false);
  const [userData, setUserData] = useState({
    name: 'User',
    email: 'No email available',
    sub: 'Not available'
  });

  /**
   * Update user data when the user object changes
   */
  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || 'User',
        email: user.email || 'No email available',
        sub: user.sub || 'Not available'
      });
    }
  }, [user]);

  /**
   * Handles image loading errors by setting the imageError state to true
   */
  const handleImgError = () => setImgError(true);

  /**
   * Renders a fallback avatar with the user's initials when no image is available
   * @returns JSX element with the user's initials
   */
  const renderAvatar = () => {
    if (!userData.name || userData.name === 'User') {
      return <div className={styles.fallbackAvatar}>?</div>;
    }
    
    // Get first letters of first and last name
    const initials = userData.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
    
    return <div className={styles.fallbackAvatar}>{initials}</div>;
  };

  // Show loading spinner while authentication state is being determined
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  // Redirect to login page if user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Render user profile information
  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.welcomeCard}>
        {/* Header section with logo and title */}
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <div className={styles.logo}>
              <span>Auth0</span>
              <span className={styles.logoAccent}>React</span>
            </div>
          </div>
          <h1>Dashboard</h1>
        </div>
        
        <div className={styles.profileSection}>
          {/* User profile header with picture and name */}
          <div className={styles.profileHeader}>
            {user?.picture && !imgError ? (
              <img 
                src={user.picture} 
                alt="Profile" 
                className={styles.profilePicture}
                onError={handleImgError}
              />
            ) : (
              renderAvatar()
            )}
            <div className={styles.profileInfo}>
              <h2>{userData.name}</h2>
              <p className={styles.emailText}>{userData.email}</p>
            </div>
          </div>
          
          {/* User information card with detailed profile data */}
          <div className={styles.userInfoCard}>
            <h3>Profile Information</h3>
            <div className={styles.userInfo}>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                  </svg>
                  <strong>Name:</strong>
                </div>
                <div>{userData.name}</div>
              </div>
              
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
                  </svg>
                  <strong>Email:</strong>
                </div>
                <div>{userData.email}</div>
              </div>
              
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <strong>User ID:</strong>
                </div>
                <div className={styles.userId}>{userData.sub}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer section with logout button */}
        <div className={styles.actions}>
          <button 
            className={styles.logoutButton}
            onClick={() => logout()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}; 