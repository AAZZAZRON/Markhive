import React from 'react'
import '../styles/NavBar.scss'
import { useAuth0 } from "@auth0/auth0-react";


export default function NavBar() {
    const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
    
    console.log(user);

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
            <div onClick={() => loginWithRedirect()}>
                Log In
            </div>
        </div>
    )
}
