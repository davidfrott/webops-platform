export default function StatusCard({
  title,
  value,
  subtitle,
}) {
  return (
    <div className="bg-[#111827] border border-zinc-800 rounded-2xl p-6">
      <p className="text-zinc-500 text-sm">
        {title}
      </p>

      <h2 className="text-4xl font-bold text-white mt-3">
        {value}
      </h2>

      <p className="text-zinc-600 mt-2 text-sm">
        {subtitle}
      </p>
    </div>
  );
}