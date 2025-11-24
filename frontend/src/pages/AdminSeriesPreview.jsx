import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StoryCard from "../components/StoryCard";
import EmptyState from "../components/EmptyState";
import WideBlogCard from "../components/WideBlogCard";
import Pagination from "../components/Pagination";
import ConfirmModel from "../components/ConfirmDeleteModel";
import Loader from "../components/Loader";

import { getSeriesById, getStoriesBySeriesName, updateSeries, deleteSeries } from "../../utils/database/database";

export default function SeriesPreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [series, setSeries] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("chapters");
  const [chapters, setChapters] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const _series = await getSeriesById(id);
      setSeries(_series);

      const _chapters = await getStoriesBySeriesName(_series.title);
      setChapters(_chapters);
    };
    fetchData();
  }, [id]);

  const handleUpdate = (data) => {
    setSeries(data);
    updateSeries(series.id, data);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteSeries(series.id);
    setShowConfirm(false);
    navigate("/admin/series");
  };

  return (
    <div className="flex flex-col w-screen min-h-screen bg-pink-50 text-black">
      <Navbar isAdmin={true} />

      {!series ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader message="Fetching series..." />
        </div>
      ) : (
        <>
          <StoryCard
            data={series}
            isAdmin={true}
            onEdit={() => setIsEditing(true)}
            onDelete={() => setShowConfirm(true)}
          />

          {/* Tabs */}
          <div>
            <div className="flex justify-center mt-8 mb-4">
              <div className="inline-flex bg-gray-100 rounded-full p-1 shadow-md">
                <button
                  onClick={() => setActiveTab("chapters")}
                  className={`px-6 py-2 rounded-full cursor-pointer font-medium transition ${
                    activeTab === "chapters"
                      ? "bg-pink-600 text-white shadow"
                      : "text-gray-600 hover:text-pink-600"
                  }`}
                >
                  Chapters
                </button>
              </div>
            </div>

            <div className="mt-6">
              {activeTab === "chapters" &&
                (chapters.length > 0 ? (
                  <Pagination
                    data={chapters}
                    headingRequired={false}
                    RenderComponent={WideBlogCard}
                  />
                ) : (
                  <EmptyState />
                ))}
            </div>
          </div>

          {/* Confirm Delete */}
          {showConfirm && (
            <ConfirmModel
              onCancel={() => setShowConfirm(false)}
              onConfirm={handleDelete}
              title={series.title}
              entityName={"Series"}
            />
          )}

          {/* Edit Modal */}
          {isEditing && (
            <SeriesEditModal
              series={series}
              onUpdate={handleUpdate}
              onClose={() => setIsEditing(false)}
            />
          )}
        </>
      )}

      <Footer />
    </div>
  );
}


function SeriesEditModal({ series, onUpdate, onClose }) {
  const [form, setForm] = useState({
    title: series?.title || "",
    description: series?.description || "",
    imageUrl: series?.imageUrl || "",
  });
  const [isImageFocused, setIsImageFocused] = useState(false);

  const handleSave = () => {
    const updatedSeries = { ...series, ...form };
    onUpdate(updatedSeries);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="rounded-lg shadow-lg w-full max-w-lg flex flex-col relative overflow-hidden"
        style={
          form.imageUrl && isImageFocused
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
            <h2 className="text-lg font-bold text-gray-900">Edit Series</h2>
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
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Series title"
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
                placeholder="Series description"
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
                onFocus={() => setIsImageFocused(true)}
                onBlur={() => setIsImageFocused(false)}
                onChange={(e) =>
                  setForm({ ...form, imageUrl: e.target.value })
                }
                placeholder="Image URL"
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
  );
}

