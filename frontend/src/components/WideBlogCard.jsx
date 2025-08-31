export default function WideBlogCard({ blog }) {
  return (
    <article className="flex flex-col md:flex-row w-full overflow-hidden rounded-2xl shadow-lg bg-white group">
      {/* Blog Image */}
      <div
        className="md:w-1/3 h-64 md:h-auto bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${blog.imageUrl})` }}
      />

      {/* Blog Content */}
      <div className="flex flex-col justify-between p-6 md:w-2/3">
        <div>
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-3">
            {blog.categories?.map((cat, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded-lg"
              >
                {cat}
              </span>
            ))}

            {/* Series Tag */}
            {blog.series && (
              <span className="px-2 py-1 text-xs font-medium bg-purple-200 text-purple-800 rounded-lg">
                 Ch {blog.series.chapter} · {blog.series.chapterName}
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {blog.title}
          </h2>

          {/* Author + Read Time */}
          <p className="text-sm text-gray-600 mb-4">
            By {blog.author ? blog.author : blog.authors.join(",")} · {blog.readTime ? blog.readTime : `${blog.noOfChapters} chapters`}
          </p>

          {/* Description */}
          <p className="text-gray-700 mb-4 line-clamp-3">{blog.description}</p>
        </div>

        {/* Footer (rating, votes, link) */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>⭐ {blog.rating.toFixed(1)}</span>
            <span>⬆ {blog.upvotes}</span>
            <span>⬇ {blog.downvotes}</span>
          </div>
          <a
            href={blog.href}
            className="inline-block rounded-lg bg-gray-900 text-white px-4 py-2 text-sm font-medium hover:bg-gray-700"
          >
            Read More →
          </a>
        </div>
      </div>
    </article>
  );
}

