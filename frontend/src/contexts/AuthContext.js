import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import ROUTES from "../constants/routes";
import { toast } from "react-toastify";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();


    // on initial load, check if user is authenticated and if tokens are valid
    useEffect(() => {
        const asyncFunc = async () => {
            const access_token = localStorage.getItem('access_token');
            const refresh_token = localStorage.getItem('refresh_token');
            if (access_token && await verifyToken(access_token) && refresh_token && await verifyToken(refresh_token)) {
                toast.success('Valid tokens!');
                setAccessToken(access_token);
                setRefreshToken(refresh_token);
                setUser(jwt_decode(access_token));
                setIsAuthenticated(true);
                axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
            } else {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                setAccessToken(null);
                setRefreshToken(null);
                setUser(null);
                setIsAuthenticated(false);
                delete axios.defaults.headers.common['Authorization'];
            }
        }
        asyncFunc();
    }, []);


    // verify tokens
    const verifyToken = async (token) => {
        const response = await axios.post(`${ROUTES.AUTH.VERIFY}/`, { token: token }).catch(err=>err.response);
        toast.info(response.status);
        if (response.status === 200) return true;
        return false;
    }


    // checks credentials with backend and logs user in if valid
    const loginUser = async (loginState) => {
        console.log(loginState)
        const response = await axios.post(`${ROUTES.AUTH.LOGIN}/`, loginState).catch(err=>err.response);
        
        console.log(response);
        if (response.status === 200) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
            setAccessToken(response.data.access);
            setRefreshToken(response.data.refresh);
            setUser(jwt_decode(response.data.access));
            setIsAuthenticated(true);
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            toast.success('Logged in successfully!');
            navigate(-1); // return to previous page
        } else toast.error(response.data.detail);
    }


    // logs user out
    const logoutUser = () => {
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        delete axios.defaults.headers.common['Authorization'];
        toast.success('Logged out successfully!');
    }


    // auth context data
    const contextData = {
        user: user,
        isAuthenticated: isAuthenticated,
        accessToken: accessToken,
        refreshToken: refreshToken,
        loginUser: loginUser,
        logoutUser: logoutUser,
    };


    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

