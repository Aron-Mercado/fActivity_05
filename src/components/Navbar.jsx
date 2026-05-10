import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("http://localhost/php/act05_API/check.php", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.loggedIn) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      });
  }, []);

 return (
  <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">

    {/* Left side */}
    <h1 className="text-lg font-semibold text-gray-700">
      User System Example
    </h1>

    {/* Right side */}
    <div className="flex gap-4 items-center">

      {!loggedIn ? (
        <div className="flex gap-4 items-center"> 
          <Link
            to="/"
            className="text-blue-500 hover:underline"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="text-blue-500 hover:underline"
          >
            Register
          </Link>
        </div>
      ) : (
        <div className="flex gap-4 items-center"> 
          <Link
            to="/dashboard"
            className="text-gray-700 hover:text-blue-500"
          >
            Dashboard
          </Link>

          <Link
            to="/update"
            className="text-gray-700 hover:text-blue-500"
          >
            Update Profile
          </Link>

          <button
            onClick={() => {
              fetch("http://localhost/php/act05_API/logout.php", {
                credentials: "include"
              }).then(() => window.location.href = "/");
            }}
            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}

    </div>

  </nav>
);
}

export default Navbar;
