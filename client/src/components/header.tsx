import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const scrollToSection = (sectionId: string) => {
    if (location !== "/") {
      // If not on home page, navigate to home first
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-portfolio-primary/90 backdrop-blur-sm border-b border-portfolio-neutral" data-testid="header">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center cursor-pointer">
              <h1 className="text-xl font-semibold portfolio-secondary">
                Jeetesh Vasisth
              </h1>
              <span className="ml-3 text-sm portfolio-neutral-dark">Photography</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection("portfolio")}
              className="text-sm font-medium portfolio-secondary hover:portfolio-accent transition-colors"
              data-testid="button-portfolio"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection("about")}
              className="text-sm font-medium portfolio-neutral-dark hover:portfolio-accent transition-colors"
              data-testid="button-about"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium portfolio-neutral-dark hover:portfolio-accent transition-colors"
              data-testid="button-contact"
            >
              Contact
            </button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-portfolio-primary border-t border-portfolio-neutral" data-testid="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button 
                onClick={() => scrollToSection("portfolio")}
                className="block px-3 py-2 text-base font-medium portfolio-secondary hover:bg-portfolio-neutral-light w-full text-left"
                data-testid="button-mobile-portfolio"
              >
                Portfolio
              </button>
              <button 
                onClick={() => scrollToSection("about")}
                className="block px-3 py-2 text-base font-medium portfolio-neutral-dark hover:bg-portfolio-neutral-light w-full text-left"
                data-testid="button-mobile-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection("contact")}
                className="block px-3 py-2 text-base font-medium portfolio-neutral-dark hover:bg-portfolio-neutral-light w-full text-left"
                data-testid="button-mobile-contact"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
