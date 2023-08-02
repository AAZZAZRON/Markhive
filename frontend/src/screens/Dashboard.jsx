import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/Dashboard.scss'
import axios from 'axios';
import ROUTES from '../constants/routes';
import callGetApi from '../utils/callApi';
import { toast } from 'react-toastify';
import MarkCard  from '../components/MarkCard';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../features/user';



export default function Dashboard() {
    const user = useSelector(state => state.auth.user);
    const accessToken = useSelector(state => state.auth.accessToken);
    const refreshToken = useSelector(state => state.auth.refreshToken);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const [marks, setMarks] = useState([]);
    const [courses, setCourses] = useState([]);
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        const getMarks = async () => {
            if (!isAuthenticated) return;
            const response = await callGetApi(ROUTES.API.MARKS(user.username));
            if (response.status !== 200) {
                toast.error(response.data.message);
                return;
            };
            setMarks(response.data);
            console.log(response);
        }

        getMarks();
    }, []);

    return (
        <div className='flex flex-col shrink-0 gap-y-6 items-start my-10 mx-20'>
            <div className='h1'>Dashboard</div>
            <div className='flex justify-between items-stretch w-full gap-x-10'>
                <div className='flex flex-col items-start w-60 px-5 py-5 rounded-2xl opacity-80 bg-yellow-20'>
                    {/* {
                        marks.map((mark, index) => <MarkCard key={index}>{mark}</MarkCard>)
                    } */}
                    <div className='h2 break-all'>{accessToken}</div>
                </div>
                <div className='flex flex-col items-start w-60 px-5 py-5 rounded-2xl opacity-80 bg-yellow-20'>
                    <div className='h2 break-all'>{refreshToken}</div>
                </div>
            </div>
        </div>
    )
}
