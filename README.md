# Auth0 React Redux

A simple React app with Auth0 login and Redux for state management.

## What it does

- Log in with Auth0
- View your profile info after login
- Protected routes that need authentication
- Responsive design that works on mobile

## Tech used

- React + TypeScript
- Redux Toolkit
- Auth0
- React Router
- Vite
- CSS Modules

## Getting started

### Auth0 setup

1. Create an account at [Auth0](https://auth0.com/)
2. Make a new "Single Page Application"
3. Set these URLs in your Auth0 dashboard:
   - Callback URL: `http://localhost:5173/callback`
   - Logout URL: `http://localhost:5173`
   - Web Origin: `http://localhost:5173`
   - Make sure "Application Type" is set to "Single Page Application"

### Running the app

1. Clone the repo and install dependencies
   ```
   git clone https://github.com/winnyboy5/auth0-react-redux.git
   cd auth0-react-redux
   npm install
   ```

2. Create a `.env` file with your Auth0 info
   ```
   VITE_AUTH0_DOMAIN=your-domain.auth0.com
   VITE_AUTH0_CLIENT_ID=your-client-id
   VITE_AUTH0_CALLBACK_URL=http://localhost:5173/callback
   ```

3. Start the dev server
   ```
   npm run dev
   ```

4. Open http://localhost:5173 in your browser

## Project structure

```
src/
├── auth/              - Auth0 setup
├── components/        - UI components
├── hooks/             - Custom hooks
├── store/             - Redux setup
└── App.tsx            - Main component
```

## How it works

1. Click "Sign In" on the login page
2. Auth0 handles the authentication
3. After login, you'll see your profile info
4. Click "Sign Out" to log out

