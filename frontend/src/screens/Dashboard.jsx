import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/Dashboard.scss'
import axios from 'axios';
import ROUTES from '../constants/routes';
import callGetApi from '../utils/callApi';
import { toast } from 'react-toastify';
import MarkCard  from '../components/MarkCard';



export default function Dashboard() {
    const { user, isAuthenticated, loading } = useContext(AuthContext);
    const [marks, setMarks] = useState([]);

    useEffect(() => {
        const getMarks = async () => {
            if (!isAuthenticated) return;
            const response = await callGetApi(ROUTES.BASEURL + '/api/user/' + user.username + '/marks/');
            console.log(response);
            if (response.status !== 200) {
                toast.error(response.data.message);
                return;
            };
            setMarks(response.data);
        }
        if (!loading) getMarks();
    }, [isAuthenticated, loading]);

    return (
        <div className='flex flex-col shrink-0 gap-y-6 items-start my-10 mx-20'>
            <div className='h1'>Dashboard</div>
            <div className='flex justify-between items-stretch w-full gap-x-10'>
                <div className='flex flex-col items-start w-full px-5 py-5 rounded-2xl opacity-80 bg-yellow-20'>
                    {
                        marks.map(mark => <MarkCard>{mark}</MarkCard>)
                    }
                </div>
                <div className='flex flex-col items-start w-full px-5 py-5 rounded-2xl opacity-80 bg-yellow-20'>
                    <div className='h2'>Recent Marks</div>
                </div>
            </div>
        </div>
    )
}
