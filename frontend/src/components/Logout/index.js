// import Cookies from 'js-cookie'
// import { useNavigate } from 'react-router-dom'

// const Logout = () => {
//     const navigate = useNavigate()
//     const onLogout = () => {
//         Cookies.remove('jwt_token')
//         navigate('/login')
//     }

//     return (
//         <div>
//             <button type="button" onClick={onLogout}>Logout</button>
//         </div>
//     )
// }

// export default Logout

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import './index.css'

const Logout = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  return (
    <div>
      <button
        type="button"
        onClick={onLogout}
        className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
