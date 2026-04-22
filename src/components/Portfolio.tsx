import Navigation from "./Navigation";
import Hero from "./Hero";
import Projects from "./Projects";
import About from "./About";
import Contact from "./Contact";
import DiffusionBackground from "./DiffusionBackground";

const Portfolio = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <DiffusionBackground />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/70 bg-background/60 py-8 backdrop-blur-md">
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
