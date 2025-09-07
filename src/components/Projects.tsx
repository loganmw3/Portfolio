import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "High-Performance Data Logger",
      problem: "Embedded system needed to capture sensor data at 1kHz with minimal memory footprint.",
      highlights: [
        "Optimized memory allocation reducing RAM usage by 40%",
        "Implemented circular buffer for continuous data streaming",
        "Created efficient UART protocol for real-time transmission"
      ],
      impact: "Achieved 99.8% data capture reliability at target frequency",
      techStack: ["C/C++", "STM32", "FreeRTOS", "Python", "UART"],
      githubUrl: "#",
      demoUrl: "#"
    },
    {
      title: "Smart Campus Navigation App",
      problem: "Students needed efficient indoor navigation for complex multi-building campus.",
      highlights: [
        "Developed React Native app with offline map capabilities",
        "Integrated BLE beacons for precise indoor positioning",
        "Built REST API with route optimization algorithms"
      ],
      impact: "Reduced average navigation time by 35% for 2,000+ users",
      techStack: ["React Native", "Node.js", "PostgreSQL", "BLE", "TypeScript"],
      githubUrl: "#",
      demoUrl: "#"
    },
    {
      title: "Neural Network Accelerator",
      problem: "Machine learning inference too slow for real-time edge computing applications.",
      highlights: [
        "Designed custom hardware accelerator using FPGA",
        "Implemented optimized matrix multiplication units",
        "Created Python toolkit for model quantization"
      ],
      impact: "Achieved 85% faster inference with 60% lower power consumption",
      techStack: ["Verilog", "FPGA", "Python", "TensorFlow", "Vivado"],
      githubUrl: "#",
      demoUrl: null
    }
  ];

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-ocean-deep mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Building efficient systems with measurable impact and clean architecture.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <Card key={index} className="hover:shadow-elevated transition-all duration-300 border-border">
              <CardHeader>
                <CardTitle className="text-xl text-ocean-deep">
                  {project.title}
                </CardTitle>
                <p className="text-muted-foreground">
                  {project.problem}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm text-foreground flex items-start">
                      <span className="w-2 h-2 rounded-full bg-ocean-primary mt-2 mr-3 flex-shrink-0"></span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="p-3 bg-sand-light rounded-lg">
                  <p className="text-sm font-medium text-ocean-deep">
                    📈 {project.impact}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 hover:bg-ocean-light/20">
                  <Github className="w-4 h-4 mr-2" />
                  Code
                </Button>
                {project.demoUrl && (
                  <Button size="sm" className="flex-1 bg-gradient-ocean">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;