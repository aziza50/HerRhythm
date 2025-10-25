import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useEffect } from "react";
import { SignUpPage } from "./pages/SignUpPage";
import { useState } from "react";

function App() {
  const { isAuthenticated, isLoading, logout, user } = useAuth0();
<<<<<<< HEAD
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
=======
>>>>>>> e3d94fbdc5adae5c9edb8b7c6db7cf6a2db4a1a1

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

<<<<<<< HEAD
  if (isNewUser) {
    return <SignUp />;
  }

  return <HomePage></HomePage>;
=======
  return (
    <HomePage 
      userName={user?.name || user?.email || "friend"} 
      onLogout={() => logout({ logoutParams: { returnTo: window.location.origin } })}
    />
  );
>>>>>>> e3d94fbdc5adae5c9edb8b7c6db7cf6a2db4a1a1
}

export default App;
