import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Share, Download } from "lucide-react";
import { type Photo } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface PhotoModalProps {
  photo: Photo;
  photos: Photo[];
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (photoId: string) => void;
}

export function PhotoModal({ photo, photos, isOpen, onClose, onNavigate }: PhotoModalProps) {
  const { toast } = useToast();

  const currentIndex = photos.findIndex(p => p.id === photo.id);
  const previousPhoto = currentIndex > 0 ? photos[currentIndex - 1] : null;
  const nextPhoto = currentIndex < photos.length - 1 ? photos[currentIndex + 1] : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && previousPhoto) {
        onNavigate(previousPhoto.id);
      } else if (e.key === "ArrowRight" && nextPhoto) {
        onNavigate(nextPhoto.id);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, previousPhoto, nextPhoto, onClose, onNavigate]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleShare = async () => {
    const url = `${window.location.origin}/photo/${photo.id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: photo.title,
          text: photo.description,
          url: url,
        });
      } catch (error) {
        // User cancelled sharing or error occurred
      }
    } else {
      // Fallback to copying URL to clipboard
      try {
        await navigator.clipboard.writeText(url);
        toast({
          title: "Link copied",
          description: "Photo link has been copied to clipboard",
        });
      } catch (error) {
        toast({
          title: "Share failed",
          description: "Unable to share photo",
          variant: "destructive",
        });
      }
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = photo.imageUrl;
    link.download = `${photo.title.replace(/\s+/g, "-").toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
      onClick={onClose}
      data-testid="photo-modal"
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div 
          className="relative max-w-6xl mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            onClick={onClose}
            data-testid="button-close-modal"
          >
            <X className="w-8 h-8" />
          </Button>

          {/* Navigation Arrows */}
          {previousPhoto && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
              onClick={() => onNavigate(previousPhoto.id)}
              data-testid="button-previous-photo"
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>
          )}
          
          {nextPhoto && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
              onClick={() => onNavigate(nextPhoto.id)}
              data-testid="button-next-photo"
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          )}

          <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
            {/* Main Photo Display */}
            <div className="relative bg-gray-100">
              <img 
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full max-h-[70vh] object-contain"
                data-testid="img-modal-photo"
              />
            </div>

            {/* Photo Metadata */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-medium portfolio-secondary mb-2" data-testid="text-modal-title">
                    {photo.title}
                  </h3>
                  <p className="portfolio-neutral-dark mb-4" data-testid="text-modal-description">
                    {photo.description}
                  </p>

                  {/* Tags */}
                  {photo.tags && photo.tags.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2" data-testid="modal-photo-tags">
                        {photo.tags.map((tag, index) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-portfolio-neutral-light portfolio-secondary text-xs"
                            data-testid={`modal-badge-tag-${index}`}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <span className="portfolio-neutral-dark">Category</span>
                      <p className="font-medium" data-testid="text-modal-category">{photo.category}</p>
                    </div>
                    <div>
                      <span className="portfolio-neutral-dark">Date</span>
                      <p className="font-medium" data-testid="text-modal-date">{photo.date}</p>
                    </div>
                    <div>
                      <span className="portfolio-neutral-dark">Location</span>
                      <p className="font-medium" data-testid="text-modal-location">{photo.location}</p>
                    </div>
                    <div>
                      <span className="portfolio-neutral-dark">Camera</span>
                      <p className="font-medium" data-testid="text-modal-camera">{photo.camera}</p>
                    </div>
                  </div>

                  {/* Technical Details */}
                  <div className="border-t border-portfolio-neutral pt-4">
                    <h5 className="font-medium portfolio-secondary mb-3 text-sm">Technical Details</h5>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-sm">
                      {photo.lens && (
                        <div>
                          <span className="portfolio-neutral-dark">Lens</span>
                          <p className="font-medium" data-testid="text-modal-lens">{photo.lens}</p>
                        </div>
                      )}
                      {photo.iso && (
                        <div>
                          <span className="portfolio-neutral-dark">ISO</span>
                          <p className="font-medium" data-testid="text-modal-iso">{photo.iso}</p>
                        </div>
                      )}
                      {photo.aperture && (
                        <div>
                          <span className="portfolio-neutral-dark">Aperture</span>
                          <p className="font-medium" data-testid="text-modal-aperture">{photo.aperture}</p>
                        </div>
                      )}
                      {photo.shutterSpeed && (
                        <div>
                          <span className="portfolio-neutral-dark">Shutter Speed</span>
                          <p className="font-medium" data-testid="text-modal-shutter-speed">{photo.shutterSpeed}</p>
                        </div>
                      )}
                      {photo.focalLength && (
                        <div>
                          <span className="portfolio-neutral-dark">Focal Length</span>
                          <p className="font-medium" data-testid="text-modal-focal-length">{photo.focalLength}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 md:mt-0 md:ml-8 flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={handleShare}
                    className="bg-portfolio-accent text-white hover:bg-indigo-700 transition-colors"
                    data-testid="button-share-photo"
                  >
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleDownload}
                    className="border-portfolio-neutral portfolio-secondary hover:bg-portfolio-neutral-light transition-colors"
                    data-testid="button-download-photo"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
