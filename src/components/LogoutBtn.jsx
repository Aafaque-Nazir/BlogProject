import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import authService from '../../Appwrite/auth';

function LogoutBtn() {
    const dispatch = useDispatch();

    const LogoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        });
    };

    return (
        <button
            className="px-6 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-800 hover:shadow-md transition duration-200"
            onClick={LogoutHandler}
        >
            Logout
        </button>
    );
}

export default LogoutBtn;