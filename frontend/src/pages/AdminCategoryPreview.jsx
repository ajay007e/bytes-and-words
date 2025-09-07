import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import WideBlogCard from "../components/WideBlogCard";
import EmptyState from "../components/EmptyState";
import ConfirmModel from "../components/ConfirmDeleteModel";
import { Edit, Trash2 } from "lucide-react";

import { getCategoryById, getStoriesByCategory, deleteCategory, updateCategory } from "../../utils/database/database";

export default function CategoryPreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [activeTab, setActiveTab] = useState("stories");
  const [isEditing, setIsEditing] = useState(false);
  const [stories, setStories] = useState([]);
  const [series, setSeries] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [_category ] = await Promise.all([getCategoryById(id)]);
      setCategory(_category);
      const _stories = await getStoriesByCategory(_category.name);
      setStories(_stories);
    };
    fetchData();
  }, [id]);

  if (!category) {
    return <div className="p-8 text-black">Loading...</div>;
  }

  const handleUpdate = (data) => {
    const updatedCategory = { ...category, ...data };
    setCategory(updatedCategory);
    updateCategory(category.id, updatedCategory);
    setIsEditing(false);
  };
  

  const handleDelete = () => {
    deleteCategory(category.id);
    setShowConfirm(false);
    navigate("/admin/category");
  };

  return (
    <div className="flex flex-col min-h-screen min-w-screen bg-pink-50 text-black">
      <Navbar isAdmin={true} />

      {!category ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader message="Fetching categoires..." />
        </div>
      ) :
        <>
          <main className="flex-1 container mx-auto px-6 py-10 space-y-6">
          <div className="bg-white rounded-xl shadow-md flex items-center p-4 space-x-4 w-2/3 mx-auto">
            <div className="w-36 h-36 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
              <p className="text-gray-600 text-sm mt-1 line-clamp-3">
                {category.description}
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 bg-green-600 text-white cursor-pointer rounded-lg hover:bg-green-700 transition flex items-center justify-center"
                title="Edit"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => setShowConfirm(true)}
                className="p-2 bg-red-600 text-white cursor-pointer rounded-lg hover:bg-red-700 transition flex items-center justify-center"
                title="Delete"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
          <div>
            <div className="flex justify-center">
              <div className="inline-flex bg-gray-100 rounded-full p-1 shadow-md">
                <button
                  onClick={() => setActiveTab("stories")}
                  className={`px-6 py-2 rounded-full font-medium transition ${
                    activeTab === "stories"
                      ? "bg-pink-600 text-white shadow"
                      : "text-gray-600 hover:text-pink-600"
                  }`}
                >
                  Stories
                </button>
                <button
                  onClick={() => setActiveTab("series")}
                  className={`px-6 py-2 cursor-pointer rounded-full font-medium transition ${
                    activeTab === "series"
                      ? "bg-pink-600 text-white shadow"
                      : "text-gray-600 hover:text-pink-600"
                  }`}
                >
                  Series
                </button>
              </div>
            </div>
            <div className="mt-6">
              {activeTab === "stories" && (
                stories.length > 0 ? (
                  <Pagination
                    data={stories}
                    headingRequired={false}
                    RenderComponent={WideBlogCard}
                  />
                ) : (
                  <EmptyState />
                )
              )}
              {activeTab === "series" && (
                series.length > 0 ? (
                  <Pagination
                    data={series}
                    headingRequired={false}
                    RenderComponent={WideBlogCard}
                  />
                ) : (
                  <EmptyState />
                )
              )}
            </div>
          </div>
        </main>
        </>
      }

      
      <Footer />
      {showConfirm && (<ConfirmModel onCancel={()=>setShowConfirm(false)} onConfirm={handleDelete} title={category.name}/>)}
      {isEditing && (
        <CategoryEditModal
          category={category}
          onUpdate={handleUpdate}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}

const CategoryEditModal = ({category, onUpdate, onClose}) => {
  const [form, setForm] = useState({
    name: category?.name || "",
    description: category?.description || "",
    imageUrl: category?.imageUrl || "",
  });
  const [isImageUrlFocused, setIsImageUrlFocused] = useState(false);

  const handleSave = () => {
    const updatedCategory = { ...category, ...form };
    onUpdate(updatedCategory);
    onClose();
  };
  return (
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
            {/* Overlay */}
            <div className="absolute inset-0 bg-white/40"></div>

            {/* Content */}
            <div className="relative flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center border-b border-gray-300 px-6 py-4">
                <h2 className="text-lg font-bold text-gray-900">
                  Edit Category
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-700 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full p-3 border border-gray-400 rounded-lg text-gray-900"
                  />
                </div>

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
                    className="w-full p-3 border border-gray-400 rounded-lg text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={form.imageUrl}
                    onFocus={() => setIsImageUrlFocused(true)}
                    onBlur={() => setIsImageUrlFocused(false)}
                    onChange={(e) =>
                      setForm({ ...form, imageUrl: e.target.value })
                    }
                    className="w-full p-3 border border-gray-400 rounded-lg text-gray-900"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 border-t border-gray-300 px-6 py-4">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
  )
}

