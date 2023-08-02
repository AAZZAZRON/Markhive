import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import ROUTES from "../constants/routes";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setStates, removeStates } from "../features/auth";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // initial states (check local storage)
    // const [accessToken, setAccessToken] = useState(() => localStorage.getItem('access_token') || null);
    // const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refresh_token') || null);
    // const [isAuthenticated, setIsAuthenticated] = useState(() => (accessToken && refreshToken) ? true : false);
    // const [user, setUser] = useState(() => (accessToken) ? jwt_decode(accessToken) : null);
    // const [loading, setLoading] = useState(true);

    const accessToken = useSelector((state) => state.auth.accessToken);
    const refreshToken = useSelector((state) => state.auth.refreshToken);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    // const setStates = (access_token, refresh_token) => {
    //     axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    //     setAccessToken(access_token);
    //     setRefreshToken(refresh_token);
    //     setUser(jwt_decode(access_token));
    //     setIsAuthenticated(true);
    //     localStorage.setItem('access_token', access_token);
    //     localStorage.setItem('refresh_token', refresh_token);
    // }

    // const removeStates = () => {
    //     delete axios.defaults.headers.common['Authorization'];
    //     setAccessToken(null);
    //     setRefreshToken(null);
    //     setUser(null);
    //     setIsAuthenticated(false);
    //     localStorage.removeItem('access_token');
    //     localStorage.removeItem('refresh_token');
    // }

    // refresh tokens after 4 minutes
    useEffect(() => {
        // initial render to get a new access token if needed
        const initialRender = async () => {
            console.log('initial render')
            setLoading(false);
            if (accessToken && refreshToken) await updateTokens();
        }

        if (loading) initialRender();


        const interval = setInterval(async () => { // refresh tokens every 4 minutes
            console.log('refreshing tokens')
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
        console.log(response);
        if (response.status === 200) {
            dispatch(setStates({access: response.data.access, refresh: response.data.refresh}));
            return true;
        }
        dispatch(removeStates());
        return false;
    }


    // checks credentials with backend and logs user in if valid
    const loginUser = async (loginState) => {
        console.log(loginState)
        const response = await axios.post(`${ROUTES.AUTH.LOGIN}/`, loginState).catch(err=>err.response);
        
        console.log(response);
        if (response.status === 200) {
            dispatch(setStates({access: response.data.access, refresh: response.data.refresh}));
            navigate(-1); // return to previous page
            toast.success('Logged in successfully!');
        } else toast.error(response.data.detail);
    }


    const signupUser = async (signupState) => {
        console.log(signupState);
        const response = await axios.post(`${ROUTES.POST.SIGNUP}/`, signupState).catch(err=>err.response);
        console.log(response);
        if (response.status === 200) {
            if (response.data.success) {
                navigate('/');
                navigate('/login');
                toast.success(response.data.message);
            } else toast.error(response.data.message);
        } else toast.error(response.data.detail);
    }


    // logs user out
    const logoutUser = () => {
        dispatch(removeStates());
        navigate('/login');
        toast.success('Logged out successfully!');
    }


    // auth context data
    const contextData = {
        loginUser: loginUser,
        signupUser: signupUser,
        logoutUser: logoutUser,
    };
        

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

