import React from 'react'
import '../styles/NavBar.scss'
import { useLocation } from 'react-router-dom'



export default function NavBar() {
    const location = useLocation();
    const noNavBar = ['/login', '/signup'] // pages with no nav bar
    if (noNavBar.includes(location.pathname)) {
        return (<></>)
    }

    return (
        <div className='relative flex w-full justify-between items-center bg-yellow-50 px-8 py-5 gap-16'>
            <div class='flex items-center gap-16'>
                <div>Logo</div>
                <div>Marks</div>
                <div>Achievements</div>
                <div>Users</div>
            </div>
            <a href='/login' class='hover:font-bold'>
                Log In
            </a>
        </div>
    )
}
