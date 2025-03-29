import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../lib/utils';
//import { resourceLimits } from 'worker_threads';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;

        if (!name || !email || !password) {
            return handleError('Name, email, and password are required');
        }
        
        try {
            const url = "http://localhost:8000/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupInfo),
            });

         const result = await response.json();
            
            console.log("Response:", result);
            const {success, message, error} = result;

            if (response.status === 409) {
                return handleError("User already exists. Please login.");
            }

            if (response.ok && result.success) {
                handleSuccess(result.message);
                setTimeout(() => navigate('/login'), 1000);
            } else if(error){
                const details = error?.details[0].message;
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
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-5">Signup</h1>
                <form className="flex flex-col gap-4 w-full" onSubmit={handleSignup}>
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-lg font-medium mb-1">Name</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="name"
                            placeholder="Enter your name..."
                            className="text-lg p-2 outline-none border border-gray-300 rounded-md placeholder:text-gray-500 placeholder:italic focus:ring-2 focus:ring-teal-600"
                            value={signupInfo.name}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-lg font-medium mb-1">Email</label>
                        <input
                            onChange={handleChange}
                            type="email"
                            name="email"
                            placeholder="Enter your email..."
                            className="text-lg p-2 outline-none border border-gray-300 rounded-md placeholder:text-gray-500 placeholder:italic focus:ring-2 focus:ring-teal-600"
                            value={signupInfo.email}
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
                            value={signupInfo.password}
                        />
                    </div>
                    <button type='submit' className="bg-teal-600 text-white text-lg font-semibold py-3 rounded-md mt-2 transition duration-300 hover:bg-teal-800">
                        Signup
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    Already have an account?
                    <Link to="/login" className="text-teal-600 font-bold ml-1 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Signup;
