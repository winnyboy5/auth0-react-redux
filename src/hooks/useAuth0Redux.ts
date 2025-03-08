import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setUser } from '../store/slices/userSlice';
import { RootState } from '../store';

// Login options type
interface LoginOptions {
  appState?: {
    returnTo?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

// Hook to connect Auth0 with Redux
export const useAuth0Redux = () => {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    loginWithRedirect: auth0Login, 
    logout: auth0Logout, 
    getAccessTokenSilently, 
    error 
  } = useAuth0();
  
  const dispatch = useDispatch();
  const reduxUser = useSelector((state: RootState) => state.user);

  // Sync Auth0 user with Redux
  useEffect(() => {
    const syncUser = async () => {
      if (isAuthenticated && user) {
        try {
          // Get token if needed for API calls
          // const token = await getAccessTokenSilently();
          
          dispatch(setUser({
            name: user.name,
            email: user.email,
            picture: user.picture,
            sub: user.sub,
          }));
        } catch (err) {
          console.error('Redux sync error:', err);
        }
      } else if (!isLoading && !isAuthenticated) {
        dispatch(clearUser());
      }
    };

    syncUser();
  }, [dispatch, isAuthenticated, isLoading, user, getAccessTokenSilently]);

  // Login with better redirect handling
  const loginWithRedirect = useCallback((options?: LoginOptions) => {
    return auth0Login({
      ...options,
      appState: {
        ...options?.appState,
        returnTo: options?.appState?.returnTo || '/welcome',
      },
    });
  }, [auth0Login]);

  // Logout and go home
  const logout = useCallback(() => {
    auth0Logout({ 
      logoutParams: {
        returnTo: window.location.origin 
      }
    });
  }, [auth0Logout]);

  return {
    user: reduxUser.user,
    isAuthenticated: reduxUser.isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    error,
  };
}; 