"use client";

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex gap-1 border-b border-border">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`relative cursor-pointer px-4 py-2.5 text-sm transition-colors ${
            selected === category
              ? "font-semibold text-foreground"
              : "text-muted hover:text-foreground"
          }`}
        >
          {category}
          {selected === category && (
            <span className="absolute bottom-0 left-0 h-0.5 w-full bg-foreground" />
          )}
        </button>
      ))}
    </div>
  );
}
