import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CheckIn from './pages/CheckIn';
import TestHomePage from './pages/TestHomePage';

function App() {
    return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/checkin" element={<CheckIn />} />
    </Routes>
  );
  const { isAuthenticated, isLoading, logout, user } = useAuth0();
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'test'

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
      {/* Navigation buttons */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setCurrentPage('home')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            currentPage === 'home'
              ? 'bg-pink-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Home Page
        </button>
        <button
          onClick={() => setCurrentPage('test')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            currentPage === 'test'
              ? 'bg-pink-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Test Home Page
        </button>
      </div>

      {currentPage === 'home' ? (
        <HomePage 
          userName={user?.name || user?.email || "friend"} 
          onLogout={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        />
      ) : (
        <TestHomePage />
      )}
    </div>
  );
}

export default App;
