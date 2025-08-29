import React, { useState, useEffect } from "react";

export default function Carousel({ blogs, heading, CardComponent }) {
  const [current, setCurrent] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  // Handle responsive card count
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1280) {
        setCardsPerView(4);
      } else if (window.innerWidth >= 1024) {
        setCardsPerView(3);
      } else if (window.innerWidth >= 640) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const maxIndex = Math.max(0, blogs.length - cardsPerView);

  const nextSlide = () => {
    if (current < maxIndex) setCurrent((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (current > 0) setCurrent((prev) => prev - 1);
  };

  return (
    <section className="container mx-auto mt-12 px-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
          {heading}
        </h2>

        {/* Controls OUTSIDE the cards */}
        <div className="space-x-2">
          <button
            onClick={prevSlide}
            disabled={current === 0}
            className={`rounded-full px-3 py-1 text-lg font-bold transition ${
              current === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-gray-900"
            }`}
          >
            ◀
          </button>
          <button
            onClick={nextSlide}
            disabled={current === maxIndex}
            className={`rounded-full px-3 py-1 text-lg font-bold transition ${
              current === maxIndex
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-gray-900"
            }`}
          >
            ▶
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        {/* Track */}
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${current * (100 / cardsPerView)}%)` }}
        >
          {blogs.map((blog) => (
            <CardComponent key={blog.id} card={blog}/>
          ))}
        </div>
      </div>
    </section>
  );
}
