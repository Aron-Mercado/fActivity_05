import { useEffect, useState } from "react";

function Dashboard() {
  const [users, setUsers] = useState([]);


  // “Run this once when the page loads”
  // Fetch protected data (requires login)
  useEffect(() => {
    fetch("http://localhost/php/act05_API/users.php", {credentials: "include"})
      .then(res => res.json())
      .then(data => {     
        if (data.error) {
          // AUTO REDIRECT IF NOT LOGGED IN
          // PHP decides if user is authenticated
          // React redirects if not
          alert("You must login first");
          window.location.href = "/";
        } else {
          console.log(data);
        setUsers(data)
    }});
  }, []);

return (
  <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Users List</h2>

      <ul className="space-y-2">
        {/* 
        API → array
        .map() → display list
        */}
          {users.map(user => (
            <li
              key={user.id}
              className="p-3 border rounded-lg flex justify-between"
            >
              <span>{user.id} - {user.name}</span>
              <span className="text-gray-500">{user.email}</span>
            </li>
          ))}
      </ul>

      {/* 
        -> Calling PHP
        -> Destroying session
        -> Redirecting
      */}
      <button
        onClick={() => {
          fetch("http://localhost/php/act05_API/logout.php", {
            credentials: "include"
          }).then(() => {
            window.location.href = "/";
          });
        }}
        className="mt-6 w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  </div>
);
}

export default Dashboard;