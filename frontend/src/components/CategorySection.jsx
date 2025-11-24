export default function CategorySection({ heading, children }) {
  return (
    <section className="container mx-auto mt-12 px-4">
      {/* Section heading */}
      <h2 className="mb-6 text-2xl font-bold text-gray-800 md:text-3xl">
        {heading}
      </h2>
      {children}
    </section>
  );
}
