"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';


const Navbar = () => {
    const [username, setUsername] = useState<string | null>(null);


    useEffect(() => {

        const user = localStorage.getItem('username');
        setUsername(user);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    
    };

    return (
        <nav className="bg-gray-800 p-4 text-white flex justify-between">
            <div className="text-lg font-bold">Budget App</div>
            <div>
                <a href="/" className="mr-4">Entry</a>
                <a href="/approval" className="mr-4">Approval</a>
                {username ? (
                    <>
                        <span className="mr-4">{username}</span>
                        <button onClick={handleLogout} className="text-blue-400 hover:underline">Logout</button>
                    </>
                ) : (
                    <Link href="/login" className="text-blue-400 hover:underline">Login </Link>

                    
                )}
            </div>
        </nav>
    );
};

export default Navbar;
