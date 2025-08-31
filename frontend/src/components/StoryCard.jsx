import { useState, useEffect } from "react";

export default function StoryCard({ data, children }) {
  const [upvotes, setUpvotes] = useState(data.upvotes);
  const [downvotes, setDownvotes] = useState(data.downvotes);
  const [rating, setRating] = useState(data.rating);

  const handleUpvote = () => setUpvotes(upvotes + 1);
  const handleDownvote = () => setDownvotes(downvotes + 1);
  const handleRating = (newRating) => setRating(newRating);

  useEffect(() => {
    if (data) {
      setUpvotes(data.upvotes || 0);
      setDownvotes(data.downvotes || 0);
      setRating(data.rating || 0);
    }
  }, [data]);

  return (
    <article className="container mx-auto mt-12 px-8 rounded-b-2xl overflow-hidden shadow-lg bg-white">
      {/* Cover Image */}
      <div
        className="h-60 md:h-80 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${data.imageUrl})` }}
      />

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {data.title}
        </h1>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {data.categories?.map((cat, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded-lg"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4">{data.description}</p>

        {/* Meta info + Votes + Rating */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          {/* Left: Meta info */}
          {data?.noOfChapters ? (
            <span>Chapters: {data.noOfChapters}</span>
          ) : (
            <span>{data.readTime}</span>
          )}

          {/* Right: Votes + Rating */}
          <div className="flex items-center gap-6">
            {/* Voting */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleUpvote}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
              >
                👍 {upvotes}
              </button>
              <button
                onClick={handleDownvote}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
              >
                👎 {downvotes}
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(star)}
                  className={`text-xl ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                ({rating?.toFixed(1)})
              </span>
            </div>
          </div>
        </div>
        {children && <div className="mt-6">{children}</div>}
      </div>
    </article>
  );
}

