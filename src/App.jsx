import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useEffect } from "react";
import { SignUpPage } from "./pages/SignUpPage";
import { useState } from "react";

function App() {
  const { isAuthenticated, isLoading, logout, user } = useAuth0();
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetch(`/api/users/check?auth0Id=${user.sub}`)
        .then((res) => res.json())
        .then((data) => {
          setIsNewUser(!data.exists);
        });
    }
  }, [isAuthenticated, user]);

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
    return <LoginPage></LoginPage>;
  }

  if (isNewUser) {
    return <SignUp />;
  }

  return <HomePage></HomePage>;
}

export default App;
