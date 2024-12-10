import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/auth/check", { credentials: "include" });
                //credentials means cookies here we need all the cookies
                //vite.config.js me /api ke prefix ko attach kra hai so to prevent writing all the url again
                //the fetch will return the user from auth.route.js
                const data = await res.json();
                setAuthUser(data.user); // null or authenticated user object
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        checkUserLoggedIn();
    }, []);

    return <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>{children}</AuthContext.Provider>;
};
