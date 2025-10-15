// import { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import Header from "../Header";

// const UpdateProfile = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [address, setAddress] = useState("");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = Cookies.get("jwt_token");
//       const res = await fetch("http://localhost:5000/profile", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.ok) {
//         const data = await res.json();
//         setName(data.user_details.name);
//         setEmail(data.user_details.email);
//         setAddress(data.user_details.address);
//         console.log(data);
//       }
//     };
//     fetchProfile();
//   }, []);

//   const updateProfile = async (e) => {
//     e.preventDefault();
//     const token = Cookies.get("jwt_token");
//     const res = await fetch("http://localhost:5000/update-profile", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ name, email, address }),
//     });
//     const data = await res.json();
//     console.log(data);
//     setMessage(data.msg || data.err_msg);
//   };

//   return (
//     <div>
//       <Header />
//       <h2>Update Profile</h2>
//       <form onSubmit={updateProfile}>
//         <label>Name</label>
//         <input value={name} onChange={(e) => setName(e.target.value)} />
//         <label>Email</label>
//         <input value={email} onChange={(e) => setEmail(e.target.value)} />
//         <label>Address</label>
//         <input value={address} onChange={(e) => setAddress(e.target.value)} />
//         <button type="submit">Update</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default UpdateProfile;

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Header from "../Header";
import './index.css'

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get("jwt_token");
      const res = await fetch("http://localhost:5000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setName(data.user_details.name);
        setEmail(data.user_details.email);
        setAddress(data.user_details.address);
      }
    };
    fetchProfile();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    const token = Cookies.get("jwt_token");
    const res = await fetch("http://localhost:5000/update-profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, email, address }),
    });
    const data = await res.json();
    setMessage(data.msg || data.err_msg);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Header />
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>
        <form className="space-y-4" onSubmit={updateProfile}>
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Address</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Update
          </button>
        </form>
        {message && (
          <p className={`mt-3 text-center ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
