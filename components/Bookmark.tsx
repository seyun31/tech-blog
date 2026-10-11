interface BookmarkProps {
  url: string;
  title: string;
  description?: string;
}

export default function Bookmark({ url, title, description }: BookmarkProps) {
  const { hostname, pathname } = new URL(url);

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="bookmark">
      <span className="bookmark-title">{title}</span>
      {description && <span className="bookmark-description">{description}</span>}
      <span className="bookmark-url">
        {hostname}
        {pathname !== "/" && pathname}
      </span>
    </a>
  );
}
