import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../constants/routes";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setStates, removeStates } from "../features/auth";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const refreshToken = useSelector((state) => state.auth.refreshToken);

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();


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

