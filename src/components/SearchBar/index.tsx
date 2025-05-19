import type React from "react";
import { useState, useCallback, useEffect } from "react";
import { Search } from "lucide-react";
import { debounce } from "../../utils/Debounce";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({ placeholder = "Tìm kiếm", onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (onSearch) {
        onSearch(searchQuery);
      }
    }, 500),
    [onSearch]
  );

  // Update query and trigger debounced search
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  // Handle form submit (optional, if user presses Enter)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl">
      <div className="relative flex items-center">
        <div className="absolute left-4 text-gray-400">
          <Search size={20} />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full py-2 pl-12 pr-4 bg-gray-100 rounded-full text-gray-700 placeholder-gray-500 placeholder-italic focus:outline-none focus:ring-2 focus:ring-[#FF7506]"
        />
      </div>
    </form>
  );
}