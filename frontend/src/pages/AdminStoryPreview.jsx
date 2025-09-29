import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown, Star, Image as ImageIcon } from "lucide-react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MarkdownRenderer from "../components/Markdown";
import UpdateStory from "../components/Admin/StoryUpdate"
import {
  getStoryById,
  getCategories,
  getSeries,
} from "../../utils/database/database";

export default function StoryPreview() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const _story = await getStoryById(id);
      setStory(_story);
    };
    fetchData();
  }, [id]);

  if (!story) return <div className="p-8 text-black">Loading...</div>;

  return (
    <div className="flex flex-col w-screen min-h-screen bg-pink-50 text-black">
      <Navbar isAdmin={true}/>
      {/* Modal */}
      {isEditing ? (
        <UpdateStory data={story} isUpdate={true}/>
      ) : (
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
                className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition w-fit"
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
                   {story.content ? (
                      <MarkdownRenderer text={story.content} />
                  ) : (
                    <p className="text-gray-500">No content available.</p>
                  )} 
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      )}
      <Footer />
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

