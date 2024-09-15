import './styles/App.scss';
import { useRef, useEffect } from 'react';
import Base from './Base';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';

function App() {
    const dispatch = useDispatch();        


    return (
        <>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        /> 
        <div className='h-max min-h-screen w-full min-w-max flex flex-col'>
            <Base/>
        </div>
        </>
    );
}

export default App;
