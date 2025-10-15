import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Header from "../Header";
import './index.css'

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
      const url = "http://localhost:5000/profile";
      const jwtToken = Cookies.get("jwt_token");
      const options = {
        method: "GET",
        headers: { Authorization: `Bearer ${jwtToken}` },
      };
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {
          setUserDetails(data.user_details);
        } else {
          console.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    getDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Header />
      <div className="max-w-2xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        {userDetails ? (
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Name:</span> {userDetails.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {userDetails.email}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {userDetails.address}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
