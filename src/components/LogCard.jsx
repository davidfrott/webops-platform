export default function LogCard({
  service,
  status,
  message,
}) {
  return (
    <div className="bg-[#111827] border border-zinc-800 rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-bold">
          {service}
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            status === "success"
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {status}
        </span>
      </div>

      <p className="text-zinc-400 mt-4">
        {message}
      </p>
    </div>
  );
}