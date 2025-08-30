export default function BlogCard({card}) {
  return (
    <div
      className="min-w-[100%] sm:min-w-[50%] lg:min-w-[33.33%] xl:min-w-[25%] px-2"
    >
      <article className="relative group h-80 overflow-hidden rounded-2xl shadow-lg">
        {/* Background Image */}
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${card.imageUrl})` }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

        {/* Default content */}
        <div className="absolute bottom-0 w-full p-4 text-white transition-opacity duration-300 group-hover:opacity-0">
          <h2 className="text-lg font-bold leading-tight">{card.title}</h2>
          <p className="text-sm text-white/80">
            By {card.author} · {card.readTime}
          </p>
        </div>

        {/* Hover content */}
        <div className="absolute inset-0 flex flex-col justify-end bg-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="p-4 text-white">
            <h2 className="text-lg font-bold mb-2">{card.title}</h2>
            <p className="text-sm text-white/90 mb-3">{card.description}</p>
            <a
              href={card.href}
              className="inline-block rounded-lg bg-white/90 px-3 py-1.5 text-sm font-medium text-gray-900 shadow hover:bg-white"
            >
              Read
            </a>
          </div>
        </div>
      </article>
    </div>
  )
}
