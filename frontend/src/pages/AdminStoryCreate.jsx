import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { ImageIcon } from "lucide-react";
import StoryPreview from "../components/Admin/StoryPreview";
import Navbar from "../components/Navbar";
import CreateStory from "../components/Admin/StoryUpdate";
import Footer from "../components/Footer";

import { getDataOptions, createStory } from "../../utils/database/database";

export default function Story({data = {}}) {
  const [form, setForm] = useState({
    title: data.title || "",
    description: data.description || "",
    author: data.author || null,
    imageUrl: data.imageUrl || "",
    categories: data.categories || [],
    series: data.series || null,
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
    await createStory(story);
    alert("Story created!");
    navigate("/admin/story");
  };

  return (
    <div className="flex flex-col w-screen min-h-screen bg-gray-50 text-black">
      <Navbar isAdmin={true} />
      <CreateStory/>      
      <Footer/>
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

