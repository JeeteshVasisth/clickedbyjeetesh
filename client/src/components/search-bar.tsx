import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onTagSelect: (tag: string) => void;
  onClearSearch: () => void;
  searchQuery: string;
  availableTags: string[];
  selectedTags: string[];
}

export function SearchBar({ 
  onSearch, 
  onTagSelect, 
  onClearSearch, 
  searchQuery, 
  availableTags, 
  selectedTags 
}: SearchBarProps) {
  const [query, setQuery] = useState(searchQuery);

  const handleSearchChange = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const handleClearSearch = () => {
    setQuery("");
    onClearSearch();
  };

  const popularTags = availableTags.slice(0, 8); // Show first 8 most common tags

  return (
    <div className="w-full max-w-4xl mx-auto mb-8" data-testid="search-container">
      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Search photos by title or description..."
          value={query}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 pr-10 h-12 text-base bg-white border-portfolio-neutral focus:border-portfolio-accent"
          data-testid="input-search"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            data-testid="button-clear-search"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Popular Tags */}
      <div className="space-y-3">
        <p className="text-sm font-medium portfolio-neutral-dark">Popular Tags:</p>
        <div className="flex flex-wrap gap-2" data-testid="tags-container">
          {popularTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <Badge
                key={tag}
                variant={isSelected ? "default" : "secondary"}
                className={`cursor-pointer transition-colors ${
                  isSelected 
                    ? "bg-portfolio-accent text-white hover:bg-portfolio-accent/90" 
                    : "bg-portfolio-neutral-light portfolio-secondary hover:bg-portfolio-neutral"
                }`}
                onClick={() => onTagSelect(tag)}
                data-testid={`tag-${tag}`}
              >
                {tag}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedTags.length > 0 || query) && (
        <div className="mt-4 p-3 bg-portfolio-neutral-light rounded-lg" data-testid="active-filters">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium portfolio-neutral-dark">Active filters:</span>
              {query && (
                <Badge variant="outline" className="border-portfolio-accent text-portfolio-accent">
                  Search: "{query}"
                </Badge>
              )}
              {selectedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-portfolio-accent text-portfolio-accent"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearSearch}
              className="text-portfolio-neutral-dark hover:text-portfolio-secondary"
              data-testid="button-clear-all-filters"
            >
              Clear all
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}