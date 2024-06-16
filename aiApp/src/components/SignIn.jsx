import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from '../style';

export default function SignIn() {
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
    try {
      setLoading(true);
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setLoading(false);
        setError(errorData.message || 'An error occurred');
        return;
      }

      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      
      setLoading(false);
      setError(null);
      navigate('/');
      
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className={`max-w-lg mx-auto ${styles.paddingY}`}>
      <h1 className="text-4xl text-center font-semibold my-8 text-white">Sign In</h1>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="E-mail"
          className="border border-gray-500 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-500 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg uppercase hover:bg-blue-700 transition-all duration-200"
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <div className="flex gap-2 mt-5 justify-center">
        <p className="text-gray-400">Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500 hover:underline">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}