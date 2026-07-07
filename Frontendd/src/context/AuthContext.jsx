import {useState, useEffect, createContext ,useContext} from "react";

const AuthContext = createContext(); // return context object

export const AuthProvider = ({children})=>{  // ye ek react componenet h AuthProvider
   // JSON.parse() ye string ko object me convert krta h
    const [user,setuser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = (token,userData)=>{
        localStorage.setItem("token",token);
        localStorage.setItem("user",JSON.stringify(userData));
        setuser(userData);
    };

    const logout = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setuser(null);
    }   

    return(
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

