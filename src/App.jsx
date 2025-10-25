import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

function App() {
  const { isAuthenticated, isLoading, logout, user } = useAuth0();
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div>
          <p className="text-xl font-semibold text-gray-800">
            Welcome, {user?.name || user?.email}! 🌸
          </p>
          <button 
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Log Out
          </button>
      <HomePage />
      </div>
  );
}

export default App;