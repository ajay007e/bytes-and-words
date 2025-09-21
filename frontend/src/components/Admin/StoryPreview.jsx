import MarkdownRenderer from "../Markdown";

export default function StoryPage({ data }) {
  const {
    title,
    description,
    imageUrl,
    author,
    categories = [],
    series,
    content,
  } = data;

  return (
    <div className="flex flex-col max-h-[calc(70vh)]"> 
      {/* Header Card (fixed height, always visible) */}
      <div
        className="relative w-full h-64 flex items-end justify-start rounded-b-2xl overflow-hidden shadow-lg flex-shrink-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Content */}
        <div className="relative p-6 md:p-12 space-y-3 text-white z-10 max-w-4xl">
          {/* Title + Author */}
          <div className="flex items-end flex-wrap gap-3">
            <h1 className="text-4xl md:text-5xl font-extrabold">{title}</h1>
            {author && (
              <span className="px-3 py-1 bg-pink-600/60 text-white text-xs md:text-sm rounded-full">
                {author.label || author}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm md:text-base">{description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {categories.map((cat, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white/20 text-white text-xs rounded-full"
              >
                {cat.label || cat}
              </span>
            ))}
            {series && (
              <span className="px-3 py-1 bg-purple-600 text-white text-xs rounded-full">
                {series.label || series}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Story Content (scrollable) */}
      <div className="story-content flex-1 w-full mx-auto p-6 mt-4 bg-pink-50 text-gray-900 rounded-2xl overflow-y-auto max-h-[calc(100vh-16rem)]">
        <article className="prose prose-pink lg:prose-lg">
          {content ? (
              <MarkdownRenderer text={content} />
          ) : (
            <p className="text-gray-500">No content available.</p>
          )}
        </article>
      </div>
    </div>
  );
}

