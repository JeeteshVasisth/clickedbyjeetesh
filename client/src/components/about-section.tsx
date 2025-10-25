import { useQuery } from "@tanstack/react-query";
import { type PhotographerInfo } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export function AboutSection() {
  const { data: photographer, isLoading } = useQuery<PhotographerInfo>({
    queryKey: ["/api/photographer"],
  });

  if (isLoading) {
    return (
      <section id="about" className="bg-white py-20 px-4 sm:px-6 lg:px-8" data-testid="about-section-loading">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Skeleton className="w-full max-w-md h-96 mx-auto lg:mx-0 rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!photographer) {
    return (
      <section id="about" className="bg-white py-20 px-4 sm:px-6 lg:px-8" data-testid="about-section-error">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-red-500">Unable to load information.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="bg-white py-20 px-4 sm:px-6 lg:px-8" data-testid="about-section">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="/photo.jpg"
              alt="Photographer portrait"
              className="w-full max-w-md mx-auto lg:mx-0 rounded-lg shadow-lg"
              data-testid="img-photographer-portrait"
            />
          </div>
          <div>
            <h3 className="text-3xl font-medium portfolio-secondary mb-6" data-testid="text-about-title">
              About Me
            </h3>
            <p className="portfolio-neutral-dark mb-6 leading-relaxed" data-testid="text-about-bio">
              {photographer.bio}
            </p>
            <div className="flex flex-wrap gap-3" data-testid="specialties-list">
              {photographer.specialties.map((specialty, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="bg-portfolio-neutral-light portfolio-secondary"
                  data-testid={`badge-specialty-${index}`}
                >
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
