import Navigation from "./Navigation";
import Hero from "./Hero";
import Projects from "./Projects";
import About from "./About";
import Contact from "./Contact";

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Projects />
      <About />
      <Contact />

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-background">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground text-sm">
            {/* © 2024 Logan. Built with React, TypeScript, and coastal inspiration. */}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
