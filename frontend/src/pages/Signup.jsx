import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../lib/utils'; // ✅ handleSuccess ko bhi import karna zaroori hai

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
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupInfo),
            });

            const result = await response.json();
            console.log("Response:", result); // Debugging ke liye
            const {success, message, error}=result; 

            if (response.status === 409) {
                return handleError("User already exists. Please login.");
            }

            if (response.ok && result.success) {
                handleSuccess(result.message);
                setTimeout(() => navigate('/login'), 1000);
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
                <h1 className="text-2xl font-bold text-center mb-6">Signup</h1>
                <form className="space-y-4" onSubmit={handleSignup}>
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium">
                            Name
                        </label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="name"
                            autoFocus
                            placeholder="Enter your name..."
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                            value={signupInfo.name}
                        />
                    </div>
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
                            value={signupInfo.email}
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
                            value={signupInfo.password}
                        />
                    </div>
                    <button type='submit' className="w-full bg-teal-700 text-white py-2 rounded-lg hover:bg-teal-800 transition">
                        Signup
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-teal-700 font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Signup;
