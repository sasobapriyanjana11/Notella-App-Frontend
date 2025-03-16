import React, {useEffect} from 'react';
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

const Toast = ({ isShown, message, type, onClose }) => {

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            onClose();
        },3000);
        return () => {
            clearTimeout(timeOutId);
        }
    },[onClose]);

    return (
        <div
            className={`fixed top-20 right-6 transition-all duration-500 transform ${
                isShown ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
        >
            <div className="relative min-w-52 bg-white border shadow-2xl rounded-md flex items-center p-3">
                {/* Left vertical color bar (FIXED) */}
                <div
                    className={`absolute left-0 top-0 h-full w-[5px] rounded-l-md ${
                        type === 'delete' ? 'bg-red-500' : 'bg-green-500'
                    }`}
                ></div>

                {/* Icon container */}
                <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${
                        type === 'delete' ? 'bg-red-50' : 'bg-green-50'
                    }`}
                >
                    {type === 'delete' ? (
                        <MdDeleteOutline className="text-xl text-red-500" />
                    ) : (
                        <LuCheck className="text-xl text-green-500" />
                    )}
                </div>

                {/* Message */}
                <p className="text-sm text-slate-800 ml-3">{message}</p>

                {/* Close Button (Optional) */}
                <button className="ml-4 text-slate-500 hover:text-black" onClick={onClose}>×</button>
            </div>
        </div>
    );
};

export default Toast;
