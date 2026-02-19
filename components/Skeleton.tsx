export function CommentsSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-xl bg-background p-3.5">
          <div className="mb-2 flex items-center gap-2">
            <div className="h-7 w-7 shrink-0 rounded-full bg-border" />
            <div className="h-4 w-16 rounded bg-border" />
            <div className="ml-auto h-3 w-14 rounded bg-border" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="h-3.5 w-full rounded bg-border" />
            <div className="h-3.5 w-2/3 rounded bg-border" />
          </div>
        </div>
      ))}
    </div>
  );
}
