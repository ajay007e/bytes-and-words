import { Link } from "react-router";
import { useEffect, useState } from "react";

import { getCategories } from "../../../utils/database/database";

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const _categories = await getCategories();
        setCategories(_categories);

      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();  
  }, []);
    
  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-pink-50 max-h-[calc(100vh-64px)] p-8 rounded-xl flex flex-col">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Manage Categories
      </h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none text-gray-800"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((cat) => (
          <Link to={`/admin/category/${cat.id}`} key={cat.id}
            className="relative group rounded-xl overflow-hidden shadow-lg cursor-pointer"
          >
            {/* Image */}
            <img
              src={cat.imageUrl}
              alt={cat.name}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-4">
              <p className="text-white text-sm">{cat.description}</p>
            </div>

            {/* Title */}
            <div className="absolute bottom-0 left-0 w-full bg-pink-600 bg-opacity-80 text-white text-lg font-semibold p-3">
              {cat.name}
            </div>
          </Link>
        ))}
      </div>    
    </div>
  );
}

