import { CheckCircle, Users, Zap, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "All tools are optimized for speed and performance, giving you instant results."
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data never leaves your browser. All processing happens locally and securely."
    },
    {
      icon: Users,
      title: "User Friendly",
      description: "Clean, intuitive interface designed for both beginners and professionals."
    },
    {
      icon: CheckCircle,
      title: "Always Free",
      description: "All tools are completely free to use with no hidden fees or subscriptions."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>About Esytool</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Professional Tools for
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Everyone
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Esytool was created to provide a comprehensive suite of professional-grade tools 
            that are easy to use, fast, and completely free. Whether you're a developer, 
            designer, writer, or just someone who needs to get things done, we've got you covered.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="border-card-border bg-gradient-card animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-hero rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Professional Tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">6</div>
              <div className="text-muted-foreground">Tool Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Free & Open</div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We believe that powerful tools shouldn't be locked behind paywalls or require 
            complex installations. Esytool brings professional-grade utilities directly to 
            your browser, making productivity accessible to everyone.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div>
              <h3 className="font-semibold text-foreground mb-3">For Professionals</h3>
              <p className="text-muted-foreground">
                Advanced features and reliable performance for developers, designers, 
                writers, and other professionals who need robust tools for their work.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">For Everyone</h3>
              <p className="text-muted-foreground">
                Simple, intuitive interfaces that anyone can use, regardless of their 
                technical background or experience level.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center bg-muted/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Have Suggestions?</h2>
          <p className="text-muted-foreground mb-6">
            We're always looking to add new tools and improve existing ones. 
            Let us know what tools you'd like to see added to Esytool.
          </p>
          <a 
            href="mailto:hello@esytool.com" 
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-primary text-white rounded-lg font-medium hover:shadow-glow transition-all duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;