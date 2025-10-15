import { useState } from "react";
import Cookies from "js-cookie";
import Header from "../Header";
import './index.css'

const UpdatePwd = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isErr, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const updatePwd = async (event) => {
    event.preventDefault();
    try {
      const url = "http://localhost:5000/update-password";
      const jwtToken = Cookies.get("jwt_token");
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      };
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        setError(true);
        setErrMsg(data.msg);
        setOldPassword("");
        setNewPassword("");
      } else {
        setError(true);
        setErrMsg(data.err_msg);
      }
    } catch (e) {
      setError(true);
      setErrMsg("Network error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Header />
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Password</h2>
        <form className="space-y-4" onSubmit={updatePwd}>
          <div>
            <label className="block font-semibold mb-1" htmlFor="oldPwd">Old Password</label>
            <input
              type="password"
              id="oldPwd"
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1" htmlFor="newPwd">New Password</label>
            <input
              type="password"
              id="newPwd"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
        {isErr && (
          <p className={`mt-3 text-center ${errMsg.includes("success") ? "text-green-500" : "text-red-500"}`}>
            {errMsg}
          </p>
        )}
      </div>
    </div>
  );
};

export default UpdatePwd;
