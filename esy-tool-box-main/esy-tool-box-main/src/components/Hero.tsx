import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { tools } from "@/data/tools";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof tools>([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const featuredTools = tools.filter(tool => tool.featured);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      const filtered = tools.filter(tool =>
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleToolSelect = (toolRoute: string) => {
    navigate(toolRoute);
    setSearchQuery("");
    setShowResults(false);
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/5 rounded-full animate-float" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-primary/3 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-20 w-16 h-16 bg-primary/5 rounded-full animate-float" style={{ animationDelay: '2s' }} />

      <div className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Zap className="h-6 w-6 text-primary animate-glow" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              50+ Professional Tools
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Esytool
            </span>
            <br />
            <span className="text-foreground">
              Your Daily Toolkit
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-slide-up">
            Professional tools for text manipulation, image editing, PDF processing, 
            development utilities, and more. Everything you need in one place.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-12 animate-scale-in">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search 50+ tools... (e.g., password generator, image resizer)"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-12 pr-4 h-14 text-lg bg-background/80 backdrop-blur border-2 border-border/50 rounded-2xl shadow-soft focus:border-primary/30 focus:shadow-glow transition-all duration-300"
              />
              <Button 
                size="icon" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-xl"
                onClick={() => searchQuery && handleSearch(searchQuery)}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Hero Search Results */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-16 left-0 right-0 bg-background/95 backdrop-blur border border-border rounded-2xl shadow-strong max-h-80 overflow-y-auto z-50">
                {searchResults.slice(0, 6).map((tool, index) => (
                  <button
                    key={tool.id}
                    onClick={() => handleToolSelect(tool.route)}
                    className="w-full text-left px-6 py-4 hover:bg-muted/50 flex items-center space-x-4 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="h-10 w-10 rounded-xl bg-gradient-primary/10 flex items-center justify-center">
                      <span className="text-primary font-medium">
                        {tool.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{tool.name}</div>
                      <div className="text-sm text-muted-foreground">{tool.description}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Access Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {featuredTools.slice(0, 4).map((tool, index) => (
              <Button
                key={tool.id}
                variant="outline"
                onClick={() => navigate(tool.route)}
                className="bg-background/50 backdrop-blur border-border/50 hover:border-primary/30 hover:bg-background/80 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {tool.name}
                <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-2xl md:text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Tools Available</div>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-2xl md:text-3xl font-bold text-primary">6</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-2xl md:text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Free to Use</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;