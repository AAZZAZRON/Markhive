import './styles/App.scss';
import { useRef, useEffect } from 'react';
import Base from './Base';

function App() {
    // resize window on size change
    const ref = useRef(null);
    useEffect(() => {
        resizeWindow();
        function resizeWindow() {
            console.log(window.innerWidth);
            ref.current.style.transform = `scale(${window.innerWidth / 1440})`;
        };
        window.addEventListener("resize", resizeWindow);
    });
    return (
        <div ref={ref} className='website'>
            <Base/>
        </div>
    );
}

export default App;
