import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Illinix",
      problem:
        "Building a Unix-inspired operating system from scratch to explore the fundamentals of process management, memory, and system design.",
      highlights: [
        "Collaborated with a team to design and develop a Unix-like operating system using C and RISCV assembly on a QEMU simulated CPU",
        "Implemented the Virtual-IO Block device driver, processes and forking with reference counting, paging with virtual memory",
        "Conducted unit tests using GDB. Created C programs to validate memory allocation and functionality",
      ],
      // impact: "Achieved 99.8% data capture reliability at target frequency",
      techStack: ["C/C++", "GitHub", "RISC-V Assembly", "GDB", "UART"],
      githubUrl: "#",
      demoUrl: "#",
    },
    {
      title: "PacMan",
      problem:
        "Bringing classic arcade nostalgia to the web with a playable Pac-Man experience.",
      highlights: [
        "Collaborated closely with a teammate to design and implement a fully functional PacMan game from the ground up on an Urbana FPGA development board",
        "Developed USB and AXI drivers to enable responsive input from both keyboard peripherals",
        "Recreated ghost personalities by implementing unique algorithms to mimic original game mechanics",
        "Prioritized communication, task-sharing, and thorough testing to ensure smooth integration across hardware and logic components",
      ],
      // impact: "Reduced average navigation time by 35% for 2,000+ users",
      techStack: ["Vivado", "SystemVerilog", "Vitus", "C", "FPGA"],
      githubUrl: "#",
      demoUrl: "#",
    },
    // {
    //   title: "Neural Network Accelerator",
    //   problem:
    //     "Machine learning inference too slow for real-time edge computing applications.",
    //   highlights: [
    //     "Designed custom hardware accelerator using FPGA",
    //     "Implemented optimized matrix multiplication units",
    //     "Created Python toolkit for model quantization",
    //   ],
    //   impact: "Achieved 85% faster inference with 60% lower power consumption",
    //   techStack: ["Verilog", "FPGA", "Python", "TensorFlow", "Vivado"],
    //   githubUrl: "#",
    //   demoUrl: null,
    // },
  ];

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-ocean-deep mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Building efficient systems with measurable impact and clean
            architecture.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="hover:shadow-elevated transition-all duration-300 border-border"
            >
              <CardHeader>
                <CardTitle className="text-xl text-ocean-deep">
                  {project.title}
                </CardTitle>
                <p className="text-muted-foreground">{project.problem}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {project.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="text-sm text-foreground flex items-start"
                    >
                      <span className="w-2 h-2 rounded-full bg-ocean-primary mt-2 mr-3 flex-shrink-0"></span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="p-3 bg-sand-light rounded-lg">
                  {/* <p className="text-sm font-medium text-ocean-deep">
                    📈 {project.impact}
                  </p> */}
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
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 hover:bg-ocean-light/20"
                >
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
