import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
            navigate('/');
        }, 3000);

        return () => {
            clearTimeout(redirectTimeout);
        };
    }, [navigate]);
    return (
        <div className='flex h-screen w-screen items-center justify-center'>
            <div>
                <h1>Please wait, you are being redirected . . .</h1>
            </div>
        </div>
    )
}

export default LogoutPage