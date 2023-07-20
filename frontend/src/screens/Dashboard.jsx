import '../styles/Dashboard.scss'

export default function Dashboard() {
    return (
        <div className='dashboard'>
            <div className='title'>Dashboard</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="24" viewBox="0 0 1334 24" fill="none">
                <path d="M2.00372 8C0.899154 7.99835 0.00238576 8.89244 0.000734687 9.99701C-0.000916387 11.1016 0.893175 11.9983 1.99774 12L2.00372 8ZM1333.55 11.9904L1322.02 0.426099L1310.45 11.9558L1321.98 23.5201L1333.55 11.9904ZM1.99774 12L1322 13.9731L1322 9.97309L2.00372 8L1.99774 12Z" fill="#003459"/>
            </svg>

            <div className='container'>
                <div className='recent'>
                    <div className='title'>Recent Marks</div>
                </div>
                <div className='recent'>
                    <div className='title'>Recent Marks</div>
                </div>
            </div>
        </div>
    )
}