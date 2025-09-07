import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";

const Contact = () => {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "logan@example.edu",
      href: "mailto:logan@example.edu",
      description: "Best for project inquiries"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/logan",
      href: "https://github.com/logan",
      description: "Code and open source"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/logan",
      href: "https://linkedin.com/in/logan",
      description: "Professional network"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-depth">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-ocean-deep mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Always open to discussing new opportunities, collaborations, or just 
            talking about interesting engineering challenges.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <Card key={index} className="hover:shadow-elevated transition-all duration-300 border-border">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-ocean-deep mb-2">
                      {method.label}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {method.description}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="hover:bg-ocean-light/20 border-ocean-primary text-ocean-primary"
                      onClick={() => window.open(method.href, '_blank')}
                    >
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="bg-card rounded-lg p-8 shadow-gentle border border-border">
            <div className="flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5 text-ocean-primary mr-2" />
              <span className="text-muted-foreground">
                Open to opportunities nationwide and remote work
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-ocean text-primary-foreground hover:shadow-elevated transition-all duration-300"
                onClick={() => window.open("mailto:logan@example.edu", '_blank')}
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Email
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-ocean-primary text-ocean-primary hover:bg-ocean-light/20"
                onClick={() => window.open("https://linkedin.com/in/logan", '_blank')}
              >
                <Linkedin className="w-5 h-5 mr-2" />
                Connect on LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;