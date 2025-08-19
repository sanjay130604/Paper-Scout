import React, { useState, useEffect } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch users from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) return;

    const res = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: query, email: `${query}@mail.com` }),
    });

    if (res.ok) {
      const newUser = await res.json();
      setUsers([newUser, ...users]);
      setQuery("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-indigo-600">PaperScout</h1>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-16 bg-gradient-to-b from-white to-gray-50 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
            Discover Research Papers
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row justify-center gap-3 max-w-2xl mx-auto"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter name..."
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Add
            </button>
          </form>
        </section>

        <section className="max-w-4xl mx-auto px-4 py-8">
          <h3 className="text-xl font-semibold mb-4">Users</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {users.map((u) => (
              <div key={u._id} className="bg-white p-5 rounded-xl shadow">
                <h4 className="font-bold">{u.name}</h4>
                <p className="text-gray-600 text-sm">{u.email}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-white border-t py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} PaperScout
      </footer>
    </div>
  );
}
