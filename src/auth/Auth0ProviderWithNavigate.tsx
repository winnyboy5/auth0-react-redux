import { Auth0Provider } from '@auth0/auth0-react';
import { ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Component props
interface Auth0ProviderWithNavigateProps {
  children: ReactNode;
}

// App state for Auth0 redirects
interface AppState {
  returnTo?: string;
  [key: string]: unknown;
}

// Auth0 provider that handles navigation after login
export const Auth0ProviderWithNavigate = ({ children }: Auth0ProviderWithNavigateProps) => {
  const navigate = useNavigate();

  // Get config from env vars
  const domain = import.meta.env.VITE_AUTH0_DOMAIN || '';
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID || '';
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL || window.location.origin;

  // Handle redirect after auth completes
  const onRedirectCallback = useCallback((appState: AppState | undefined) => {
    navigate(appState?.returnTo || '/welcome', { replace: true });
  }, [navigate]);

  // Show error if config is missing
  if (!domain || !clientId) {
    return <div>Auth0 configuration is missing. Please check your environment variables.</div>;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
      useRefreshTokens={true}
      useRefreshTokensFallback={true}
    >
      {children}
    </Auth0Provider>
  );
}; 