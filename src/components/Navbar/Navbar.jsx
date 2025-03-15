import React from 'react';
import ProfileInfo from "../Cards/ProfileInfo.jsx";
import {useNavigate} from "react-router-dom";


const NavBar = () => {
    const navigate = useNavigate;

    const onLogout = () => {
       navigate("/login");
    }
    return (
        <div className="bg-white flex items-center justify-between px-6 py-2 shadow-md">
            <h2 className="text-xl font-medium text-black py-2">
                Notes
            </h2>
            <ProfileInfo onLogout={onLogout}/>
        </div>
    );
};

export default NavBar;
