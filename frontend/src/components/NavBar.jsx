import React from 'react'
import '../styles/NavBar.scss'



export default function NavBar() {

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
            {/* {!user && <LoginButton />}
            {user && <LogoutButton />} */}
        </div>
    )
}
