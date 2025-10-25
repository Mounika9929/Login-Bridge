import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './index.css'

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isErr, setErr] = useState(false);
  const navigate = useNavigate();

  const addUser = async (event) => {
    event.preventDefault();
    const userDetails = { name, email, password, address };
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      };
      const url = "https://login-bridge.onrender.com/signup";
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setErr(false);
        setName("");
        setEmail("");
        setPassword("");
        setAddress("");
        navigate("/login");
      } else {
        setErr(true);
        setErrMsg(data.err_msg);
      }
    } catch (e) {
      setErr(true);
      setErrMsg("Network error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-blue-500 mb-4 underline"
        >
          Already have an account? Login
        </button>
        <form className="space-y-4" onSubmit={addUser}>
          <div>
            <label className="block font-semibold">Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-semibold">Address</label>
            <input
              type="text"
              placeholder="Enter Your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Signup
          </button>
        </form>
        {isErr && <p className="text-red-500 mt-3">{errMsg}</p>}
      </div>
    </div>
  );
};

export default SignUpForm;
