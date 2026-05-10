import { useState } from "react";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    fetch("http://localhost/php/act05_API/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
    .then(res => res.json())
    .then(data => alert(data.message || data.error));
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-xl shadow-md w-80">
      <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

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
        Register
      </button>
    </div>
  </div>
  );
}

export default Register;