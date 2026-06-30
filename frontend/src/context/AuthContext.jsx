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