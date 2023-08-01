import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import ROUTES from "../constants/routes";
import { toast } from "react-toastify";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // initial states (check local storage)
    const [accessToken, setAccessToken] = useState(() => localStorage.getItem('access_token') || null);
    const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refresh_token') || null);
    const [isAuthenticated, setIsAuthenticated] = useState(() => (accessToken && refreshToken) ? true : false);
    const [user, setUser] = useState(() => (accessToken) ? jwt_decode(accessToken) : null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    const setStates = (access_token, refresh_token) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
        setUser(jwt_decode(access_token));
        setIsAuthenticated(true);
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
    }

    const removeStates = () => {
        delete axios.defaults.headers.common['Authorization'];
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }

    // refresh tokens after 4 minutes
    useEffect(() => {
        if (loading) { // initial render, update access token
            updateTokens();
            setLoading(false);
        }

        const interval = setInterval(async () => { // refresh tokens every 4 minutes
            if (accessToken && refreshToken) {
                await updateTokens();
            }
        }, 4 * 60 * 1000); // 4 minutes

        return () => clearInterval(interval);
    }, [accessToken, refreshToken, loading]);


    // verify tokens
    const verifyToken = async (token) => {
        const response = await axios.post(`${ROUTES.AUTH.VERIFY}/`, { token: token }).catch(err=>err.response);
        toast.info(response.status);
        if (response.status === 200) return true;
        return false;
    }


    // refresh tokens after 4 minutes
    const updateTokens = async () => {
        const response = await axios.post(`${ROUTES.AUTH.REFRESH}/`, { refresh: refreshToken }).catch(err=>err.response);
        if (response.status === 200) {
            setStates(response.data.access, response.data.refresh);
            return true;
        }
        removeStates();
        return false;
    }


    // checks credentials with backend and logs user in if valid
    const loginUser = async (loginState) => {
        console.log(loginState)
        const response = await axios.post(`${ROUTES.AUTH.LOGIN}/`, loginState).catch(err=>err.response);
        
        console.log(response);
        if (response.status === 200) {
            setStates(response.data.access, response.data.refresh);
            navigate(-1); // return to previous page
            toast.success('Logged in successfully!');
        } else toast.error(response.data.detail);
    }


    // logs user out
    const logoutUser = () => {
        removeStates();
        navigate('/login');
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
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

