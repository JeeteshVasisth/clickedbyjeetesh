import { useQuery } from "@tanstack/react-query";
import { Mail, Phone, MapPin } from "lucide-react";
import { type PhotographerInfo } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export function ContactSection() {
  const { data: photographer, isLoading } = useQuery<PhotographerInfo>({
    queryKey: ["/api/photographer"],
  });

  if (isLoading) {
    return (
      <section id="contact" className="bg-portfolio-background py-20 px-4 sm:px-6 lg:px-8" data-testid="contact-section-loading">
        <div className="max-w-4xl mx-auto text-center">
          <Skeleton className="h-8 w-48 mx-auto mb-6" />
          <Skeleton className="h-4 w-96 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="text-center">
                <Skeleton className="w-12 h-12 rounded-lg mx-auto mb-4" />
                <Skeleton className="h-4 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-32 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!photographer) {
    return (
      <section id="contact" className="bg-portfolio-background py-20 px-4 sm:px-6 lg:px-8" data-testid="contact-section-error">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-red-500">Unable to load contact information.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="bg-portfolio-background py-20 px-4 sm:px-6 lg:px-8" data-testid="contact-section">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-3xl font-medium portfolio-secondary mb-6" data-testid="text-contact-title">
          Get In Touch
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-portfolio-accent rounded-lg flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-medium mb-2">Email</h4>
            <p className="portfolio-neutral-dark" data-testid="text-contact-email">
              {photographer.email}
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-portfolio-accent rounded-lg flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-medium mb-2">Location</h4>
            <p className="portfolio-neutral-dark" data-testid="text-contact-location">
              {photographer.location}
            </p>
          </div>
        </div>
        
        <div className="flex justify-center space-x-6">
          <a href="https://www.linkedin.com/in/jeetesh-vasisth-715221337" className="portfolio-neutral-dark hover:portfolio-accent transition-colors" data-testid="link-social-linkedin">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.783-1.75-1.75s.784-1.75 1.75-1.75 1.75.783 1.75 1.75-.783 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-3.368-4-3.116-4 0v5.604h-3v-10h3v1.604c1.396-2.586 7-2.777 7 2.476v5.92z"/>
            </svg>
          </a>

          <a href="https://www.instagram.com/jeeteshvasisth/" className="portfolio-neutral-dark hover:portfolio-accent transition-colors" data-testid="link-social-instagram">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
