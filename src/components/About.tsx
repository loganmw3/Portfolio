import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const skills = [
    "Python",
    "SystemVerilog",
    "CUDA",
    "cocotb",
    "PyTorch",
    "Scikit-Learn",
    "TensorFlow",
    "C/C++",
    "Linux",
    "Git",
    "FPGA",
    "Pandas",
  ];

  return (
    <section id="about" className="py-20 bg-wave-pattern">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-ocean-deep mb-6">
              About Me
            </h2>
            <p className="text-xl text-muted-foreground">
              Passionate about making a difference.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* LEFT CARD */}
            <Card className="shadow-gentle border-border">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-ocean-deep mb-6">
                  Focus Areas
                </h3>

                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    I’m interested in systems design and computer architecture,
                    with a focus on building efficient, performance-critical
                    hardware and software.
                  </p>
                  <p>
                    My work spans low-level systems, including custom
                    processors, hardware accelerators, embedded systems, and
                    parallel software.
                  </p>
                  <p>
                    I’m particularly drawn to architectures that support modern
                    AI and machine learning workloads.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* RIGHT CARD */}
            <Card className="shadow-gentle border-border">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-ocean-deep mb-6">
                  Technical Skills
                </h3>

                {/* SKILL PILLS */}
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-sm px-4 py-2 leading-none hover:bg-ocean-light/30 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* INFO ROWS */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-start text-sm text-muted-foreground">
                    <span className="w-2.5 h-2.5 mt-1.5 rounded-full bg-ocean-primary mr-3 flex-shrink-0" />
                    <span className="font-medium mr-2">Current Focus:</span>
                    <span className="leading-relaxed">
                      Parallel Programming & Models of Computation
                    </span>
                  </div>

                  <div className="flex items-start text-sm text-muted-foreground">
                    <span className="w-2.5 h-2.5 mt-1.5 rounded-full bg-sand-accent mr-3 flex-shrink-0" />
                    <span className="font-medium mr-2">Learning:</span>
                    <span className="leading-relaxed">CUDA Programming</span>
                  </div>

                  <div className="flex items-start text-sm text-muted-foreground">
                    <span className="w-2.5 h-2.5 mt-1.5 rounded-full bg-ocean-light mr-3 flex-shrink-0" />
                    <span className="font-medium mr-2">Interested in:</span>
                    <span className="leading-relaxed">
                      Computer Architecture, Hardware Acceleration for AI/ML,
                      and Probabilistic Models
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
