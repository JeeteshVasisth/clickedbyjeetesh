import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { type Photo } from "@shared/schema";
import { Header } from "@/components/header";
import { PhotoModal } from "@/components/photo-modal";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import NotFound from "@/pages/not-found";

export default function PhotoDetail() {
  const [, params] = useRoute("/photo/:id");
  const [, setLocation] = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const photoId = params?.id;

  const { data: photo, isLoading: photoLoading, error: photoError } = useQuery<Photo>({
    queryKey: ["/api/photos", photoId],
    enabled: !!photoId,
  });

  const { data: allPhotos = [] } = useQuery<Photo[]>({
    queryKey: ["/api/photos"],
  });

  if (!photoId) {
    return <NotFound />;
  }

  if (photoLoading) {
    return (
      <div className="min-h-screen bg-portfolio-background" data-testid="photo-detail-loading">
        <Header />
        <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-8 w-32 mb-8" />
            <Skeleton className="w-full aspect-[4/3] rounded-lg mb-8" />
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-8" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-16 mb-1" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (photoError || !photo) {
    return <NotFound />;
  }

  const handleNavigatePhoto = (newPhotoId: string) => {
    setLocation(`/photo/${newPhotoId}`);
  };

  return (
    <div className="min-h-screen bg-portfolio-background" data-testid="page-photo-detail">
      <Header />
      
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="mb-8 portfolio-neutral-dark hover:portfolio-secondary"
            data-testid="button-back-home"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative bg-gray-100">
              <img 
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-auto max-h-[60vh] object-contain cursor-pointer"
                onClick={() => setIsModalOpen(true)}
                data-testid="img-photo-main"
              />
              <div className="absolute inset-0 hover:bg-black/5 transition-colors cursor-pointer" onClick={() => setIsModalOpen(true)} />
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h1 className="text-3xl font-medium portfolio-secondary mb-4" data-testid="text-photo-title">
                    {photo.title}
                  </h1>
                  <p className="portfolio-neutral-dark mb-6 leading-relaxed text-lg" data-testid="text-photo-description">
                    {photo.description}
                  </p>

                  {/* Tags */}
                  {photo.tags && photo.tags.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium portfolio-secondary mb-3">Tags</h4>
                      <div className="flex flex-wrap gap-2" data-testid="photo-tags">
                        {photo.tags.map((tag, index) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-portfolio-neutral-light portfolio-secondary"
                            data-testid={`badge-tag-${index}`}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm mb-6">
                    <div>
                      <span className="portfolio-neutral-dark block mb-1">Category</span>
                      <p className="font-medium" data-testid="text-photo-category">{photo.category}</p>
                    </div>
                    <div>
                      <span className="portfolio-neutral-dark block mb-1">Date</span>
                      <p className="font-medium" data-testid="text-photo-date">{photo.date}</p>
                    </div>
                    <div>
                      <span className="portfolio-neutral-dark block mb-1">Location</span>
                      <p className="font-medium" data-testid="text-photo-location">{photo.location}</p>
                    </div>
                    <div>
                      <span className="portfolio-neutral-dark block mb-1">Camera</span>
                      <p className="font-medium" data-testid="text-photo-camera">{photo.camera}</p>
                    </div>
                  </div>

                  {/* Technical Details */}
                  <div className="border-t border-portfolio-neutral pt-6">
                    <h4 className="font-medium portfolio-secondary mb-4">Technical Details</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-sm">
                      {photo.lens && (
                        <div>
                          <span className="portfolio-neutral-dark block mb-1">Lens</span>
                          <p className="font-medium" data-testid="text-photo-lens">{photo.lens}</p>
                        </div>
                      )}
                      {photo.iso && (
                        <div>
                          <span className="portfolio-neutral-dark block mb-1">ISO</span>
                          <p className="font-medium" data-testid="text-photo-iso">{photo.iso}</p>
                        </div>
                      )}
                      {photo.aperture && (
                        <div>
                          <span className="portfolio-neutral-dark block mb-1">Aperture</span>
                          <p className="font-medium" data-testid="text-photo-aperture">{photo.aperture}</p>
                        </div>
                      )}
                      {photo.shutterSpeed && (
                        <div>
                          <span className="portfolio-neutral-dark block mb-1">Shutter Speed</span>
                          <p className="font-medium" data-testid="text-photo-shutter-speed">{photo.shutterSpeed}</p>
                        </div>
                      )}
                      {photo.focalLength && (
                        <div>
                          <span className="portfolio-neutral-dark block mb-1">Focal Length</span>
                          <p className="font-medium" data-testid="text-photo-focal-length">{photo.focalLength}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Photos */}
          <div className="mt-12">
            <h3 className="text-2xl font-medium portfolio-secondary mb-6" data-testid="text-related-photos">
              More Photos
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {allPhotos
                .filter(p => p.id !== photo.id)
                .slice(0, 6)
                .map((relatedPhoto) => (
                  <button
                    key={relatedPhoto.id}
                    onClick={() => handleNavigatePhoto(relatedPhoto.id)}
                    className="group"
                    data-testid={`button-related-photo-${relatedPhoto.id}`}
                  >
                    <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square">
                      <img 
                        src={relatedPhoto.imageUrl}
                        alt={relatedPhoto.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                      <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-sm font-medium truncate">{relatedPhoto.title}</p>
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <PhotoModal
        photo={photo}
        photos={allPhotos}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNavigate={handleNavigatePhoto}
      />
    </div>
  );
}
