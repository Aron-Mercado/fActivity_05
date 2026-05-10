import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  // useState stores data inside the component.
  // form → current values
  // setForm → function to update it
  const [form, setForm] = useState({
    // Initial State
    email: "",
    password: ""
  });

  // This runs every time a user types.
  const handleChange = (e) => {
    // e.target.name → input name (email or password)
    // e.target.value → what user typed
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submitting the Form
  const handleSubmit = () => {
    // React sends request to the API
    // Sends a POST request to your PHP backend
    // Converts JS object → JSON string:
    fetch("http://localhost/php/act05_API/login.php", {
      method: "POST",
      headers: {
        // Tells backend it's JSON
        "Content-Type": "application/json"
      },
      // credentials: "include" → sends cookies/session (important for login)
      credentials: "include",
      body: JSON.stringify(form)
    })
    // Converts response → JavaScript object
    .then(res => res.json())
    // React receives result from PHP
    .then(data => {
      if (data.message) {
        alert("Login success");
        window.location.href = "/dashboard";;
      } else {
        alert(data.error);
      }
    });
  };

  
  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-xl shadow-md w-80">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />


      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
      >
        Login
      </button>
    </div>
  </div>
);
}

export default Login;


/* --- NOTES ---
1. User Clicks Button "<button onClick={handleSubmit}>Login</button>"
2. triggers "handleSubmit()"



*/

