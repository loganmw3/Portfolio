import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Mail } from "lucide-react";
import waveDivider from "@/assets/wave-divider.png";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative bg-gradient-depth">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-ocean-deep mb-6">
            Logan
          </h1>
          <h2 className="text-2xl md:text-3xl text-foreground mb-8">
            Computer Engineering Student
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Engineering student focused on efficient systems and clean interfaces.
            Building reliable embedded and web systems with clear, measurable impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              onClick={() => scrollToSection("projects")}
              className="bg-gradient-ocean text-primary-foreground hover:shadow-elevated transition-all duration-300 text-lg px-8 py-6"
            >
              View Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="border-ocean-primary text-ocean-primary hover:bg-ocean-light/20 text-lg px-8 py-6 transition-all duration-300"
            >
              Contact
            </Button>
          </div>

          <div className="flex justify-center space-x-6">
            <Button variant="ghost" size="sm" className="hover:bg-ocean-light/20">
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-ocean-light/20">
              <Mail className="w-5 h-5 mr-2" />
              Email
            </Button>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <img 
          src={waveDivider} 
          alt="" 
          className="w-full h-8 object-cover opacity-20"
        />
      </div>

      {/* Scroll indicator */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => scrollToSection("projects")}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover:bg-ocean-light/20"
      >
        <ArrowDown className="w-5 h-5" />
      </Button>
    </section>
  );
};

export default Hero;