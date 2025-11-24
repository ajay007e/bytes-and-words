import { useEffect, useState } from "react";
import { Link } from "react-router";

import { getSeries, createSeries } from "../../../utils/database/database";

export default function ManageSeries() {
  const [series, setSeries] = useState([]);
  const [search, setSearch] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isImageUrlFocused, setIsImageUrlFocused] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  const fetchData = async () => {
    try {
      const _series = await getSeries();
      setSeries(_series);

    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();  
  }, []);

  const filtered = series.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async () => {
    // TODO: give proper feedback based on the response
    const response = await createSeries(form);
    fetchData();  
    setIsCreating(false);
    setForm({ title: "", description: "", imageUrl: "" });
  };


  return (
    <div className="bg-pink-50 max-h-[calc(100vh-64px)] p-8 rounded-xl flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Manage Series</h1>

      <div className="mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 focus:outline-none text-gray-800"
        />
        
        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-pink-600 cursor-pointer text-white rounded-lg shadow-sm hover:bg-pink-700 transition text-sm font-medium"
        >
          + Create Series
        </button>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-y-auto max-h-[calc(100vh-220px)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <table className="w-full">
            <thead className="bg-pink-200 text-pink-900 sticky top-0 z-10">
              <tr>
                <th className="p-4 text-left font-semibold">Series Name</th>
                <th className="p-4 text-left font-semibold">Chapters</th>
                <th className="p-4 text-left font-semibold">Authors</th>
                <th className="p-4 text-left font-semibold">Categories</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr
                  key={s.id}
                  className={`${
                    i % 2 === 0 ? "bg-white" : "bg-pink-50"
                  } hover:bg-pink-100 transition`}
                >
                  <td className="p-4 text-gray-800">
                    <Link to={`/admin/sr/${s.id}`}>
                      {s.title}
                    </Link>
                  </td>
                  <td className="p-4 text-gray-700">{s.noOfChapters}</td>
                  <td className="p-4 text-gray-700">
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(s.authors) && s.authors.length > 0 ? (
                        s.authors.map((author, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-200 text-blue-900 text-xs font-medium rounded-full"
                          >
                            {author}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 italic">No authors</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-gray-700">
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(s.categories) && s.categories.length > 0 ? (
                        s.categories.map((cat, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-pink-200 text-pink-900 text-xs font-medium rounded-full"
                          >
                            {cat}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 italic">No categories</span>
                      )}
                    </div>
                  </td>
               </tr>
              ))}
            </tbody>
          </table>
        </div>
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
                <h2 className="text-lg font-bold text-gray-900">Create Series</h2>
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
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Series title"
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
                    placeholder="Series description"
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
                  className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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

