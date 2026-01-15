import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const skills = [
    "Python",
    "SystemVerilog",
    "Cuda",
    "cocotb",
    "Pytorch",
    "Scikit-Learn",
    "Tensorflow",
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
            <Card className="shadow-gentle border-border">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-ocean-deep mb-6">
                  My Focus
                </h3>
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    As a Computer Engineering student, I'm passionate about
                    creating systems that bridge the gap between hardware and
                    software. My work spans embedded systems, web applications,
                    and performance optimization.
                  </p>
                  <p>
                    I thrive on solving complex problems with elegant,
                    measurable solutions.
                  </p>
                  <p>
                    Currently exploring computer architecture and machine
                    learning applications.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-gentle border-border">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-ocean-deep mb-6">
                  Technical Skills
                </h3>

                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-sm py-2 px-3 hover:bg-ocean-light/30 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="mt-8 space-y-5">
                  <div className="flex items-start text-sm text-muted-foreground">
                    <span className="w-3 h-3 mt-1 rounded-full bg-ocean-primary mr-3 flex-shrink-0" />
                    <span className="font-medium">Current Focus:</span>
                    <span className="ml-2 leading-relaxed">
                      Parallel Programming & Models of Computation
                    </span>
                  </div>

                  <div className="flex items-start text-sm text-muted-foreground">
                    <span className="w-3 h-3 mt-1 rounded-full bg-sand-accent mr-3 flex-shrink-0" />
                    <span className="font-medium">Learning:</span>
                    <span className="ml-2 leading-relaxed">
                      CUDA Programming
                    </span>
                  </div>

                  <div className="flex items-start text-sm text-muted-foreground">
                    <span className="w-3 h-3 mt-1 rounded-full bg-ocean-light mr-3 flex-shrink-0" />
                    <span className="font-medium">Interested in:</span>
                    <span className="ml-2 leading-relaxed">
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
