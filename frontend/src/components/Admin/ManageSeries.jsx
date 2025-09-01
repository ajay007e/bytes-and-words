import { useEffect, useState } from "react";
import { Link } from "react-router";

import { getSeries } from "../../../utils/database/database";

export default function ManageSeries() {
  const [series, setSeries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _series = await getSeries();
        setSeries(_series);

      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();  
  }, []);

  const filtered = series.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-pink-50 max-h-[calc(100vh-64px)] p-8 rounded-xl flex flex-col">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Manage Series</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search series..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 focus:outline-none text-gray-800"
        />
      </div>

      {/* Table Wrapper with Scroll */}
      <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-y-auto max-h-[calc(100vh-220px)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <table className="w-full">
            <thead className="bg-pink-200 text-pink-900 sticky top-0 z-10">
              <tr>
                <th className="p-4 text-left font-semibold">Series Name</th>
                <th className="p-4 text-left font-semibold">Chapters</th>
                <th className="p-4 text-left font-semibold">Authors</th>
                <th className="p-4 text-left font-semibold">Categories</th>
                <th className="p-4 text-left font-semibold">Actions</th>
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
                    <Link to={`/admin/story/${s.id}`}>
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
                  <td className="p-4 space-x-3">
                    <button className="px-4 py-2 cursor-pointer bg-green-600 text-white text-sm rounded-lg shadow hover:bg-green-700 transition">
                      View
                    </button>
                    <button className="px-4 py-2 cursor-pointer bg-blue-600 text-white text-sm rounded-lg shadow hover:bg-blue-700 transition">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

