import { useState, useEffect } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { ImageIcon } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { createStory, getDataOptions } from "../../utils/database/database";

export default function CreateStoryForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: "",
    description: "",
    author: null,
    imageUrl: "",
    categories: [],
    content: "",
    isPartOfSeries: false,
    series: null,
  });

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [seriesOptions, setSeriesOptions] = useState([]);
  const [authorOptions, setAuthorOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _options = await getDataOptions();

        setCategoryOptions(_options?.categories);
        setSeriesOptions(_options?.series);
        setAuthorOptions(_options?.authors);
        console.log(_options)
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();  
  }, []);
  

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createStory(form);
    console.log(response);
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  return (
    <div className="flex flex-col w-screen min-h-screen bg-pink-50 text-black">
      <Navbar isAdmin={true}/>

      <div className="flex-1 flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-3xl bg-white shadow-lg rounded-xl overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b bg-pink-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">
              {step === 1 ? "Step 1: Basic Details" : "Step 2: Additional Info"}
            </h2>
            <p className="text-sm text-gray-600">
              Step {step} of 2
            </p>
          </div>

          {/* Step Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            
            {step === 1 && (
              <>
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none text-gray-900"
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
                    onChange={(e) => handleChange("description", e.target.value)}
                    className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none text-gray-900"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    rows={6}
                    value={form.content}
                    onChange={(e) => handleChange("content", e.target.value)}
                    className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none text-gray-900"
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                {/* Author */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author
                  </label>
                  <CreatableSelect
                    isClearable
                    options={authorOptions}
                    value={form.author}
                    onChange={(val) => handleChange("author", val)}
                    placeholder="Select or create an author..."
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>


                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categories
                  </label>
                  <Select
                    isMulti
                    options={categoryOptions}
                    value={form.categories}
                    onChange={(val) => handleChange("categories", val)}
                    placeholder="Select categories..."
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>

                {/* Is Part of Series */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={form.isPartOfSeries}
                    onChange={(e) => handleChange("isPartOfSeries", e.target.checked)}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Is part of a series?
                  </label>
                </div>

                {/* Series Details */}
                {form.isPartOfSeries && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Series
                      </label>
                      <Select
                        options={seriesOptions}
                        value={form.series}
                        onChange={(val) => handleChange("series", val)}
                        placeholder="Select series..."
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    </div>
                  </div>
                )}

                {/* Image URL + Preview */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={form.imageUrl}
                      onChange={(e) => handleChange("imageUrl", e.target.value)}
                      className="flex-1 p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none text-gray-900"
                    />
                    <div className="w-12 h-12 flex items-center justify-center border rounded-lg bg-gray-50 overflow-hidden">
                      {form.imageUrl ? (
                        <img
                          src={form.imageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover hover:scale-125 transition-transform"
                        />
                      ) : (
                        <ImageIcon className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

              </>

            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t bg-gray-50 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Back
              </button>
            )}
            <div className="flex gap-3 ml-auto">
              <button
                type="button"
                onClick={() =>
                  setForm({
                    title: "",
                    description: "",
                    author: null,
                    imageUrl: "",
                    categories: [],
                    content: "",
                    isPartOfSeries: false,
                    series: null,
                    chapter: null,
                  })
                }
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Reset
              </button>
              {step < 2 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
                >
                  Save Story
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

