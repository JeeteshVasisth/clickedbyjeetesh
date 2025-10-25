import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToPortfolio = () => {
    const element = document.getElementById("portfolio");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8" data-testid="hero-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-12">
          <h2 className="text-4xl md:text-6xl font-light portfolio-secondary mb-6" data-testid="text-hero-title">
            Capturing memories,<br />One shot at a time.
          </h2>
          <p className="text-lg portfolio-neutral-dark max-w-2xl mx-auto mb-8" data-testid="text-hero-description">
            A curated collection of photography that explores the intersection of light, emotion, and a unique experience.
          </p>
          <div className="flex justify-center">
            <Button 
              onClick={scrollToPortfolio}
              className="bg-portfolio-accent text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              data-testid="button-view-portfolio"
            >
              View Portfolio
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
