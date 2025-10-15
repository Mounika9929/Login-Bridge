import { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../Logout";
import './index.css'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-blue-600 text-white shadow-md px-4 py-3">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-gray-200">
          Logo
        </Link>

        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <Link to="/profile" className="hover:text-gray-200">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/update-password" className="hover:text-gray-200">
              Update Password
            </Link>
          </li>
          <li>
            <Link to="/update-profile" className="hover:text-gray-200">
              Update Profile
            </Link>
          </li>
          <li>
            <Logout />
          </li>
        </ul>

        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <ul className="md:hidden mt-3 space-y-2">
          <li>
            <Link
              to="/profile"
              className="block px-2 py-1 hover:bg-blue-500 rounded"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link to="/update-profile" className="hover:text-gray-200">
              Update Profile
            </Link>
          </li>
          <li>
            <Link
              to="/update-password"
              className="block px-2 py-1 hover:bg-blue-500 rounded"
              onClick={() => setIsOpen(false)}
            >
              Update Password
            </Link>
          </li>
          <li>
            <Logout />
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Header;
