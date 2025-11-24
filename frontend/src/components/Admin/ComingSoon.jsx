export default function ComingSoon({ title = "Coming Soon" }) {
  return (
    <div className="bg-pink-50 max-h-[calc(100vh-64px)] p-8 rounded-xl flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-lg text-gray-600">
        This section is under development. Stay tuned for updates!
      </p>
      <div className="mt-6">
        <span className="px-6 py-3 bg-pink-200 text-pink-900 rounded-lg shadow font-semibold">
          🚧 Work in Progress 🚧
        </span>
      </div>
    </div>
  );
}

