import { useState, useEffect } from 'react';
import '../styles/Dashboard.scss'
import { useAuth0 } from "@auth0/auth0-react";
import { Auth0Client, createAuth0Client } from '@auth0/auth0-spa-js';

export default function Dashboard() {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently, getIdTokenClaims } = useAuth0();
    
    // useEffect(() => {
    //     const doStuff = async () => {
    //         console.log('isAuthenticated', isAuthenticated);
    //         console.log('user', user);
    //         if (!isAuthenticated) return;
    //         const REACT_APP_AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID
    //         const REACT_APP_AUTH0_CLIENT_SECRET = process.env.REACT_APP_AUTH0_CLIENT_SECRET

    //         const response = await fetch('https://aazzazron.us.auth0.com/oauth/token', {
    //             method: 'POST',
    //             headers: {
    //                 'content-type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 grant_type: 'authorization_code',
    //                 client_id: REACT_APP_AUTH0_CLIENT_ID,
    //                 client_secret: REACT_APP_AUTH0_CLIENT_SECRET,
    //                 code: 'XzDvLk4z4HVuq8n6IYlz1B6nD5xP2xhUlEw_Z4eCw2P5V',
    //                 redirect_uri: 'http://localhost:3000/'
    //             })
    //         })
    //         const data = await response.json()
    //         console.log(data)
    //     }
    //     doStuff()
    // }, [isAuthenticated])

    useEffect(() => {
        const callApi = async () => {
            const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkEyUExNcDJLaDkzcXh6SVB2WkR3OCJ9.eyJpc3MiOiJodHRwczovL2FhenphenJvbi51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDExMTIxNzE5NDA2MzU0MDA5MjQiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpLyIsImlhdCI6MTY4OTkwMTE2MCwiZXhwIjoxNjg5OTA4MzYwLCJhenAiOiJ5UFdPZzRzdU5rWTlmZ1NLazNOSGc5bGJUZTBBSHRDYiIsInNjb3BlIjoiIn0.Ht9ctNSn3ojIUasvXvLLFWq3eMqghph3qgHwQWOvjBRO-1W-3uEzjGEMxwv_sbCLYtfmh0qHgYkp4GKea3mZp090PhiEsH2K6_Olh-STWb5N5KX_fL6tzLQ7xeDuAhe-b1fv2gTPEa-pclnp7YVEwujZqz0Q2nhXgTAgEAewsoG5tfFi4BpDMxtdDDsoaaZGwetWE-7JGQgNejTFgX1wHr-Ws6OKC-u_GUDdiyo31A_CBDyz9cTc5k54om3cbPhlVxutASxlBnM94vWTJuMnZ-j5fYGgRSDibQvCSeNdWPhXyYQyD1EZsgzy6Y52j60h32PPXX6CAiVbsRD661USXA'
            const response = await fetch('http://localhost:8000/api/private', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()
            console.log(data)
        }
        callApi()
    }, [isAuthenticated])

    return (
        <div className='dashboard'>
            <div className='title'>Dashboard</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="24" viewBox="0 0 1334 24" fill="none">
                <path d="M2.00372 8C0.899154 7.99835 0.00238576 8.89244 0.000734687 9.99701C-0.000916387 11.1016 0.893175 11.9983 1.99774 12L2.00372 8ZM1333.55 11.9904L1322.02 0.426099L1310.45 11.9558L1321.98 23.5201L1333.55 11.9904ZM1.99774 12L1322 13.9731L1322 9.97309L2.00372 8L1.99774 12Z" fill="#003459"/>
            </svg>
            <a href="https://aazzazron.us.auth0.com/authorize?response_type=token&client_id=yPWOg4suNkY9fgSKk3NHg9lbTe0AHtCb&redirect_uri=http://localhost:3000/&scope=email&audience=http://localhost:8000/api/&state=xyzABC123">
            Sign In
            </a>
            <div className='container'>
                <div className='recent'>
                    <div className='title'>Recent Marks</div>
                    {user && <div>{user.email}</div>}
                </div>
                <div className='recent'>
                    <div className='title'>Recent Marks</div>
                </div>
            </div>
        </div>
    )
}
