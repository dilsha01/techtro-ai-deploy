import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from '../style';
import { FcGoogle } from "react-icons/fc";

const FogotPassword = () => {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const response = await fetch("http://localhost:8000/sign-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        setLoading(false);

        if (response.ok) {
            navigate('/home'); // Adjust this based on your routing
        } else {
            setError(data.message);
        }
    };

    return (
        <div className={`max-w-lg mx-auto ${styles.paddingY}`}>
            <h1 className="text-4xl text-center font-semibold my-8 text-white">Sign In</h1>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <input
                    className="border border-gray-500 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
                    type="text"
                    id="email"
                    placeholder="E-mail"
                    value={formData.email || ''}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border border-gray-500 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
                    id="password"
                    value={formData.password || ''}
                    onChange={handleChange}
                />
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-blue-700 text-white p-3 rounded-lg uppercase hover:bg-blue-800 transition-all duration-200"
                >
                    Sign In
                </button>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex items-center justify-center bg-blue-700 text-white p-3 rounded-lg uppercase hover:bg-blue-800 transition-all duration-200 gap-2"
                >
                    <FcGoogle />
                    Sign In with Google
                </button>
            </form>

            <div className="flex gap-2 mt-5 justify-center">
                <p className="text-gray-400">Dont have an account?</p>
                <Link to="/sign-up">
                    <span className="text-blue-500 hover:underline">Sign Up</span>
                </Link>
            </div>
            <div className="flex gap-2 justify-center">
                <p className="text-gray-400">Forgot Password?</p>
                <Link to="/forgot-password">
                    <span className="text-blue-500 hover:underline">Recover Password</span>
                </Link>
            </div>
        </div>
    );
};

export default FogotPassword;
