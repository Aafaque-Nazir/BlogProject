import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as storeLogin } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { Button, Input, Logo } from './export';
import authService from '../../Appwrite/auth';
import { useForm } from 'react-hook-form';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");

        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(storeLogin(userData));
                    navigate('/');
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-gray-900 to-black">
            <div className="w-full max-w-md bg-gray-800/80 backdrop-blur-md rounded-xl p-8 shadow-xl border border-gray-700">
                <div className="mb-6 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-3xl font-bold text-indigo-400">Welcome Back</h2>
                <p className="mt-2 text-center text-sm text-gray-300">
                    Don't have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-indigo-500 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="mt-6">
    <div className="space-y-5">
        <Input
            label="Email: "
            placeholder="Enter your email"
            type="email"
            {...register("email", {
                required: true,
                validate: {
                    matchPattern: (value) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                },
            })}
            className="bg-gray-700 text-gray-800 placeholder-gray-500 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none hover:border-indigo-400 transition duration-300"
        />
        <Input
            label="Password: "
            type="password"
            placeholder="Enter your password"
            {...register("password", {
                required: true,
            })}
            className="bg-gray-700 text-gray-800 placeholder-gray-500 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none hover:border-indigo-400 transition duration-300"
        />
        <Button
            type="submit"
            className="w-full py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300"
        >
            Sign In
        </Button>
    </div>
</form>
            </div>
        </div>
    );
}

export default Login;