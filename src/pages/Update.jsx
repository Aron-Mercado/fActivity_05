import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const [form, setForm] = useState({
    id: "",
    name: "",
    email: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
  fetch("http://localhost/php/act05_API/check.php", {
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      if (!data.loggedIn) {
        alert("You must login first");
        navigate("/");
      }
    });
    }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit update
  const handleSubmit = () => {
    fetch("http://localhost/php/act05_API/update.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(form)
    })
    .then(res => res.json())
    .then(data => {
      // redirect
      if (data.error) {
        alert("Not logged in");
        navigate("/");
      } else {
        alert("Profile updated!");
        navigate("/dashboard");
      }
    });
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    
    <div className="bg-white p-8 rounded-xl shadow-md w-80">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
        Update Profile
      </h2>

      <input
        name="id"
        placeholder="User ID"
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        name="name"
        placeholder="New Name"
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        name="email"
        placeholder="New Email"
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
      >
        Update
      </button>
    </div>

  </div>
);
}

export default UpdateProfile;

/*
Notes:

credentials: "include" 
    -> tells the browser: “Include cookies (like PHP sessions) when sending the request”
    -> PHP sessions are stored in cookies


*/