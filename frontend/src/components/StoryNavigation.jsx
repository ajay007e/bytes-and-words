import { useState } from "react";

export default function StoryNavigation({ currentChapter, totalChapters, onNavigate }) {
  const [current, setCurrent] = useState(currentChapter);

  const handlePrevious = () => {
    if (current > 1) {
      const newChapter = current - 1;
      setCurrent(newChapter);
      onNavigate(newChapter);
    }
  };

  const handleNext = () => {
    if (current < totalChapters) {
      const newChapter = current + 1;
      setCurrent(newChapter);
      onNavigate(newChapter);
    }
  };

  return (
    <div className="border-t border-gray-300 mt-6 pt-4 flex justify-between items-center">
      {current > 1 && (
        <button
          onClick={handlePrevious}
          className="text-gray-700 text-sm font-medium hover:underline cursor-pointer"
        >
          Previous Chapter
        </button>
      )}

      <span className="text-sm text-gray-600">
        Chapter {current} of {totalChapters}
      </span>

      {current < totalChapters && (
        <button
          onClick={handleNext}
          className="text-gray-700 text-sm font-medium hover:underline  cursor-pointer"
        >
          Next Chapter
        </button>
      )}
    </div>
  );
}
