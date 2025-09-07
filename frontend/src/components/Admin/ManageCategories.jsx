import { Link } from "react-router";
import { useEffect, useState } from "react";

import { getCategories, createCategory } from "../../../utils/database/database";

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isImageUrlFocused, setIsImageUrlFocused] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });

  const fetchData = async () => {
    try {
      const _categories = await getCategories();
      setCategories(_categories);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async () => {
    // TODO: provide proper feedback based on the response
    const response = await createCategory(form);
    fetchData();
    setIsCreating(false);
    setForm({ name: "", description: "", imageUrl: "" });
  };

  return (
    <div className="bg-pink-50 max-h-[calc(100vh-64px)] p-8 rounded-xl flex flex-col">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Manage Categories
      </h1>

      {/* Search + Create */}
      <div className="mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none text-gray-800"
        />

        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-pink-600 text-white rounded-lg cursor-pointer shadow-sm hover:bg-pink-700 transition text-sm font-medium"
        >
          + Create Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((cat) => (
          <Link
            to={`/admin/ct/${cat.id}`}
            key={cat.id}
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

      {/* Create Category Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className="rounded-lg shadow-lg w-full max-w-lg flex flex-col relative overflow-hidden"
            style={
              form.imageUrl && isImageUrlFocused
                ? {
                    backgroundImage: `url(${form.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : { backgroundColor: "white" }
            }
          >
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-none"></div>

            {/* Content */}
            <div className="relative flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center border-b border-gray-300 px-6 py-4">
                <h2 className="text-lg font-bold text-gray-900">Create Category</h2>
                <button
                  onClick={() => setIsCreating(false)}
                  className="text-gray-700 cursor-pointer hover:text-gray-900"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Category title"
                    className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:outline-none text-gray-900"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="Category description"
                    className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:outline-none text-gray-900"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    onFocus={() => setIsImageUrlFocused(true)}
                    onBlur={() => setIsImageUrlFocused(false)}
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    placeholder="Image URL"
                    className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:outline-none text-gray-900"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 border-t border-gray-300 px-6 py-4">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

