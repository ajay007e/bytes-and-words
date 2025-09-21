import MarkdownRenderer from "../components/Markdown";
import Loader from "../components/Loader";

export default function StoryContent({ content }) {
  if (!content) return  <Loader/>
  return (
    <div className="prose max-w-none prose-lg text-gray-800 leading-relaxed border-t border-gray-300 pt-4">
          <MarkdownRenderer text={content} />
    </div>
  );
}

