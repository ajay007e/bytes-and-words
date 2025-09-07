import { useState } from "react";
import { XCircle } from "lucide-react";

export default function ConfirmDeleteModal({
  title, // title of the entity (category/story/series)
  onConfirm, // callback when confirmed
  onCancel, // callback to close modal
  entityName = "Category", // default text
}) {
  const [input, setInput] = useState("");

  const isConfirmed = input === title;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-bold text-red-600">
            Delete {entityName}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-800 cursor-pointer"
          >
            <XCircle size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-gray-700">
            Are you sure you want to delete this {entityName.toLowerCase()}? This action cannot be undone.
          </p>
          <p className="text-gray-700">
            To confirm, type <span className="font-semibold">{title}</span> below:
          </p>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Type ${title} here`}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!isConfirmed}
            className={`px-4 py-2 rounded text-white ${
              isConfirmed
                ? "bg-red-600 hover:bg-red-700 cursor-pointer"
                : "bg-red-300 cursor-not-allowed"
            }`}
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}

