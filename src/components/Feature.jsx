
export default function Feature({ blogs }) {
  return (
    <section className="container mx-auto mt-12 grid gap-6 px-4 md:grid-cols-3">
      {blogs.map((blog) => (
        <FeatureCard key={blog.id} blog={blog}/>
      ))}
    </section>
  );
}

function FeatureCard ({ blog }) {
  return (
    <article
      className="relative group h-80 overflow-hidden rounded-2xl shadow-lg"
    >
      {/* Background Image */}
      <div
        className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${blog.imageUrl})` }}
      />

      {/* Series Label */}
      {blog.series && (
        <span className="absolute top-3 right-3 z-10 rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-gray-900 shadow transition-opacity duration-300 group-hover:opacity-0">
          Series
        </span>
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

      {/* Default content (hidden on hover) */}
      <div className="absolute bottom-0 w-full p-4 text-white transition-opacity duration-300 group-hover:opacity-0">
        <h2 className="text-lg font-bold leading-tight">{blog.title}</h2>
        <p className="text-sm text-white/80">
          By {blog.author} · {blog.readTime}
        </p>
      </div>

      {/* Hover content (only visible on hover) */}
      <div className="absolute inset-0 flex flex-col justify-end bg-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="p-4 text-white">
          <h2 className="text-lg font-bold mb-2">{blog.title}</h2>
          <p className="text-sm text-white/90 mb-3">{blog.description}</p>
          <a
            href={blog.href}
            className="inline-block rounded-lg bg-white/90 px-3 py-1.5 text-sm font-medium text-gray-900 shadow hover:bg-white"
          >
            Read
          </a>
        </div>
      </div>
    </article>
  )
}
