import { Link } from "react-router-dom";
import Header from "../Header";
import './index.css'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="flex flex-col items-center justify-center mt-10 px-4">
        <h1 className="text-4xl font-bold mb-6 text-blue-600">
          Home Page
        </h1>

        <Link
          to="/notes"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          Go to Notes
        </Link>
      </main>
    </div>
  );
};

export default Home;
