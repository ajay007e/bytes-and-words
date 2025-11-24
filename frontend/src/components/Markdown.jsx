import React, { useState } from "react";

export default function MarkdownRenderer({ text }) {
  const [zoomSrc, setZoomSrc] = useState(null);

  const parseMarkdown = (inputText) => {
    const lines = inputText.split("\n");
    const elements = [];
    let imageRow = [];

    const flushImageRow = (row, keyPrefix) => {
      if (row.length === 0) return null;

      const chunkSize = 3; // max 3 images per row
      const chunks = [];

      for (let i = 0; i < row.length; i += chunkSize) {
        const chunk = row.slice(i, i + chunkSize);
        chunks.push(chunk);
      }

      return chunks.map((chunk, idx) => {
        if (chunk.length === 1) {
          // single image → full width
          return (
            <div key={`img-single-${keyPrefix}-${idx}`} className="my-4">
              {chunk[0]}
            </div>
          );
        }

        const mdCols = Math.min(chunk.length, 2);
        const lgCols = Math.min(chunk.length, 3);

        return (
          <div
            key={`img-row-${keyPrefix}-${idx}`}
            className={`grid grid-cols-1 md:grid-cols-${mdCols} lg:grid-cols-${lgCols} gap-4 my-4`}
          >
            {chunk}
          </div>
        );
      });
    };
    

    lines.forEach((line, idx) => {
      line = line.trim();
      if (!line) return;

      // Headings
      if (line.startsWith("### ")) {
        if (imageRow.length) {
          elements.push(flushImageRow(imageRow, idx));
          imageRow = [];
        }
        elements.push(
          <h3 key={idx} className="text-xl font-semibold my-2">
            {line.slice(4)}
          </h3>
        );
        return;
      }
      if (line.startsWith("## ")) {
        if (imageRow.length) {
          elements.push(flushImageRow(imageRow, idx));
          imageRow = [];
        }
        elements.push(
          <h2 key={idx} className="text-2xl font-semibold my-3">
            {line.slice(3)}
          </h2>
        );
        return;
      }
      if (line.startsWith("# ")) {
        if (imageRow.length) {
          elements.push(flushImageRow(imageRow, idx));
          imageRow = [];
        }
        elements.push(
          <h1 key={idx} className="text-3xl font-bold my-4">
            {line.slice(2)}
          </h1>
        );
        return;
      }

      // Image
      const imgMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
      if (imgMatch) {
        imageRow.push(
          <img
            key={`img-${idx}`}
            src={imgMatch[2]}
            alt={imgMatch[1]}
            className="cursor-zoom-in transition-transform duration-300 rounded-lg object-cover w-full"
            onClick={() => setZoomSrc(imgMatch[2])}
          />
        );
        return;
      }

      // If new paragraph, flush previous images
      if (imageRow.length) {
        elements.push(flushImageRow(imageRow, idx));
        imageRow = [];
      }

      // Paragraph + inline formatting
      let htmlLine = line
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/_(.*?)_/g, "<em>$1</em>")
        .replace(
          /\[(.*?)\]\((.*?)\)/g,
          '<a href="$2" target="_blank" class="text-blue-500 underline hover:text-blue-700">$1</a>'
        );

      elements.push(
        <p
          key={idx}
          className="my-2"
          dangerouslySetInnerHTML={{ __html: htmlLine }}
        />
      );
    });

    // Flush at end
    if (imageRow.length) elements.push(flushImageRow(imageRow, "end"));

    return elements;
  };

  const renderedElements = parseMarkdown(text);

  return (
    <div>
      {renderedElements}

      {/* Fullscreen Zoom */}
      {/* TODO: Slideshow */}
      {zoomSrc && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setZoomSrc(null)}
        >
          <img
            src={zoomSrc}
            alt="Zoomed"
            className="max-h-[90vh] max-w-[90vw] rounded-lg"
          />
        </div>
      )}
    </div>
  );
}

