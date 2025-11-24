
import { useEffect, useState } from "react";

import { getDashboardStats } from "../../../utils/database/database";

export default function DashboardInfo() {

  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _stats = await getDashboardStats();
        setStats(_stats);

      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();  
  }, []);


  function formatNumber(num) {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num.toString();
  }

  return (
    <div className="bg-pink-50 max-h-[calc(100vh-64px)] p-8 rounded-xl">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center"
          >
            <span className="text-3xl font-bold text-gray-900">{formatNumber(s.value)}</span>
            <span className="text-gray-600">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

