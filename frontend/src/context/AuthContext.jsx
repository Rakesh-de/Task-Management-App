import { createContext, useEffect, useState } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // Load User

  useEffect(() => {

    const loadUser = async () => {

      try {

        const token = localStorage.getItem("token");

        if (!token) {

          setLoading(false);

          return;

        }
        const { data } = await API.get("/auth/profile");

        setUser(data.user);


      }

      catch (err) {

        localStorage.removeItem("token");

        setUser(null);

      }

      finally {

        setLoading(false);

      }

    };

    loadUser();

  }, []);

  // Login

  const login = async (email, password) => {

    const { data } = await API.post("/auth/login", {

      email,

      password,

    });

    localStorage.setItem("token", data.token);

    setUser(data.user);

    return data;

  };

  // Register

  const register = async (name, email, password) => {

    const { data } = await API.post("/auth/register", {

      name,

      email,

      password,

    });

    localStorage.setItem("token", data.token);

    setUser(data.user);

    return data;

  };

  // Logout

  const logout = () => {

    localStorage.removeItem("token");

    setUser(null);

  };

  return (
   // ye global storege ek wifi ki tarah sab ko data deta h context hai jisme user, loading, login, register, logout ye sab cheezein available hongi baki components ke liye
    <AuthContext.Provider

      value={{

        user,

        loading,

        login,

        register,

        logout,

      }}

    >

      {children}

    </AuthContext.Provider>

  );

};