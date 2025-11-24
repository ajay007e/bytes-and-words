export default function Loader({ message = "Loading..." }) {
  return (
    <div className="flex items-center justify-center h-full w-full py-12">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>

        {/* Message */}
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
}

