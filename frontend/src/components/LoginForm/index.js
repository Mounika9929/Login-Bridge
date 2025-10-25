import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import './index.css'

const LoginForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isErr, setErr] = useState(false);
  const navigate = useNavigate();

  const checkUser = async (event) => {
    event.preventDefault();
    const userDetails = { name, password };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const url = "https://login-bridge.onrender.com/login";
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      const jwtToken = data.jwt_token;
      Cookies.set("jwt_token", jwtToken);
      setErrMsg("");
      setErr(false);
      navigate("/");
    } else {
      setErrMsg(data.err_msg);
      setErr(true);
    }
  };

  const onSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Login</h1>

        <button
          type="button"
          onClick={onSignup}
          className="w-full bg-green-500 text-white py-2 px-4 rounded mb-4 hover:bg-green-600 transition-colors"
        >
          Signup
        </button>

        <form onSubmit={checkUser} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>

        {isErr && <p className="text-red-500 mt-4 text-center">{errMsg}</p>}
      </div>
    </div>
  );
};

export default LoginForm;
