import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("eazyworld_user");
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error("Error parsing saved user session:", e);
      }
    }
    return { name: "RAMA KRISHNAN", email: "rama.krishnan@eazyworld.com" };
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("eazyworld_is_logged_in") === "true";
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("eazyworld_user", JSON.stringify(user));
    }
    localStorage.setItem("eazyworld_is_logged_in", isLoggedIn ? "true" : "false");
  }, [user, isLoggedIn]);

  const handleLoginSuccess = (userData) => {
    if (userData && userData.name) {
      setUser(userData);
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("eazyworld_is_logged_in");
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;