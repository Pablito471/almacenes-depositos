"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => {
    if (typeof window === "undefined") {
      return {
        user: null,
        role: null,
        profile: null,
        loading: true,
      };
    }

    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");
    const storedProfile = localStorage.getItem("profile");

    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      role: storedRole || null,
      profile: storedProfile ? JSON.parse(storedProfile) : null,
      loading: false,
    };
  });

  const login = (userData, userRole) => {
    setAuthState({
      user: userData,
      role: userRole,
      profile: null,
      loading: false,
    });
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("role", userRole);
  };

  const updateProfile = (profileData) => {
    setAuthState((prev) => ({
      ...prev,
      profile: profileData,
    }));
    localStorage.setItem("profile", JSON.stringify(profileData));
  };

  const logout = () => {
    setAuthState({
      user: null,
      role: null,
      profile: null,
      loading: false,
    });
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("profile");
  };

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        loading: authState.loading,
        role: authState.role,
        profile: authState.profile,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
}
