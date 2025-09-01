export default function Sidebar({ active, setActive }) {
  const menuItems = [
    "Dashboard",
    "Manage Stories",
    "Manage Series",
    "Manage Categories",
    "Manage Ads",
    "Settings",
  ];
  return (
    <aside className="w-64 bg-pink-900 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-pink-700 text-center">
        Admin Panel
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => setActive(item)}
                className={`w-full text-left px-4 py-2 rounded-lg cursor-pointer ${
                  active === item
                    ? "bg-pink-700 text-white"
                    : "text-gray-300 hover:bg-pink-700 hover:text-white"
                }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

