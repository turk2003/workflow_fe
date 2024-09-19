"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // ส่ง request ไปยัง API ที่กำหนดไว้ใน environment variable
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {username: email, password });
            
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', email);
    
            router.push('/');

            
        } catch (error) {
            console.error('Login error:', error);
          
            
            alert('Login failed. Please check your credentials.');
           
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl mb-4 text-black">Please sign in</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1 text-black">Email address</label>
                        <input
                        placeholder='email'
                           
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded text-black"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-1 text-black">Password</label>
                        <input
                        placeholder='password'
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded text-black"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;