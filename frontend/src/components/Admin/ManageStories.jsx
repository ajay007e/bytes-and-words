import { useEffect, useState } from "react";
import { Link } from "react-router";

import { getStories } from "../../../utils/database/database";

export default function ManageStories() {
  const [stories, setStories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _stories = await getStories();
        setStories(_stories);

      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();  
  }, []);

  const filtered = stories.filter((s) => 
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-pink-50 max-h-[calc(100vh-64px)] p-8 rounded-xl flex flex-col">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Manage Stories</h1>

      <div className="mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 focus:outline-none text-gray-800"
        />
        
        <Link
          to="/admin/st/c"
          className="px-4 py-2 bg-pink-600 text-white rounded-lg shadow-sm hover:bg-pink-700 transition text-sm font-medium"
        >
          + Create Story
        </Link>
      </div>
      {/* TODO: last item in the table not completely visible */}
      <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-y-auto max-h-[calc(100vh-220px)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <table className="w-full">
            <thead className="bg-pink-200 text-pink-900 sticky top-0 z-10">
              <tr>
                <th className="p-4 text-left font-semibold">Title</th>
                <th className="p-4 text-left font-semibold">Author</th>
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
                    <Link to={`/admin/st/${s.id}`}>
                      {s.title}
                      {s.series && (<span className="ml-4 px-3 py-1 bg-cyan-200 text-cyan-900 text-xs font-medium rounded-full">{s.series.title}</span>)}
                    </Link>
                  </td>
                  <td className="p-4 text-gray-700">
                    <span className="px-3 py-1 bg-blue-200 text-blue-900 text-xs font-medium rounded-full">
                      {s.author}
                    </span>
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
    </div>
  );
}

