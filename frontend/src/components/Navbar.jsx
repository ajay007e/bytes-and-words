import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="text-white px-6 py-4 shadow-lg bg-pink-900">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Literotica
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6 hidden md:flex">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/about" className="hover:text-gray-200">About</Link>
          <Link to="/contact" className="hover:text-gray-200">Contact</Link>
        </div>

        {/* Mobile Menu (optional) */}
        <button className="md:hidden px-3 py-2 border rounded">
          ☰
        </button>
      </div>
    </nav>
  );
}

