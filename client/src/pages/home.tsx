import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { PhotoGrid } from "@/components/photo-grid";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-portfolio-background" data-testid="page-home">
      <Header />
      <HeroSection />
      
      <section id="portfolio" className="px-4 sm:px-6 lg:px-8 pb-20" data-testid="portfolio-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-medium portfolio-secondary mb-4" data-testid="text-portfolio-title">
              Portfolio
            </h3>
            <p className="portfolio-neutral-dark" data-testid="text-portfolio-subtitle">
              Latest work and featured photography
            </p>
          </div>
          <PhotoGrid />
        </div>
      </section>
      
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
