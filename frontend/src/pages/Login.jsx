import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../lib/utils'; 
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

        if (!email || !password) {
            return handleError('Email and password are required');
        }

        try {
            const url = "http://localhost:5000/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginInfo),
            });

            const result = await response.json();
            console.log("Response:", result);
            const { success, message, jwtToken, name, error } = result;

            if (response.status === 409) {
                return handleError("User already exists. Please login.");
            }

            if (response.ok && result.success) {
                handleSuccess(result.message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => navigate('/home'), 1000);
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            } else {
                handleError(result.message || "Signup failed, please try again.");
            }
        } catch (err) {
            console.error("Signup Error:", err);
            handleError("Something went wrong! Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 py-10">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-5">Login</h1>
                <form className="flex flex-col gap-4 w-full" onSubmit={handleLogin}>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-lg font-medium mb-1">Email</label>
                        <input
                            onChange={handleChange}
                            type="email"
                            name="email"
                            placeholder="Enter your email..."
                            className="text-lg p-2 outline-none border border-gray-300 rounded-md placeholder:text-gray-500 placeholder:italic focus:ring-2 focus:ring-teal-600"
                            value={loginInfo.email}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-lg font-medium mb-1">Password</label>
                        <input
                            onChange={handleChange}
                            type="password"
                            name="password"
                            placeholder="Enter your password..."
                            className="text-lg p-2 outline-none border border-gray-300 rounded-md placeholder:text-gray-500 placeholder:italic focus:ring-2 focus:ring-teal-600"
                            value={loginInfo.password}
                        />
                    </div>

                    <button type='submit' className="bg-teal-700 text-white text-lg font-semibold py-3 rounded-md mt-2 transition duration-300 hover:bg-teal-800">
                        Login
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    Don't have an account?
                    <Link to="/signup" className="text-teal-700 font-bold ml-1 hover:underline">
                        Signup
                    </Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;
