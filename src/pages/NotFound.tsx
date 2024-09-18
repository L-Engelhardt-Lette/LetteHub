import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-backgroundlight dark:bg-backgrounddark overflow-hidden">
      {/* Background Image */}
      <img
        className="absolute w-96 object-cover"
        src="../../public/Logo.svg"
        alt="Background"
      />
      {/* Content Overlay */}
      <div className="flex flex-col w-96  z-2 absolute">
        {/* Top-left content */}
        <div className="flex justify-start w-full p-4">
          <div>
            <h1 className="text-white text-9xl font-bold">404</h1>
            <p className="text-white text-2xl">Not Found</p>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-grow h-24"></div>

        {/* Bottom-right content */}
        <div className="flex flex-col items-end justify-end  p-4">
          <Link
            to="/"
            className="mt-4 px-6 py-3 bg-white text-blue-400 font-semibold rounded-lg shadow-md hover:bg-blue-100 transition duration-300"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
