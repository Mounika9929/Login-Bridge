// import Header from "../Header"

// const NotFound = () => (
//     <div>
//         <Header />
//         <h1>Not Found</h1>
//     </div>
// )

// export default NotFound

import Header from "../Header";
import './index.css'

const NotFound = () => (
  <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
    <Header />
    <h1 className="text-4xl font-bold text-red-600 mt-10">404 - Page Not Found</h1>
    <p className="text-gray-700 mt-2">Sorry, the page you are looking for does not exist.</p>
  </div>
);

export default NotFound;
