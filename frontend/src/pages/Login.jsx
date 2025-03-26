import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../lib/utils'; // ✅ handleSuccess ko bhi import karna zaroori hai

function Login() {
    const [loginInfo, setloginInfo] = useState({
       
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setloginInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;

        if ( !email || !password) {
            return handleError(' email, and password are required');
        }

        try {
            const url = "http://localhost:8080/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginInfo),
            });

            const result = await response.json();
            console.log("Response:", result); // Debugging ke liye
            const {success, message,jwtToken,name, error}=result; 

            if (response.status === 409) {
                return handleError("User already exists. Please login.");
            }

            if (response.ok && result.success) {
                handleSuccess(result.message);
                localStorage.setItem('token',jwtToken);
                localStorage.setItem('loggedInUser',name);
                setTimeout(() => navigate('/home'), 1000);
            } else if(error){
                const details=error?.details[0].message;
                handleError(details);
                
            }
            else if(!success){
                handleError(message);
            }
            else {
                handleError(result.message || "Signup failed, please try again.");
            }
        } catch (err) {
            console.error("Signup Error:", err);
            handleError("Something went wrong! Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 py-10">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                <form className="space-y-4" onSubmit={handleLogin}>
                    
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium">
                            Email
                        </label>
                        <input
                            onChange={handleChange}
                            type="email"
                            name="email"
                            placeholder="Enter your email..."
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                            value={loginInfo.email}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium">
                            Password
                        </label>
                        <input
                            onChange={handleChange}
                            type="password"
                            name="password"
                            placeholder="Enter your password..."
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                            value={loginInfo.password}
                        />
                    </div>
                    <button type='submit' className="w-full bg-teal-700 text-white py-2 rounded-lg hover:bg-teal-800 transition">
                        Login
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-teal-700 font-semibold hover:underline">
                        Signup
                    </Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;
