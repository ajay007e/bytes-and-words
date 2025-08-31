export default function StoryContent({ content }) {
  return (
    <div className="prose max-w-none prose-lg text-gray-800 leading-relaxed border-t border-gray-300 pt-4">
      <p>{content}</p>
    </div>
  );
}

