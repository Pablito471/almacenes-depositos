"use client";

import { createContext, useContext, useState, useEffect } from "react";
import apiClient from "@/services/apiClient";

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

  // Login con backend
  const login = async (email, password) => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true }));
      const response = await apiClient.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      // Guardar token y usuario
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);

      setAuthState({
        user,
        role: user.role,
        profile: null,
        loading: false,
      });

      return { success: true, user };
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Error al iniciar sesión";
      setAuthState((prev) => ({ ...prev, loading: false }));
      throw new Error(errorMsg);
    }
  };

  // Registro con backend
  const register = async (email, password, nombre, role) => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true }));
      const response = await apiClient.post("/auth/register", {
        email,
        password,
        nombre,
        role,
      });

      const { token, user } = response.data;

      // Guardar token y usuario
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);

      setAuthState({
        user,
        role: user.role,
        profile: null,
        loading: false,
      });

      return { success: true, user };
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Error en el registro";
      setAuthState((prev) => ({ ...prev, loading: false }));
      throw new Error(errorMsg);
    }
  };

  // Obtener perfil del usuario
  const getProfile = async () => {
    try {
      const response = await apiClient.get("/auth/profile");
      const { user } = response.data;

      setAuthState((prev) => ({
        ...prev,
        profile: user,
      }));
      localStorage.setItem("profile", JSON.stringify(user));

      return user;
    } catch (error) {
      console.error("Error al obtener perfil:", error);
      return null;
    }
  };

  const updateProfile = (profileData) => {
    setAuthState((prev) => ({
      ...prev,
      profile: profileData,
    }));
    localStorage.setItem("profile", JSON.stringify(profileData));
  };

  const logout = async () => {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("Error en logout:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      localStorage.removeItem("profile");
      setAuthState({
        user: null,
        role: null,
        profile: null,
        loading: false,
      });
    }
  };

  // Verificar token al cargar
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await getProfile();
        } catch (error) {
          // Token inválido
          logout();
        }
      }
      setAuthState((prev) => ({ ...prev, loading: false }));
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        loading: authState.loading,
        role: authState.role,
        profile: authState.profile,
        login,
        register,
        logout,
        updateProfile,
        getProfile,
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
