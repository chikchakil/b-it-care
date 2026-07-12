export default function AdminLoading() {
  return (
    <div className="grid gap-4">
      <div className="h-28 animate-pulse rounded-lg border border-white/10 bg-white/[0.055]" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="h-36 animate-pulse rounded-lg border border-white/10 bg-white/[0.055]" />
        ))}
      </div>
    </div>
  );
}
