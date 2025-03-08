import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Auth0ProviderWithNavigate } from './auth/Auth0ProviderWithNavigate';
import { LoginPage } from './components/LoginPage';
import { WelcomePage } from './components/WelcomePage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { CallbackPage } from './components/CallbackPage';
import './App.css';

/**
 * Main Application Component
 * 
 * Sets up the application with:
 * - Redux store for state management
 * - React Router for navigation
 * - Auth0 for authentication
 * - Routes for different pages
 */
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Auth0ProviderWithNavigate>
          <Routes>
            {/* Login */}
            <Route path="/" element={<LoginPage />} />
            
            {/* Auth0 callback */}
            <Route path="/callback" element={<CallbackPage />} />
            
            {/* Dashboard (protected) */}
            <Route
              path="/welcome"
              element={
                <ProtectedRoute>
                  <WelcomePage />
                </ProtectedRoute>
              }
            />
            
            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Auth0ProviderWithNavigate>
      </Router>
    </Provider>
  );
}

export default App;
