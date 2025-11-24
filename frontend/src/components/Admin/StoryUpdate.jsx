import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { ImageIcon } from "lucide-react";
import StoryPreview from "../Admin/StoryPreview";

import { getDataOptions, createStory, updateStory } from "../../../utils/database/database";

export default function UpdateStory({data = {}, isUpdate = false}) {
  const [form, setForm] = useState({
    ... data, 
    title: data.title || "",
    description: data.description || "",
    author: data.author || null,
    imageUrl: data.imageUrl || "",
    categories: [],
    series: null,
    isPartOfSeries: data.isPartOfSeries || false,
    content: data.content || "",
  });

  const navigate = useNavigate();

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [seriesOptions, setSeriesOptions] = useState([]);
  const [authorOptions, setAuthorOptions] = useState([]);
  const [step, setStep] = useState(1); // Step control

  useEffect(() => {
    const fetchData = async () => {
      const _options = await getDataOptions();
      setCategoryOptions(_options?.categories || []);
      setSeriesOptions(_options?.series || []);
      setAuthorOptions(_options?.authors || []);
      setForm(prev => ({
        ...prev,
        categories: (data.categories || []).map(cat => {
          const found = _options?.categories.find(c => c.value === cat || c.label === cat);
          return found ? found : { value: cat, label: cat }; // fallback
        }),
        series: data.series
          ? (() => {
              const foundSeries = _options?.series.find(s => s.value === data.series || s.label === data.series);
              return foundSeries ? foundSeries : { value: data.series, label: data.series };
            })()
          : null,
        author: data.author
          ? (() => {
              const foundAuthor = _options?.authors.find(a => a.value === data.author || a.label === data.author);
              return foundAuthor ? foundAuthor : { value: data.author, label: data.author };
            })()
          : null,
      }));
    };
    fetchData();
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const story = {
      ...form,
      author: form.author.value,
      categories: form.categories.map(c => c.label)
    }
    isUpdate ? await updateStory(story.id, story) : await createStory(story);
    navigate("/admin/story");
  };

  return (
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-8 max-w-7xl mx-auto w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-6 bg-white rounded-xl shadow p-6"
        >
          {step === 1 && (
            <>
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="text-3xl font-bold w-full border-none outline-none placeholder-gray-400"
              />

              <input
                type="text"
                placeholder="Write a short description..."
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full text-lg border-none outline-none placeholder-gray-400 resize-none"
              />

              <div>
                <label className="text-sm font-medium text-gray-600">Cover Image</label>
                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="text"
                    placeholder="Paste an image URL"
                    value={form.imageUrl}
                    onChange={(e) => handleChange("imageUrl", e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Categories</label>
                <Select
                  isMulti
                  options={categoryOptions}
                  value={form.categories}
                  onChange={(val) => handleChange("categories", val)}
                  placeholder="Select categories..."
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Author</label>
                <CreatableSelect
                  isClearable
                  options={authorOptions}
                  value={form.author}
                  onChange={(val) => handleChange("author", val)}
                  placeholder="Select or create an author..."
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="belongsToSeries"
                  type="checkbox"
                  checked={form.isPartOfSeries}
                  onChange={(e) => {
                    handleChange("series", form.isPartOfSeries ? null : "");
                    handleChange("isPartOfSeries", !form.isPartOfSeries);
                  }}
                  className="h-4 w-4 text-pink-600 border-gray-300 rounded"
                />
                <label htmlFor="belongsToSeries" className="text-sm text-gray-700">
                  This story is part of a series
                </label>
              </div>

              {form.series !== null && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Series</label>
                  <Select
                    options={seriesOptions}
                    value={form.series}
                    onChange={(val) => handleChange("series", val)}
                    placeholder="Select series..."
                  />
                </div>
              )}

              <div className="flex justify-end pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="cursor-pointer px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <textarea
                placeholder="Start writing your story..."
                value={form.content}
                onChange={(e) => handleChange("content", e.target.value)}
                className="w-full story-content p-3 border border-gray-300 rounded-lg min-h-8/10 text-gray-900"
              />
              <MarkdownSyntaxInfo/>
              <div className="flex justify-between gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 cursor-pointer bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-pink-600 cursor-pointer text-white rounded-lg hover:bg-pink-700"
                >
                  Publish Story
                </button>
              </div>
            </>
          )}
        </form>

        <div className="bg-white rounded-xl shadow p-6 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Live Preview
          </h3>
          <StoryPreview data={form} />
        </div>
      </div>
  );
}



export function MarkdownSyntaxInfo({ float = false }) {
  const [open, setOpen] = useState(false);

  const examples = [
    { label: "Heading 1", code: "# This is Heading 1" },
    { label: "Heading 2", code: "## This is Heading 2" },
    { label: "Heading 3", code: "### This is Heading 3" },
    { label: "Paragraph", code: "This is a normal paragraph." },
    { label: "Bold", code: "**This text is bold**" },
    { label: "Italic", code: "_This text is italic_" },
    { label: "Link", code: "[Click here](https://example.com)" },
    { label: "Image", code: "![Alt text](https://placekitten.com/200/200)" },
  ];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // small visual feedback — replace with your toast if you have one
      // (this alert is minimal to keep the component self-contained)
      alert("Copied to clipboard");
    } catch {
      alert("Unable to copy");
    }
  };

  // wrapper classes: either pinned or full-width container that right-aligns content
  const wrapperClass = float
    ? "fixed top-4 right-4 z-50"
    : "w-full flex justify-end";

  return (
    <div className={wrapperClass}>
      {/* minimal subtle button */}
      <p
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="inline-flex items-center cursor-pointer gap-2 px-2 py-1 rounded-md text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-300"
        title="Show Markdown syntax"
      >
        {/* subtle info icon */}
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <span className="sr-only">Show Markdown syntax</span>
        {/* small visible label, subtle */}
        <span className="hidden sm:inline">Markdown</span>
      </p>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4"
          onClick={() => setOpen(false)} // close on outside click
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Markdown syntax"
            className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            {/* close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute cursor-pointer top-3 right-3 text-gray-500 hover:text-black text-xl p-1 rounded focus:outline-none"
              aria-label="Close"
            >
              &times;
            </button>

            <h2 className="text-lg font-semibold mb-3">Markdown Syntax</h2>

            <ul className="space-y-3">
              {examples.map((ex, idx) => (
                <li
                  key={idx}
                  className="flex items-start justify-between bg-gray-50 p-3 rounded border border-gray-100"
                >
                  <div>
                    <div className="text-sm font-medium text-gray-800">{ex.label}</div>
                    <code className="block text-xs text-gray-600 mt-1">{ex.code}</code>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(ex.code)}
                      className="ml-4 px-2 py-1 cursor-pointer bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
                    >
                      Copy
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

