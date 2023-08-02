import Tag from './Tag';
import { useState, useEffect,useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import ROUTES from '../constants/routes';
import callGetApi from '../utils/callApi';

export default function MarkCard(props) {
    const { id, name, description, date, course, numerator, denominator, percent, tags } = props.children;

    const [courses, setCourses] = useState([]);
    const [allTags, setTags] = useState([]);
    const { user, isAuthenticated, loading } = useContext(AuthContext);

    useEffect(() => {
        const getCourses = async () => {
            if (!isAuthenticated) return;
            const response = await callGetApi(ROUTES.API.COURSES(user.username));
            if (response.status !== 200) {
                toast.error(response.data.message);
                return;
            };
            setCourses(response.data);
        }



        if (!loading) {
            getCourses();
        }

    }, [isAuthenticated, loading]);

    return (
        <div className='flex flex-row w-full px-5 py-5 rounded-2xl opacity-80 bg-white'>
            <div className='flex flex-col items-start justify-between w-full'>
                <div className='flex flex-row items-center gap-2'>
                    {tags.map(tag => <Tag name={tag}/>)}
                </div>
                <div className='h2'>{name}</div>
                <div className='h2'>{courses.find(c => c.id === course).name}</div>
                <div className='h2'>{date}</div>
            </div>
            <div className='h2'>{description}</div>
        </div>
    )
}


