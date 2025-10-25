import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { type PhotographerInfo } from "@shared/schema";

export function Footer() {
  const { data: photographer } = useQuery<PhotographerInfo>({
    queryKey: ["/api/photographer"],
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      className="bg-portfolio-secondary text-white py-12 px-4 sm:px-6 lg:px-8"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h4
              className="text-xl font-semibold mb-2"
              data-testid="text-footer-name"
            >
              {photographer?.name || "Alex Morgan"}
            </h4>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/">
              <button
                onClick={() => scrollToSection("portfolio")}
                className="text-gray-300 hover:text-white transition-colors"
                data-testid="button-footer-portfolio"
              >
                Portfolio
              </button>
            </Link>
            <Link href="/">
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-300 hover:text-white transition-colors"
                data-testid="button-footer-about"
              >
                About
              </button>
            </Link>
            <Link href="/">
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-300 hover:text-white transition-colors"
                data-testid="button-footer-contact"
              >
                Contact
              </button>
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p data-testid="text-footer-copyright">
            &copy; 2024 {photographer?.name || "Jeetesh Vasisth"} Photography. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
