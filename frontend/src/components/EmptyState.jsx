export default function EmptyState({ 
  title = "Nothing here yet", 
  description = "There’s no content to show right now.", 
  action, // optional button JSX
  image = "/undraw_void_wez2.svg" // default svg from public folder
}) {
  return (
    <div className="container mx-auto mt-12 px-8">
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-gray-50 rounded-xl shadow-md">
        <img
          src={image}
          alt="Empty state illustration"
          className="w-48 h-48 mb-6 drop-shadow-md"
        />
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-500 mt-2 max-w-md">{description}</p>
        {action && <div className="mt-4">{action}</div>}
      </div>
    </div>
  );
}

