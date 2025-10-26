import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [isNewUser, setIsNewUser] = useState(null);
  const [checkingUser, setCheckingUser] = useState(false);

  useEffect(() => {
    console.log("🔥 useEffect running");
    console.log("isAuthenticated:", isAuthenticated);
    console.log("isLoading:", isLoading);
    console.log("user:", user);
    console.log("isNewUser:", isNewUser);
    console.log("checkingUser:", checkingUser);

    // Only check user after Auth0 has finished loading AND user is authenticated
    if (
      !isLoading &&
      isAuthenticated &&
      user &&
      isNewUser === null &&
      !checkingUser
    ) {
      console.log("✅ Starting user check...");
      setCheckingUser(true);

      fetch(`http://localhost:5001/api/users/check?auth0Id=${user.sub}`)
        .then((res) => {
          console.log("📡 Response received, status:", res.status);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log("📦 Data received:", data);
          const newUserValue = !data.exists;
          console.log("🎯 Setting isNewUser to:", newUserValue);
          setIsNewUser(newUserValue);
          setCheckingUser(false);
          console.log("✅ Done checking user");
        })
        .catch((err) => {
          console.error("❌ API error:", err);
          setIsNewUser(false);
          setCheckingUser(false);
        });
    }
  }, [isAuthenticated, isLoading, user, isNewUser, checkingUser]);

  console.log("=== RENDER ===");
  console.log("isNewUser:", isNewUser, "checkingUser:", checkingUser);

  // Show loading while Auth0 is loading OR while we're checking the user
  if (isLoading || checkingUser || (isAuthenticated && isNewUser === null)) {
    console.log("Showing loading screen");
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    console.log("Showing LoginPage");
    return <LoginPage />;
  }

  // Show signup page for new users
  if (isNewUser === true) {
    console.log("🎉 Showing SignUpPage");
    return <SignUpPage />;
  }

  // Show home page for existing users
  console.log("Showing HomePage");
  return <HomePage />;
}

export default App;
