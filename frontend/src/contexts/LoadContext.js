import { createContext } from 'react';
import ROUTES from '../constants/routes';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';


export const LoadContext = createContext();

export const LoadProvider = ({ children }) => {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.auth.accessToken);

    // get data from api
    const getData = async (url) => {
        if (accessToken) axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        const response = await axios.get(url).catch(err=>err.response);
        console.log(response);
        if (response.status === 200) {
            return response.data;
        }
        toast.error(response.status);
        return null;
    }


    const getUsers = async () => {
        return getData(ROUTES.API.USERS);
    }

    const getUser = async (username) => {
        return getData(`${ROUTES.API.USER(username)}/`);
    }



    const contextData = {
        getUsers: getUsers,
        getUser: getUser,
    }

    return (
        <LoadContext.Provider value={{contextData}}>
            {children}
        </LoadContext.Provider>
    )
}