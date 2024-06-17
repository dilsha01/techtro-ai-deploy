import { useState } from "react";
import styles from '../style';
import { MdVisibilityOff, MdVisibility } from 'react-icons/md';

const ResetLayer = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClick = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={`max-w-lg mx-auto ${styles.paddingY}`}>
            <h1 className="text-4xl text-center font-semibold my-8 text-white">Set new password</h1>
            <form className="flex flex-col gap-6">
                <div className="relative">
                    <input
                        className="border border-gray-500 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 w-full"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                    />
                    <button
                        type="button"
                        onClick={handleClick}
                        className="absolute right-3 top-3 text-gray-400"
                    >
                        {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                    </button>
                </div>
                <div className="relative">
                    <input
                        className="border border-gray-500 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 w-full"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                    />
                    <button
                        type="button"
                        onClick={handleClick}
                        className="absolute right-3 top-3 text-gray-400"
                    >
                        {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                    </button>
                </div>
            </form>
            <div className="flex justify-center mt-6">
                <button
                    type="button"
                    onClick={handleClick}
                    className="bg-blue-700 text-white p-3 rounded-lg uppercase hover:bg-blue-800 transition-all duration-200"
                >
                    Reset Password
                </button>
            </div>
        </div>
    );
}

export default ResetLayer;
