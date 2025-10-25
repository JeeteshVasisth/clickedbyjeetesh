import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { type Photo } from "@shared/schema";
import { getAspectRatioClass } from "@/lib/photo-config";
import { SearchBar } from "@/components/search-bar";
import { Skeleton } from "@/components/ui/skeleton";

export function PhotoGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { data: photos, isLoading, error } = useQuery<Photo[]>({
    queryKey: ["/api/photos"],
  });

  // Filter photos based on search query and selected tags
  const filteredPhotos = useMemo(() => {
    if (!photos) return [];
    
    return photos.filter((photo) => {
      // Search by title and description
      const matchesSearch = !searchQuery || 
        photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by selected tags
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => photo.tags?.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  }, [photos, searchQuery, selectedTags]);

  // Get all available tags for the search bar
  const availableTags = useMemo(() => {
    if (!photos) return [];
    
    const tagCounts = new Map<string, number>();
    photos.forEach(photo => {
      photo.tags?.forEach(tag => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });
    
    // Sort tags by frequency
    return Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag);
  }, [photos]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  if (isLoading) {
    return (
      <div>
        <div className="flex justify-center mb-8">
          <Skeleton className="h-12 w-full max-w-4xl rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="photo-grid-loading">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12" data-testid="photo-grid-error">
        <p className="text-red-500">Failed to load photos. Please try again.</p>
      </div>
    );
  }

  if (!photos || photos.length === 0) {
    return (
      <div className="text-center py-12" data-testid="photo-grid-empty">
        <p className="portfolio-neutral-dark">No photos available.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Search Bar */}
      <SearchBar
        onSearch={handleSearch}
        onTagSelect={handleTagSelect}
        onClearSearch={handleClearSearch}
        searchQuery={searchQuery}
        availableTags={availableTags}
        selectedTags={selectedTags}
      />

      {/* Results Count */}
      <div className="mb-6 text-center" data-testid="results-count">
        <p className="portfolio-neutral-dark">
          {filteredPhotos.length === photos.length 
            ? `Showing all ${photos.length} photos`
            : `Found ${filteredPhotos.length} of ${photos.length} photos`
          }
        </p>
      </div>

      {/* No Results */}
      {filteredPhotos.length === 0 ? (
        <div className="text-center py-12" data-testid="no-search-results">
          <p className="portfolio-neutral-dark mb-2">No photos found matching your search.</p>
          <p className="text-sm portfolio-neutral-dark">Try different keywords or clear your filters.</p>
        </div>
      ) : (
        /* Photo Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="photo-grid">
          {filteredPhotos.map((photo) => (
            <Link key={photo.id} href={`/photo/${photo.id}`} data-testid={`link-photo-${photo.id}`}>
              <div className="group cursor-pointer">
                <div className={`relative overflow-hidden rounded-lg bg-gray-100 ${getAspectRatioClass(photo.aspectRatio)}`}>
                  <img 
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    data-testid={`img-photo-${photo.id}`}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="font-medium mb-1" data-testid={`text-photo-title-${photo.id}`}>
                      {photo.title}
                    </h4>
                    <p className="text-sm text-gray-200" data-testid={`text-photo-category-${photo.id}`}>
                      {photo.category}
                    </p>
                    {/* Show tags on hover */}
                    {photo.tags && photo.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {photo.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full"
                            data-testid={`tag-preview-${photo.id}-${tag}`}
                          >
                            {tag}
                          </span>
                        ))}
                        {photo.tags.length > 3 && (
                          <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                            +{photo.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
