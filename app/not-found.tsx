export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
        <path d="M12 12v4" />
        <path d="M12 20h.01" />
        <path d="M8.128 16.949A7 7 0 1 1 15.71 8h1.79a1 1 0 0 1 0 9h-1.642" />
      </svg>
      <h1 className="text-4xl font-bold" style={{ fontFamily: '"JejuDoldam"' }}>Oops... 404 not found</h1>
      <p className="text-muted">잘못된 접근입니다</p>
    </div>
  );
}
