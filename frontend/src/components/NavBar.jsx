import React from 'react'
import '../styles/NavBar.scss'
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './Auth0/LoginButton';
import LogoutButton from './Auth0/LogoutButton';


export default function NavBar() {
    const { user, isAuthenticated, isLoading } = useAuth0();

    return (
        <div className='nav-bar'>
            <div class='left'>
                <div>Logo</div>
                <div>Marks</div>
                <div>Achievements</div>
                <div>Users</div>
            </div>
            <div>
                
            </div>
            {!user && <LoginButton />}
            {user && <LogoutButton />}
        </div>
    )
}
