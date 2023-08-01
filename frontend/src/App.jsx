import './styles/App.scss';
import { useRef, useEffect } from 'react';
import Base from './Base';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    // resize window on size change
    const ref = useRef(null);
    // useEffect(() => {
    //     resizeWindow();
    //     function resizeWindow() {
    //         console.log(window.innerWidth);
    //         ref.current.style.transform = `scale(${window.innerWidth / 1440})`;
    //     };
    //     window.addEventListener("resize", resizeWindow);
    // });
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
        <div ref={ref} className='h-max min-h-screen w-full min-w-max items-center flex flex-col bg-yellow-20'>
            <Base/>
        </div>
        </>
    );
}

export default App;
