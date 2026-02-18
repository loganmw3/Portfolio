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
    // === Resume Projects ===
    {
      title: "Out-of-Order RISC-V Processor",
      problem:
        "Architected an out-of-order (OoO) RISC-V core to explore dynamic scheduling, performance, and microarchitectural tradeoffs.",
      highlights: [
        "Architected an OoO RV32I/M core using Tomasulo’s algorithm (reservation stations, register renaming, ROB)",
        "Implemented instruction/data caches with next-line prefetching and a common data bus for dynamic scheduling",
        "Achieved successful synthesis at 700 MHz (140% of 500 MHz baseline) via timing-driven refinement and microarchitectural optimization",
        "Personal: Designed and integrated a GShare-tournament branch predictor achieving 92% prediction accuracy; extending with a TAGE-style predictor (in progress)",
      ],
      techStack: [
        "SystemVerilog",
        "RISC-V (RV32I/M)",
        "Synopsys VCS",
        "Verdi",
        "Git",
        "Computer Architecture",
      ],
      githubUrl: "https://github.com/loganmw3/ooo", // put your repo link if public
      demoUrl: null,
    },
    {
      title: "rPPG Heart-Rate Measurement",
      problem:
        "Estimating heart rate from a standard camera feed using computer vision + signal processing for real-time physiological measurement.",
      highlights: [
        "Built an rPPG pipeline in Python + OpenCV to estimate heart rate from a webcam stream",
        "Implemented face/skin ROI detection, temporal band-pass filtering, motion compensation, and FFT-based frequency analysis",
        "Used Independent Component Analysis (ICA) to separate physiological color-signal changes from noise and reduce motion/lighting artifacts",
        "Ported the pipeline to Android (Java/C++), enabling real-time on-device processing",
      ],
      techStack: [
        "Python",
        "OpenCV",
        "Signal Processing",
        "FFT",
        "ICA",
        "Android",
        "C++",
        "Git",
      ],
      githubUrl: "https://github.com/loganmw3/rppg-python",
      demoUrl: "https://www.youtube.com/watch?v=Ffp9kcKH40o", // could be a short demo video or page
    },
    // {
    //   title: "Tensor Processing Unit (In Progress)",
    //   problem:
    //     "Designing a custom TPU-style accelerator and validating correctness with modern verification workflows.",
    //   highlights: [
    //     "Designing and implementing a custom Tensor Processing Unit (TPU) architecture in SystemVerilog",
    //     "Verifying functional correctness using a Python-based cocotb testbench with automated and randomized tests",
    //   ],
    //   techStack: ["SystemVerilog", "Python", "cocotb", "Git"],
    //   githubUrl: "https://github.com/loganmw3/sv",
    //   demoUrl: null,
    // },
    {
      title: "5-Stage Pipelined RISC-V Processor",
      problem:
        "Desiged a 5-stage pipelined RISC-V processor to explore pipeline control.",
      highlights: [
        "Designed and implemented a 5-stage RISC-V pipeline consisting of instruction fetch, decode, execute, memory, and writeback stages",
        "Implemented hazard detection and data forwarding logic to handle data and control hazards efficiently",
        "Verified correct pipeline behavior through simulation and extensive test programs",
      ],
      techStack: [
        "SystemVerilog",
        "RISC-V (RV32I)",
        "Synopsys VCS",
        "Verdi",
        "Git",
        "Computer Architecture",
      ],
      githubUrl: "https://github.com/loganmw3/pipeline", // put your repo link if public
      demoUrl: null,
    },
    {
      title: "PacMan (FPGA)",
      problem:
        "Bringing classic arcade nostalgia to hardware with a playable Pac-Man experience on an FPGA board.",
      highlights: [
        "Collaborated with a teammate to design and implement a fully functional Pac-Man game on an Urbana FPGA development board",
        "Developed USB and AXI drivers to enable responsive input from keyboard peripherals",
        "Recreated ghost personalities by implementing unique algorithms to mimic original game mechanics",
        "Prioritized communication, task-sharing, and thorough testing to ensure smooth integration across hardware and game logic",
      ],
      techStack: [
        "Vivado",
        "SystemVerilog",
        "Vitis",
        "C",
        "FPGA",
        "AXI",
        "USB",
      ],
      githubUrl: "https://github.com/jacobmtorry/Pacman",
      demoUrl: "https://www.youtube.com/watch?v=ORMuu2yWL28&t=17s",
    },
    {
      title: "Illinix",
      problem:
        "Building a Unix-inspired operating system from scratch to explore the fundamentals of process management, memory, and system design.",
      highlights: [
        "Collaborated with a team to design and develop a Unix-like operating system using C and RISC-V assembly on a QEMU simulated CPU",
        "Implemented the VirtIO block device driver, processes and forking with reference counting, paging with virtual memory",
        "Conducted unit tests using GDB and created C programs to validate memory allocation and functionality",
      ],
      techStack: ["C", "Git", "RISC-V Assembly", "GDB", "QEMU", "VirtIO"],
      githubUrl: null,
      demoUrl: null,
    },
    {
      title: "RTL Interview Prep – Digital Design Problem Set",
      problem:
        "Worked through a series of hardware interview-style RTL design problems to strengthen combinational and sequential logic fundamentals.",
      highlights: [
        "Designed and verified common interview circuits including thermometer code detector, trailing zero counter, priority encoder, and integer log2 module",
        "Implemented parameterized SystemVerilog modules using $clog2, generate constructs, and synthesizable always_comb logic",
        "Explored bit-manipulation techniques such as transition counting, contiguous-bit detection, and mask-based pattern checks",
        "Built Python/cocotb testbenches to create randomized and exhaustive test vectors for functional verification",
        "Debugged synthesis and lint issues (width truncation, variable part-select limitations, break support, signed vs unsigned behavior)",
      ],
      techStack: [
        "SystemVerilog",
        "Digital Logic Design",
        "Combinational Circuits",
        "Bit Manipulation",
        "Cocotb",
        "Python",
        "Verilator",
      ],
      githubUrl: "https://github.com/loganmw3/sv/tree/main/interview_prep", // add your repo link
      demoUrl: null,
    },

    // {
    // beer please
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
                {project.githubUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 hover:bg-ocean-light/20"
                    asChild
                  >
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                )}

                {project.demoUrl && (
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-ocean"
                    asChild
                  >
                    <a href={project.demoUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </a>
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
