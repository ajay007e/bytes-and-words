import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown, Star, Image as ImageIcon } from "lucide-react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  getStoryById,
  getCategories,
  getSeries,
} from "../../utils/database/database";

export default function StoryPreview() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [allSeries, setAllSeries] = useState([]);
  const [allAuthors, setAllAuthors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const _story = await getStoryById(id);
      setStory(_story);
      const [cats, ser] = await Promise.all([getCategories(), getSeries()]);
      setAllCategories(cats);
      setAllSeries(ser);
      setAllAuthors(["Alice", "Bob", "Charlie"]); // Example, replace with DB call
    };
    fetchData();
  }, [id]);

  if (!story) return <div className="p-8 text-black">Loading...</div>;

  return (
    <div className="flex flex-col w-screen min-h-screen bg-pink-50 text-black">
      <Navbar isAdmin={true}/>

      <main className="flex-1 flex justify-center container mx-auto px-6 py-10">
        <div className="bg-white shadow rounded-xl overflow-hidden flex flex-col md:flex-row max-w-5xl w-full">
          {/* LEFT – Info */}
          <div className="flex-1 p-6 flex flex-col justify-center space-y-4">
            <h1 className="text-2xl font-bold">
              {story.title}
              <span className="ml-3 text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {story.author || "Unknown"}
              </span>
            </h1>
            <p className="text-gray-700">{story.description}</p>
            <div className="flex flex-wrap gap-2">
              {story.categories?.map((c, idx) => (
                <span
                  key={idx}
                  className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm"
                >
                  {typeof c === "string" ? c : c.name}
                </span>
              ))}
              {story.series && (
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  {story.series.title}{" "}
                  {story.series.chapter && `- Chapter ${story.series.chapter}`}
                </span>
              )}
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span>⏱ {story.readTime || "5 min read"}</span>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 text-green-600 hover:text-green-700">
                  <ThumbsUp size={16} /> {story.upvotes || 0}
                </button>
                <button className="flex items-center gap-1 text-red-600 hover:text-red-700">
                  <ThumbsDown size={16} /> {story.downvotes || 0}
                </button>
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={16} fill="currentColor" />
                {story.rating || "0.0"}
              </div>
            </div>
            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition w-fit"
            >
              Edit
            </button>
          </div>

          {/* RIGHT – Image + Hover Overlay */}
          {story.imageUrl && (
            <div className="relative md:w-1/2 w-full group">
              <img
                src={story.imageUrl}
                alt={story.title}
                className="w-full h-full object-cover md:rounded-r-xl transition duration-300 group-hover:blur-md"
              />
              {/* Overlay with Story Content */}
              <div className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center p-4">
                <div className="max-h-full overflow-y-auto no-scrollbar text-m leading-relaxed">
                  {story.content || "No content available."}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {isEditing && (
        <StoryEditModal
          story={story}
          setStory={setStory}
          allCategories={allCategories}
          allSeries={allSeries}
          allAuthors={allAuthors}
          onClose={() => setIsEditing(false)}
        />
      )}

      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------
   Modal Component (inline in same file)
------------------------------------------------------------------ */
function StoryEditModal({
  story,
  allCategories,
  allSeries,
  allAuthors,
  onClose,
  setStory,
}) {
  const [form, setForm] = useState({
    title: story?.title || "",
    author: story?.author
      ? { value: story.author, label: story.author }
      : null,
    description: story?.description || "",
    image: story?.imageUrl || "",
    categories:
      story?.categories?.map((c) => ({ value: c.id || c, label: c.name || c })) ||
      [],
    series: story?.series
      ? { value: story.series.id, label: story.series.title }
      : null,
    chapter: story?.series?.chapter || "",
    content: story?.content || "",
  });

  // Options for selects
  const categoryOptions = allCategories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const seriesOptions = allSeries.map((s) => ({
    value: s.id,
    label: s.title,
  }));

  const authorOptions = allAuthors.map((a) => ({
    value: a,
    label: a,
  }));

  const handleSave = () => {
    setStory({
      ...story,
      ...form,
      author: form.author?.value || "",
      categories: form.categories.map((c) => c.value),
      series: form.series
        ? {
            id: form.series.value,
            title: form.series.label,
            chapter: form.chapter,
          }
        : null,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-h-screen w-full max-w-3xl flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-lg font-bold">Edit Story</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {/* Body (scrollable) */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Title"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Author - Creatable Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author
            </label>
            <CreatableSelect
              isClearable
              name="author"
              options={authorOptions}
              value={form.author}
              onChange={(selected) => setForm({ ...form, author: selected })}
              classNamePrefix="select"
              placeholder="Select or create an author..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Description"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Image URL with preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="Image URL"
                  className="w-full p-2 border rounded bg-white text-black placeholder-gray-500"
                />
              </div>
              <div className="w-12 h-12 flex items-center justify-center border rounded bg-gray-50">
                {form.image ? (
                  <img
                    src={form.image}
                    alt="Preview"
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <ImageIcon className="text-gray-400" />
                )}
              </div>
            </div>
          </div>

          {/* Categories Multi Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categories
            </label>
            <Select
              isMulti
              name="categories"
              options={categoryOptions}
              value={form.categories}
              onChange={(selected) =>
                setForm({ ...form, categories: selected })
              }
              classNamePrefix="select"
              placeholder="Select categories..."
            />
          </div>

          {/* Series Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Series
            </label>
            <Select
              name="series"
              options={seriesOptions}
              value={form.series}
              onChange={(selected) =>
                setForm({ ...form, series: selected, chapter: "" })
              }
              classNamePrefix="select"
              placeholder="Select series (optional)"
            />
          </div>

          {/* Chapter Select (if series selected) */}
          {form.series && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chapter
              </label>
              <Select
                name="chapter"
                options={Array.from(
                  {
                    length:
                      allSeries.find((s) => s.id === form.series.value)
                        ?.noOfChapters || 0,
                  },
                  (_, idx) => ({
                    value: idx + 1,
                    label: `Chapter ${idx + 1}`,
                  })
                )}
                value={
                  form.chapter
                    ? { value: form.chapter, label: `Chapter ${form.chapter}` }
                    : null
                }
                onChange={(selected) =>
                  setForm({ ...form, chapter: selected?.value || "" })
                }
                classNamePrefix="select"
                placeholder="Select chapter"
              />
            </div>
          )}

          {/* Story Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Story Content
            </label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Story content..."
              className="w-full p-2 border rounded h-30"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save
          </button>
          <button
            onClick={() => console.log("Delete story")}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* Hide scrollbars */
const style = document.createElement("style");
style.innerHTML = `
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;
document.head.appendChild(style);

