import { Link } from "react-router";

export default function Sidebar({ active, setActive }) {
  const menuItems = [
    { name: "Dashboard", href: "/admin" },
    { name: "Manage Stories", href: "/admin/story" },
    { name: "Manage Series", href: "/admin/series" },
    { name: "Manage Categories", href: "/admin/category" },
    { name: "Manage Ads", href: "/admin/ads" },
    { name: "Settings", href: "/admin/settings" },
  ];
  return (
    <aside className="w-64 bg-pink-900 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-pink-700 text-center">
        Admin Panel
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <Link to={item.href} key={item.name}>
              <button
                onClick={() => setActive(item.href)}
                className={`w-full text-left px-4 py-2 rounded-lg cursor-pointer ${
                  active === item.name
                    ? "bg-pink-700 text-white"
                    : "text-gray-300 hover:bg-pink-700 hover:text-white"
                }`}
              >
                {item.name}
              </button>
            </Link>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

