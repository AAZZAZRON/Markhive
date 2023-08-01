import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/Dashboard.scss'



export default function Dashboard() {
    const { user, isAuthenticated } = useContext(AuthContext);

    return (
        <div className='flex flex-col shrink-0 gap-y-6 items-start my-10 mx-20'>
            <div className='h1'>Dashboard</div>
            <div className='flex justify-between items-stretch w-full gap-x-10'>
                <div className='flex flex-col items-start w-full px-5 py-5 rounded-2xl opacity-80 bg-yellow-20'>
                    <div className='h2'>{isAuthenticated && user.username}</div>
                    <div className='h2'>hello world</div>
                </div>
                <div className='flex flex-col items-start w-full px-5 py-5 rounded-2xl opacity-80 bg-yellow-20'>
                    <div className='h2'>Recent Marks</div>
                </div>
            </div>
        </div>
    )
}
